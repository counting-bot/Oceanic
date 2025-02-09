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
    connect(shard: Shard): void;
    spawn(id: number): void;
    tryConnect(): void;
}
