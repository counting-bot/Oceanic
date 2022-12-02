"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module RESTManager */
const RequestHandler_js_1 = tslib_1.__importDefault(require("./RequestHandler.js"));
const Channels_js_1 = tslib_1.__importDefault(require("../routes/Channels.js"));
const Guilds_js_1 = tslib_1.__importDefault(require("../routes/Guilds.js"));
const Users_js_1 = tslib_1.__importDefault(require("../routes/Users.js"));
const OAuth_js_1 = tslib_1.__importDefault(require("../routes/OAuth.js"));
const Webhooks_js_1 = tslib_1.__importDefault(require("../routes/Webhooks.js"));
const ApplicationCommands_js_1 = tslib_1.__importDefault(require("../routes/ApplicationCommands.js"));
const Interactions_js_1 = tslib_1.__importDefault(require("../routes/Interactions.js"));
const Routes = tslib_1.__importStar(require("../util/Routes.js"));
const Miscellaneous_js_1 = tslib_1.__importDefault(require("../routes/Miscellaneous.js"));
/** A manager for all rest actions. */
class RESTManager {
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
        this.applicationCommands = new ApplicationCommands_js_1.default(this);
        this.channels = new Channels_js_1.default(this);
        this.#client = client;
        this.guilds = new Guilds_js_1.default(this);
        this.handler = new RequestHandler_js_1.default(this, options);
        this.interactions = new Interactions_js_1.default(this);
        this.misc = new Miscellaneous_js_1.default(this);
        this.oauth = new OAuth_js_1.default(this);
        this.users = new Users_js_1.default(this);
        this.webhooks = new Webhooks_js_1.default(this);
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
exports.default = RESTManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkVTVE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9SRVNUTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsb0ZBQWlEO0FBRWpELGdGQUE2QztBQUM3Qyw0RUFBeUM7QUFDekMsMEVBQXVDO0FBQ3ZDLDBFQUF1QztBQUN2QyxnRkFBNkM7QUFHN0Msc0dBQW1FO0FBQ25FLHdGQUFxRDtBQUNyRCxrRUFBNEM7QUFFNUMsMEZBQXVEO0FBRXZELHNDQUFzQztBQUN0QyxNQUFxQixXQUFXO0lBQzVCLG1CQUFtQixDQUFzQjtJQUN6QyxRQUFRLENBQVc7SUFDbkIsT0FBTyxDQUFTO0lBQ2hCLE1BQU0sQ0FBUztJQUNmLE9BQU8sQ0FBaUI7SUFDeEIsWUFBWSxDQUFlO0lBQzNCLElBQUksQ0FBZ0I7SUFDcEIsS0FBSyxDQUFRO0lBQ2IsS0FBSyxDQUFRO0lBQ2IsUUFBUSxDQUFXO0lBQ25CLFlBQVksTUFBYyxFQUFFLE9BQXFCO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGdDQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxtQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSwyQkFBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUkseUJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksMEJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksa0JBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksa0JBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFRCwrRkFBK0Y7SUFDL0YsS0FBSyxDQUFDLFdBQVcsQ0FBYyxPQUFxQztRQUNoRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUEyQjtZQUM5QyxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLEdBQUcsRUFBZ0IsSUFBSSxDQUFDLEdBQUc7WUFDM0IsTUFBTSxFQUFhLElBQUksQ0FBQyxNQUFNO1lBQzlCLGlCQUFpQixFQUFFO2dCQUNmLEtBQUssRUFBVyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztnQkFDOUMsU0FBUyxFQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTO2dCQUNsRCxVQUFVLEVBQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVc7Z0JBQ3BELGNBQWMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZTthQUMzRDtTQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQXFCO1lBQ3BDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxPQUFPO1NBQ3pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1RkFBdUY7SUFDdkYsS0FBSyxDQUFDLE9BQU8sQ0FBYyxPQUF1QjtRQUM5QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDSjtBQXJFRCw4QkFxRUMifQ==