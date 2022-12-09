/** @module Routes/Guilds */
import type {
    RawGuild,
    GetActiveThreadsResponse,
    GetMembersOptions,
    SearchMembersOptions,
    AddMemberOptions,
    EditMemberOptions,
    EditCurrentMemberOptions,
    CreateBanOptions,
    RawRole,
    CreateRoleOptions,
    EditRoleOptions,
    RawIntegration,
    RawWelcomeScreen,
    WelcomeScreen,
    GetVanityURLResponse,
    CreateChannelReturn,
    CreateChannelOptions,
    RESTMember
} from "../types/guilds.js";
import * as Routes from "../util/Routes.js";
import type { GuildChannelTypesWithoutThreads } from "../Constants.js";
import type {
    AnyGuildChannelWithoutThreads,
    InviteChannel,
    PartialInviteChannel,
    RawGuildChannel,
    RawInvite,
    RawThreadChannel,
    RawThreadMember
} from "../types/channels.js";
import Role from "../structures/Role.js";
import Invite from "../structures/Invite.js";
import Integration from "../structures/Integration.js";
import type RESTManager from "../rest/RESTManager.js";
import Guild from "../structures/Guild.js";
import type Member from "../structures/Member.js";
import type { Uncached } from "../types/shared.js";

/** Various methods for interacting with guilds. */
export default class Guilds {
    #manager: RESTManager;
    constructor(manager: RESTManager) {
        this.#manager = manager;
    }

