/** @module OAuthHelper */
import type RESTManager from "./RESTManager.js";
import type { OAuthURLOptions, RevokeTokenOptions } from "../types/oauth.js";
import type { RawOAuthGuild, RESTMember } from "../types/guilds.js";
import * as Routes from "../util/Routes.js";
import type { RawOAuthUser } from "../types/users.js";
import { BASE_URL } from "../Constants.js";

/** A helper to make using authenticated oauth requests without needing a new client instance. */
export default class OAuthHelper {
    #manager: RESTManager;
    #token: string;
    constructor(manager: RESTManager, token: string) {
        this.#token = token;
        this.#manager = manager;
    }

    /**
     * Construct an oauth authorization url.
     * @param options The options to construct the url with.
     */
    static constructURL(options: OAuthURLOptions): string {
        const params: Array<string> = [
            `client_id=${options.clientID}`,
            `response_type=${options.responseType ?? "code"}`,
            `scope=${options.scopes.join("%20")}`
        ];
        if (options.redirectURI) {
            params.push(`redirect_uri=${options.redirectURI}`);
        }
        if (options.disableGuildSelect !== undefined) {
            params.push(`disable_guild_select=${String(options.disableGuildSelect)}`);
        }
        if (options.prompt) {
            params.push(`prompt=${options.prompt}`);
        }
        if (options.permissions) {
            params.push(`permissions=${options.permissions}`);
        }
        if (options.guildID) {
            params.push(`guild_id=${options.guildID}`);
        }
        if (options.state) {
            params.push(`state=${options.state}`);
        }
        return `${BASE_URL}${Routes.OAUTH_AUTHORIZE}?${params.join("&")}`;
    }

    /**
     * Get information about the current authorization.
     */
    async getCurrentAuthorizationInformation(): Promise<object> {
        return this.#manager.request<object>({
            method: "GET",
            path:   Routes.OAUTH_INFO,
            auth:   this.#token
        });
    }

    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: Requires the `guilds.members.read` scope.
     * @param guild the ID of the guild
     */
    async getCurrentGuildMember(guild: string): Promise<object> {
        return this.#manager.request<RESTMember>({
            method: "GET",
            path:   Routes.OAUTH_GUILD_MEMBER(guild),
            auth:   this.#token
        });
    }

    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     */
    async getCurrentGuilds(): Promise<Array<object>> {
        return this.#manager.request<Array<RawOAuthGuild>>({
            method: "GET",
            path:   Routes.OAUTH_GUILDS,
            auth:   this.#token
        });
    }

    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     */
    async getCurrentUser(): Promise<object> {
        return this.#manager.request<RawOAuthUser>({
            method: "GET",
            path:   Routes.OAUTH_CURRENT_USER,
            auth:   this.#token
        });
    }


    /**
     * Revoke the used access token.
     * @param options The options for revoking the token.
     */
    async revokeToken(options: Omit<RevokeTokenOptions, "token">): Promise<void> {
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("token", this.#token);
        await this.#manager.authRequest<null>({
            method: "POST",
            path:   Routes.OAUTH_TOKEN_REVOKE,
            form
        });
    }
}
