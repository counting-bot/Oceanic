/** @module Client */
import { GATEWAY_VERSION } from "./Constants.js";
import RESTManager from "./rest/RESTManager.js";
import TypedCollection from "./util/TypedCollection.js";
import PrivateChannel from "./structures/PrivateChannel.js";
import GroupChannel from "./structures/GroupChannel.js";
import User from "./structures/User.js";
import Guild from "./structures/Guild.js";
import type { AnyChannel, RawGroupChannel, RawPrivateChannel } from "./types/channels.js";
import type { RawGuild, RawUnavailableGuild } from "./types/guilds.js";
import type { RawUser } from "./types/users.js";
import type {  ClientInstanceOptions, ClientOptions } from "./types/client.js";
import TypedEmitter from "./util/TypedEmitter.js";
import type ClientApplication from "./structures/ClientApplication.js";
import ShardManager from "./gateway/ShardManager.js";
import type { BotActivity, GetBotGatewayResponse, SendStatuses } from "./types/gateway.js";
import UnavailableGuild from "./structures/UnavailableGuild.js";
import type ExtendedUser from "./structures/ExtendedUser.js";
import Util from "./util/Util.js";
import type { ClientEvents } from "./types/events.js";

/** The primary class for interfacing with Discord. See {@link Events~ClientEvents | Client Events} for a list of events. */
export default class Client extends TypedEmitter<ClientEvents> {
    private _application?: ClientApplication;
    private _user?: ExtendedUser;
    channelGuildMap: Record<string, string>;
    gatewayURL!: string;
    groupChannels: TypedCollection<string, RawGroupChannel, GroupChannel>;
    guildShardMap: Record<string, number>;
    guilds: TypedCollection<string, RawGuild, Guild>;
    options: ClientInstanceOptions;
    privateChannels: TypedCollection<string, RawPrivateChannel, PrivateChannel>;
    ready: boolean;
    rest: RESTManager;
    shards: ShardManager;
    startTime = 0;
    threadGuildMap: Record<string, string>;
    unavailableGuilds: TypedCollection<string, RawUnavailableGuild, UnavailableGuild>;
    users: TypedCollection<string, RawUser, User>;
    util: Util;
    /**
     * @constructor
     * @param options The options to create the client with.
     */
    constructor(options?: ClientOptions) {
        super();
        this.options = {
            allowedMentions: options?.allowedMentions ?? {
                everyone:    false,
                repliedUser: false,
                users:       true,
                roles:       true
            },
            auth:             options?.auth ?? null,
            collectionLimits: {
                members: options?.collectionLimits?.members === undefined ?  Infinity : (typeof options.collectionLimits.members === "object" ? {
                    unknown: Infinity,
                    ...options.collectionLimits.members
                } : options.collectionLimits.members),
                messages: options?.collectionLimits?.messages ?? 100,
                users:    options?.collectionLimits?.users ?? Infinity
            },
            defaultImageFormat:        options?.defaultImageFormat ?? "png",
            defaultImageSize:          options?.defaultImageSize ?? 4096,
            disableMemberLimitScaling: options?.disableMemberLimitScaling ?? false
        };
        this.channelGuildMap = {};
        this.groupChannels = new TypedCollection(GroupChannel, this, 10);
        this.guilds = new TypedCollection(Guild, this);
        this.privateChannels = new TypedCollection(PrivateChannel, this, 25);
        this.ready = false;
        this.guildShardMap = {};
        this.rest = new RESTManager(this, options?.rest);
        this.shards = new ShardManager(this, options?.gateway);
        this.threadGuildMap = {};
        this.unavailableGuilds = new TypedCollection(UnavailableGuild, this);
        this.users = new TypedCollection(User, this, this.options.collectionLimits.users);
        this.util = new Util(this);
    }

    /** The client's partial application. This will throw an error if not using a gateway connection or no shard is READY. */
    get application(): ClientApplication {
        if (!this._application) {
            throw new Error(`${this.constructor.name}#application is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client.`);
        } else {
            return this._application;
        }
    }

    get uptime(): number {
        return this.startTime ? Date.now() - this.startTime : 0;
    }

    /** The client's user application. This will throw an error if not using a gateway connection or no shard is READY. */
    get user(): ExtendedUser {
        if (!this._user) {
            throw new Error(`${this.constructor.name}#user is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client.`);
        } else {
            return this._user;
        }
    }

    /** Connect the client to Discord. */
    async connect(): Promise<void> {
        if (!this.options.auth || !this.options.auth.startsWith("Bot ")) {
            throw new Error("You must provide a bot token to connect. Make sure it has been prefixed with `Bot `.");
        }
        let url: string, data: GetBotGatewayResponse | undefined;
        try {
            if (this.shards.options.maxShards === -1 || this.shards.options.concurrency === -1) {
                data = await this.rest.getBotGateway();
                url = data.url;
            } else {
                url = (await this.rest.getGateway()).url;
            }
        } catch (err) {
            throw new Error("Failed to get gateway information.", { cause: err as Error });
        }
        if (url.includes("?")) {
            url = url.slice(0, url.indexOf("?"));
        }
        if (!url.endsWith("/")) {
            url += "/";
        }
        this.gatewayURL = `${url}?v=${GATEWAY_VERSION}&encoding=json`;
        if (this.shards.options.compress) {
            this.gatewayURL += "&compress=zlib-stream";
        }

        if (this.shards.options.maxShards === -1) {
            if (!data || !data.shards) {
                throw new Error("AutoSharding failed, missing required information from Discord.");
            }
            this.shards.options.maxShards = data.shards;
            if (this.shards.options.lastShardID === -1) {
                this.shards.options.lastShardID = data.shards - 1;
            }
        }

        if (this.shards.options.concurrency === -1) {
            if (!data) {
                throw new Error("AutoConcurrency failed, missing required information from Discord.");
            }
            this.shards.options.concurrency = data.sessionStartLimit.maxConcurrency;
        }


        if (!Array.isArray(this.shards.options.shardIDs)) {
            this.shards.options.shardIDs = [];
        }

        if (this.shards.options.shardIDs.length === 0 && this.shards.options.firstShardID !== undefined && this.shards.options.lastShardID !== undefined) {
            for (let i = this.shards.options.firstShardID; i <= this.shards.options.lastShardID; i++) {
                this.shards.options.shardIDs.push(i);
            }
        }


        for (const id of this.shards.options.shardIDs) {
            this.shards.spawn(id);
        }
    }

    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect = this.shards.options.autoReconnect): void {
        this.ready = false;
        for (const [,shard] of this.shards) shard.disconnect(reconnect);
        this.shards["_resetConnectQueue"]();
    }

    /**
     * Edit the client's status across all shards.
     * @param status The status.
     * @param activities An array of activities.
     */
    async editStatus(status: SendStatuses, activities: Array<BotActivity> = []): Promise<void>{
        for (const [,shard] of this.shards) await shard.editStatus(status, activities);
    }

    /**
     * Get a channel from an ID. This will return undefined if the channel is not cached.
     * @param channelID The id of the channel.
     */
    getChannel<T extends AnyChannel = AnyChannel>(channelID: string): T | undefined {
        if (this.channelGuildMap[channelID]) {
            return this.guilds.get(this.channelGuildMap[channelID])?.channels.get(channelID) as T;
        } else if (this.threadGuildMap[channelID]) {
            return this.guilds.get(this.threadGuildMap[channelID])?.threads.get(channelID) as T;
        }
        return (this.privateChannels.get(channelID) ?? this.groupChannels.get(channelID)) as T;
    }
}
