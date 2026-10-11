/** @module ShardManager */
import Shard from "./Shard.js";
import type Client from "../Client.js";
import type { GatewayOptions, ShardManagerInstanceOptions } from "../types/gateway.js";
import Collection from "../util/Collection.js";
/** A manager for all the client's shards. */
export default class ShardManager extends Collection<number, Shard> {
    #private;
    options: ShardManagerInstanceOptions;
    constructor(client: Client, options?: GatewayOptions);
    private _ready;
    private _resetConnectQueue;
    /** Release the session store: stops the flush timer, writes a final snapshot, and closes the store. */
    closeSessions(): void;
    /**
     * Prepare the session store and start periodically flushing shard state to it. Called by {@link Client#connect | Client#connect} before shards are spawned.
     * If the store fails to initialize, a warning is emitted and sessions are simply not persisted.
     */
    initSessions(): Promise<void>;
    /**
     * Write the current state of all shards to the session store now (only what changed). Sessions Oceanic has invalidated are removed.
     * Call this (then exit WITHOUT calling {@link Client#disconnect | Client#disconnect}) on shutdown if you want the next process to resume:
     * a normal disconnect closes the gateway with code 1000, which makes Discord drop the session.
     */
    saveSessions(): void;
    connect(shard: Shard): void;
    spawn(id: number): void;
    tryConnect(): void;
}
