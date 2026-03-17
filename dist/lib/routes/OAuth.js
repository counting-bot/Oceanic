import * as Routes from "../util/Routes.js";
import Webhook from "../structures/Webhook.js";
import OAuthHelper from "../rest/OAuthHelper.js";
import OAuthGuild from "../structures/OAuthGuild.js";
import QueryBuilder from "../util/QueryBuilder.js";
/** Various methods for interacting with oauth. */
export default class OAuth {
    #manager;
    constructor(manager) {
        this.#manager = manager;
    }
    /**
     * Construct an oauth authorization url.
     * @param options The options to construct the url with.
     * @deprecated Moved to {@link OAuthHelper~OAuthHelper.constructURL | OAuthHelper#constructURL}. This will be removed in `1.5.0`.
     */
    static constructURL(options) {
        return OAuthHelper.constructURL(options);
    }
    /**
     * Alias for {@link Routes/OAuth~OAuth.constructURL | OAuth#constructURL}.
     * @deprecated Moved to {@link OAuthHelper~OAuthHelper.constructURL | OAuthHelper#constructURL}. This will be removed in `1.5.0`.
     */
    get constructURL() {
        return OAuthHelper.constructURL.bind(OAuthHelper);
    }
    /**
     * Get an access token for the application owner. If the application is owned by a team, this is restricted to `identify` & `applications.commands.update`.
     * @param options The options to for the client credentials grant.
     */
    async clientCredentialsGrant(options) {
        options = this.#manager.client.util._freeze(options);
        const form = new FormData();
        form.append("grant_type", "client_credentials");
        form.append("scope", options.scopes.join(" "));
        return this.#manager.request({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form,
            auth: options.clientID && options.clientSecret ? `Basic ${Buffer.from(`${options.clientID}:${options.clientSecret}`).toString("base64")}` : true
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            scopes: data.scope.split(" "),
            tokenType: data.token_type,
            webhook: data.webhook ? new Webhook(data.webhook, this.#manager.client) : null
        }));
    }
    /**
     * Exchange a code for an access token.
     * @param options The options for exchanging the code.
     */
    async exchangeCode(options) {
        options = this.#manager.client.util._freeze(options);
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("code", options.code);
        form.append("grant_type", "authorization_code");
        form.append("redirect_uri", options.redirectURI);
        return this.#manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            scopes: data.scope.split(" "),
            tokenType: data.token_type,
            webhook: data.webhook ? new Webhook(data.webhook, this.#manager.client) : null
        }));
    }
    /**
     * Get information about the current authorization.
     *
     * Note: OAuth only. Bots cannot use this.
     */
    async getCurrentAuthorizationInformation() {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_INFO
        });
    }
    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope when using oauth.
     */
    async getCurrentConnections() {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_CONNECTIONS
        }).then(data => data.map(connection => ({
            friendSync: connection.friend_sync,
            id: connection.id,
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
     * Note: OAuth only. Requires the `guilds.members.read` scope. Bots cannot use this.
     * @param guild the ID of the guild
     */
    async getCurrentGuildMember(guild) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_GUILD_MEMBER(guild)
        });
        // .then(data => new Member(data, this.#manager.client, guild));
    }
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     * @param options The options for getting the current user's guilds.
     */
    async getCurrentGuilds(options) {
        const query = new QueryBuilder();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("with_counts", options?.withCounts);
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_GUILDS,
            query
        }).then(data => data.map(d => new OAuthGuild(d, this.#manager.client)));
    }
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     */
    async getCurrentUser() {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_CURRENT_USER
        });
    }
    /** Get a helper instance that can be used with a specific bearer token. */
    getHelper(token) {
        return new OAuthHelper(this.#manager, token);
    }
    /**
     * Refresh an existing access token.
     * @param options The options for refreshing the token.
     */
    async refreshToken(options) {
        options = this.#manager.client.util._freeze(options);
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("grant_type", "refresh_token");
        form.append("refresh_token", options.refreshToken);
        return this.#manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            scopes: data.scope.split(" "),
            tokenType: data.token_type
        }));
    }
    /**
     * Revoke an access token.
     * @param options The options for revoking the token.
     */
    async revokeToken(options) {
        options = this.#manager.client.util._freeze(options);
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("token", options.token);
        await this.#manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN_REVOKE,
            form
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL09BdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQSxPQUFPLEtBQUssTUFBTSxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sT0FBTyxNQUFNLDBCQUEwQixDQUFDO0FBRS9DLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLDZCQUE2QixDQUFDO0FBRXJELE9BQU8sWUFBWSxNQUFNLHNCQUFzQixDQUFDO0FBRWhELGtEQUFrRDtBQUNsRCxNQUFNLENBQUMsT0FBTyxPQUFPLEtBQUs7SUFDdEIsUUFBUSxDQUFjO0lBQ3RCLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQXdCO1FBQ3hDLE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxZQUFZO1FBQ1osT0FBTyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQXNDO1FBQy9ELE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FB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