    /**
     * Add a member to a guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     */
    async addMember(guildID: string, userID: string, options: AddMemberOptions): Promise<void | Member> {
        const res = await this.#manager.authRequest<RESTMember | null>({
            method: "PUT",
            path:   Routes.GUILD_MEMBER(guildID, userID),
            json:   {
                access_token: options.accessToken,
                deaf:         options.deaf,
                mute:         options.mute,
                nick:         options.nick,
                roles:        options.roles
            }
        }).then(data => data === null ? undefined : this.#manager.client.util.updateMember(guildID, userID, data));
        if (res !== undefined) {
            return res;
        }
    }

    /**
     * Add a role to a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     */
    async addMemberRole(guildID: string, memberID: string, roleID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "PUT",
            path:   Routes.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
            reason
        });
    }

    /**
     * Create a bon for a user.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to ban.
     * @param options The options for creating the bon.
     */
    async createBan(guildID: string, userID: string, options?: CreateBanOptions): Promise<void> {
        const reason = options?.reason;
        if (options?.reason) {
            delete options.reason;
        }
        if (options?.deleteMessageDays !== undefined && !Object.hasOwn(options, "deleteMessageSeconds")) {
            options.deleteMessageSeconds = options.deleteMessageDays * 86400;
        }
        await this.#manager.authRequest<null>({
            method: "PUT",
            path:   Routes.GUILD_BAN(guildID, userID),
            json:   { delete_message_seconds: options?.deleteMessageSeconds },
            reason
        });
    }

    /**
     * Create a channel in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the channel.
     */
    async createChannel<T extends GuildChannelTypesWithoutThreads>(guildID: string, type: T, options: Omit<CreateChannelOptions, "type">): Promise<CreateChannelReturn<T>> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest<RawGuildChannel>({
            method: "POST",
            path:   Routes.GUILD_CHANNELS(guildID),
            json:   {
                available_tags: options.availableTags ? options.availableTags.map(tag => ({
                    emoji_id:   tag.emoji?.id,
                    emoji_name: tag.emoji?.name,
                    moderated:  tag.moderated,
                    name:       tag.name
                })) : options.availableTags,
                default_auto_archive_duration: options.defaultAutoArchiveDuration,
                default_forum_layout:          options.defaultForumLayout,
                default_reaction_emoji:        options.defaultReactionEmoji ? { emoji_id: options.defaultReactionEmoji.id, emoji_name: options.defaultReactionEmoji.name } : options.defaultReactionEmoji,
                default_sort_order:            options.defaultSortOrder,
                name:                          options.name,
                nsfw:                          options.nsfw,
                parent_id:                     options.parentID,
                permission_overwrites:         options.permissionOverwrites,
                position:                      options.position,
                rate_limit_per_user:           options.rateLimitPerUser,
                topic:                         options.topic,
                type,
                user_limit:                    options.userLimit,
                video_quality_mode:            options.videoQualityMode
            },
            reason
        }).then(data => this.#manager.client.util.updateChannel(data)) as never;
    }

    /**
     * Create a role.
     * @param guildID The ID of the guild.
     * @param options The options for creating the role.
     */
    async createRole(guildID: string, options?: CreateRoleOptions): Promise<Role> {
        const reason = options?.reason;
        if (options?.reason) {
            delete options.reason;
        }
        if (options?.icon) {
            options.icon = this.#manager.client.util._convertImage(options.icon, "icon");
        }
        return this.#manager.authRequest<RawRole>({
            method: "POST",
            path:   Routes.GUILD_ROLES(guildID),
            json:   {
                color:         options?.color,
                hoist:         options?.hoist,
                icon:          options?.icon,
                mentionable:   options?.mentionable,
                name:          options?.name,
                permissions:   options?.permissions,
                unicode_emoji: options?.unicodeEmoji
            },
            reason
        }).then(data => this.#manager.client.guilds.get(guildID)?.roles.update(data, guildID) ?? new Role(data, this.#manager.client, guildID));
    }

    /**
     * Modify the current member in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the member.
     */
    async editCurrentMember(guildID: string, options: EditCurrentMemberOptions): Promise<Member> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest<RESTMember>({
            method: "PATCH",
            path:   Routes.GUILD_MEMBER(guildID, "@me"),
            json:   { nick: options.nick },
            reason
        }).then(data => this.#manager.client.util.updateMember(guildID, data.user.id, data));
    }

    /**
     * Edit a guild member. Use editCurrentMember if you wish to update the nick of this client using the CHANGE_NICKNAME permission.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param options The options for editing the member.
     */
    async editMember(guildID: string, memberID: string, options: EditMemberOptions): Promise<Member> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest<RESTMember>({
            method: "PATCH",
            path:   Routes.GUILD_MEMBER(guildID, memberID),
            json:   {
                channel_id:                   options.channelID,
                communication_disabled_until: options.communicationDisabledUntil,
                deaf:                         options.deaf,
                mute:                         options.mute,
                nick:                         options.nick,
                roles:                        options.roles
            },
            reason
        }).then(data => this.#manager.client.util.updateMember(guildID, memberID, data));
    }

    /**
     * Edit an existing role.
     * @param guildID The ID of the guild.
     * @param options The options for editing the role.
     */
    async editRole(guildID: string, roleID: string, options: EditRoleOptions): Promise<Role> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        if (options.icon) {
            options.icon = this.#manager.client.util._convertImage(options.icon, "icon");
        }
        return this.#manager.authRequest<RawRole>({
            method: "PATCH",
            path:   Routes.GUILD_ROLE(guildID, roleID),
            json:   {
                color:         options.color,
                hoist:         options.hoist,
                icon:          options.icon,
                mentionable:   options.mentionable,
                name:          options.name,
                permissions:   options.permissions,
                unicode_emoji: options.unicodeEmoji
            },
            reason
        }).then(data => this.#manager.client.guilds.get(guildID)?.roles.update(data, guildID) ?? new Role(data, this.#manager.client, guildID));
    }

    /**
     * Get a guild.
     *
     * Note: If the guild is not already in the client's cache, this will not add it.
     * @param guildID The ID of the guild.
     * @param withCounts If the approximate number of members and online members should be included.
     */
    async get(guildID: string, withCounts?: boolean): Promise<Guild> {
        const query = new URLSearchParams();
        if (withCounts !== undefined) {
            query.set("with_counts", withCounts.toString());
        }
        return this.#manager.authRequest<RawGuild>({
            method: "GET",
            path:   Routes.GUILD(guildID),
            query
        }).then(data => this.#manager.client.guilds.has(guildID) ? this.#manager.client.guilds.update(data) : new Guild(data, this.#manager.client));
    }

    /**
     * Get the active threads in a guild.
     * @param guildID The ID of the guild.
     */
    async getActiveThreads(guildID: string): Promise<GetActiveThreadsResponse> {
        return this.#manager.authRequest<{ members: Array<RawThreadMember>; threads: Array<RawThreadChannel>; }>({
            method: "GET",
            path:   Routes.GUILD_ACTIVE_THREADS(guildID)
        }).then(data => ({
            members: data.members.map(member => ({
                flags:         member.flags,
                id:            member.id,
                joinTimestamp: new Date(member.join_timestamp),
                userID:        member.user_id
            })),
            threads: data.threads.map(rawThread => this.#manager.client.util.updateThread(rawThread))
        }));
    }

    /**
     * Get the channels in a guild. Does not include threads.
     * @param guildID The ID of the guild.
     */
    async getChannels(guildID: string): Promise<Array<AnyGuildChannelWithoutThreads>> {
        return this.#manager.authRequest<Array<RawGuildChannel>>({
            method: "GET",
            path:   Routes.GUILD_CHANNELS(guildID)
        }).then(data => data.map(d => this.#manager.client.util.updateChannel(d)));
    }

    /**
     * Get the integrations in a guild.
     * @param guildID The ID of the guild.
     */
    async getIntegrations(guildID: string): Promise<Array<Integration>> {
        return this.#manager.authRequest<Array<RawIntegration>>({
            method: "GET",
            path:   Routes.GUILD_INTEGRATIONS(guildID)
        }).then(data => data.map(integration => this.#manager.client.guilds.get(guildID)?.integrations.update(integration, guildID) ?? new Integration(integration, this.#manager.client, guildID)));
    }

    /**
     * Get the invites of a guild.
     * @param guildID The ID of the guild to get the invites of.
     */
    async getInvites<CH extends InviteChannel | PartialInviteChannel | Uncached = InviteChannel | PartialInviteChannel | Uncached>(guildID: string): Promise<Array<Invite<"withMetadata", CH>>> {
        return this.#manager.authRequest<Array<RawInvite>>({
            method: "GET",
            path:   Routes.GUILD_INVITES(guildID)
        }).then(data => data.map(invite => new Invite<"withMetadata", CH>(invite, this.#manager.client)));
    }

    /**
     * Get a guild member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     */
    async getMember(guildID: string, memberID: string): Promise<Member> {
        return this.#manager.authRequest<RESTMember>({
            method: "GET",
            path:   Routes.GUILD_MEMBER(guildID, memberID)
        }).then(data => this.#manager.client.util.updateMember(guildID, memberID, data));
    }

    /**
     * Get a guild's members. This requires the `GUILD_MEMBERS` intent.
     * @param guildID The ID of the guild.
     * @param options The options for getting the members.
     */
    async getMembers(guildID: string, options?: GetMembersOptions): Promise<Array<Member>> {
        const query = new URLSearchParams();
        if (options?.after !== undefined) {
            query.set("after", options.after);
        }
        if (options?.limit !== undefined) {
            query.set("limit", options.limit.toString());
        }
        return this.#manager.authRequest<Array<RESTMember>>({
            method: "GET",
            path:   Routes.GUILD_MEMBERS(guildID),
            query
        }).then(data => data.map(d => this.#manager.client.util.updateMember(guildID, d.user.id, d)));
    }

    /**
     * Get the roles in a guild.
     * @param guildID The ID of the guild.
     */
    async getRoles(guildID: string): Promise<Array<Role>> {
        const guild = this.#manager.client.guilds.get(guildID);
        return this.#manager.authRequest<Array<RawRole>>({
            method: "GET",
            path:   Routes.GUILD_ROLES(guildID)
        }).then(data => data.map(role => guild ? guild.roles.update(role, guildID) : new Role(role, this.#manager.client, guildID)));
    }

    /**
     * Get the vanity url of a guild.
     * @param guildID The ID of the guild.
     */
    async getVanityURL(guildID: string): Promise<GetVanityURLResponse> {
        return this.#manager.authRequest<GetVanityURLResponse>({
            method: "GET",
            path:   Routes.GUILD_VANITY_URL(guildID)
        });
    }

    /**
     * Get the welcome screen for a guild.
     * @param guildID The ID of the guild.
     */
    async getWelcomeScreen(guildID: string): Promise<WelcomeScreen> {
        return this.#manager.authRequest<RawWelcomeScreen>({
            method: "GET",
            path:   Routes.GUILD_WELCOME_SCREEN(guildID)
        }).then(data => ({
            description:     data.description,
            welcomeChannels: data.welcome_channels.map(channel => ({
                channelID:   channel.channel_id,
                description: channel.description,
                emojiID:     channel.emoji_id,
                emojiName:   channel.emoji_name
            }))
        }));
    }

    /**
     * Remove a member from a guild.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     */
    async removeMember(guildID: string, memberID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.GUILD_MEMBER(guildID, memberID),
            reason
        });
    }

    /**
     * remove a role from a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    async removeMemberRole(guildID: string, memberID: string, roleID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
            reason
        });
    }

    /**
     * Search the username & nicknames of members in a guild.
     * @param guildID The ID of the guild.
     * @param options The options to search with.
     */
    async searchMembers(guildID: string, options: SearchMembersOptions): Promise<Array<Member>> {
        const query = new URLSearchParams();
        query.set("query", options.query);
        if (options.limit !== undefined) {
            query.set("limit", options.limit.toString());
        }
        return this.#manager.authRequest<Array<RESTMember>>({
            method: "GET",
            path:   Routes.GUILD_SEARCH_MEMBERS(guildID),
            query
        }).then(data => data.map(d => this.#manager.client.util.updateMember(guildID, d.user.id, d)));
    }
}
