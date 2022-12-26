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
import Permission from "./Permission.js";
import Channel from "./Channel.js";
import type Webhook from "./Webhook.js";
import type { ImageFormat, GuildChannelTypesWithoutThreads } from "../Constants.js";
import { AllPermissions, Permissions } from "../Constants.js";
import * as Routes from "../util/Routes.js";
import type Client from "../Client.js";
import TypedCollection from "../util/TypedCollection.js";
import type {
    DefaultMessageNotificationLevels,
    ExplicitContentFilterLevels,
    GuildFeature,
    GuildNSFWLevels,
    ImageFormat,
    MFALevels,
    PremiumTiers,
    VerificationLevels,
    GuildChannelTypesWithoutThreads,
    GatewayOPCodes
} from "../Constants";
import { AllPermissions, Permissions } from "../Constants";
import * as Routes from "../util/Routes";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type {
    AnyGuildChannel,
    AnyGuildChannelWithoutThreads,
    AnyThreadChannel,
    RawGuildChannel,
    RawThreadChannel
} from "../types/channels.js";
import type {
    CreateBanOptions,
    CreateChannelOptions,
    EditMemberOptions,
    GetMembersOptions,
    RawGuild,
    RawMember,
    RawRole,
    CreateChannelReturn,
    RESTMember
} from "../types/guilds.js";
import type { JSONGuild } from "../types/json.js";
import type Shard from "../gateway/Shard.js";

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
    /** The channels in this guild. */
    channels: TypedCollection<string, RawGuildChannel, AnyGuildChannelWithoutThreads>;
    /** The icon hash of this guild. */
    icon: string | null;
    /** If this guild is considered large. */
    large: boolean;
    /** The maximum amount of members this guild can have. */
    maxMembers?: number;
    /** The maximum amount of people that can be present at a time in this guild. Only present for very large guilds. */
    maxPresences?: number;
    /** The number of members in this guild. */
    memberCount: number;
    /** The cached members in this guild. */
    members: TypedCollection<string, RawMember | RESTMember, Member, [guildID: string]>;
    /** The name of this guild. */
    name: string;
    /** The owner of this guild. */
    owner?: User;
    /** The ID of the owner of this guild. */
    ownerID: string;
    /** The [preferred locale](https://discord.com/developers/docs/reference#locales) of this guild. */
    preferredLocale: string;
    /** @deprecated The region of this guild.*/
    region?: string | null;
    /** The roles in this guild. */
    roles: TypedCollection<string, RawRole, Role, [guildID: string]>;
    /** The channel where rules/guidelines are displayed. Only present in guilds with the `COMMUNITY` feature. */
    rulesChannel?: TextChannel | null;
    /** The channel where welcome messages and boosts notices are posted. */
    systemChannel?: TextChannel | null;
    /** The threads in this guild. */
    threads: TypedCollection<string, RawThreadChannel, AnyThreadChannel>;
    /** If this guild is unavailable. */
    unavailable: boolean;
    /** The vanity url of this guild. Only present in guilds with the `VANITY_URL` feature. */
    vanityURLCode: string | null;
    /** The channel the widget will generate an invite to, or `null` if set to no invite. */
    widgetChannel?: Exclude<AnyGuildChannel, CategoryChannel> | null;
    /** If the widget is enabled. */
    widgetEnabled?: boolean;
    constructor(data: RawGuild, client: Client) {
        super(data.id, client);
        this._shard = this.client.guildShardMap[this.id] !== undefined ? this.client.shards.get(this.client.guildShardMap[this.id]) : undefined;
        this.applicationID = data.application_id;
        this.channels = new TypedCollection(GuildChannel, client) as TypedCollection<string, RawGuildChannel, AnyGuildChannelWithoutThreads>;
        this.icon = null;
        this.large = (data.member_count ?? data.approximate_member_count ?? 0) >= client.shards.options.largeThreshold;
        this.memberCount = data.member_count ?? data.approximate_member_count ?? 0;
        this.members = new TypedCollection(Member, client, typeof client.options.collectionLimits.members === "number" ? client.options.collectionLimits.members : client.options.collectionLimits.members[data.id] ?? client.options.collectionLimits.members.unknown ?? Infinity);
        this.name = data.name;
        this.owner = client.users.get(data.owner_id)!;
        this.ownerID = data.owner_id;
        this.preferredLocale = data.preferred_locale;
        this.roles = new TypedCollection(Role, client);
        this.threads = new TypedCollection(ThreadChannel, client) as TypedCollection<string, RawThreadChannel, AnyThreadChannel>;
        this.unavailable = !!data.unavailable;
        this.vanityURLCode = data.vanity_url_code;
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
    }

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
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.max_members !== undefined) {
            this.maxMembers = data.max_members;
        }
        if (data.max_presences !== undefined) {
            this.maxPresences = data.max_presences;
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
     * Create an emoji in this guild.
     * @param options The options for creating the emoji.
     */
    async createEmoji(options: CreateEmojiOptions): Promise<GuildEmoji> {
        return this.client.rest.guilds.createEmoji(this.id, options);
    }

    /**
     * Create a role.
     * @param options The options for creating the role.
     */
    async createRole(options?: CreateRoleOptions): Promise<Role> {
        return this.client.rest.guilds.createRole(this.id, options);
    }

    /**
     * Create a scheduled event in this guild.
     * @param options The options for creating the scheduled event.
     */
    async createScheduledEvent(options: CreateScheduledEventOptions): Promise<GuildScheduledEvent> {
        return this.client.rest.guilds.createScheduledEvent(this.id, options);
    }

    /**
     * Create a sticker.
     * @param options The options for creating the sticker.
     */
    async createSticker(options: CreateStickerOptions): Promise<Sticker> {
        return this.client.rest.guilds.createSticker(this.id, options);
    }

    /**
     * Create a guild template.
     * @param options The options for creating the template.
     */
    async createTemplate(options: CreateTemplateOptions): Promise<GuildTemplate> {
        return this.client.rest.guilds.createTemplate(this.id, options);
    }

    /**
     * Delete this guild.
     */
    async delete(): Promise<void> {
        return this.client.rest.guilds.delete(this.id);
    }

    /**
     * Delete an auto moderation rule in this guild.
     * @param ruleID The ID of the rule to delete.
     * @param reason The reason for deleting the rule.
     */
    async deleteAutoModerationRule(ruleID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.deleteAutoModerationRule(this.id, ruleID, reason);
    }

    /**
     * Delete an emoji in this guild.
     * @param emojiID The ID of the emoji.
     * @param reason The reason for deleting the emoji.
     */
    async deleteEmoji(emojiID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.deleteEmoji(this.id, emojiID, reason);
    }

    /**
     * Delete an integration.
     * @param integrationID The ID of the integration.
     * @param reason The reason for deleting the integration.
     */
    async deleteIntegration(integrationID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.deleteIntegration(this.id, integrationID, reason);
    }

    /**
     * Delete a role.
     * @param roleID The ID of the role to delete.
     * @param reason The reason for deleting the role.
     */
    async deleteRole(roleID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.deleteRole(this.id, roleID, reason);
    }

    /**
     * Delete a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param reason The reason for deleting the scheduled event. Discord's docs do not explicitly state a reason can be provided, so it may not be used.
     */
    async deleteScheduledEvent(eventID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.deleteScheduledEvent(this.id, eventID, reason);
    }

    /**
     * Delete a sticker.
     * @param stickerID The ID of the sticker to delete.
     * @param reason The reason for deleting the sticker.
     */
    async deleteSticker(stickerID: string, reason?: string): Promise<void> {
        return this.client.rest.guilds.deleteSticker(this.id, stickerID, reason);
    }

    /**
     * Delete a template.
     * @param code The code of the template.
     */
    async deleteTemplate(code: string): Promise<void> {
        return this.client.rest.guilds.deleteTemplate(this.id, code);
    }

    /**
     * Disable the `COMMUNITY` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for disable the feature.
     */
    async disableCommunity(reason?: string): Promise<Guild> {
        return this.toggleFeature("COMMUNITY", false, reason);
    }

    /**
     * Disable the `DISCOVERABLE` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for disabling the feature.
     */
    async disableDiscovery(reason?: string): Promise<Guild> {
        return this.toggleFeature("DISCOVERABLE", false, reason);
    }


    /**
     * Disable the `INVITES_DISABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for disabling the feature.
     */
    async disableInvites(reason?: string): Promise<Guild> {
        return this.toggleFeature("INVITES_DISABLED", true, reason);
    }

    /**
     * The url of this guild's discovery splash.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    discoverySplashURL(format?: ImageFormat, size?: number): string | null {
        return this.discoverySplash === null ? null : this.client.util.formatImage(Routes.GUILD_DISCOVERY_SPLASH(this.id, this.discoverySplash), format, size);
    }

    /**
     * Edit this guild.
     * @param options The options for editing the guild.
     */
    async edit(options: EditGuildOptions): Promise<Guild> {
        return this.client.rest.guilds.edit(this.id, options);
    }

    /**
     * Edit an existing auto moderation rule in this guild.
     * @param ruleID The ID of the rule to edit.
     * @param options The options for editing the rule.
     */
    async editAutoModerationRule(ruleID: string, options: EditAutoModerationRuleOptions): Promise<AutoModerationRule> {
        return this.client.rest.guilds.editAutoModerationRule(this.id, ruleID, options);
    }

    /**
     * Edit the positions of channels in this guild.
     * @param options The channels to move. Unedited channels do not need to be specified.
     */
    async editChannelPositions(options: Array<ModifyChannelPositionsEntry>): Promise<void> {
        return this.client.rest.guilds.editChannelPositions(this.id, options);
    }

    /**
     * Modify the current member in this guild.
     * @param options The options for editing the member.
     */
    async editCurrentMember(options: EditCurrentMemberOptions): Promise<Member> {
        return this.client.rest.guilds.editCurrentMember(this.id, options);
    }

    /**
     * Edit the current member's voice state in this guild. `channelID` is required, and the current member must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state-caveats) for more information.
     * @param options The options for editing the voice state.
     */
    async editCurrentUserVoiceState(options: EditCurrentUserVoiceStateOptions): Promise<void> {
        return this.client.rest.guilds.editCurrentUserVoiceState(this.id, options);
    }
    /**
     * Edit an existing emoji in this guild.
     * @param options The options for editing the emoji.
     */
    async editEmoji(emojiID: string, options: EditEmojiOptions): Promise<GuildEmoji> {
        return this.client.rest.guilds.editEmoji(this.id, emojiID, options);
    }

    /**
     * Edit the [mfa level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level) of this guild. This can only be used by the guild owner.
     * @param options The options for editing the MFA level.
     */
    async editMFALevel(options: EditMFALevelOptions): Promise<MFALevels> {
        return this.client.rest.guilds.editMFALevel(this.id, options);
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
     * Edit the position of roles in this guild.
     * @param options The roles to move.
     */
    async editRolePositions(options: Array<EditRolePositionsEntry>, reason?: string): Promise<Array<Role>> {
        return this.client.rest.guilds.editRolePositions(this.id, options, reason);
    }

    /**
     * Edit an existing scheduled event in this guild.
     * @param options The options for editing the scheduled event.
     */
    async editScheduledEvent(options: EditScheduledEventOptions): Promise<GuildScheduledEvent> {
        return this.client.rest.guilds.editScheduledEvent(this.id, options);
    }

    /**
     * Edit a sticker.
     * @param options The options for editing the sticker.
     */
    async editSticker(stickerID: string, options: EditStickerOptions): Promise<Sticker> {
        return this.client.rest.guilds.editSticker(this.id, stickerID, options);
    }

    /**
     * Edit a template.
     * @param code The code of the template.
     * @param options The options for editing the template.
     */
    async editTemplate(code: string, options: EditGuildTemplateOptions): Promise<GuildTemplate> {
        return this.client.rest.guilds.editTemplate(this.id, code, options);
    }

    /**
     * Edit a guild member's voice state. `channelID` is required, and the user must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-user-voice-state) for more information.
     * @param memberID The ID of the member.
     * @param options The options for editing the voice state.
     */
    async editUserVoiceState(memberID: string, options: EditUserVoiceStateOptions): Promise<void> {
        return this.client.rest.guilds.editUserVoiceState(this.id, memberID, options);
    }

    /**
     * Edit the welcome screen in this guild.
     * @param options The options for editing the welcome screen.
     */
    async editWelcomeScreen(options: EditWelcomeScreenOptions): Promise<WelcomeScreen> {
        return this.client.rest.guilds.editWelcomeScreen(this.id, options);
    }

    /**
     * Edit the widget of this guild.
     * @param options The options for editing the widget.
     */
    async editWidget(options: WidgetSettings): Promise<Widget> {
        return this.client.rest.guilds.editWidget(this.id, options);
    }


    /**
     * Enable the `COMMUNITY` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for enabling the feature.
     */
    async enableCommunity(reason?: string): Promise<Guild> {
        return this.toggleFeature("COMMUNITY", true, reason);
    }

    /**
     * Enable the `DISCOVERABLE` feature for this guild. Requires the **Administrator** permission. The server must also be passing all discovery requirements.
     * @param reason The reason for enabling the feature.
     */
    async enableDiscovery(reason?: string): Promise<Guild> {
        return this.toggleFeature("DISCOVERABLE", true, reason);
    }

    /**
     * Enable the `INVITES_DISABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for enabling the feature.
     */
    async enableInvites(reason?: string): Promise<Guild> {
        return this.toggleFeature("INVITES_DISABLED", false, reason);
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
     * Get this guild's audit log.
     * @param options The options for the audit log.
     */
    async getAuditLog(options?: GetAuditLogOptions): Promise<AuditLog> {
        return this.client.rest.guilds.getAuditLog(this.id, options);
    }

    /**
     * Get an auto moderation rule for this guild.
     * @param ruleID The ID of the rule to get.
     */
    async getAutoModerationRule(ruleID: string): Promise<AutoModerationRule> {
        return this.client.rest.guilds.getAutoModerationRule(this.id, ruleID);
    }

    /**
     * Get the auto moderation rules for this guild.
     */
    async getAutoModerationRules(): Promise<Array<AutoModerationRule>> {
        return this.client.rest.guilds.getAutoModerationRules(this.id);
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

    override toJSON(): JSONGuild {
        return {
            ...super.toJSON(),
            application:              this.applicationID ?? undefined,
            approximateMemberCount:   this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            channels:                 this.channels.map(channel => channel.id),
            icon:                     this.icon,
            large:                    this.large,
            maxMembers:               this.maxMembers,
            maxPresences:             this.maxPresences,
            memberCount:              this.memberCount,
            members:                  this.members.map(member => member.id),
            name:                     this.name,
            ownerID:                  this.ownerID,
            preferredLocale:          this.preferredLocale,
            region:                   this.region,
            roles:                    this.roles.map(role => role.toJSON()),
            threads:                  this.threads.map(thread => thread.id),
            unavailable:              this.unavailable,
            vanityURLCode:            this.vanityURLCode
        };
    }
}
