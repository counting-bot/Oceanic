/** @module Routes/Guilds */
import type { GetActiveThreadsResponse, GetMembersOptions, AddMemberOptions, CreateBanOptions, GetVanityURLResponse, CreateChannelReturn, CreateChannelOptions } from "../types/guilds.js";
import type { GuildChannelTypesWithoutThreads } from "../Constants.js";
import type { AnyGuildChannelWithoutThreads, InviteChannel, PartialInviteChannel } from "../types/channels.js";
import Role from "../structures/Role.js";
import Invite from "../structures/Invite.js";
import type RESTManager from "../rest/RESTManager.js";
import Guild from "../structures/Guild.js";
import type Member from "../structures/Member.js";
import type { Uncached } from "../types/shared.js";
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
    addMember(guildID: string, userID: string, options: AddMemberOptions): Promise<void | Member>;
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
     * Create a channel in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the channel.
     */
    createChannel<T extends GuildChannelTypesWithoutThreads>(guildID: string, type: T, options: Omit<CreateChannelOptions, "type">): Promise<CreateChannelReturn<T>>;
    /**
     * Get a guild.
     *
     * Note: If the guild is not already in the client's cache, this will not add it.
     * @param guildID The ID of the guild.
     * @param withCounts If the approximate number of members and online members should be included.
     */
    get(guildID: string, withCounts?: boolean): Promise<Guild>;
    /**
     * Get the active threads in a guild.
     * @param guildID The ID of the guild.
     */
    getActiveThreads(guildID: string): Promise<GetActiveThreadsResponse>;
    /**
     * Get the channels in a guild. Does not include threads.
     * @param guildID The ID of the guild.
     */
    getChannels(guildID: string): Promise<Array<AnyGuildChannelWithoutThreads>>;
    /**
     * Get the invites of a guild.
     * @param guildID The ID of the guild to get the invites of.
     */
    getInvites<CH extends InviteChannel | PartialInviteChannel | Uncached = InviteChannel | PartialInviteChannel | Uncached>(guildID: string): Promise<Array<Invite<"withMetadata", CH>>>;
    /**
     * Get a guild member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     */
    getMember(guildID: string, memberID: string): Promise<Member>;
    /**
     * Get a guild's members. This requires the `GUILD_MEMBERS` intent.
     * @param guildID The ID of the guild.
     * @param options The options for getting the members.
     */
    getMembers(guildID: string, options?: GetMembersOptions): Promise<Array<Member>>;
    /**
     * Get the roles in a guild.
     * @param guildID The ID of the guild.
     */
    getRoles(guildID: string): Promise<Array<Role>>;
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
