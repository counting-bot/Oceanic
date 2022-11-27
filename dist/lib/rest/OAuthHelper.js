"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Application_1 = tslib_1.__importDefault(require("../structures/Application"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
const PartialApplication_1 = tslib_1.__importDefault(require("../structures/PartialApplication"));
const Integration_1 = tslib_1.__importDefault(require("../structures/Integration"));
const Member_1 = tslib_1.__importDefault(require("../structures/Member"));
const OAuthGuild_1 = tslib_1.__importDefault(require("../structures/OAuthGuild"));
const ExtendedUser_1 = tslib_1.__importDefault(require("../structures/ExtendedUser"));
const Constants_1 = require("../Constants");
const undici_1 = require("undici");
/** A helper to make using authenticated oauth requests without needing a new client instance. */
class OAuthHelper {
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
        if (typeof options.disableGuildSelect !== "undefined") {
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
        return `${Constants_1.BASE_URL}${Routes.OAUTH_AUTHORIZE}?${params.join("&")}`;
    }
    /**
     * Get the current OAuth2 application's information.
     */
    async getApplication() {
        return this.#manager.request({
            method: "GET",
            path: Routes.OAUTH_APPLICATION,
            auth: this.#token
        }).then(data => new Application_1.default(data, this.#manager.client));
    }
    /**
     * Get information about the current authorization.
     */
    async getCurrentAuthorizationInformation() {
        return this.#manager.request({
            method: "GET",
            path: Routes.OAUTH_INFO,
            auth: this.#token
        }).then(data => ({
            application: new PartialApplication_1.default(data.application, this.#manager.client),
            expires: new Date(data.expires),
            scopes: data.scopes,
            user: this.#manager.client.users.update(data.user)
        }));
    }
    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope.
     */
    async getCurrentConnections() {
        return this.#manager.request({
            method: "GET",
            path: Routes.OAUTH_CONNECTIONS,
            auth: this.#token
        }).then(data => data.map(connection => ({
            friendSync: connection.friend_sync,
            id: connection.id,
            integrations: connection.integrations?.map(integration => new Integration_1.default(integration, this.#manager.client)),
            name: connection.name,
            revoked: connection.revoked,
            showActivity: connection.show_activity,
            twoWayLink: connection.two_way_link,
            type: connection.type,
            verified: connection.verified,
            visibility: connection.visibility
        })));
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
        }).then(data => new Member_1.default(data, this.#manager.client, guild));
    }
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     */
    async getCurrentGuilds() {
        return this.#manager.request({
            method: "GET",
            path: Routes.OAUTH_GUILDS,
            auth: this.#token
        }).then(data => data.map(d => new OAuthGuild_1.default(d, this.#manager.client)));
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
        }).then(data => new ExtendedUser_1.default(data, this.#manager.client));
    }
    /**
     * Revoke the used access token.
     * @param options The options for revoking the token.
     */
    async revokeToken(options) {
        const form = new undici_1.FormData();
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
exports.default = OAuthHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9PQXV0aEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxvRkFBb0Q7QUFXcEQsK0RBQXlDO0FBQ3pDLGtHQUFrRTtBQUNsRSxvRkFBb0Q7QUFDcEQsMEVBQTBDO0FBQzFDLGtGQUFrRDtBQUNsRCxzRkFBc0Q7QUFFdEQsNENBQXdDO0FBQ3hDLG1DQUFrQztBQUVsQyxpR0FBaUc7QUFDakcsTUFBcUIsV0FBVztJQUM1QixRQUFRLENBQWM7SUFDdEIsTUFBTSxDQUFTO0lBQ2YsWUFBWSxPQUFvQixFQUFFLEtBQWE7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBd0I7UUFDeEMsTUFBTSxNQUFNLEdBQWtCO1lBQzFCLGFBQWEsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUMvQixpQkFBaUIsT0FBTyxDQUFDLFlBQVksSUFBSSxNQUFNLEVBQUU7WUFDakQsU0FBUyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtTQUN4QyxDQUFDO1FBQ0YsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxPQUFPLE9BQU8sQ0FBQyxrQkFBa0IsS0FBSyxXQUFXLEVBQUU7WUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM3RTtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLENBQUMsSUFB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