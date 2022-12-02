/// <reference types="node" />
/** @module Routes/Guilds */
import type { CreateEmojiOptions, CreateGuildOptions, EditEmojiOptions, EditGuildOptions, GuildEmoji, ModifyChannelPositionsEntry, GetActiveThreadsResponse, GetMembersOptions, SearchMembersOptions, AddMemberOptions, EditMemberOptions, EditCurrentMemberOptions, GetBansOptions, Ban, CreateBanOptions, CreateRoleOptions, EditRolePositionsEntry, EditRoleOptions, GetPruneCountOptions, BeginPruneOptions, WidgetSettings, RawWidget, Widget, WidgetImageStyle, WelcomeScreen, EditWelcomeScreenOptions, GetVanityURLResponse, CreateChannelReturn, CreateChannelOptions, EditMFALevelOptions, Sticker, CreateStickerOptions, EditStickerOptions } from "../types/guilds.js";
import type { GuildChannelTypesWithoutThreads, MFALevels } from "../Constants.js";
import type { AnyGuildChannelWithoutThreads, InviteChannel, PartialInviteChannel } from "../types/channels.js";
import Role from "../structures/Role.js";
import Invite from "../structures/Invite.js";
import Integration from "../structures/Integration.js";
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
     * @param id The ID of the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     */
    addMember(id: string, userID: string, options: AddMemberOptions): Promise<void | Member>;
    /**
     * Add a role to a member.
     * @param id The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     */
    addMemberRole(id: string, memberID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * Begin a prune.
     * @param id The ID of the guild.
     * @param options The options for the prune.
     */
    beginPrune(id: string, options?: BeginPruneOptions): Promise<number | null>;
    /**
     * Create a guild. This can only be used by bots in under 10 guilds.
     *
     * Note: This does NOT add the guild to the client's cache.
     * @param options The options for creating the guild.
     */
    create(options: CreateGuildOptions): Promise<Guild>;
    /**
     * Create a bon for a user.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to ban.
     * @param options The options for creating the bon.
     */
    createBan(guildID: string, userID: string, options?: CreateBanOptions): Promise<void>;
    /**
     * Create a channel in a guild.
     * @param id The ID of the guild.
     * @param options The options for creating the channel.
     */
    createChannel<T extends GuildChannelTypesWithoutThreads>(id: string, type: T, options: Omit<CreateChannelOptions, "type">): Promise<CreateChannelReturn<T>>;
    /**
     * Create an emoji in a guild.
     * @param id The ID of the guild.
     * @param options The options for creating the emoji.
     */
    createEmoji(id: string, options: CreateEmojiOptions): Promise<GuildEmoji>;
    /**
     * Create a role.
     * @param id The ID of the guild.
     * @param options The options for creating the role.
     */
    createRole(id: string, options?: CreateRoleOptions): Promise<Role>;
    /**
     * Create a sticker.
     * @param id The ID of the guild.
     * @param options The options for creating the sticker.
     */
    createSticker(id: string, options: CreateStickerOptions): Promise<Sticker>;
    /**
     * Delete a guild.
     * @param id The ID of the guild.
     */
    delete(id: string): Promise<void>;
    /**
     * Delete an emoji.
     * @param id The ID of the guild.
     * @param emojiID The ID of the emoji.
     * @param reason The reason for deleting the emoji.
     */
    deleteEmoji(id: string, emojiID: string, reason?: string): Promise<void>;
    /**
     * Delete an integration.
     * @param id The ID of the guild.
     * @param integrationID The ID of the integration.
     * @param reason The reason for deleting the integration.
     */
    deleteIntegration(id: string, integrationID: string, reason?: string): Promise<void>;
    /**
     * Delete a role.
     * @param id The ID of the guild.
     * @param roleID The ID of the role to delete.
     * @param reason The reason for deleting the role.
     */
    deleteRole(id: string, roleID: string, reason?: string): Promise<void>;
    /**
     * Delete a sticker.
     * @param id The ID of the guild.
     * @param stickerID The ID of the sticker to delete.
     * @param reason The reason for deleting the sticker.
     */
    deleteSticker(id: string, stickerID: string, reason?: string): Promise<void>;
    /**
     * Edit a guild.
     *
     * Note: If the client's cache does not already contain the guild, it will not be added.
     * @param id The ID of the guild.
     * @param options The options for editing the guild.
     */
    edit(id: string, options: EditGuildOptions): Promise<Guild>;
    /**
     * Edit the positions of channels in a guild.
     * @param id The ID of the guild.
     * @param options The channels to move. Unedited channels do not need to be specified.
     */
    editChannelPositions(id: string, options: Array<ModifyChannelPositionsEntry>): Promise<void>;
    /**
     * Modify the current member in a guild.
     * @param id The ID of the guild.
     * @param options The options for editing the member.
     */
    editCurrentMember(id: string, options: EditCurrentMemberOptions): Promise<Member>;
    /**
     * Edit an existing emoji.
     * @param id The ID of the guild the emoji is in.
     * @param options The options for editing the emoji.
     */
    editEmoji(id: string, emojiID: string, options: EditEmojiOptions): Promise<GuildEmoji>;
    /**
     * Edit the [mfa level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level) of a guild. This can only be used by the guild owner.
     * @param id The ID of the guild.
     * @param options The options for editing the MFA level.
     */
    editMFALevel(id: string, options: EditMFALevelOptions): Promise<MFALevels>;
    /**
     * Edit a guild member. Use editCurrentMember if you wish to update the nick of this client using the CHANGE_NICKNAME permission.
     * @param id The ID of the guild.
     * @param memberID The ID of the member.
     * @param options The options for editing the member.
     */
    editMember(id: string, memberID: string, options: EditMemberOptions): Promise<Member>;
    /**
     * Edit an existing role.
     * @param id The ID of the guild.
     * @param options The options for editing the role.
     */
    editRole(id: string, roleID: string, options: EditRoleOptions): Promise<Role>;
    /**
     * Edit the position of roles in a guild.
     * @param id The ID of the guild.
     * @param options The roles to move.
     */
    editRolePositions(id: string, options: Array<EditRolePositionsEntry>, reason?: string): Promise<Array<Role>>;
    /**
     * Edit a sticker.
     * @param id The ID of the guild.
     * @param options The options for editing the sticker.
     */
    editSticker(id: string, stickerID: string, options: EditStickerOptions): Promise<Sticker>;
    /**
     * Edit the welcome screen in a guild.
     * @param id The ID of the guild.
     * @param options The options for editing the welcome screen.
     */
    editWelcomeScreen(id: string, options: EditWelcomeScreenOptions): Promise<WelcomeScreen>;
    /**
     * Edit the widget of a guild.
     * @param id The ID of the guild.
     * @param options The options for editing the widget.
     */
    editWidget(id: string, options: WidgetSettings): Promise<Widget>;
    /**
     * Get a guild.
     *
     * Note: If the guild is not already in the client's cache, this will not add it.
     * @param id The ID of the guild.
     * @param withCounts If the approximate number of members and online members should be included.
     */
    get(id: string, withCounts?: boolean): Promise<Guild>;
    /**
     * Get the active threads in a guild.
     * @param id The ID of the guild.
     */
    getActiveThreads(id: string): Promise<GetActiveThreadsResponse>;
    /**
     * Get a ban.
     * @param id The ID of the guild.
     * @param userID The ID of the user to get the ban of.
     */
    getBan(id: string, userID: string): Promise<Ban>;
    /**
     * Get the bans in a guild.
     * @param id The ID of the guild.
     * @param options The options for getting the bans.
     */
    getBans(id: string, options?: GetBansOptions): Promise<Array<Ban>>;
    /**
     * Get the channels in a guild. Does not include threads.
     * @param id The ID of the guild.
     */
    getChannels(id: string): Promise<Array<AnyGuildChannelWithoutThreads>>;
    /**
     * Get an emoji in a guild.
     * @param id The ID of the guild.
     * @param emojiID The ID of the emoji to get.
     */
    getEmoji(id: string, emojiID: string): Promise<GuildEmoji>;
    /**
     * Get the emojis in a guild.
     * @param id The ID of the guild.
     */
    getEmojis(id: string): Promise<Array<GuildEmoji>>;
    /**
     * Get the integrations in a guild.
     * @param id The ID of the guild.
     */
    getIntegrations(id: string): Promise<Array<Integration>>;
    /**
     * Get the invites of a guild.
     * @param id The ID of the guild to get the invites of.
     */
    getInvites<CH extends InviteChannel | PartialInviteChannel | Uncached = InviteChannel | PartialInviteChannel | Uncached>(id: string): Promise<Array<Invite<"withMetadata", CH>>>;
    /**
     * Get a guild member.
     * @param id The ID of the guild.
     * @param memberID The ID of the member.
     */
    getMember(id: string, memberID: string): Promise<Member>;
    /**
     * Get a guild's members. This requires the `GUILD_MEMBERS` intent.
     * @param id The ID of the guild.
     * @param options The options for getting the members.
     */
    getMembers(id: string, options?: GetMembersOptions): Promise<Array<Member>>;
    /**
     * Get the prune count of a guild.
     * @param id The ID of the guild.
     * @param options The options for getting the prune count.
     */
    getPruneCount(id: string, options?: GetPruneCountOptions): Promise<number>;
    /**
     * Get the roles in a guild.
     * @param id The ID of the guild.
     */
    getRoles(id: string): Promise<Array<Role>>;
    /**
     * Get a sticker. Response will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     * @param id The ID of the guild.
     * @param stickerID The ID of the sticker to get.
     */
    getSticker(id: string, stickerID: string): Promise<Sticker>;
    /**
     * Get a guild's stickers. Stickers will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     * @param id The ID of the guild.
     */
    getStickers(id: string): Promise<Array<Sticker>>;
    /**
     * Get the vanity url of a guild.
     * @param id The ID of the guild.
     */
    getVanityURL(id: string): Promise<GetVanityURLResponse>;
    /**
     * Get the welcome screen for a guild.
     * @param id The ID of the guild.
     */
    getWelcomeScreen(id: string): Promise<WelcomeScreen>;
    /**
     * Get the widget of a guild.
     * @param id The ID of the guild.
     */
    getWidget(id: string): Promise<Widget>;
    /**
     * Get the widget image of a guild.
     * @param id The ID of the guild.
     * @param style The style of the image.
     */
    getWidgetImage(id: string, style?: WidgetImageStyle): Promise<Buffer>;
    /**
     * Get the raw JSON widget of a guild.
     * @param id The ID of the guild.
     */
    getWidgetJSON(id: string): Promise<RawWidget>;
    /**
     * Get a guild's widget settings.
     * @param id The ID of the guild.
     */
    getWidgetSettings(id: string): Promise<WidgetSettings>;
    /**
     * Remove a ban.
     * @param id The ID of the guild.
     * @param userID The ID of the user to remove the ban from.
     * @param reason The reason for removing the ban.
     */
    removeBan(id: string, userID: string, reason?: string): Promise<void>;
    /**
     * Remove a member from a guild.
     * @param id The ID of the guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     */
    removeMember(id: string, memberID: string, reason?: string): Promise<void>;
    /**
     * remove a role from a member.
     * @param id The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    removeMemberRole(id: string, memberID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * Search the username & nicknames of members in a guild.
     * @param id The ID of the guild.
     * @param options The options to search with.
     */
    searchMembers(id: string, options: SearchMembersOptions): Promise<Array<Member>>;
}
