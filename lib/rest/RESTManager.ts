/** @module RESTManager */
import RequestHandler from "./RequestHandler.js";
import type Client from "../Client.js";
import Channels from "../routes/Channels.js";
import Guilds from "../routes/Guilds.js";
import Users from "../routes/Users.js";
import OAuth from "../routes/OAuth.js";
import Webhooks from "../routes/Webhooks.js";
import type { RESTOptions } from "../types/client.js";
import type { RequestOptions } from "../types/request-handler.js";
import ApplicationCommands from "../routes/ApplicationCommands.js";
import Interactions from "../routes/Interactions.js";
import * as Routes from "../util/Routes.js";
import type { GetBotGatewayResponse, GetGatewayResponse, RawGetBotGatewayResponse } from "../types/gateway.js";

/** A manager for all rest actions. */
export default class RESTManager {
    applicationCommands: ApplicationCommands;
    channels: Channels;
    #client: Client;
    guilds: Guilds;
    handler: RequestHandler;
    interactions: Interactions;
    oauth: OAuth;
    users: Users;
    webhooks: Webhooks;
    constructor(client: Client, options?: RESTOptions) {
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

    get client(): Client {
        return this.#client;
    }
    get options(): RESTOptions {
        return this.handler.options;
    }

    /** Alias for {@link RequestHandler~RequestHandler#authRequest | RequestHandler#authRequest} */
    async authRequest<T = unknown>(options: Omit<RequestOptions, "auth">): Promise<T> {
        return this.handler.authRequest<T>(options);
    }

    /**
     * Get the gateway information related to your bot client.
     */
    async getBotGateway(): Promise<GetBotGatewayResponse> {
        return this.authRequest<RawGetBotGatewayResponse>({
            method: "GET",
            path:   Routes.GATEWAY_BOT
        }).then(data => ({
            url:               data.url,
            shards:            data.shards,
            sessionStartLimit: {
                total:          data.session_start_limit.total,
                remaining:      data.session_start_limit.remaining,
                resetAfter:     data.session_start_limit.reset_after,
                maxConcurrency: data.session_start_limit.max_concurrency
            }
        }));
    }

    /**
     * Get the gateway information.
     */
    async getGateway(): Promise<GetGatewayResponse> {
        return this.request<GetGatewayResponse>({
            method: "GET",
            path:   Routes.GATEWAY
        });
    }

    /** Alias for {@link RequestHandler~RequestHandler#request | RequestHandler#request} */
    async request<T = unknown>(options: RequestOptions): Promise<T> {
        return this.handler.request<T>(options);
    }
}
