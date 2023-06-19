/** @module Types/Guilds */
import type { RawUser } from "./users.js";
import type { AnyThreadChannel, RawGuildChannel, RawThreadChannel, ThreadMember } from "./channels.js";
import type { ClientStatus, PresenceUpdate, Activity as GatewayActivity } from "./gateway.js";
import type {
    DefaultMessageNotificationLevels,
    ExplicitContentFilterLevels,
    GuildFeature,
    GuildNSFWLevels,
    MFALevels,
    PremiumTiers,
    VerificationLevels
} from "../Constants";

// channels, joined_at, large, member_count, members, presences,
// threads, unavailable - all gateway only
export interface RawGuild {
    afk_channel_id: string | null;
    afk_timeout: number;
    application_id: string | null;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    banner: string | null;
    channels: Array<RawGuildChannel>;
    default_message_notifications: DefaultMessageNotificationLevels;
    description: string | null;
    discovery_splash: string | null;
    emojis: Array<RawGuildEmoji>;
    explicit_content_filter: ExplicitContentFilterLevels;
    features: Array<GuildFeature>;
    icon: string | null;
    icon_hash?: string | null;
    id: string;
    joined_at: string;
    large: boolean;
    max_members?: number;
    max_presences?: number;
    max_video_channel_users?: number;
    member_count: number;
    members: Array<RawMember>;
    mfa_level: MFALevels;
    name: string;
    nsfw_level: GuildNSFWLevels;
    owner?: boolean;
    owner_id: string;
    permissions?: string;
    preferred_locale: string;
    premium_progress_bar_enabled: boolean;
    premium_subscription_count?: number;
    premium_tier: PremiumTiers;
    presences: Array<PresenceUpdate>;
    public_updates_channel_id: string | null;
    region?: string | null;
    roles: Array<RawRole>;
    rules_channel_id: string | null;
    safety_alerts_channel_id: string | null;
    splash: string | null;
    stickers?: Array<RawSticker>;
    system_channel_flags: number;
    system_channel_id: string | null;
    threads: Array<RawThreadChannel>;
    unavailable?: false;
    vanity_url_code: string | null;
    verification_level: VerificationLevels;
    welcome_screen?: RawWelcomeScreen;
    widget_channel_id?: string | null;
    widget_enabled?: boolean;
}
export type PartialGuild = Pick<RawGuild, "id" | "name" | "splash" | "banner" | "description" | "icon" | "features" | "verification_level" | "vanity_url_code" | "premium_subscription_count" | "nsfw_level">;

export interface RawRole {
    color: number;
    hoist: boolean;
    icon?: string | null;
    id: string;
    managed: boolean;
    mentionable: boolean;
    name: string;
    permissions: string;
    position: number;
    tags?: RawRoleTags;
    unicode_emoji?: string | null;
}
export interface RawRoleTags {
    available_for_purchase?: null;
    bot_id?: string;
    premium_subscriber?: null;
    subscription_listing_id?: string;
}
export interface RoleTags {
    availableForPurchase: boolean;
    botID?: string;
    integrationID?: string;
    premiumSubscriber?: null;
    subscriptionListingID?: string;
}

export interface RawMember {
    avatar?: string | null;
    communication_disabled_until?: string | null;
    /** undocumented */
    flags?: number;
    /** undocumented */
    is_pending?: boolean;
    // this is nullable over gateway
    joined_at: string | null;
    nick?: string | null;
    pending?: boolean;
    permissions?: string;
    premium_since?: string | null;
    roles: Array<string>;
    user?: RawUser;
}
export type RESTMember = Required<Omit<RawMember, "permissions" | "joined_at">> & { joined_at: string; };
export type InteractionMember = Required<RawMember>;

export interface GetActiveThreadsResponse {
    members: Array<ThreadMember>;
    threads: Array<AnyThreadChannel>;
}

export interface CreateBanOptions {
    /** The number of days to delete messages from. Technically DEPRECATED. This is internally converted in to `deleteMessageSeconds`. */
    deleteMessageDays?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    /** The number of seconds to delete messages from. Takes precedence over `deleteMessageDays`. */
    deleteMessageSeconds?: number;
    /** The reason for creating the bon. */
    reason?: string;
}

export interface GetVanityURLResponse {
    code: string | null;
    uses: number;
}

export interface GetMembersOptions {
    /** The last id on the previous page, for pagination. */
    after?: string;
    /** The maximum number of members to get. */
    limit?: number;
}

export interface SearchMembersOptions {
    /** The maximum number of entries to get. */
    limit?: number;
    /** The query to search for. */
    query: string;
}

export interface AddMemberOptions {
    /** The access token of the user to add. */
    accessToken: string;
    /** If the user should be deafened or not. */
    deaf?: boolean;
    /** If the user should be muted or not. */
    mute?: boolean;
    /** The nickname of the user to add. */
    nick?: string;
    /** The IDs of the roles to add to the user. This bypasses membership screening and verification levels. */
    roles?: Array<string>;
}

export interface EditMemberOptions {
    /** The ID of the channel to move the member to. `null` to disconnect. */
    channelID?: string | null;
    /** An ISO8601 timestamp to time out until. `null` to reset. */
    communicationDisabledUntil?: string | null;
    /** If the member should be deafened. */
    deaf?: boolean;
    /** If the member should be muted. */
    mute?: boolean;
    /** The new nickname of the member. `null` to reset. */
    nick?: string | null;
    /** The reason for editing the member. */
    reason?: string;
    /** The new roles of the member. */
    roles?: Array<string>;
}

export type EditCurrentMemberOptions = Pick<EditMemberOptions, "nick" | "reason">;

export interface GetBansOptions {
    /** The ID of the user to get bans after. */
    after?: string;
    /** The ID of the user to get bans before. */
    before?: string;
    /** The maximum number of bans to get. Defaults to 1000. Use Infinity if you wish to get as many bans as possible. */
    limit?: number;
}

export interface RawUnavailableGuild {
    id: string;
    unavailable: true;
}

export interface RawGuild {
    afkChannelID: string | null;
    afkTimeout: number;
    applicationID: string | null;
}

export interface EditMFALevelOptions {
    /** The new MFA level. */
    level: MFALevels;
    /** The reason for editing the MFA level. */
    reason?: string;
}

export interface RawOAuthGuild {
    approximate_member_count?: number;
    approximate_presence_count?: number;
    features: Array<GuildFeature>;
    icon: string | null;
    id: string;
    name: string;
    owner: boolean;
    permissions: string;
}

export type Activity = Omit<GatewayActivity, "application_id" | "assets" | "created_at"> & {
    applicationID?: string;
    assets?: Partial<Record<"largeImage" | "largeText" | "smallImage" | "smallText", string>>;
    createdAt: number;
};

export type Presence = Omit<PresenceUpdate, "user" | "guild_id" | "client_status" | "activities"> & {
    activities?: Array<Activity>;
    clientStatus: ClientStatus;
    guildID: string;
};
