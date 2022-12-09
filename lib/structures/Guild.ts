/** @module Guild */
import Role from "./Role.js";
import Base from "./Base.js";
import GuildChannel from "./GuildChannel.js";
import Member from "./Member.js";
import ThreadChannel from "./ThreadChannel.js";
import type User from "./User.js";
import type ClientApplication from "./ClientApplication.js";
import type TextChannel from "./TextChannel.js";
import type CategoryChannel from "./CategoryChannel.js";
import Integration from "./Integration.js";
import Permission from "./Permission.js";
import Channel from "./Channel.js";
import type Invite from "./Invite.js";
import type Webhook from "./Webhook.js";
import type {
    DefaultMessageNotificationLevels,
    ExplicitContentFilterLevels,
    GuildFeature,
    GuildNSFWLevels,
    ImageFormat,
    MFALevels,
    PremiumTiers,
    VerificationLevels,
    GuildChannelTypesWithoutThreads
} from "../Constants.js";
import { AllPermissions, Permissions } from "../Constants.js";
import * as Routes from "../util/Routes.js";
import type Client from "../Client.js";
import TypedCollection from "../util/TypedCollection.js";
import type {
    AnyGuildChannel,
    AnyGuildChannelWithoutThreads,
    AnyGuildTextChannel,
    AnyThreadChannel,
    InviteChannel,
    RawGuildChannel,
    RawThreadChannel
} from "../types/channels.js";
import type {
    AddMemberOptions,
    CreateBanOptions,
    CreateChannelOptions,
    EditCurrentMemberOptions,
    EditEmojiOptions,
    EditGuildOptions,
    EditMemberOptions,
    EditRoleOptions,
    GetBansOptions,
    GetMembersOptions,
    GuildEmoji,
    RawGuild,
    RawMember,
    RawRole,
    SearchMembersOptions,
    WelcomeScreen,
    RawIntegration,
    CreateChannelReturn,
    GetActiveThreadsResponse,
    Ban,
    RESTMember,
    Sticker,
} from "../types/guilds.js";
import type { JSONGuild } from "../types/json.js";
import type { PresenceUpdate, RequestGuildMembersOptions } from "../types/gateway.js";
import type Shard from "../gateway/Shard.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-line
import Collection from "../util/Collection.js";

/** Represents a Discord server. */
export default class Guild extends Base {
    private _clientMember?: Member;
    private _shard?: Shard;
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
    constructor(data: RawGuild, client: Client) {
        super(data.id, client);
        this._shard = this.client.guildShardMap[this.id] !== undefined ? this.client.shards.get(this.client.guildShardMap[this.id]) : undefined;
        this.applicationID = data.application_id;
        this.banner = null;
        this.channels = new TypedCollection(GuildChannel, client) as TypedCollection<string, RawGuildChannel, AnyGuildChannelWithoutThreads>;
        this.defaultMessageNotifications = data.default_message_notifications;
        this.description = null;
        this.discoverySplash = null;
        this.emojis = [];
        this.explicitContentFilter = data.explicit_content_filter;
        this.features = [];
        this.icon = null;
        this.integrations = new TypedCollection(Integration, client);
        this.invites = new Collection();
        this.joinedAt = null;
        this.large = (data.member_count ?? data.approximate_member_count ?? 0) >= client.shards.options.largeThreshold;
        this.memberCount = data.member_count ?? data.approximate_member_count ?? 0;
        this.members = new TypedCollection(Member, client, typeof client.options.collectionLimits.members === "number" ? client.options.collectionLimits.members : client.options.collectionLimits.members[data.id] ?? client.options.collectionLimits.members.unknown ?? Infinity);
        this.mfaLevel = data.mfa_level;
        this.name = data.name;
        this.nsfwLevel = data.nsfw_level;
        this.owner = client.users.get(data.owner_id)!;
        this.ownerID = data.owner_id;
        this.preferredLocale = data.preferred_locale;
        this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
        this.premiumTier = data.premium_tier;
        this.publicUpdatesChannelID = null;
        this.roles = new TypedCollection(Role, client);
        this.rulesChannelID = null;
        this.splash = null;
        this.stickers = [];
        this.systemChannelID = null;
        this.systemChannelFlags = data.system_channel_flags;
        this.threads = new TypedCollection(ThreadChannel, client) as TypedCollection<string, RawThreadChannel, AnyThreadChannel>;
        this.unavailable = !!data.unavailable;
        this.vanityURLCode = data.vanity_url_code;
        this.verificationLevel = data.verification_level;
        this.widgetChannelID = data.widget_channel_id === null ? null : data.widget_channel_id!;
        for (const role of data.roles) {
            this.roles.update(role, data.id);
        }
        this.update(data);

        if (data.channels) {
            for (const channelData of data.channels) {
                channelData.guild_id = this.id;
                client.channelGuildMap[channelData.id] = this.id;
                this.channels.add(Channel.from<AnyGuildChannelWithoutThreads>(channelData, client));
            }
        }


        if (data.threads) {
            for (const threadData of data.threads) {
                threadData.guild_id = this.id;
                client.threadGuildMap[threadData.id] = this.id;
                const thread = Channel.from<AnyThreadChannel>(threadData, client);
                this.threads.add(thread);
                const channel = this.channels.get(thread.parentID);
                if (channel && "threads" in channel) {
                    channel.threads.update(thread as never);
                }
            }
        }


        if (data.members) {
            for (const rawMember of data.members) {
                const member = this.members.update({ ...rawMember, id: rawMember.user?.id }, this.id);
                if (this.client["_user"] && member.id === this.client.user.id) {
                    this._clientMember = member;
                }
            }
        }

        if (data.presences) {
            for (const presence of data.presences) {
                const member = this.members.get(presence.user.id);
                if (member) {
                    delete (presence as { user?: PresenceUpdate["user"]; }).user;
                    member.presence = {
                        clientStatus: presence.client_status,
                        guildID:      presence.guild_id,
                        status:       presence.status,
                        activities:   presence.activities?.map(activity => ({
                            createdAt:     activity.created_at,
                            name:          activity.name,
                            type:          activity.type,
                            applicationID: activity.application_id,
                            assets:        activity.assets ? {
                                largeImage: activity.assets.large_image,
                                largeText:  activity.assets.large_text,
                                smallImage: activity.assets.small_image,
                                smallText:  activity.assets.small_text
                            } : undefined,
                            buttons:    activity.buttons,
                            details:    activity.details,
                            emoji:      activity.emoji,
                            flags:      activity.flags,
                            instance:   activity.instance,
                            party:      activity.party,
                            secrets:    activity.secrets,
                            state:      activity.state,
                            timestamps: activity.timestamps,
                            url:        activity.url
                        }))
                    };
                } else {
                    client.emit("debug", `Rogue presence (user: ${presence.user.id}, guild: ${this.id})`);
                }

            }
        }
    }

