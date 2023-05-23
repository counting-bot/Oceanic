import * as Routes from "../util/Routes.js";
import Webhook from "../structures/Webhook.js";
import OAuthHelper from "../rest/OAuthHelper.js";
import OAuthGuild from "../structures/OAuthGuild.js";
import ExtendedUser from "../structures/ExtendedUser.js";
import { FormData } from "undici";
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
        const form = new FormData();
        form.append("grant_type", "client_credentials");
        form.append("scope", options.scopes.join(" "));
        return this.#manager.request({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form,
            auth: (options.clientID ?? this.#manager.client["_application"]) && options.clientSecret ? `Basic ${Buffer.from(`${options.clientID ?? this.#manager.client["_application"].id}:${options.clientSecret}`).toString("base64")}` : true
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
        const query = new URLSearchParams();
        if (options?.after !== undefined) {
            query.set("after", options.after);
        }
        if (options?.before !== undefined) {
            query.set("before", options.before);
        }
        if (options?.limit !== undefined) {
            query.set("limit", options.limit.toString());
        }
        if (options?.withCounts !== undefined) {
            query.set("with_counts", options?.withCounts.toString());
        }
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
        }).then(data => new ExtendedUser(data, this.#manager.client));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL09BdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQSxPQUFPLEtBQUssTUFBTSxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sT0FBTyxNQUFNLDBCQUEwQixDQUFDO0FBRS9DLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLDZCQUE2QixDQUFDO0FBQ3JELE9BQU8sWUFBWSxNQUFNLCtCQUErQixDQUFDO0FBRXpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFbEMsa0RBQWtEO0FBQ2xELE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBSztJQUN0QixRQUFRLENBQWM7SUFDdEIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBd0I7UUFDeEMsT0FBTyxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLFlBQVk7UUFDWixPQUFPLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsc0JBQXNCLENBQUMsT0FBc0M7UUFDL0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9B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