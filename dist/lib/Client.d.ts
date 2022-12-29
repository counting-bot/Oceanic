import RESTManager from "./rest/RESTManager.js";
import TypedCollection from "./util/TypedCollection.js";
import PrivateChannel from "./structures/PrivateChannel.js";
import User from "./structures/User.js";
import Guild from "./structures/Guild.js";
import type { AnyChannel, RawPrivateChannel } from "./types/channels.js";
import type { RawGuild, RawUnavailableGuild } from "./types/guilds.js";
import type { RawUser } from "./types/users.js";
import type { ClientInstanceOptions, ClientOptions } from "./types/client.js";
import TypedEmitter from "./util/TypedEmitter.js";
import type ClientApplication from "./structures/ClientApplication.js";
import ShardManager from "./gateway/ShardManager.js";
import type { BotActivity, SendStatuses } from "./types/gateway.js";
import UnavailableGuild from "./structures/UnavailableGuild.js";
import type ExtendedUser from "./structures/ExtendedUser.js";
import Util from "./util/Util.js";
import type { ClientEvents } from "./types/events.js";
/** The primary class for interfacing with Discord. See {@link Events~ClientEvents | Client Events} for a list of events. */
export default class Client extends TypedEmitter<ClientEvents> {
    private _application?;
    private _user?;
    channelGuildMap: Record<string, string>;
    gatewayURL: string;
    guildShardMap: Record<string, number>;
    guilds: TypedCollection<string, RawGuild, Guild>;
    options: ClientInstanceOptions;
    privateChannels: TypedCollection<string, RawPrivateChannel, PrivateChannel>;
    ready: boolean;
    rest: RESTManager;
    shards: ShardManager;
    startTime: number;
    threadGuildMap: Record<string, string>;
    unavailableGuilds: TypedCollection<string, RawUnavailableGuild, UnavailableGuild>;
    users: TypedCollection<string, RawUser, User>;
    util: Util;
    /**
     * @constructor
     * @param options The options to create the client with.
     */
    constructor(options?: ClientOptions);
    /** The client's partial application. This will throw an error if not using a gateway connection or no shard is READY. */
    get application(): ClientApplication;
    get uptime(): number;
    /** The client's user application. This will throw an error if not using a gateway connection or no shard is READY. */
    get user(): ExtendedUser;
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
    /**
     * Get a channel from an ID. This will return undefined if the channel is not cached.
     * @param channelID The id of the channel.
     */
    getChannel<T extends AnyChannel = AnyChannel>(channelID: string): T | undefined;
}