    // true = `memberCount`
    private updateMemberLimit(toAdd: true | number): void {
        if (this.members.limit === Infinity || this.client.options.disableMemberLimitScaling) {
            return;
        }
        const original = this.members.limit;
        const num = toAdd === true ? this.memberCount : this.members.limit + toAdd;
        const round = 10 ** (Math.floor(Math.log10(num)) - 1);
        if (toAdd === true) {
            const limit = Math.round(num / round) * round + round;
            if (this.members.limit >= limit) {
                return;
            }
            this.members.limit = limit;
        } else {
            const limit = Math.round((this.members.size + toAdd) / round) * round + round;
            if (this.members.limit >= limit) {
                return;
            }
            this.members.limit = limit;
        }
        this.client.emit("debug", `The limit of the members collection of guild ${this.id} has been updated from ${original} to ${this.members.limit} to accommodate at least ${toAdd === true ? this.memberCount : this.members.size + toAdd} members.`);
    }

    protected override update(data: Partial<RawGuild>): void {
        if (data.application_id !== undefined) {
            this.application = this.client["_application"] && data.application_id === null ? null : (this.client.application.id === data.application_id ? this.client.application : undefined);
            this.applicationID = data.application_id;
        }
        if (data.approximate_member_count !== undefined) {
            this.approximateMemberCount = data.approximate_member_count;
        }
        if (data.approximate_presence_count !== undefined) {
            this.approximatePresenceCount = data.approximate_presence_count;
        }
        if (data.emojis !== undefined) {
            this.emojis = data.emojis.map(emoji => ({
                animated:      emoji.animated,
                available:     emoji.available,
                id:            emoji.id,
                managed:       emoji.managed,
                name:          emoji.name,
                requireColons: emoji.require_colons,
                roles:         emoji.roles,
                user:          emoji.user === undefined ? undefined : this.client.users.update(emoji.user)
            }));
        }
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.joined_at !== undefined) {
            this.joinedAt = new Date(data.joined_at);
        }
        if (data.max_members !== undefined) {
            this.maxMembers = data.max_members;
        }
        if (data.max_presences !== undefined) {
            this.maxPresences = data.max_presences;
        }
        if (data.max_video_channel_users !== undefined) {
            this.maxVideoChannelUsers = data.max_video_channel_users;
        }
        if (data.member_count !== undefined) {
            this.memberCount = data.member_count;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.owner_id !== undefined) {
            this.ownerID = data.owner_id;
            this.owner = this.client.users.get(data.owner_id)!;
        }
        if (data.preferred_locale !== undefined) {
            this.preferredLocale = data.preferred_locale;
        }
    }

    /** The client's member for this guild. This will throw an error if the guild was obtained via rest and the member is not cached.*/
    get clientMember(): Member {
        if (!this._clientMember) {
            throw new Error(`${this.constructor.name}#clientMember is not present if the guild was obtained via rest and the member is not cached.`);
        }

        return this._clientMember;
    }

    /** The shard this guild is on. Gateway only. */
    get shard(): Shard {
        if (!this._shard) {
            throw new Error(`${this.constructor.name}#shard is not present if the guild was received via REST, or you do not have the GUILDS intent.`);
        }
        return this._shard;
    }

    /**
     * Add a member to this guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     */
    async addMember(userID: string, options: AddMemberOptions):  Promise<void | Member> {
        return this.client.rest.guilds.addMember(this.id, userID, options);
    }

    /**
     * Add a role to a member.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     */
    async addMemberRole(memberID: string, roleID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.addMemberRole(this.id, memberID, roleID, reason);
    }

    /**
     * Create a bon for a user.
     * @param userID The ID of the user.
     * @param options The options for creating the bon.
     */
    async createBan(userID: string, options?: CreateBanOptions): Promise<void> {
        return this.client.rest.guilds.createBan(this.id, userID, options);
    }

    /**
     * Create a channel in this guild.
     * @param options The options for creating the channel.
     */
    async createChannel<T extends GuildChannelTypesWithoutThreads>(type: T, options: Omit<CreateChannelOptions, "type">): Promise<CreateChannelReturn<T>> {
        return this.client.rest.guilds.createChannel(this.id, type, options);
    }

    /**
     * Edit this guild.
     * @param options The options for editing the guild.
     */
    async edit(options: EditGuildOptions): Promise<Guild> {
        return this.client.rest.guilds.edit(this.id, options);
    }

    /**
     * Modify the current member in this guild.
     * @param options The options for editing the member.
     */
    async editCurrentMember(options: EditCurrentMemberOptions): Promise<Member> {
        return this.client.rest.guilds.editCurrentMember(this.id, options);
    }

    /**
     * Edit an existing emoji in this guild.
     * @param options The options for editing the emoji.
     */
    async editEmoji(emojiID: string, options: EditEmojiOptions): Promise<GuildEmoji> {
        return this.client.rest.guilds.editEmoji(this.id, emojiID, options);
    }

    /**
     * Edit a member of this guild. Use \<Guild\>.editCurrentMember if you wish to update the nick of this client using the CHANGE_NICKNAME permission.
     * @param memberID The ID of the member.
     * @param options The options for editing the member.
     */
    async editMember(memberID: string, options: EditMemberOptions): Promise<Member> {
        return this.client.rest.guilds.editMember(this.id, memberID, options);
    }

    /**
     * Edit an existing role.
     * @param options The options for editing the role.
     */
    async editRole(roleID: string, options: EditRoleOptions): Promise<Role> {
        return this.client.rest.guilds.editRole(this.id, roleID, options);
    }

    /**
     * Request members from this guild.
     * @param options The options for fetching the members.
     */
    async fetchMembers(options?: RequestGuildMembersOptions): Promise<Array<Member>> {
        return this.shard.requestGuildMembers(this.id, options);
    }

    /**
     * Get the active threads in this guild.
     */
    async getActiveThreads(): Promise<GetActiveThreadsResponse> {
        return this.client.rest.guilds.getActiveThreads(this.id);
    }

    /**
     * Get a ban in this guild.
     * @param userID The ID of the user to get the ban of.
     */
    async getBan(userID: string): Promise<Ban> {
        return this.client.rest.guilds.getBan(this.id, userID);
    }

    /**
     * Get the bans in this guild.
     * @param options The options for getting the bans.
     */
    async getBans(options?: GetBansOptions): Promise<Array<Ban>> {
        return this.client.rest.guilds.getBans(this.id, options);
    }

    /**
     * Get the channels in a guild. Does not include threads. Only use this if you need to. See the `channels` collection.
     */
    async getChannels(): Promise<Array<AnyGuildChannelWithoutThreads>> {
        return this.client.rest.guilds.getChannels(this.id);
    }

    /**
     * Get an emoji in this guild.
     * @param emojiID The ID of the emoji to get.
     */
    async getEmoji(emojiID: string): Promise<GuildEmoji> {
        return this.client.rest.guilds.getEmoji(this.id, emojiID);
    }

    /**
     * Get the emojis in this guild.
     */
    async getEmojis(): Promise<Array<GuildEmoji>> {
        return this.client.rest.guilds.getEmojis(this.id);
    }

    /**
     * Get the integrations in this guild.
     */
    async getIntegrations(): Promise<Array<Integration>> {
        return this.client.rest.guilds.getIntegrations(this.id);
    }

    /**
     * Get the invites of this guild.
     */
    async getInvites(): Promise<Array<Invite<"withMetadata", InviteChannel>>> {
        return this.client.rest.guilds.getInvites(this.id);
    }

    /**
     * Get a member of this guild.
     * @param memberID The ID of the member.
     */
    async getMember(memberID: string): Promise<Member> {
        return this.client.rest.guilds.getMember(this.id, memberID);
    }

    /**
     * Get this guild's members. This requires the `GUILD_MEMBERS` intent.
     * @param options The options for getting the members.
     */
    async getMembers(options?: GetMembersOptions): Promise<Array<Member>> {
        return this.client.rest.guilds.getMembers(this.id, options);
    }

    /**
     * Get the roles in this guild. Only use this if you need to. See the `roles` collection.
     */
    async getRoles(): Promise<Array<Role>> {
        return this.client.rest.guilds.getRoles(this.id);
    }

    /**
     * Get the webhooks in this guild.
     */
    async getWebhooks(): Promise<Array<Webhook>> {
        return this.client.rest.webhooks.getForGuild(this.id);
    }

    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format?: ImageFormat, size?: number): string | null {
        return this.icon === null ? null : this.client.util.formatImage(Routes.GUILD_ICON(this.id, this.icon), format, size);
    }

    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission {
        if (typeof member === "string") {
            member = this.members.get(member)!;
        }
        if (!member) {
            throw new Error("Member not found");
        }
        if (member.id === this.ownerID) {
            return new Permission(AllPermissions);
        } else {
            let permissions = this.roles.get(this.id)!.permissions.allow;
            if (permissions & Permissions.ADMINISTRATOR) {
                return new Permission(AllPermissions);
            }
            for (const id of member.roles) {
                const role = this.roles.get(id);
                if (!role) {
                    continue;
                }
                if (role.permissions.allow & Permissions.ADMINISTRATOR) {
                    permissions = AllPermissions;
                    break;
                } else {
                    permissions |= role.permissions.allow;
                }
            }
            return new Permission(permissions);
        }
    }

    /**
     * Remove a ban.
     * @param userID The ID of the user to remove the ban from.
     * @param reason The reason for removing the ban.
     */
    async removeBan(userID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.removeBan(this.id, userID, reason);
    }

    /**
     * Remove a member from this guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     */
    async removeMember(memberID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.removeMember(this.id, memberID, reason);
    }

    /**
     * remove a role from a member.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    async removeMemberRole(memberID: string, roleID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.removeMemberRole(this.id, memberID, roleID, reason);
    }

    /**
     * Search the username & nicknames of members in this guild.
     * @param options The options for the search.
     */
    async searchMembers(options: SearchMembersOptions): Promise<Array<Member>> {
        return this.client.rest.guilds.searchMembers(this.id, options);
    }

    override toJSON(): JSONGuild {
        return {
            ...super.toJSON(),
            application:                 this.applicationID ?? undefined,
            approximateMemberCount:      this.approximateMemberCount,
            approximatePresenceCount:    this.approximatePresenceCount,
            banner:                      this.banner,
            channels:                    this.channels.map(channel => channel.id),
            defaultMessageNotifications: this.defaultMessageNotifications,
            description:                 this.description,
            discoverySplash:             this.discoverySplash,
            emojis:                      this.emojis,
            explicitContentFilter:       this.explicitContentFilter,
            features:                    this.features,
            icon:                        this.icon,
            joinedAt:                    this.joinedAt?.getTime() ?? null,
            large:                       this.large,
            maxMembers:                  this.maxMembers,
            maxPresences:                this.maxPresences,
            maxVideoChannelUsers:        this.maxVideoChannelUsers,
            memberCount:                 this.memberCount,
            members:                     this.members.map(member => member.id),
            mfaLevel:                    this.mfaLevel,
            name:                        this.name,
            nsfwLevel:                   this.nsfwLevel,
            ownerID:                     this.ownerID,
            preferredLocale:             this.preferredLocale,
            premiumProgressBarEnabled:   this.premiumProgressBarEnabled,
            premiumSubscriptionCount:    this.premiumSubscriptionCount,
            premiumTier:                 this.premiumTier,
            publicUpdatesChannelID:      this.publicUpdatesChannelID,
            region:                      this.region,
            roles:                       this.roles.map(role => role.toJSON()),
            rulesChannelID:              this.rulesChannelID,
            splash:                      this.splash,
            stickers:                    this.stickers,
            systemChannelID:             this.systemChannelID,
            systemChannelFlags:          this.systemChannelFlags,
            threads:                     this.threads.map(thread => thread.id),
            unavailable:                 this.unavailable,
            vanityURLCode:               this.vanityURLCode,
            verificationLevel:           this.verificationLevel,
            welcomeScreen:               this.welcomeScreen,
            widgetChannelID:             this.widgetChannelID,
            widgetEnabled:               this.widgetEnabled
        };
    }
}
