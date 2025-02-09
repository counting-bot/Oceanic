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
import type { GetBotGatewayResponse, GetGatewayResponse } from "../types/gateway.js";
/** A manager for all rest actions. */
export default class RESTManager {
    #private;
    applicationCommands: ApplicationCommands;
    channels: Channels;
    guilds: Guilds;
    handler: RequestHandler;
    interactions: Interactions;
    oauth: OAuth;
    users: Users;
    webhooks: Webhooks;
    constructor(client: Client, options?: RESTOptions);
    get client(): Client;
    get options(): RESTOptions;
    /** Alias for {@link RequestHandler~RequestHandler#authRequest | RequestHandler#authRequest} */
    authRequest<T = unknown>(options: Omit<RequestOptions, "auth">): Promise<T>;
    /**
     * Get the gateway information related to your bot client.
     */
    getBotGateway(): Promise<GetBotGatewayResponse>;
    /**
     * Get the gateway information.
     */
    getGateway(): Promise<GetGatewayResponse>;
    /** Alias for {@link RequestHandler~RequestHandler#request | RequestHandler#request} */
    request<T = unknown>(options: RequestOptions): Promise<T>;
}
