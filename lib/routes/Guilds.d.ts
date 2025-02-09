/** @module Routes/Guilds */
import type { AddMemberOptions, CreateBanOptions, GetVanityURLResponse } from "../types/guilds.js";
import type RESTManager from "../rest/RESTManager.js";
/** Various methods for interacting with guilds. */
export default class Guilds {
    #private;
    constructor(manager: RESTManager);
    /**
     * Add a member to a guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     */
    addMember(guildID: string, userID: string, options: AddMemberOptions): Promise<object>;
    /**
     * Add a role to a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     */
    addMemberRole(guildID: string, memberID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * Create a bon for a user.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to ban.
     * @param options The options for creating the bon.
     */
    createBan(guildID: string, userID: string, options?: CreateBanOptions): Promise<void>;
    /**
     * Get a guild.
     *
     * Note: If the guild is not already in the client's cache, this will not add it.
     * @param guildID The ID of the guild.
     * @param withCounts If the approximate number of members and online members should be included.
     */
    get(guildID: string, withCounts?: boolean): Promise<object>;
    /**
     * Get the active threads in a guild.
     * @param guildID The ID of the guild.
     */
    getActiveThreads(guildID: string): Promise<object>;
    /**
     * Get the channels in a guild. Does not include threads.
     * @param guildID The ID of the guild.
     */
    getChannels(guildID: string): Promise<Array<object>>;
    /**
     * Get a guild member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     */
    getMember(guildID: string, memberID: string): Promise<object>;
    /**
     * Get the vanity url of a guild.
     * @param guildID The ID of the guild.
     */
    getVanityURL(guildID: string): Promise<GetVanityURLResponse>;
    /**
     * Remove a member from a guild.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     */
    removeMember(guildID: string, memberID: string, reason?: string): Promise<void>;
    /**
     * remove a role from a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    removeMemberRole(guildID: string, memberID: string, roleID: string, reason?: string): Promise<void>;
}
