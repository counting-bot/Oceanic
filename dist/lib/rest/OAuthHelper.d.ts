/** @module OAuthHelper */
import type RESTManager from "./RESTManager.js";
import type { AuthorizationInformation, Connection, OAuthURLOptions, RevokeTokenOptions } from "../types/oauth.js";
import Member from "../structures/Member.js";
import OAuthGuild from "../structures/OAuthGuild.js";
import ExtendedUser from "../structures/ExtendedUser.js";
/** A helper to make using authenticated oauth requests without needing a new client instance. */
export default class OAuthHelper {
    #private;
    constructor(manager: RESTManager, token: string);
    /**
     * Construct an oauth authorization url.
     * @param options The options to construct the url with.
     */
    static constructURL(options: OAuthURLOptions): string;
    /**
     * Get information about the current authorization.
     */
    getCurrentAuthorizationInformation(): Promise<AuthorizationInformation>;
    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope.
     */
    getCurrentConnections(): Promise<Array<Connection>>;
    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: Requires the `guilds.members.read` scope.
     * @param guild the ID of the guild
     */
    getCurrentGuildMember(guild: string): Promise<Member>;
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     */
    getCurrentGuilds(): Promise<Array<OAuthGuild>>;
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     */
    getCurrentUser(): Promise<ExtendedUser>;
    /**
     * Revoke the used access token.
     * @param options The options for revoking the token.
     */
    revokeToken(options: Omit<RevokeTokenOptions, "token">): Promise<void>;
}
