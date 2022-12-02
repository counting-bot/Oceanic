/// <reference types="node" />
/** @module Guild */
import Role from "./Role.js";
import Base from "./Base.js";
import Member from "./Member.js";
import type User from "./User.js";
import type ClientApplication from "./ClientApplication.js";
import type TextChannel from "./TextChannel.js";
import type CategoryChannel from "./CategoryChannel.js";
import Integration from "./Integration.js";
import Permission from "./Permission.js";
import StageInstance from "./StageInstance.js";
import type Invite from "./Invite.js";
import type Webhook from "./Webhook.js";
import type { DefaultMessageNotificationLevels, ExplicitContentFilterLevels, GuildFeature, GuildNSFWLevels, ImageFormat, MFALevels, PremiumTiers, VerificationLevels, GuildChannelTypesWithoutThreads } from "../Constants.js";
import type Client from "../Client.js";
import TypedCollection from "../util/TypedCollection.js";
import type { AnyGuildChannel, AnyGuildChannelWithoutThreads, AnyGuildTextChannel, AnyThreadChannel, InviteChannel, RawGuildChannel, RawThreadChannel } from "../types/channels.js";
import type { AddMemberOptions, BeginPruneOptions, CreateBanOptions, CreateChannelOptions, CreateEmojiOptions, CreateRoleOptions, EditCurrentMemberOptions, EditEmojiOptions, EditGuildOptions, EditMemberOptions, EditRoleOptions, EditRolePositionsEntry, EditWelcomeScreenOptions, GetBansOptions, GetMembersOptions, GetPruneCountOptions, GuildEmoji, ModifyChannelPositionsEntry, RawGuild, RawMember, RawRole, SearchMembersOptions, WelcomeScreen, WidgetImageStyle, WidgetSettings, RawIntegration, CreateChannelReturn, Widget, GetActiveThreadsResponse, Ban, GetVanityURLResponse, RawWidget, RawStageInstance, EditMFALevelOptions, RESTMember, CreateStickerOptions, Sticker, EditStickerOptions } from "../types/guilds.js";
import type { JSONGuild } from "../types/json.js";
import type { RequestGuildMembersOptions } from "../types/gateway.js";
import type Shard from "../gateway/Shard.js";
import Collection from "../util/Collection.js";
/** Represents a Discord server. */
export default class Guild extends Base {
    private _clientMember?;
    private _shard?;
    /** The application that created this guild, if applicable. */
    application?: ClientApplication | null;
    /** The ID of the application that created this guild, if applicable. */
    applicationID: string | null;
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount?: number;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount?: number;
    /** The hash of this guild's banner. */
    banner: string | null;
    /** The channels in this guild. */
    channels: TypedCollection<string, RawGuildChannel, AnyGuildChannelWithoutThreads>;
    /** The default [message notifications level](https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level) of this guild. */
    defaultMessageNotifications: DefaultMessageNotificationLevels;
    /** The description of this guild. */
    description: string | null;
    /** The discovery splash of this guild. Only present if the guild has the `DISCOVERABLE` feature. */
    discoverySplash: string | null;
    /** The custom emojis of this guild. */
    emojis: Array<GuildEmoji>;
    /** The [explicit content filter](https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level) of this guild. */
    explicitContentFilter: ExplicitContentFilterLevels;
    /** The [features](https://discord.com/developers/docs/resources/guild#guild-object-guild-features) this guild has. */
    features: Array<GuildFeature>;
    /** The icon hash of this guild. */
    icon: string | null;
    /** The integrations in this guild. */
    integrations: TypedCollection<string, RawIntegration, Integration, [guildID?: string]>;
    /** The cached invites in this guild. This will only be populated by invites created while the client is active. */
    invites: Collection<string, Invite>;
    /** The date at which this guild was joined. */
    joinedAt: Date | null;
    /** If this guild is considered large. */
    large: boolean;
    /** The maximum amount of members this guild can have. */
    maxMembers?: number;
    /** The maximum amount of people that can be present at a time in this guild. Only present for very large guilds. */
    maxPresences?: number;
    /** The maximum amount of users that can be present in a stage video channel. */
    maxStageVideoChannelUsers?: number;
    /** The maximum amount of users that can be present in a video channel. */
    maxVideoChannelUsers?: number;
    /** The number of members in this guild. */
    memberCount: number;
    /** The cached members in this guild. */
    members: TypedCollection<string, RawMember | RESTMember, Member, [guildID: string]>;
    /** The required [mfa level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level) for moderators of this guild. */
    mfaLevel: MFALevels;
    /** The name of this guild. */
    name: string;
    /** The [nsfw level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level) of this guild. */
    nsfwLevel: GuildNSFWLevels;
    /** The owner of this guild. */
    owner?: User;
    /** The ID of the owner of this guild. */
    ownerID: string;
    /** The [preferred locale](https://discord.com/developers/docs/reference#locales) of this guild. */
    preferredLocale: string;
    /** If this guild has the boost progress bar enabled. */
    premiumProgressBarEnabled: boolean;
    /** The number of nitro boosts this guild has. */
    premiumSubscriptionCount?: number;
    /** The [boost level](https://discord.com/developers/docs/resources/guild#guild-object-premium-tier) of this guild. */
    premiumTier: PremiumTiers;
    /** The channel where notices from Discord are received. Only present in guilds with the `COMMUNITY` feature. */
    publicUpdatesChannel?: AnyGuildTextChannel | null;
    /** The id of the channel where notices from Discord are received. Only present in guilds with the `COMMUNITY` feature. */
    publicUpdatesChannelID: string | null;
    /** @deprecated The region of this guild.*/
    region?: string | null;
    /** The roles in this guild. */
    roles: TypedCollection<string, RawRole, Role, [guildID: string]>;
    /** The channel where rules/guidelines are displayed. Only present in guilds with the `COMMUNITY` feature. */
    rulesChannel?: TextChannel | null;
    /** The id of the channel where rules/guidelines are displayed. Only present in guilds with the `COMMUNITY` feature. */
    rulesChannelID: string | null;
    /** The invite splash hash of this guild. */
    splash: string | null;
    /** The stage instances in this guild. */
    stageInstances: TypedCollection<string, RawStageInstance, StageInstance>;
    /** The custom stickers of this guild. */
    stickers: Array<Sticker>;
    /** The channel where welcome messages and boosts notices are posted. */
    systemChannel?: TextChannel | null;
    /** The [flags](https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags) for the system channel. */
    systemChannelFlags: number;
    /** The id of the channel where welcome messages and boosts notices are posted. */
    systemChannelID: string | null;
    /** The threads in this guild. */
    threads: TypedCollection<string, RawThreadChannel, AnyThreadChannel>;
    /** If this guild is unavailable. */
    unavailable: boolean;
    /** The vanity url of this guild. Only present in guilds with the `VANITY_URL` feature. */
    vanityURLCode: string | null;
    /** The [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level) of this guild. */
    verificationLevel: VerificationLevels;
    /** The welcome screen configuration. Only present in guilds with the `WELCOME_SCREEN_ENABLED` feature. */
    welcomeScreen?: WelcomeScreen;
    /** The channel the widget will generate an invite to, or `null` if set to no invite. */
    widgetChannel?: Exclude<AnyGuildChannel, CategoryChannel> | null;
    /** The id of the channel the widget will generate an invite to, or `null` if set to no invite. */
    widgetChannelID: string | null;
    /** If the widget is enabled. */
    widgetEnabled?: boolean;
    constructor(data: RawGuild, client: Client);
    private toggleFeature;
    private updateMemberLimit;
    protected update(data: Partial<RawGuild>): void;
    /** The client's member for this guild. This will throw an error if the guild was obtained via rest and the member is not cached.*/
    get clientMember(): Member;
    /** The shard this guild is on. Gateway only. */
    get shard(): Shard;
    /**
     * Add a member to this guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     */
    addMember(userID: string, options: AddMemberOptions): Promise<void | Member>;
    /**
     * Add a role to a member.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     */
    addMemberRole(memberID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * The url of this guild's banner.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    bannerURL(format?: ImageFormat, size?: number): string | null;
    /**
     * Begin a prune.
     * @param options The options for the prune.
     */
    beginPrune(options?: BeginPruneOptions): Promise<number | null>;
    /**
     * Create a bon for a user.
     * @param userID The ID of the user.
     * @param options The options for creating the bon.
     */
    createBan(userID: string, options?: CreateBanOptions): Promise<void>;
    /**
     * Create a channel in this guild.
     * @param options The options for creating the channel.
     */
    createChannel<T extends GuildChannelTypesWithoutThreads>(type: T, options: Omit<CreateChannelOptions, "type">): Promise<CreateChannelReturn<T>>;
    /**
     * Create an emoji in this guild.
     * @param options The options for creating the emoji.
     */
    createEmoji(options: CreateEmojiOptions): Promise<GuildEmoji>;
    /**
     * Create a role.
     * @param options The options for creating the role.
     */
    createRole(options?: CreateRoleOptions): Promise<Role>;
    /**
     * Create a sticker.
     * @param options The options for creating the sticker.
     */
    createSticker(options: CreateStickerOptions): Promise<Sticker>;
    /**
     * Delete this guild.
     */
    delete(): Promise<void>;
    /**
     * Delete an emoji in this guild.
     * @param emojiID The ID of the emoji.
     * @param reason The reason for deleting the emoji.
     */
    deleteEmoji(emojiID: string, reason?: string): Promise<void>;
    /**
     * Delete an integration.
     * @param integrationID The ID of the integration.
     * @param reason The reason for deleting the integration.
     */
    deleteIntegration(integrationID: string, reason?: string): Promise<void>;
    /**
     * Delete a role.
     * @param roleID The ID of the role to delete.
     * @param reason The reason for deleting the role.
     */
    deleteRole(roleID: string, reason?: string): Promise<void>;
    /**
     * Delete a sticker.
     * @param stickerID The ID of the sticker to delete.
     * @param reason The reason for deleting the sticker.
     */
    deleteSticker(stickerID: string, reason?: string): Promise<void>;
    /**
     * Disable the `COMMUNITY` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for disable the feature.
     */
    disableCommunity(reason?: string): Promise<Guild>;
    /**
     * Disable the `DISCOVERABLE` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for disabling the feature.
     */
    disableDiscovery(reason?: string): Promise<Guild>;
    /**
     * Disable the `INVITES_DISABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for disabling the feature.
     */
    disableInvites(reason?: string): Promise<Guild>;
    /**
     * The url of this guild's discovery splash.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    discoverySplashURL(format?: ImageFormat, size?: number): string | null;
    /**
     * Edit this guild.
     * @param options The options for editing the guild.
     */
    edit(options: EditGuildOptions): Promise<Guild>;
    /**
     * Edit the positions of channels in this guild.
     * @param options The channels to move. Unedited channels do not need to be specified.
     */
    editChannelPositions(options: Array<ModifyChannelPositionsEntry>): Promise<void>;
    /**
     * Modify the current member in this guild.
     * @param options The options for editing the member.
     */
    editCurrentMember(options: EditCurrentMemberOptions): Promise<Member>;
    /**
     * Edit an existing emoji in this guild.
     * @param options The options for editing the emoji.
     */
    editEmoji(emojiID: string, options: EditEmojiOptions): Promise<GuildEmoji>;
    /**
     * Edit the [mfa level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level) of this guild. This can only be used by the guild owner.
     * @param options The options for editing the MFA level.
     */
    editMFALevel(options: EditMFALevelOptions): Promise<MFALevels>;
    /**
     * Edit a member of this guild. Use \<Guild\>.editCurrentMember if you wish to update the nick of this client using the CHANGE_NICKNAME permission.
     * @param memberID The ID of the member.
     * @param options The options for editing the member.
     */
    editMember(memberID: string, options: EditMemberOptions): Promise<Member>;
    /**
     * Edit an existing role.
     * @param options The options for editing the role.
     */
    editRole(roleID: string, options: EditRoleOptions): Promise<Role>;
    /**
     * Edit the position of roles in this guild.
     * @param options The roles to move.
     */
    editRolePositions(options: Array<EditRolePositionsEntry>, reason?: string): Promise<Array<Role>>;
    /**
     * Edit a sticker.
     * @param options The options for editing the sticker.
     */
    editSticker(stickerID: string, options: EditStickerOptions): Promise<Sticker>;
    /**
     * Edit the welcome screen in this guild.
     * @param options The options for editing the welcome screen.
     */
    editWelcomeScreen(options: EditWelcomeScreenOptions): Promise<WelcomeScreen>;
    /**
     * Edit the widget of this guild.
     * @param options The options for editing the widget.
     */
    editWidget(options: WidgetSettings): Promise<Widget>;
    /**
     * Enable the `COMMUNITY` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for enabling the feature.
     */
    enableCommunity(reason?: string): Promise<Guild>;
    /**
     * Enable the `DISCOVERABLE` feature for this guild. Requires the **Administrator** permission. The server must also be passing all discovery requirements.
     * @param reason The reason for enabling the feature.
     */
    enableDiscovery(reason?: string): Promise<Guild>;
    /**
     * Enable the `INVITES_DISABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for enabling the feature.
     */
    enableInvites(reason?: string): Promise<Guild>;
    /**
     * Request members from this guild.
     * @param options The options for fetching the members.
     */
    fetchMembers(options?: RequestGuildMembersOptions): Promise<Array<Member>>;
    /**
     * Get the active threads in this guild.
     */
    getActiveThreads(): Promise<GetActiveThreadsResponse>;
    /**
     * Get a ban in this guild.
     * @param userID The ID of the user to get the ban of.
     */
    getBan(userID: string): Promise<Ban>;
    /**
     * Get the bans in this guild.
     * @param options The options for getting the bans.
     */
    getBans(options?: GetBansOptions): Promise<Array<Ban>>;
    /**
     * Get the channels in a guild. Does not include threads. Only use this if you need to. See the `channels` collection.
     */
    getChannels(): Promise<Array<AnyGuildChannelWithoutThreads>>;
    /**
     * Get an emoji in this guild.
     * @param emojiID The ID of the emoji to get.
     */
    getEmoji(emojiID: string): Promise<GuildEmoji>;
    /**
     * Get the emojis in this guild.
     */
    getEmojis(): Promise<Array<GuildEmoji>>;
    /**
     * Get the integrations in this guild.
     */
    getIntegrations(): Promise<Array<Integration>>;
    /**
     * Get the invites of this guild.
     */
    getInvites(): Promise<Array<Invite<"withMetadata", InviteChannel>>>;
    /**
     * Get a member of this guild.
     * @param memberID The ID of the member.
     */
    getMember(memberID: string): Promise<Member>;
    /**
     * Get this guild's members. This requires the `GUILD_MEMBERS` intent.
     * @param options The options for getting the members.
     */
    getMembers(options?: GetMembersOptions): Promise<Array<Member>>;
    /**
     * Get the prune count of this guild.
     * @param options The options for getting the prune count.
     */
    getPruneCount(options?: GetPruneCountOptions): Promise<number>;
    /**
     * Get the roles in this guild. Only use this if you need to. See the `roles` collection.
     */
    getRoles(): Promise<Array<Role>>;
    /**
     * Get a sticker. Response will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     * @param stickerID The ID of the sticker to get.
     */
    getSticker(stickerID: string): Promise<Sticker>;
    /**
     * Get this guild's stickers. Stickers will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     */
    getStickers(): Promise<Array<Sticker>>;
    /**
     * Get the vanity url of this guild.
     */
    getVanityURL(): Promise<GetVanityURLResponse>;
    /**
     * Get the webhooks in this guild.
     */
    getWebhooks(): Promise<Array<Webhook>>;
    /**
     * Get the welcome screen for this guild.
     */
    getWelcomeScreen(): Promise<WelcomeScreen>;
    /**
     * Get the widget of this guild.
     */
    getWidget(): Promise<Widget>;
    /**
     * Get the widget image of this guild.
     * @param style The style of the image.
     */
    getWidgetImage(style?: WidgetImageStyle): Promise<Buffer>;
    /**
     * Get the raw JSON widget of this guild.
     */
    getWidgetJSON(): Promise<RawWidget>;
    /**
     * Get this guild's widget settings.
     */
    getWidgetSettings(): Promise<WidgetSettings>;
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format?: ImageFormat, size?: number): string | null;
    /**
     * Leave this guild.
     */
    leave(): Promise<void>;
    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission;
    /**
     * Remove a ban.
     * @param userID The ID of the user to remove the ban from.
     * @param reason The reason for removing the ban.
     */
    removeBan(userID: string, reason?: string): Promise<void>;
    /**
     * Remove a member from this guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     */
    removeMember(memberID: string, reason?: string): Promise<void>;
    /**
     * remove a role from a member.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    removeMemberRole(memberID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * Search the username & nicknames of members in this guild.
     * @param options The options for the search.
     */
    searchMembers(options: SearchMembersOptions): Promise<Array<Member>>;
    /**
     * The url of this guild's invite splash.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    splashURL(format?: ImageFormat, size?: number): string | null;
    toJSON(): JSONGuild;
}
