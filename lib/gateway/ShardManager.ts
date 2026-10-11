/** @module ShardManager */
import Shard from "./Shard.js";
import type Client from "../Client.js";
import { AllIntents, AllNonPrivilegedIntents, Intents } from "../Constants.js";
import type { GatewayOptions, ShardManagerInstanceOptions } from "../types/gateway.js";
import Collection from "../util/Collection.js";
import type { SessionStoreEntry } from "../types/session-store.js";

/** While a shard is ready, its stored session is refreshed at least this often (ms) so the store's max age measures time since last seen alive. */
const SESSION_KEEPALIVE_INTERVAL = 30000;

/** A manager for all the client's shards. */
export default class ShardManager extends Collection<number, Shard> {
    #buckets: Record<number, number>;
    #client: Client;
    #connectQueue: Array<Shard>;
    #connectTimeout: NodeJS.Timeout | null;
    #sessionSaveQueued: NodeJS.Timeout | null;
    #sessionTimer: NodeJS.Timeout | null;
    #sessionWritten: Map<number, { at: number; key: string; }>;
    options: ShardManagerInstanceOptions;
    constructor(client: Client, options: GatewayOptions = {}) {
        super();
        this.#buckets = {};
        this.#client = client;
        this.#connectQueue = [];
        this.#connectTimeout = null;
        this.#sessionSaveQueued = null;
        this.#sessionTimer = null;
        this.#sessionWritten = new Map();
        this.options = {
            autoReconnect:        options.autoReconnect ?? true,
            compress:             options.compress ?? false,
            connectionProperties: {
                browser: options.connectionProperties?.browser ?? "Oceanic",
                device:  options.connectionProperties?.device ?? "Oceanic",
                os:      options.connectionProperties?.os ?? process.platform
            },
            concurrency:          options.concurrency === "auto" || options.concurrency && options.concurrency < 1 ? -1 : options.concurrency ?? -1,
            connectionTimeout:    options.connectionTimeout ?? 30000,
            firstShardID:         options.firstShardID && options.firstShardID < 0 ? 0 : options.firstShardID ?? 0,
            guildCreateTimeout:   options.guildCreateTimeout ?? 2000,
            intents:              typeof options.intents === "number" ? options.intents : 0,
            largeThreshold:       options.largeThreshold ?? 250,
            lastShardID:          options.lastShardID ?? -1,
            maxReconnectAttempts: options.maxReconnectAttempts ?? Infinity,
            maxResumeAttempts:    options.maxResumeAttempts ?? 10,
            maxShards:            options.maxShards === "auto" || options.maxShards && options.maxShards < 1 ? -1 : options.maxShards ?? -1,
            presence:			          {
                activities: options.presence?.activities ?? [],
                afk:		      options.presence?.afk ?? false,
                status:		   options.presence?.status ?? "online"
            },
            reconnectDelay: options.reconnectDelay ?? ((lastDelay, attempts): number => Math.pow(attempts + 1, 0.7) * 20000),
            sessionFlushInterval: options.sessionFlushInterval ?? 2000,
            sessionStore:         options.sessionStore ?? null,
            shardIDs:             options.shardIDs ?? [],
            ws:                   options.ws ?? {}
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
                    } else if (Intents[intent as keyof typeof Intents]) {
                        bitmask |= Intents[intent as keyof typeof Intents];
                    } else {
                        if (intent === "ALL") {
                            bitmask = AllIntents;
                            break;
                        }
                        this.#client.emit("warn", `Unknown intent: ${intent}`);
                    }
                }

                this.options.intents = bitmask;
            }
        } else {
            this.options.intents = AllNonPrivilegedIntents;
        }
    }

    private _ready(id: number): void {
        // @ts-ignore
        const rateLimitKey = (id % this.options.concurrency) ?? 0;
        this.#buckets[rateLimitKey] = Date.now();

        this.tryConnect();
    }

    private _resetConnectQueue(): void {
        this.#connectQueue = [];
    }

    /** Coalesce bursts of lifecycle events (e.g. every shard becoming ready at startup) into one write. */
    #queueSessionSave(): void {
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
    #restoreSession(shard: Shard): void {
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
        } catch (err) {
            this.#client.emit("warn", `Failed to load stored session: ${(err as Error).message}`, shard.id);
        }
    }

    /** Release the session store: stops the flush timer, writes a final snapshot, and closes the store. */
    closeSessions(): void {
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
        } catch (err) {
            this.#client.emit("warn", `Failed to close session store: ${(err as Error).message}`);
        }
        this.options.sessionStore = null;
    }

    /**
     * Prepare the session store and start periodically flushing shard state to it. Called by {@link Client#connect | Client#connect} before shards are spawned.
     * If the store fails to initialize, a warning is emitted and sessions are simply not persisted.
     */
    async initSessions(): Promise<void> {
        const store = this.options.sessionStore;
        if (!store) {
            return;
        }
        try {
            await store.init?.();
        } catch (err) {
            this.#client.emit("warn", `Session store failed to initialize, sessions will not be persisted: ${(err as Error).message}`);
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
    saveSessions(): void {
        const store = this.options.sessionStore;
        if (!store) {
            return;
        }
        const now = Date.now();
        const entries: Array<SessionStoreEntry> = [];
        const written = new Map<number, { at: number; key: string; }>();
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
                            sequence:  shard.sequence,
                            sessionID: shard.sessionID,
                            shardID:   shard.id
                        });
                        written.set(shard.id, { at: now, key });
                    }
                } else if (previous) {
                    store.delete(shard.id);
                    this.#sessionWritten.delete(shard.id);
                }
            }
            store.save(entries);
            for (const [id, info] of written) {
                this.#sessionWritten.set(id, info);
            }
        } catch (err) {
            this.#client.emit("warn", `Failed to save sessions: ${(err as Error).message}`);
        }
    }

    connect(shard: Shard): void {
        this.#connectQueue.push(shard);
        this.tryConnect();
    }

    spawn(id: number): void {
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

    tryConnect(): void {
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
