/** @module Routes/OAuth */
import type { ClientCredentialsTokenOptions, ClientCredentialsTokenResponse, Connection, ExchangeCodeOptions, ExchangeCodeResponse, OAuthURLOptions, RefreshTokenOptions, RefreshTokenResponse, RevokeTokenOptions, GetCurrentGuildsOptions } from "../types/oauth.js";
import type RESTManager from "../rest/RESTManager.js";
import OAuthHelper from "../rest/OAuthHelper.js";
import OAuthGuild from "../structures/OAuthGuild.js";
/** Various methods for interacting with oauth. */
export default class OAuth {
    #private;
    constructor(manager: RESTManager);
    /**
     * Construct an oauth authorization url.
     * @param options The options to construct the url with.
     * @deprecated Moved to {@link OAuthHelper~OAuthHelper.constructURL | OAuthHelper#constructURL}. This will be removed in `1.5.0`.
     */
    static constructURL(options: OAuthURLOptions): string;
    /**
     * Alias for {@link Routes/OAuth~OAuth.constructURL | OAuth#constructURL}.
     * @deprecated Moved to {@link OAuthHelper~OAuthHelper.constructURL | OAuthHelper#constructURL}. This will be removed in `1.5.0`.
     */
    get constructURL(): typeof OAuthHelper["constructURL"];
    /**
     * Get an access token for the application owner. If the application is owned by a team, this is restricted to `identify` & `applications.commands.update`.
     * @param options The options to for the client credentials grant.
     */
    clientCredentialsGrant(options: ClientCredentialsTokenOptions): Promise<ClientCredentialsTokenResponse>;
    /**
     * Exchange a code for an access token.
     * @param options The options for exchanging the code.
     */
    exchangeCode(options: ExchangeCodeOptions): Promise<ExchangeCodeResponse>;
    /**
     * Get information about the current authorization.
     *
     * Note: OAuth only. Bots cannot use this.
     */
    getCurrentAuthorizationInformation(): Promise<object>;
    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope when using oauth.
     */
    getCurrentConnections(): Promise<Array<Connection>>;
    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: OAuth only. Requires the `guilds.members.read` scope. Bots cannot use this.
     * @param guild the ID of the guild
     */
    getCurrentGuildMember(guild: string): Promise<object>;
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     * @param options The options for getting the current user's guilds.
     */
    getCurrentGuilds(options?: GetCurrentGuildsOptions): Promise<Array<OAuthGuild>>;
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     */
    getCurrentUser(): Promise<object>;
    /** Get a helper instance that can be used with a specific bearer token. */
    getHelper(token: string): OAuthHelper;
    /**
     * Refresh an existing access token.
     * @param options The options for refreshing the token.
     */
    refreshToken(options: RefreshTokenOptions): Promise<RefreshTokenResponse>;
    /**
     * Revoke an access token.
     * @param options The options for revoking the token.
     */
    revokeToken(options: RevokeTokenOptions): Promise<void>;
}
