/** @module ShardManager */
import Shard from "./Shard.js";
import { AllIntents, AllNonPrivilegedIntents, Intents } from "../Constants.js";
import Collection from "../util/Collection.js";
/** While a shard is ready, its stored session is refreshed at least this often (ms) so the store's max age measures time since last seen alive. */
const SESSION_KEEPALIVE_INTERVAL = 30000;
/** A manager for all the client's shards. */
export default class ShardManager extends Collection {
    #buckets;
    #client;
    #connectQueue;
    #connectTimeout;
    #sessionSaveQueued;
    #sessionTimer;
    #sessionWritten;
    options;
    constructor(client, options = {}) {
        super();
        this.#buckets = {};
        this.#client = client;
        this.#connectQueue = [];
        this.#connectTimeout = null;
        this.#sessionSaveQueued = null;
        this.#sessionTimer = null;
        this.#sessionWritten = new Map();
        this.options = {
            autoReconnect: options.autoReconnect ?? true,
            compress: options.compress ?? false,
            connectionProperties: {
                browser: options.connectionProperties?.browser ?? "Oceanic",
                device: options.connectionProperties?.device ?? "Oceanic",
                os: options.connectionProperties?.os ?? process.platform
            },
            concurrency: options.concurrency === "auto" || options.concurrency && options.concurrency < 1 ? -1 : options.concurrency ?? -1,
            connectionTimeout: options.connectionTimeout ?? 30000,
            firstShardID: options.firstShardID && options.firstShardID < 0 ? 0 : options.firstShardID ?? 0,
            guildCreateTimeout: options.guildCreateTimeout ?? 2000,
            intents: typeof options.intents === "number" ? options.intents : 0,
            largeThreshold: options.largeThreshold ?? 250,
            lastShardID: options.lastShardID ?? -1,
            maxReconnectAttempts: options.maxReconnectAttempts ?? Infinity,
            maxResumeAttempts: options.maxResumeAttempts ?? 10,
            maxShards: options.maxShards === "auto" || options.maxShards && options.maxShards < 1 ? -1 : options.maxShards ?? -1,
            presence: {
                activities: options.presence?.activities ?? [],
                afk: options.presence?.afk ?? false,
                status: options.presence?.status ?? "online"
            },
            reconnectDelay: options.reconnectDelay ?? ((lastDelay, attempts) => Math.pow(attempts + 1, 0.7) * 20000),
            sessionFlushInterval: options.sessionFlushInterval ?? 2000,
            sessionStore: options.sessionStore ?? null,
            shardIDs: options.shardIDs ?? [],
            ws: options.ws ?? {}
        };
        if (this.options.lastShardID === -1 && this.options.maxShards !== -1) {
            this.options.lastShardID = this.options.maxShards - 1;
        }
        if (Object.hasOwn(options, "intents")) {
            if (Array.isArray(options.intents)) {
                let bitmask = 0;
                for (const intent of options.intents) {
                    if (typeof intent === "number") {
                        bitmask |= intent;
                    }
                    else if (Intents[intent]) {
                        bitmask |= Intents[intent];
                    }
                    else {
                        if (intent === "ALL") {
                            bitmask = AllIntents;
                            break;
                        }
                        this.#client.emit("warn", `Unknown intent: ${intent}`);
                    }
                }
                this.options.intents = bitmask;
            }
        }
        else {
            this.options.intents = AllNonPrivilegedIntents;
        }
    }
    _ready(id) {
        // @ts-ignore
        const rateLimitKey = (id % this.options.concurrency) ?? 0;
        this.#buckets[rateLimitKey] = Date.now();
        this.tryConnect();
    }
    _resetConnectQueue() {
        this.#connectQueue = [];
    }
    /** Coalesce bursts of lifecycle events (e.g. every shard becoming ready at startup) into one write. */
    #queueSessionSave() {
        if (!this.options.sessionStore || this.#sessionSaveQueued) {
            return;
        }
        this.#sessionSaveQueued = setTimeout(() => {
            this.#sessionSaveQueued = null;
            this.saveSessions();
        }, 250);
        this.#sessionSaveQueued.unref();
    }
    /** Restore a freshly created shard's session from the store. Must run before the shard enters the connect queue, as {@link ShardManager#tryConnect | tryConnect} skips the identify throttle for shards holding a session. */
    #restoreSession(shard) {
        const store = this.options.sessionStore;
        if (!store) {
            return;
        }
        try {
            const saved = store.load(shard.id, this.options.maxShards);
            if (!saved) {
                return;
            }
            shard.sessionID = saved.sessionID;
            shard.resumeURL = saved.resumeURL;
            shard.sequence = saved.sequence;
            this.#sessionWritten.set(shard.id, { at: Date.now(), key: `${saved.sessionID}|${saved.resumeURL ?? ""}|${saved.sequence}` });
            this.#client.emit("debug", `Restored stored session (sequence ${saved.sequence}); will attempt to resume.`, shard.id);
        }
        catch (err) {
            this.#client.emit("warn", `Failed to load stored session: ${err.message}`, shard.id);
        }
    }
    /** Release the session store: stops the flush timer, writes a final snapshot, and closes the store. */
    closeSessions() {
        if (this.#sessionTimer) {
            clearInterval(this.#sessionTimer);
            this.#sessionTimer = null;
        }
        if (this.#sessionSaveQueued) {
            clearTimeout(this.#sessionSaveQueued);
            this.#sessionSaveQueued = null;
        }
        const store = this.options.sessionStore;
        if (!store) {
            return;
        }
        this.saveSessions();
        try {
            store.close?.();
        }
        catch (err) {
            this.#client.emit("warn", `Failed to close session store: ${err.message}`);
        }
        this.options.sessionStore = null;
    }
    /**
     * Prepare the session store and start periodically flushing shard state to it. Called by {@link Client#connect | Client#connect} before shards are spawned.
     * If the store fails to initialize, a warning is emitted and sessions are simply not persisted.
     */
    async initSessions() {
        const store = this.options.sessionStore;
        if (!store) {
            return;
        }
        try {
            await store.init?.();
        }
        catch (err) {
            this.#client.emit("warn", `Session store failed to initialize, sessions will not be persisted: ${err.message}`);
            this.options.sessionStore = null;
            return;
        }
        if (!this.#sessionTimer) {
            this.#sessionTimer = setInterval(() => this.saveSessions(), this.options.sessionFlushInterval);
            this.#sessionTimer.unref();
        }
    }
    /**
     * Write the current state of all shards to the session store now (only what changed). Sessions Oceanic has invalidated are removed.
     * Call this (then exit WITHOUT calling {@link Client#disconnect | Client#disconnect}) on shutdown if you want the next process to resume:
     * a normal disconnect closes the gateway with code 1000, which makes Discord drop the session.
     */
    saveSessions() {
        const store = this.options.sessionStore;
        if (!store) {
            return;
        }
        const now = Date.now();
        const entries = [];
        const written = new Map();
        try {
            for (const shard of this.values()) {
                const previous = this.#sessionWritten.get(shard.id);
                if (shard.sessionID) {
                    const key = `${shard.sessionID}|${shard.resumeURL ?? ""}|${shard.sequence}`;
                    const keepAlive = shard.status === "ready" && previous !== undefined && now - previous.at >= SESSION_KEEPALIVE_INTERVAL;
                    if (previous?.key !== key || keepAlive) {
                        entries.push({
                            maxShards: this.options.maxShards,
                            resumeURL: shard.resumeURL,
                            sequence: shard.sequence,
                            sessionID: shard.sessionID,
                            shardID: shard.id
                        });
                        written.set(shard.id, { at: now, key });
                    }
                }
                else if (previous) {
                    store.delete(shard.id);
                    this.#sessionWritten.delete(shard.id);
                }
            }
            store.save(entries);
            for (const [id, info] of written) {
                this.#sessionWritten.set(id, info);
            }
        }
        catch (err) {
            this.#client.emit("warn", `Failed to save sessions: ${err.message}`);
        }
    }
    connect(shard) {
        this.#connectQueue.push(shard);
        this.tryConnect();
    }
    spawn(id) {
        let shard = this.get(id);
        if (!shard) {
            shard = new Shard(id, this.#client);
            this.set(id, shard);
            this.#restoreSession(shard);
            shard
                .on("ready", () => {
                this.#client.emit("shardReady", id);
                if (this.#client.ready) {
                    return;
                }
                for (const other of this.values()) {
                    if (!other.ready) {
                        return;
                    }
                }
                this.#client.ready = true;
                this.#client.startTime = Date.now();
                this.#client.emit("ready");
            })
                .on("resume", () => {
                this.#queueSessionSave();
                this.#client.emit("shardResume", id);
                if (this.#client.ready) {
                    return;
                }
                for (const other of this.values()) {
                    if (!other.ready) {
                        return;
                    }
                }
                this.#client.ready = true;
                this.#client.startTime = Date.now();
                this.#client.emit("ready");
            })
                .on("disconnect", error => {
                this.#queueSessionSave();
                this.#client.emit("shardDisconnect", error, id);
                for (const other of this.values()) {
                    if (other.ready) {
                        return;
                    }
                }
                this.#client.ready = false;
                this.#client.startTime = 0;
                this.#client.emit("disconnect");
            })
                .on("preReady", () => {
                this.#queueSessionSave();
                this.#client.emit("shardPreReady", id);
            });
        }
        if (shard.status === "disconnected") {
            return this.connect(shard);
        }
    }
    tryConnect() {
        if (this.#connectQueue.length === 0) {
            return;
        }
        for (const shard of this.#connectQueue) {
            // @ts-ignore
            const rateLimitKey = (shard.id % this.options.concurrency) ?? 0;
            const lastConnect = this.#buckets[rateLimitKey] ?? 0;
            if (!shard.sessionID && Date.now() - lastConnect < 5000) {
                continue;
            }
            if (this.some(s => s.connecting && ((s.id % this.options.concurrency) || 0) === rateLimitKey)) {
                continue;
            }
            shard.connect();
            this.#buckets[rateLimitKey] = Date.now();
            this.#connectQueue.splice(this.#connectQueue.findIndex(s => s.id === shard.id), 1);
        }
        if (!this.#connectTimeout && this.#connectQueue.length !== 0) {
            this.#connectTimeout = setTimeout(() => {
                this.#connectTimeout = null;
                this.tryConnect();
            }, 500);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvU2hhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJCQUEyQjtBQUMzQixPQUFPLEtBQUssTUFBTSxZQUFZLENBQUM7QUFFL0IsT0FBTyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvRSxPQUFPLFVBQVUsTUFBTSx1QkFBdUIsQ0FBQztBQUcvQyxtSkFBbUo7QUFDbkosTUFBTSwwQkFBMEIsR0FBRyxLQUFLLENBQUM7QUFFekMsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLFVBQXlCO0lBQy9ELFFBQVEsQ0FBeUI7SUFDakMsT0FBTyxDQUFTO0lBQ2hCLGFBQWEsQ0FBZTtJQUM1QixlQUFlLENBQXdCO0lBQ3ZDLGtCQUFrQixDQUF3QjtJQUMxQyxhQUFhLENBQXdCO0lBQ3JDLGVBQWUsQ0FBNEM7SUFDM0QsT0FBTyxDQUE4QjtJQUNyQyxZQUFZLE1BQWMsRUFBRSxPQUFPLEdBQW1CLEVBQUU7UUFDcEQsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsYUFBYSxFQUFTLE9BQU8sQ0FBQyxhQUFhLElBQUksSUFBSTtZQUNuRCxR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