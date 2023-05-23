/** @module RESTManager */
import RequestHandler from "./RequestHandler.js";
import Channels from "../routes/Channels.js";
import Guilds from "../routes/Guilds.js";
import Users from "../routes/Users.js";
import OAuth from "../routes/OAuth.js";
import Webhooks from "../routes/Webhooks.js";
import ApplicationCommands from "../routes/ApplicationCommands.js";
import Interactions from "../routes/Interactions.js";
import * as Routes from "../util/Routes.js";
/** A manager for all rest actions. */
export default class RESTManager {
    applicationCommands;
    channels;
    #client;
    guilds;
    handler;
    interactions;
    oauth;
    users;
    webhooks;
    constructor(client, options) {
        this.applicationCommands = new ApplicationCommands(this);
        this.channels = new Channels(this);
        this.#client = client;
        this.guilds = new Guilds(this);
        this.handler = new RequestHandler(this, options);
        this.interactions = new Interactions(this);
        this.oauth = new OAuth(this);
        this.users = new Users(this);
        this.webhooks = new Webhooks(this);
    }
    get client() {
        return this.#client;
    }
    get options() {
        return this.handler.options;
    }
    /** Alias for {@link RequestHandler~RequestHandler#authRequest | RequestHandler#authRequest} */
    async authRequest(options) {
        return this.handler.authRequest(options);
    }
    /**
     * Get the gateway information related to your bot client.
     */
    async getBotGateway() {
        return this.authRequest({
            method: "GET",
            path: Routes.GATEWAY_BOT
        }).then(data => ({
            url: data.url,
            shards: data.shards,
            sessionStartLimit: {
                total: data.session_start_limit.total,
                remaining: data.session_start_limit.remaining,
                resetAfter: data.session_start_limit.reset_after,
                maxConcurrency: data.session_start_limit.max_concurrency
            }
        }));
    }
    /**
     * Get the gateway information.
     */
    async getGateway() {
        return this.request({
            method: "GET",
            path: Routes.GATEWAY
        });
    }
    /** Alias for {@link RequestHandler~RequestHandler#request | RequestHandler#request} */
    async request(options) {
        return this.handler.request(options);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkVTVE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9SRVNUTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxjQUFjLE1BQU0scUJBQXFCLENBQUM7QUFFakQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDdkMsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDdkMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFHN0MsT0FBTyxtQkFBbUIsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEtBQUssTUFBTSxNQUFNLG1CQUFtQixDQUFDO0FBRzVDLHNDQUFzQztBQUN0QyxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVc7SUFDNUIsbUJBQW1CLENBQXNCO0lBQ3pDLFFBQVEsQ0FBVztJQUNuQixPQUFPLENBQVM7SUFDaEIsTUFBTSxDQUFTO0lBQ2YsT0FBTyxDQUFpQjtJQUN4QixZQUFZLENBQWU7SUFDM0IsS0FBSyxDQUFRO0lBQ2IsS0FBSyxDQUFRO0lBQ2IsUUFBUSxDQUFXO0lBQ25CLFlBQVksTUFBYyxFQUFFLE9BQXFCO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDaEMsQ0FBQztJQUVELCtGQUErRjtJQUMvRixLQUFLLENBQUMsV0FBVyxDQUFjLE9BQXFDO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUksT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxXQUFXLENBQTJCO1lBQzlDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxXQUFXO1NBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsR0FBRyxFQUFnQixJQUFJLENBQUMsR0FBRztZQUMzQixNQUFNLEVBQWEsSUFBSSxDQUFDLE1BQU07WUFDOUIsaUJBQWlCLEVBQUU7Z0JBQ2YsS0FBSyxFQUFXLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO2dCQUM5QyxTQUFTLEVBQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVM7Z0JBQ2xELFVBQVUsRUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVztnQkFDcEQsY0FBYyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlO2FBQzNEO1NBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBcUI7WUFDcEMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLE9BQU87U0FDekIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVGQUF1RjtJQUN2RixLQUFLLENBQUMsT0FBTyxDQUFjLE9BQXVCO1FBQzlDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUksT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNKIn0=