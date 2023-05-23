import * as Routes from "../util/Routes.js";
import { BASE_URL } from "../Constants.js";
import { FormData } from "undici";
/** A helper to make using authenticated oauth requests without needing a new client instance. */
export default class OAuthHelper {
    #manager;
    #token;
    constructor(manager, token) {
        this.#token = token;
        this.#manager = manager;
    }
    /**
     * Construct an oauth authorization url.
     * @param options The options to construct the url with.
     */
    static constructURL(options) {
        const params = [
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
    async getCurrentAuthorizationInformation() {
        return this.#manager.request({
            method: "GET",
            path: Routes.OAUTH_INFO,
            auth: this.#token
        });
    }
    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: Requires the `guilds.members.read` scope.
     * @param guild the ID of the guild
     */
    async getCurrentGuildMember(guild) {
        return this.#manager.request({
            method: "GET",
            path: Routes.OAUTH_GUILD_MEMBER(guild),
            auth: this.#token
        });
    }
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     */
    async getCurrentGuilds() {
        return this.#manager.request({
            method: "GET",
            path: Routes.OAUTH_GUILDS,
            auth: this.#token
        });
    }
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     */
    async getCurrentUser() {
        return this.#manager.request({
            method: "GET",
            path: Routes.OAUTH_CURRENT_USER,
            auth: this.#token
        });
    }
    /**
     * Revoke the used access token.
     * @param options The options for revoking the token.
     */
    async revokeToken(options) {
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("token", this.#token);
        await this.#manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN_REVOKE,
            form
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9PQXV0aEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEtBQUssTUFBTSxNQUFNLG1CQUFtQixDQUFDO0FBRTVDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWxDLGlHQUFpRztBQUNqRyxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVc7SUFDNUIsUUFBUSxDQUFjO0lBQ3RCLE1BQU0sQ0FBUztJQUNmLFlBQVksT0FBb0IsRUFBRSxLQUFhO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQXdCO1FBQ3hDLE1BQU0sTUFBTSxHQUFrQjtZQUMxQixhQUFhLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDL0IsaUJBQWlCLE9BQU8sQ0FBQyxZQUFZLElBQUksTUFBTSxFQUFFO1lBQ2pELFNBQVMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7U0FDeEMsQ0FBQztRQUNGLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUN0RDtRQUNELElBQUksT0FBTyxDQUFDLGtCQUFrQixLQUFLLFNBQVMsRUFBRTtZQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdFO1FBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1B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