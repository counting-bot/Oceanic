/** @module Client */
import { GATEWAY_VERSION } from "./Constants.js";
import RESTManager from "./rest/RESTManager.js";
import TypedEmitter from "./util/TypedEmitter.js";
import ShardManager from "./gateway/ShardManager.js";
import Util from "./util/Util.js";
/** The primary class for interfacing with Discord. See {@link Events~ClientEvents | Client Events} for a list of events. */
export default class Client extends TypedEmitter {
    _application;
    _user;
    channelGuildMap;
    gatewayURL;
    guildShardMap;
    // guilds: Collection<Guild, Client>;
    options;
    ready;
    rest;
    shards;
    startTime = 0;
    threadGuildMap;
    // unavailableGuilds: Collection<UnavailableGuild, Client>;
    util;
    /**
     * @constructor
     * @param options The options to create the client with.
     */
    constructor(options) {
        super();
        this.options = {
            allowedMentions: options?.allowedMentions ?? {
                everyone: false,
                repliedUser: false,
                users: true,
                roles: true
            },
            auth: options?.auth ?? null,
            collectionLimits: {
                members: options?.collectionLimits?.members === undefined ? Infinity : (typeof options.collectionLimits.members === "object" ? {
                    unknown: Infinity,
                    ...options.collectionLimits.members
                } : options.collectionLimits.members),
                messages: options?.collectionLimits?.messages ?? 100
            },
            defaultImageFormat: options?.defaultImageFormat ?? "png",
            defaultImageSize: options?.defaultImageSize ?? 4096,
            disableMemberLimitScaling: options?.disableMemberLimitScaling ?? false
        };
        this.channelGuildMap = {};
        // this.guilds = new Collection();
        this.ready = false;
        this.guildShardMap = {};
        this.rest = new RESTManager(this, options?.rest);
        this.shards = new ShardManager(this, options?.gateway);
        this.threadGuildMap = {};
        // this.unavailableGuilds = new Collection();
        this.util = new Util(this);
    }
    /** The client's partial application. This will throw an error if not using a gateway connection or no shard is READY. */
    get application() {
        if (this._application) {
            return this._application;
        }
        else {
            throw new Error(`${this.constructor.name}#application is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client.`);
        }
    }
    get uptime() {
        return this.startTime ? Date.now() - this.startTime : 0;
    }
    /** The client's user application. This will throw an error if not using a gateway connection or no shard is READY. */
    get user() {
        if (this._user) {
            return this._user;
        }
        else {
            throw new Error(`${this.constructor.name}#user is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client.`);
        }
    }
    /** Connect the client to Discord. */
    async connect() {
        if (!this.options.auth || !this.options.auth.startsWith("Bot ")) {
            throw new Error("You must provide a bot token to connect. Make sure it has been prefixed with `Bot `.");
        }
        let url, data;
        try {
            if (this.shards.options.maxShards === -1 || this.shards.options.concurrency === -1) {
                data = await this.rest.getBotGateway();
                url = data.url;
            }
            else {
                url = (await this.rest.getGateway()).url;
            }
        }
        catch (err) {
            throw new Error("Failed to get gateway information.", { cause: err });
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
    disconnect(reconnect = this.shards.options.autoReconnect) {
        this.ready = false;
        for (const [, shard] of this.shards)
            shard.disconnect(reconnect);
        this.shards["_resetConnectQueue"]();
    }
    /**
     * Edit the client's status across all shards.
     * @param status The status.
     * @param activities An array of activities.
     */
    async editStatus(status, activities = []) {
        for (const [, shard] of this.shards)
            await shard.editStatus(status, activities);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQkFBcUI7QUFDckIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHVCQUF1QixDQUFDO0FBRWhELE9BQU8sWUFBWSxNQUFNLHdCQUF3QixDQUFDO0FBRWxELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE9BQU8sSUFBSSxNQUFNLGdCQUFnQixDQUFDO0FBR2xDLDRIQUE0SDtBQUM1SCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQThDLFNBQVEsWUFBZTtJQUM5RSxZQUFZLENBQXFCO0lBQ2pDLEtBQUssQ0FBZ0I7SUFDN0IsZUFBZSxDQUF5QjtJQUN4QyxVQUFVLENBQVU7SUFDcEIsYUFBYSxDQUF5QjtJQUN0QyxxQ0FBcUM7SUFDckMsT0FBTyxDQUF3QjtJQUMvQixLQUFLLENBQVU7SUFDZixJQUFJLENBQWM7SUFDbEIsTUFBTSxDQUFlO0lBQ3JCLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCxjQUFjLENBQXlCO0lBQ3ZDLDJEQUEyRDtJQUMzRCxJQUFJLENBQU87SUFDWDs7O09BR0c7SUFDSCxZQUFZLE9BQXVCO1FBQy9CLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGVBQWUsRUFBRSxPQUFPLEVBQUUsZUFBZSxJQUFJO2dCQUN6QyxRQUFRLEVBQUssS0FBSztnQkFDbEIsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLEtBQUssRUFBUSxJQUFJO2dCQUNqQixLQUFLLEVBQVEsSUFBSTthQUNwQjtZQUNELElBQUksRUFBYyxPQUFPLEVBQUUsSUFBSSxJQUFJLElBQUk7WUFDdkMsZ0JBQWdCLEVBQUU7Z0JBQ2QsT0FBTyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzVILE9BQU8sRUFBRSxRQUFRO29CQUNqQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPO2lCQUN0QyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO2dCQUNyQyxRQUFRLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsSUFBSSxHQUFHO2FBQ3ZEO1lBQ0Qsa0JBQWtCLEVBQVMsT0FBTyxFQUFFLGtCQUFrQixJQUFJLEtBQUs7WUFDL0QsZ0JBQWdCLEVBQVcsT0FBTyxFQUFFLGdCQUFnQixJQUFJLElBQUk7WUFDNUQseUJBQXlCLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixJQUFJLEtBQUs7U0FDekUsQ0FBQztRQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx5SEFBeUg7SUFDekgsSUFBSSxXQUFXO1FBQ1gsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1QjthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSwwSUFBMEksQ0FBQyxDQUFDO1NBQ3ZMO0lBQ0wsQ0FBQztJQUVELElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsc0hBQXNIO0lBQ3RILElBQUksSUFBSTtRQUNKLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNyQjthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxtSUFBbUksQ0FBQyxDQUFDO1NBQ2hMO0lBQ0wsQ0FBQztJQUVELHFDQUFxQztJQUNyQyxLQUFLLENBQUMsT0FBTztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM3RCxNQUFNLElBQUksS0FBSyxDQUFDLHNGQUFzRixDQUFDLENBQUM7U0FDM0c7UUFDRCxJQUFJLEdBQVcsRUFBRSxJQUF1QyxDQUFDO1FBQ3pELElBQUk7WUFDQSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2hGLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3ZDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNILEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQzthQUM1QztTQUNKO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxDQUFDLENBQUM7U0FDbEY7UUFDRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLEdBQUcsSUFBSSxHQUFHLENBQUM7U0FDZDtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLE1BQU0sZUFBZSxnQkFBZ0IsQ0FBQztRQUM5RCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsVUFBVSxJQUFJLHVCQUF1QixDQUFDO1NBQzlDO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUVBQWlFLENBQUMsQ0FBQzthQUN0RjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzVDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDckQ7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO2FBQ3pGO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUM7U0FDM0U7UUFHRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDOUksS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QztTQUNKO1FBRUQsS0FBSyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhO1FBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEtBQUssTUFBTSxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFvQixFQUFFLGFBQWlDLEVBQUU7UUFDdEUsS0FBSyxNQUFNLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNKIn0=