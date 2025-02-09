import RESTManager from "./rest/RESTManager.js";
import type { ClientInstanceOptions, ClientOptions } from "./types/client.js";
import TypedEmitter from "./util/TypedEmitter.js";
import ShardManager from "./gateway/ShardManager.js";
import type { BotActivity, SendStatuses } from "./types/gateway.js";
import Util from "./util/Util.js";
import type { ClientEvents } from "./types/events.js";
/** The primary class for interfacing with Discord. See {@link Events~ClientEvents | Client Events} for a list of events. */
export default class Client<E extends ClientEvents = ClientEvents> extends TypedEmitter<E> {
    channelGuildMap: Record<string, string>;
    gatewayURL: string;
    guildShardMap: Record<string, number>;
    options: ClientInstanceOptions;
    ready: boolean;
    rest: RESTManager;
    shards: ShardManager;
    startTime: number;
    threadGuildMap: Record<string, string>;
    util: Util;
    /**
     * @constructor
     * @param options The options to create the client with.
     */
    constructor(options?: ClientOptions);
    get uptime(): number;
    /** Connect the client to Discord. */
    connect(): Promise<void>;
    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect?: boolean): void;
    /**
     * Edit the client's status across all shards.
     * @param status The status.
     * @param activities An array of activities.
     */
    editStatus(status: SendStatuses, activities?: Array<BotActivity>): Promise<void>;
}
