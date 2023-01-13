/** @module Routes/OAuth */
import type {
    AuthorizationInformation,
    ClientCredentialsTokenOptions,
    ClientCredentialsTokenResponse,
    Connection,
    ExchangeCodeOptions,
    ExchangeCodeResponse,
    OAuthURLOptions,
    RawAuthorizationInformation,
    RawClientCredentialsTokenResponse,
    RawConnection,
    RawExchangeCodeResponse,
    RawRefreshTokenResponse,
    RefreshTokenOptions,
    RefreshTokenResponse,
    RevokeTokenOptions,
    GetCurrentGuildsOptions
} from "../types/oauth.js";
import type { RawOAuthGuild, RESTMember } from "../types/guilds.js";
import * as Routes from "../util/Routes.js";
import PartialApplication from "../structures/PartialApplication.js";
import Member from "../structures/Member.js";
import Webhook from "../structures/Webhook.js";
import type RESTManager from "../rest/RESTManager.js";
import OAuthHelper from "../rest/OAuthHelper.js";
import OAuthGuild from "../structures/OAuthGuild.js";
import ExtendedUser from "../structures/ExtendedUser.js";
import type { RawOAuthUser } from "../types/users.js";
import { FormData } from "undici";

/** Various methods for interacting with oauth. */
export default class OAuth {
    #manager: RESTManager;
    constructor(manager: RESTManager) {
        this.#manager = manager;
    }

    /**
     * Construct an oauth authorization url.
     * @param options The options to construct the url with.
     * @deprecated Moved to {@link OAuthHelper~OAuthHelper.constructURL | OAuthHelper#constructURL}. This will be removed in `1.5.0`.
     */
    static constructURL(options: OAuthURLOptions): string {
        return OAuthHelper.constructURL(options);
    }

    /**
     * Alias for {@link Routes/OAuth~OAuth.constructURL | OAuth#constructURL}.
     * @deprecated Moved to {@link OAuthHelper~OAuthHelper.constructURL | OAuthHelper#constructURL}. This will be removed in `1.5.0`.
     */
    get constructURL(): typeof OAuthHelper["constructURL"] {
        return OAuthHelper.constructURL.bind(OAuthHelper);
    }

    /**
     * Get an access token for the application owner. If the application is owned by a team, this is restricted to `identify` & `applications.commands.update`.
     * @param options The options to for the client credentials grant.
     */
    async clientCredentialsGrant(options: ClientCredentialsTokenOptions): Promise<ClientCredentialsTokenResponse> {
        const form = new FormData();
        form.append("grant_type", "client_credentials");
        form.append("scope", options.scopes.join(" "));
        return this.#manager.request<RawClientCredentialsTokenResponse>({
            method: "POST",
            path:   Routes.OAUTH_TOKEN,
            form,
            auth:   (options.clientID ?? this.#manager.client["_application"]) && options.clientSecret ? `Basic ${Buffer.from(`${options.clientID ?? this.#manager.client["_application"]!.id}:${options.clientSecret}`).toString("base64")}` : true
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn:   data.expires_in,
            scopes:      data.scope.split(" "),
            tokenType:   data.token_type,
            webhook:     data.webhook ? new Webhook(data.webhook, this.#manager.client) : null
        }));
    }

    /**
     * Exchange a code for an access token.
     * @param options The options for exchanging the code.
     */
    async exchangeCode(options: ExchangeCodeOptions): Promise<ExchangeCodeResponse> {
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("code", options.code);
        form.append("grant_type", "authorization_code");
        form.append("redirect_uri", options.redirectURI);
        return this.#manager.authRequest<RawExchangeCodeResponse>({
            method: "POST",
            path:   Routes.OAUTH_TOKEN,
            form
        }).then(data => ({
            accessToken:  data.access_token,
            expiresIn:    data.expires_in,
            refreshToken: data.refresh_token,
            scopes:       data.scope.split(" "),
            tokenType:    data.token_type,
            webhook:      data.webhook ? new Webhook(data.webhook, this.#manager.client) : null
        }));
    }

    /**
     * Get information about the current authorization.
     *
     * Note: OAuth only. Bots cannot use this.
     */
    async getCurrentAuthorizationInformation(): Promise<AuthorizationInformation> {
        return this.#manager.authRequest<RawAuthorizationInformation>({
            method: "GET",
            path:   Routes.OAUTH_INFO
        }).then(data => ({
            application: new PartialApplication(data.application, this.#manager.client),
            expires:     new Date(data.expires),
            scopes:      data.scopes,
            user:        this.#manager.client.users.update(data.user)
        }));
    }

    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope when using oauth.
     */
    async getCurrentConnections(): Promise<Array<Connection>> {
        return this.#manager.authRequest<Array<RawConnection>>({
            method: "GET",
            path:   Routes.OAUTH_CONNECTIONS
        }).then(data => data.map(connection => ({
            friendSync:   connection.friend_sync,
            id: 	         connection.id,
            name:         connection.name,
            revoked:      connection.revoked,
            showActivity: connection.show_activity,
            twoWayLink:   connection.two_way_link,
            type:         connection.type,
            verified:     connection.verified,
            visibility:   connection.visibility
        })));
    }

    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: OAuth only. Requires the `guilds.members.read` scope. Bots cannot use this.
     * @param guild the ID of the guild
     */
    async getCurrentGuildMember(guild: string): Promise<Member> {
        return this.#manager.authRequest<RESTMember>({
            method: "GET",
            path:   Routes.OAUTH_GUILD_MEMBER(guild)
        }).then(data => new Member(data, this.#manager.client, guild));
    }

    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     * @param options The options for getting the current user's guilds.
     */
    async getCurrentGuilds(options?: GetCurrentGuildsOptions): Promise<Array<OAuthGuild>> {
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
        return this.#manager.authRequest<Array<RawOAuthGuild>>({
            method: "GET",
            path:   Routes.OAUTH_GUILDS,
            query
        }).then(data => data.map(d => new OAuthGuild(d, this.#manager.client)));
    }

    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     */
    async getCurrentUser(): Promise<ExtendedUser> {
        return this.#manager.authRequest<RawOAuthUser>({
            method: "GET",
            path:   Routes.OAUTH_CURRENT_USER
        }).then(data => new ExtendedUser(data, this.#manager.client));
    }

    /** Get a helper instance that can be used with a specific bearer token. */
    getHelper(token: string): OAuthHelper {
        return new OAuthHelper(this.#manager, token);
    }

    /**
     * Refresh an existing access token.
     * @param options The options for refreshing the token.
     */
    async refreshToken(options: RefreshTokenOptions): Promise<RefreshTokenResponse> {
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("grant_type", "refresh_token");
        form.append("refresh_token", options.refreshToken);
        return this.#manager.authRequest<RawRefreshTokenResponse>({
            method: "POST",
            path:   Routes.OAUTH_TOKEN,
            form
        }).then(data => ({
            accessToken:  data.access_token,
            expiresIn:    data.expires_in,
            refreshToken: data.refresh_token,
            scopes:       data.scope.split(" "),
            tokenType:    data.token_type
        }));
    }


    /**
     * Revoke an access token.
     * @param options The options for revoking the token.
     */
    async revokeToken(options: RevokeTokenOptions): Promise<void> {
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("token", options.token);
        await this.#manager.authRequest<null>({
            method: "POST",
            path:   Routes.OAUTH_TOKEN_REVOKE,
            form
        });
    }
}
