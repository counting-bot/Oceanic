/** @module Events */
import type { RawRequest } from "./request-handler.js";
import type { AnyDispatchPacket } from "./gateway-raw.js";

export interface ClientEvents {
    connect: [id: number];
    /** @event Emitted with various information for debugging. */
    debug: [info: string, shard?: number];
    /** @event Emitted when all shards disconnect. */
    disconnect: [];
    /** @event Emitted when an error happens. If an error is emitted and no handlers are present, the error will be thrown. */
    error: [info: Error | string, shard?: number];
    /** @event Emitted when a shard receives the HELLO packet. */
    hello: [interval: number, shard: number];
    /** @event Emitted when a raw dispatch packet is received. */
    packet: [data: AnyDispatchPacket, shard: number];
    /** @event Emitted when all shards are ready. */
    ready: [];
    /** @event Emitted when a request is made. */
    request: [rawRequest: RawRequest];
    /** @event Emitted when this shard disconnects.*/
    shardDisconnect: [err: Error | undefined, id: number];
    /** @event Emitted when this shard has processed the READY packet from Discord. */
    shardPreReady: [id: number];
    /** @event Emitted when a shard is fully ready. */
    shardReady: [id: number];
    /** @event Emitted when a shard resumes a connection. */
    shardResume: [id: number];
    /** @event Emitted with various warning information. */
    warn: [info: string, shard?: number];
    /** @event Emitted when a heartbeat has been acknowledged */
    heartbeatAck: [data: object];
}

export interface ShardEvents {
    /** @event Emitted with various information for debugging. */
    debug: [info: string];
    /** @event Emitted when this shard disconnects.*/
    disconnect: [err?: Error];
    /** @event Emitted when an error happens. If an error is emitted and no handlers are present, the error will be thrown. */
    error: [info: Error | string];
    /** @event Emitted when this shard has processed the READY packet from Discord. */
    preReady: [];
    /** @event Emitted when this shard is fully ready. */
    ready: [];
    /** @event Emitted when this shard resumes a connection. */
    resume: [];
    /** @event Emitted with various warning information. */
    warn: [info: string];
}
