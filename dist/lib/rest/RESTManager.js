/** @module RESTManager */
import RequestHandler from "./RequestHandler";
import Channels from "../routes/Channels";
import Guilds from "../routes/Guilds";
import Users from "../routes/Users";
import OAuth from "../routes/OAuth";
import Webhooks from "../routes/Webhooks";
import ApplicationCommands from "../routes/ApplicationCommands";
import Interactions from "../routes/Interactions";
import * as Routes from "../util/Routes";
import Miscellaneous from "../routes/Miscellaneous";
/** A manager for all rest actions. */
export default class RESTManager {
    applicationCommands;
    channels;
    #client;
    guilds;
    handler;
    interactions;
    misc;
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
        this.misc = new Miscellaneous(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkVTVE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9SRVNUTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFFOUMsT0FBTyxRQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxNQUFNLE1BQU0sa0JBQWtCLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0saUJBQWlCLENBQUM7QUFDcEMsT0FBTyxLQUFLLE1BQU0saUJBQWlCLENBQUM7QUFDcEMsT0FBTyxRQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFHMUMsT0FBTyxtQkFBbUIsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLFlBQVksTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEtBQUssTUFBTSxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLE9BQU8sYUFBYSxNQUFNLHlCQUF5QixDQUFDO0FBRXBELHNDQUFzQztBQUN0QyxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVc7SUFDNUIsbUJBQW1CLENBQXNCO0lBQ3pDLFFBQVEsQ0FBVztJQUNuQixPQUFPLENBQVM7SUFDaEIsTUFBTSxDQUFTO0lBQ2YsT0FBTyxDQUFpQjtJQUN4QixZQUFZLENBQWU7SUFDM0IsSUFBSSxDQUFnQjtJQUNwQixLQUFLLENBQVE7SUFDYixLQUFLLENBQVE7SUFDYixRQUFRLENBQVc7SUFDbkIsWUFBWSxNQUFjLEVBQUUsT0FBcUI7UUFDN0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFRCwrRkFBK0Y7SUFDL0YsS0FBSyxDQUFDLFdBQVcsQ0FBYyxPQUFxQztRQUNoRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUEyQjtZQUM5QyxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLEdBQUcsRUFBZ0IsSUFBSSxDQUFDLEdBQUc7WUFDM0IsTUFBTSxFQUFhLElBQUksQ0FBQyxNQUFNO1lBQzlCLGlCQUFpQixFQUFFO2dCQUNmLEtBQUssRUFBVyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztnQkFDOUMsU0FBUyxFQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTO2dCQUNsRCxVQUFVLEVBQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVc7Z0JBQ3BELGNBQWMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZTthQUMzRDtTQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQXFCO1lBQ3BDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxPQUFPO1NBQ3pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1RkFBdUY7SUFDdkYsS0FBSyxDQUFDLE9BQU8sQ0FBYyxPQUF1QjtRQUM5QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDSiJ9