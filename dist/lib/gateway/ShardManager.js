"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ShardManager */
const Shard_js_1 = tslib_1.__importDefault(require("./Shard.js"));
const Constants_js_1 = require("../Constants.js");
const Collection_js_1 = tslib_1.__importDefault(require("../util/Collection.js"));
/** A manager for all the client's shards. */
class ShardManager extends Collection_js_1.default {
    #buckets;
    #client;
    #connectQueue;
    #connectTimeout;
    options;
    constructor(client, options = {}) {
        super();
        this.#buckets = {};
        this.#client = client;
        this.#connectQueue = [];
        this.#connectTimeout = null;
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
            getAllUsers: options.getAllUsers ?? false,
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
                    else if (Constants_js_1.Intents[intent]) {
                        bitmask |= Constants_js_1.Intents[intent];
                    }
                    else {
                        if (intent === "ALL") {
                            bitmask = Constants_js_1.AllIntents;
                            break;
                        }
                        this.#client.emit("warn", `Unknown intent: ${intent}`);
                    }
                }
                this.options.intents = bitmask;
            }
        }
        else {
            this.options.intents = Constants_js_1.AllNonPrivilegedIntents;
        }
        if (this.options.getAllUsers && !(this.options.intents & Constants_js_1.Intents.GUILD_MEMBERS)) {
            throw new Error("Guild members cannot be requested without the GUILD_MEMBERS intent");
        }
    }
    _ready(id) {
        const rateLimitKey = (id % this.options.concurrency) ?? 0;
        this.#buckets[rateLimitKey] = Date.now();
        this.tryConnect();
    }
    _resetConnectQueue() {
        this.#connectQueue = [];
    }
    connect(shard) {
        this.#connectQueue.push(shard);
        this.tryConnect();
    }
    spawn(id) {
        let shard = this.get(id);
        if (!shard) {
            shard = new Shard_js_1.default(id, this.#client);
            this.set(id, shard);
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
exports.default = ShardManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvU2hhcmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixrRUFBK0I7QUFFL0Isa0RBQStFO0FBRS9FLGtGQUErQztBQUUvQyw2Q0FBNkM7QUFDN0MsTUFBcUIsWUFBYSxTQUFRLHVCQUF5QjtJQUMvRCxRQUFRLENBQXlCO0lBQ2pDLE9BQU8sQ0FBUztJQUNoQixhQUFhLENBQWU7SUFDNUIsZUFBZSxDQUF3QjtJQUN2QyxPQUFPLENBQThCO0lBQ3JDLFlBQVksTUFBYyxFQUFFLFVBQTBCLEVBQUU7UUFDcEQsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsYUFBYSxFQUFTLE9BQU8sQ0FBQyxhQUFhLElBQUksSUFBSTtZQUNuRCxRQUFRLEVBQWMsT0FBTyxDQUFDLFFBQVEsSUFBSSxLQUFLO1lBQy9DLG9CQUFvQixFQUFFO2dCQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixFQUFFLE9BQU8sSUFBSSxTQUFTO2dCQUMzRCxNQUFNLEVBQUcsT0FBTyxDQUFDLG9CQUFvQixFQUFFLE1BQU0sSUFBSSxTQUFTO2dCQUMxRCxFQUFFLEVBQU8sT0FBTyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsSUFBSSxPQUFPLENBQUMsUUFBUTthQUNoRTtZQUNELFdBQVcsRUFBVyxPQUFPLENBQUMsV0FBVyxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFD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