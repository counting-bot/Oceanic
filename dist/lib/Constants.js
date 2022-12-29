"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageInstancePrivacyLevels = exports.InviteTargetTypes = exports.InteractionTypes = exports.MessageActivityTypes = exports.MessageTypes = exports.MessageFlags = exports.TextInputStyles = exports.ButtonStyles = exports.ComponentTypes = exports.OAuthScopes = exports.ForumLayoutTypes = exports.SortOrderTypes = exports.ChannelFlags = exports.AllPermissions = exports.AllVoicePermissions = exports.AllTextPermissions = exports.AllGuildPermissions = exports.Permissions = exports.IntegrationExpireBehaviors = exports.IntegrationTypes = exports.ConnectionServices = exports.VisibilityTypes = exports.ThreadAutoArchiveDurations = exports.VideoQualityModes = exports.OverwriteTypes = exports.ChannelTypes = exports.StickerFormatTypes = exports.StickerTypes = exports.SystemChannelFlags = exports.PremiumTiers = exports.GuildNSFWLevels = exports.VerificationLevels = exports.MFALevels = exports.ExplicitContentFilterLevels = exports.DefaultMessageNotificationLevels = exports.GuildFeatures = exports.ApplicationFlags = exports.UserFlags = exports.PremiumTypes = exports.WebhookTypes = exports.ImageFormats = exports.RESTMethods = exports.MAX_IMAGE_SIZE = exports.MIN_IMAGE_SIZE = exports.USER_AGENT = exports.VERSION = exports.API_URL = exports.BASE_URL = exports.REST_VERSION = exports.GATEWAY_VERSION = void 0;
exports.JSONErrorCodes = exports.RoleConnectionMetadataTypes = exports.ThreadMemberFlags = exports.ActivityFlags = exports.ActivityTypes = exports.HubTypes = exports.VoiceCloseCodes = exports.VoiceOPCodes = exports.GatewayCloseCodes = exports.GatewayOPCodes = exports.AllIntents = exports.AllPrivilegedIntents = exports.AllNonPrivilegedIntents = exports.Intents = exports.InteractionResponseTypes = exports.ApplicationCommandPermissionTypes = exports.ApplicationCommandOptionTypes = exports.ApplicationCommandTypes = void 0;
/* eslint-disable unicorn/prefer-math-trunc */
/** @module Constants */
exports.GATEWAY_VERSION = 10;
exports.REST_VERSION = 10;
exports.BASE_URL = "https://discord.com";
exports.API_URL = `${exports.BASE_URL}/api/v${exports.REST_VERSION}`;
exports.VERSION = "1.3.1";
exports.USER_AGENT = `Oceanic/${exports.VERSION} (https://github.com/OceanicJS/Oceanic)`;
exports.MIN_IMAGE_SIZE = 64;
exports.MAX_IMAGE_SIZE = 4096;
exports.RESTMethods = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
];
exports.ImageFormats = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif"
];
var WebhookTypes;
(function (WebhookTypes) {
    WebhookTypes[WebhookTypes["INCOMING"] = 1] = "INCOMING";
    WebhookTypes[WebhookTypes["CHANNEL_FOLLOWER"] = 2] = "CHANNEL_FOLLOWER";
    WebhookTypes[WebhookTypes["APPLICATION"] = 3] = "APPLICATION";
})(WebhookTypes = exports.WebhookTypes || (exports.WebhookTypes = {}));
var PremiumTypes;
(function (PremiumTypes) {
    PremiumTypes[PremiumTypes["NONE"] = 0] = "NONE";
    PremiumTypes[PremiumTypes["NITRO_CLASSIC"] = 1] = "NITRO_CLASSIC";
    PremiumTypes[PremiumTypes["NITRO"] = 2] = "NITRO";
    PremiumTypes[PremiumTypes["NITRO_BASIC"] = 3] = "NITRO_BASIC";
})(PremiumTypes = exports.PremiumTypes || (exports.PremiumTypes = {}));
var UserFlags;
(function (UserFlags) {
    UserFlags[UserFlags["STAFF"] = 1] = "STAFF";
    UserFlags[UserFlags["PARTNER"] = 2] = "PARTNER";
    UserFlags[UserFlags["HYPESQUAD"] = 4] = "HYPESQUAD";
    /** @deprecated Use {@link Constants~UserFlags#BUG_HUNTER_LEVEL_1 | BUG_HUNTER_LEVEL_1}. This will be removed in `1.5.0`. */
    UserFlags[UserFlags["BUGHUNTER_LEVEL_1"] = 8] = "BUGHUNTER_LEVEL_1";
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_1"] = 8] = "BUG_HUNTER_LEVEL_1";
    UserFlags[UserFlags["HYPESQUAD_BRAVERY"] = 64] = "HYPESQUAD_BRAVERY";
    UserFlags[UserFlags["HYPESQUAD_BRILLIANCE"] = 128] = "HYPESQUAD_BRILLIANCE";
    UserFlags[UserFlags["HYPESQUAD_BALANCE"] = 256] = "HYPESQUAD_BALANCE";
    UserFlags[UserFlags["EARLY_SUPPORTER"] = 512] = "EARLY_SUPPORTER";
    UserFlags[UserFlags["PSEUDO_TEAM_USER"] = 1024] = "PSEUDO_TEAM_USER";
    UserFlags[UserFlags["SYSTEM"] = 4096] = "SYSTEM";
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_2"] = 16384] = "BUG_HUNTER_LEVEL_2";
    UserFlags[UserFlags["VERIFIED_BOT"] = 65536] = "VERIFIED_BOT";
    UserFlags[UserFlags["VERIFIED_DEVELOPER"] = 131072] = "VERIFIED_DEVELOPER";
    UserFlags[UserFlags["CERTIFIED_MODERATOR"] = 262144] = "CERTIFIED_MODERATOR";
    UserFlags[UserFlags["BOT_HTTP_INTERACTIONS"] = 524288] = "BOT_HTTP_INTERACTIONS";
    UserFlags[UserFlags["SPAMMER"] = 1048576] = "SPAMMER";
    UserFlags[UserFlags["ACTIVE_DEVELOPER"] = 4194304] = "ACTIVE_DEVELOPER";
})(UserFlags = exports.UserFlags || (exports.UserFlags = {}));
var ApplicationFlags;
(function (ApplicationFlags) {
    ApplicationFlags[ApplicationFlags["EMBEDDED_RELEASED"] = 2] = "EMBEDDED_RELEASED";
    ApplicationFlags[ApplicationFlags["MANAGED_EMOJI"] = 4] = "MANAGED_EMOJI";
    ApplicationFlags[ApplicationFlags["GROUP_DM_CREATE"] = 16] = "GROUP_DM_CREATE";
    ApplicationFlags[ApplicationFlags["GATEWAY_PRESENCE"] = 4096] = "GATEWAY_PRESENCE";
    ApplicationFlags[ApplicationFlags["GATEWAY_PRESENCE_LIMITED"] = 8192] = "GATEWAY_PRESENCE_LIMITED";
    ApplicationFlags[ApplicationFlags["GATEWAY_GUILD_MEMBERS"] = 16384] = "GATEWAY_GUILD_MEMBERS";
    ApplicationFlags[ApplicationFlags["GATEWAY_GUILD_MEMBERS_LIMITED"] = 32768] = "GATEWAY_GUILD_MEMBERS_LIMITED";
    ApplicationFlags[ApplicationFlags["VERIFICATION_PENDING_GUILD_LIMIT"] = 65536] = "VERIFICATION_PENDING_GUILD_LIMIT";
    ApplicationFlags[ApplicationFlags["EMBEDDED"] = 131072] = "EMBEDDED";
    ApplicationFlags[ApplicationFlags["GATEWAY_MESSAGE_CONTENT"] = 262144] = "GATEWAY_MESSAGE_CONTENT";
    ApplicationFlags[ApplicationFlags["GATEWAY_MESSAGE_CONTENT_LIMITED"] = 524288] = "GATEWAY_MESSAGE_CONTENT_LIMITED";
    ApplicationFlags[ApplicationFlags["EMBEDDED_FIRST_PARTY"] = 1048576] = "EMBEDDED_FIRST_PARTY";
    ApplicationFlags[ApplicationFlags["APPLICATION_COMMAND_BADGE"] = 2097152] = "APPLICATION_COMMAND_BADGE";
    ApplicationFlags[ApplicationFlags["ACTIVE"] = 16777216] = "ACTIVE";
})(ApplicationFlags = exports.ApplicationFlags || (exports.ApplicationFlags = {}));
exports.GuildFeatures = [
    "APPLICATION_COMMAND_PERMISSIONS_V2",
    "ANIMATED_BANNER",
    "ANIMATED_ICON",
    "AUTO_MODERATION",
    "BANNER",
    "BOT_DEVELOPER_EARLY_ACCESS",
    "COMMUNITY",
    "CREATOR_MONETIZABLE",
    "CREATOR_MONETIZABLE_DISABLED",
    "CREATOR_MONETIZABLE_PROVISIONAL",
    "CREATOR_STORE_PAGE",
    "DEVELOPER_SUPPORT_SERVER",
    "DISCOVERABLE",
    "DISCOVERABLE_DISABLED",
    "ENABLED_DISCOVERABLE_BEFORE",
    "EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT",
    "FEATURABLE",
    "GUILD_HOME_TEST",
    "HAD_EARLY_ACTIVITIES_ACCESS",
    "HAS_DIRECTORY_ENTRY",
    "HUB",
    "INCREASED_THREAD_LIMIT",
    "INTERNAL_EMPLOYEE_ONLY",
    "INVITES_DISABLED",
    "INVITE_SPLASH",
    "LINKED_TO_HUB",
    "MEMBER_PROFILES",
    "MEMBER_VERIFICATION_GATE_ENABLED",
    "MONETIZATION_ENABLED",
    "MORE_EMOJI",
    "MORE_EMOJIS",
    "MORE_STICKERS",
    "NEWS",
    "NEW_THREAD_PERMISSIONS",
    "PARTNERED",
    "PREVIEW_ENABLED",
    "PREVIOUSLY_DISCOVERABLE",
    "PRIVATE_THREADS",
    "RAID_ALERTS_ENABLED",
    "ROLE_ICONS",
    "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    "ROLE_SUBSCRIPTIONS_ENABLED",
    "SEVEN_DAY_THREAD_ARCHIVE",
    "TEXT_IN_VOICE_ENABLED",
    "THREADS_ENABLED",
    "THREADS_ENABLED_TESTING",
    "THREE_DAY_THREAD_ARCHIVE",
    "TICKETED_EVENTS_ENABLED",
    "VANITY_URL",
    "VERIFIED",
    "VIP_REGIONS",
    "WELCOME_SCREEN_ENABLED"
];
var DefaultMessageNotificationLevels;
(function (DefaultMessageNotificationLevels) {
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ALL_MESSAGES"] = 0] = "ALL_MESSAGES";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ONLY_MENTIONS"] = 1] = "ONLY_MENTIONS";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NO_MESSAGES"] = 2] = "NO_MESSAGES";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NULL"] = 3] = "NULL";
})(DefaultMessageNotificationLevels = exports.DefaultMessageNotificationLevels || (exports.DefaultMessageNotificationLevels = {}));
var ExplicitContentFilterLevels;
(function (ExplicitContentFilterLevels) {
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["DISABLED"] = 0] = "DISABLED";
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["MEMBERS_WITHOUT_ROLES"] = 1] = "MEMBERS_WITHOUT_ROLES";
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["ALL_MEMBERS"] = 2] = "ALL_MEMBERS";
})(ExplicitContentFilterLevels = exports.ExplicitContentFilterLevels || (exports.ExplicitContentFilterLevels = {}));
var MFALevels;
(function (MFALevels) {
    MFALevels[MFALevels["NONE"] = 0] = "NONE";
    MFALevels[MFALevels["ELEVATED"] = 1] = "ELEVATED";
})(MFALevels = exports.MFALevels || (exports.MFALevels = {}));
var VerificationLevels;
(function (VerificationLevels) {
    VerificationLevels[VerificationLevels["NONE"] = 0] = "NONE";
    VerificationLevels[VerificationLevels["LOW"] = 1] = "LOW";
    VerificationLevels[VerificationLevels["MEDIUM"] = 2] = "MEDIUM";
    VerificationLevels[VerificationLevels["HIGH"] = 3] = "HIGH";
    VerificationLevels[VerificationLevels["VERY_HIGH"] = 4] = "VERY_HIGH";
})(VerificationLevels = exports.VerificationLevels || (exports.VerificationLevels = {}));
var GuildNSFWLevels;
(function (GuildNSFWLevels) {
    GuildNSFWLevels[GuildNSFWLevels["DEFAULT"] = 0] = "DEFAULT";
    GuildNSFWLevels[GuildNSFWLevels["EXPLICIT"] = 1] = "EXPLICIT";
    GuildNSFWLevels[GuildNSFWLevels["SAFE"] = 2] = "SAFE";
    GuildNSFWLevels[GuildNSFWLevels["AGE_RESTRICTED"] = 3] = "AGE_RESTRICTED";
})(GuildNSFWLevels = exports.GuildNSFWLevels || (exports.GuildNSFWLevels = {}));
var PremiumTiers;
(function (PremiumTiers) {
    PremiumTiers[PremiumTiers["NONE"] = 0] = "NONE";
    PremiumTiers[PremiumTiers["TIER_1"] = 1] = "TIER_1";
    PremiumTiers[PremiumTiers["TIER_2"] = 2] = "TIER_2";
    PremiumTiers[PremiumTiers["TIER_3"] = 3] = "TIER_3";
})(PremiumTiers = exports.PremiumTiers || (exports.PremiumTiers = {}));
var SystemChannelFlags;
(function (SystemChannelFlags) {
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATIONS"] = 1] = "SUPPRESS_JOIN_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_PREMIUM_SUBSCRIPTIONS"] = 2] = "SUPPRESS_PREMIUM_SUBSCRIPTIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_GUILD_REMINDER_NOTIFICATIONS"] = 4] = "SUPPRESS_GUILD_REMINDER_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATION_REPLIES"] = 8] = "SUPPRESS_JOIN_NOTIFICATION_REPLIES";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS"] = 16] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES"] = 32] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES";
})(SystemChannelFlags = exports.SystemChannelFlags || (exports.SystemChannelFlags = {}));
var StickerTypes;
(function (StickerTypes) {
    StickerTypes[StickerTypes["STANDARD"] = 1] = "STANDARD";
    StickerTypes[StickerTypes["GUILD"] = 2] = "GUILD";
})(StickerTypes = exports.StickerTypes || (exports.StickerTypes = {}));
var StickerFormatTypes;
(function (StickerFormatTypes) {
    StickerFormatTypes[StickerFormatTypes["PNG"] = 1] = "PNG";
    StickerFormatTypes[StickerFormatTypes["APNG"] = 2] = "APNG";
    StickerFormatTypes[StickerFormatTypes["LOTTIE"] = 3] = "LOTTIE";
})(StickerFormatTypes = exports.StickerFormatTypes || (exports.StickerFormatTypes = {}));
var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes[ChannelTypes["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    ChannelTypes[ChannelTypes["DM"] = 1] = "DM";
    ChannelTypes[ChannelTypes["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    ChannelTypes[ChannelTypes["GROUP_DM"] = 3] = "GROUP_DM";
    ChannelTypes[ChannelTypes["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    ChannelTypes[ChannelTypes["GUILD_ANNOUNCEMENT"] = 5] = "GUILD_ANNOUNCEMENT";
    ChannelTypes[ChannelTypes["ANNOUNCEMENT_THREAD"] = 10] = "ANNOUNCEMENT_THREAD";
    ChannelTypes[ChannelTypes["PUBLIC_THREAD"] = 11] = "PUBLIC_THREAD";
    ChannelTypes[ChannelTypes["PRIVATE_THREAD"] = 12] = "PRIVATE_THREAD";
    ChannelTypes[ChannelTypes["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    ChannelTypes[ChannelTypes["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    ChannelTypes[ChannelTypes["GUILD_FORUM"] = 15] = "GUILD_FORUM";
})(ChannelTypes = exports.ChannelTypes || (exports.ChannelTypes = {}));
var OverwriteTypes;
(function (OverwriteTypes) {
    OverwriteTypes[OverwriteTypes["ROLE"] = 0] = "ROLE";
    OverwriteTypes[OverwriteTypes["MEMBER"] = 1] = "MEMBER";
})(OverwriteTypes = exports.OverwriteTypes || (exports.OverwriteTypes = {}));
var VideoQualityModes;
(function (VideoQualityModes) {
    VideoQualityModes[VideoQualityModes["AUTO"] = 1] = "AUTO";
    VideoQualityModes[VideoQualityModes["FULL"] = 2] = "FULL";
})(VideoQualityModes = exports.VideoQualityModes || (exports.VideoQualityModes = {}));
exports.ThreadAutoArchiveDurations = [
    60,
    1440,
    4320,
    10080
];
var VisibilityTypes;
(function (VisibilityTypes) {
    VisibilityTypes[VisibilityTypes["NONE"] = 0] = "NONE";
    VisibilityTypes[VisibilityTypes["EVERYONE"] = 1] = "EVERYONE";
})(VisibilityTypes = exports.VisibilityTypes || (exports.VisibilityTypes = {}));
exports.ConnectionServices = [
    "battlenet",
    "ebay",
    "epicgames",
    "facebook",
    "github",
    "leagueoflegends",
    "paypal",
    "playstation",
    "reddit",
    "riotgames",
    "spotify",
    "skype",
    "steam",
    "tiktok",
    "twitch",
    "twitter",
    "xbox",
    "youtube"
];
exports.IntegrationTypes = [
    "twitch",
    "youtube",
    "discord",
    "guild_subscription"
];
var IntegrationExpireBehaviors;
(function (IntegrationExpireBehaviors) {
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["REMOVE_ROLE"] = 0] = "REMOVE_ROLE";
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["KICK"] = 1] = "KICK";
})(IntegrationExpireBehaviors = exports.IntegrationExpireBehaviors || (exports.IntegrationExpireBehaviors = {}));
// values won't be statically typed if we use bit shifting, and enums can't use bigints
exports.Permissions = {
    CREATE_INSTANT_INVITE: 1n,
    KICK_MEMBERS: 2n,
    BAN_MEMBERS: 4n,
    ADMINISTRATOR: 8n,
    MANAGE_CHANNELS: 16n,
    MANAGE_GUILD: 32n,
    ADD_REACTIONS: 64n,
    VIEW_AUDIT_LOG: 128n,
    PRIORITY_SPEAKER: 256n,
    STREAM: 512n,
    VIEW_CHANNEL: 1024n,
    SEND_MESSAGES: 2048n,
    SEND_TTS_MESSAGES: 4096n,
    MANAGE_MESSAGES: 8192n,
    EMBED_LINKS: 16384n,
    ATTACH_FILES: 32768n,
    READ_MESSAGE_HISTORY: 65536n,
    MENTION_EVERYONE: 131072n,
    USE_EXTERNAL_EMOJIS: 262144n,
    VIEW_GUILD_INSIGHTS: 524288n,
    CONNECT: 1048576n,
    SPEAK: 2097152n,
    MUTE_MEMBERS: 4194304n,
    DEAFEN_MEMBERS: 8388608n,
    MOVE_MEMBERS: 16777216n,
    USE_VAD: 33554432n,
    CHANGE_NICKNAME: 67108864n,
    MANAGE_NICKNAMES: 134217728n,
    MANAGE_ROLES: 268435456n,
    MANAGE_WEBHOOKS: 536870912n,
    MANAGE_EMOJIS_AND_STICKERS: 1073741824n,
    USE_APPLICATION_COMMANDS: 2147483648n,
    REQUEST_TO_SPEAK: 4294967296n,
    MANAGE_EVENTS: 8589934592n,
    MANAGE_THREADS: 17179869184n,
    CREATE_PUBLIC_THREADS: 34359738368n,
    CREATE_PRIVATE_THREADS: 68719476736n,
    USE_EXTERNAL_STICKERS: 137438953472n,
    SEND_MESSAGES_IN_THREADS: 274877906944n,
    USE_EMBEDDED_ACTIVITIES: 549755813888n,
    MODERATE_MEMBERS: 1099511627776n,
    VIEW_CREATOR_MONETIZATION_ANALYTICS: 2199023255552n // 1 << 41
};
exports.AllGuildPermissions = exports.Permissions.KICK_MEMBERS |
    exports.Permissions.BAN_MEMBERS |
    exports.Permissions.ADMINISTRATOR |
    exports.Permissions.MANAGE_CHANNELS |
    exports.Permissions.MANAGE_GUILD |
    exports.Permissions.VIEW_AUDIT_LOG |
    exports.Permissions.VIEW_GUILD_INSIGHTS |
    exports.Permissions.CHANGE_NICKNAME |
    exports.Permissions.MANAGE_NICKNAMES |
    exports.Permissions.MANAGE_ROLES |
    exports.Permissions.MANAGE_WEBHOOKS |
    exports.Permissions.MANAGE_EMOJIS_AND_STICKERS |
    exports.Permissions.MANAGE_EVENTS |
    exports.Permissions.MODERATE_MEMBERS |
    exports.Permissions.VIEW_CREATOR_MONETIZATION_ANALYTICS;
exports.AllTextPermissions = exports.Permissions.CREATE_INSTANT_INVITE |
    exports.Permissions.MANAGE_CHANNELS |
    exports.Permissions.ADD_REACTIONS |
    exports.Permissions.VIEW_CHANNEL |
    exports.Permissions.SEND_MESSAGES |
    exports.Permissions.SEND_TTS_MESSAGES |
    exports.Permissions.MANAGE_MESSAGES |
    exports.Permissions.EMBED_LINKS |
    exports.Permissions.ATTACH_FILES |
    exports.Permissions.READ_MESSAGE_HISTORY |
    exports.Permissions.MENTION_EVERYONE |
    exports.Permissions.USE_EXTERNAL_EMOJIS |
    exports.Permissions.MANAGE_ROLES |
    exports.Permissions.MANAGE_WEBHOOKS |
    exports.Permissions.USE_APPLICATION_COMMANDS |
    exports.Permissions.MANAGE_THREADS |
    exports.Permissions.CREATE_PUBLIC_THREADS |
    exports.Permissions.CREATE_PRIVATE_THREADS |
    exports.Permissions.USE_EXTERNAL_STICKERS |
    exports.Permissions.SEND_MESSAGES_IN_THREADS;
exports.AllVoicePermissions = exports.Permissions.CREATE_INSTANT_INVITE |
    exports.Permissions.MANAGE_CHANNELS |
    exports.Permissions.PRIORITY_SPEAKER |
    exports.Permissions.STREAM |
    exports.Permissions.VIEW_CHANNEL |
    exports.Permissions.CONNECT |
    exports.Permissions.SPEAK |
    exports.Permissions.MUTE_MEMBERS |
    exports.Permissions.DEAFEN_MEMBERS |
    exports.Permissions.MOVE_MEMBERS |
    exports.Permissions.USE_VAD |
    exports.Permissions.MANAGE_ROLES |
    exports.Permissions.REQUEST_TO_SPEAK |
    exports.Permissions.USE_EMBEDDED_ACTIVITIES;
exports.AllPermissions = exports.AllGuildPermissions | exports.AllTextPermissions | exports.AllVoicePermissions;
var ChannelFlags;
(function (ChannelFlags) {
    ChannelFlags[ChannelFlags["GUILD_FEED_REMOVED"] = 1] = "GUILD_FEED_REMOVED";
    /** For threads, if this thread is pinned in a forum channel. */
    ChannelFlags[ChannelFlags["PINNED"] = 2] = "PINNED";
    ChannelFlags[ChannelFlags["ACTIVE_CHANNELS_REMOVED"] = 4] = "ACTIVE_CHANNELS_REMOVED";
    /** For forums, if tags are required when creating threads. */
    ChannelFlags[ChannelFlags["REQUIRE_TAG"] = 16] = "REQUIRE_TAG";
    ChannelFlags[ChannelFlags["IS_SPAM"] = 32] = "IS_SPAM";
})(ChannelFlags = exports.ChannelFlags || (exports.ChannelFlags = {}));
var SortOrderTypes;
(function (SortOrderTypes) {
    /** Sort forum threads by activity. */
    SortOrderTypes[SortOrderTypes["LATEST_ACTIVITY"] = 0] = "LATEST_ACTIVITY";
    /** Sort forum threads by creation time (from most recent to oldest). */
    SortOrderTypes[SortOrderTypes["CREATION_DATE"] = 1] = "CREATION_DATE";
})(SortOrderTypes = exports.SortOrderTypes || (exports.SortOrderTypes = {}));
var ForumLayoutTypes;
(function (ForumLayoutTypes) {
    /** A preferred forum layout hasn't been set by a server admin. */
    ForumLayoutTypes[ForumLayoutTypes["DEFAULT"] = 0] = "DEFAULT";
    /** List View: display forum posts in a text-focused list. */
    ForumLayoutTypes[ForumLayoutTypes["LIST"] = 1] = "LIST";
    /** Gallery View: display forum posts in a media-focused gallery. */
    ForumLayoutTypes[ForumLayoutTypes["GRID"] = 2] = "GRID";
})(ForumLayoutTypes = exports.ForumLayoutTypes || (exports.ForumLayoutTypes = {}));
var OAuthScopes;
(function (OAuthScopes) {
    /** allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval */
    OAuthScopes["ACTIVITIES_READ"] = "activities.read";
    /** allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR [GAMESDK ACTIVITY MANAGER](https://discord.com/developers/docs/game-sdk/activities)) */
    OAuthScopes["ACTIVITIES_WRITE"] = "activities.write";
    /** allows your app to read build data for a user's applications */
    OAuthScopes["APPLICATIONS_BUILDS_READ"] = "applications.builds.read";
    /** allows your app to upload/update builds for a user's applications - requires Discord approval */
    OAuthScopes["APPLICATIONS_BUILDS_UPLOAD"] = "applications.builds.upload";
    /** allows your app to use [commands](https://discord.com/developers/docs/interactions/application-commands) in a guild */
    OAuthScopes["APPLICATIONS_COMMANDS"] = "applications.commands";
    OAuthScopes["APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE"] = "applications.commands.permissions.update";
    /** allows your app to update its [commands](https://discord.com/developers/docs/interactions/application-commands) using a Bearer token - [client credentials grant](https://discord.com/developers/docs/topics/oauth2#client-credentials-grant) only */
    OAuthScopes["APPLICATIONS_COMMANDS_UPDATE"] = "applications.commands.update";
    /** allows your app to read entitlements for a user's applications */
    OAuthScopes["APPLICATIONS_ENTITLEMENTS"] = "applications.entitlements";
    /** allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications */
    OAuthScopes["APPLICATIONS_STORE_UPDATE"] = "applications.store.update";
    /** for oauth2 bots, this puts the bot in the user's selected guild by default */
    OAuthScopes["BOT"] = "bot";
    /** allows [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections) to return linked third-party accounts */
    OAuthScopes["CONNECTIONS"] = "connections";
    /** allows your app to see information about the user's DMs and group DMs - requires Discord approval */
    OAuthScopes["DM_CHANNELS_READ"] = "dm_channels.read";
    /** enables [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) to return an `email` */
    OAuthScopes["EMAIL"] = "email";
    /** allows your app to [join users to a group dm](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient) */
    OAuthScopes["GDM_JOIN"] = "gdm.join";
    /** allows [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds) to return basic information about all of a user's guilds */
    OAuthScopes["GUILDS"] = "guilds";
    /** allows [/guilds/\{guild.id\}/members/\{user.id\}](https://discord.com/developers/docs/resources/guild#add-guild-member) to be used for joining users to a guild */
    OAuthScopes["GUILDS_JOIN"] = "guilds.join";
    /** allows [/users/@me/guilds/\{guild.id\}/member](https://discord.com/developers/docs/resources/user#get-current-user-guild-member) to return a user's member information in a guild */
    OAuthScopes["GUILDS_MEMBERS_READ"] = "guilds.members.read";
    /** allows [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) without `email` */
    OAuthScopes["IDENTIFY"] = "identify";
    /** for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) */
    OAuthScopes["MESSAGES_READ"] = "messages.read";
    /** allows your app to know a user's friends and implicit relationships - requires Discord approval */
    OAuthScopes["RELATIONSHIPS_READ"] = "relationships.read";
    /** allows your app to update a user's connection and metadata for the app */
    OAuthScopes["ROLE_CONNECTIONS_WRITE"] = "role_connection.write";
    /** for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval */
    OAuthScopes["RPC"] = "rpc";
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    OAuthScopes["RPC_ACTIVITIES_READ"] = "rpc.activities.read";
    /** for local rpc server access, this allows you to update a user's activity - requires Discord approval */
    OAuthScopes["RPC_ACTIVITIES_WRITE"] = "rpc.activities.write";
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    OAuthScopes["RPC_NOTIFICATIONS_READ"] = "rpc.notifications.read";
    /** for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval */
    OAuthScopes["RPC_VOICE_READ"] = "rpc.voice.read";
    /** for local rpc server access, this allows you to update a user's voice settings - requires Discord approval */
    OAuthScopes["RPC_VOICE_WRITE"] = "rpc.voice.write";
    /** allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval */
    OAuthScopes["VOICE"] = "voice";
    /** This generates a webhook that is returned in the oauth token response for authorization code grants. */
    OAuthScopes["WEBHOOK_INCOMING"] = "webhook.incoming";
})(OAuthScopes = exports.OAuthScopes || (exports.OAuthScopes = {}));
var ComponentTypes;
(function (ComponentTypes) {
    ComponentTypes[ComponentTypes["ACTION_ROW"] = 1] = "ACTION_ROW";
    ComponentTypes[ComponentTypes["BUTTON"] = 2] = "BUTTON";
    ComponentTypes[ComponentTypes["STRING_SELECT"] = 3] = "STRING_SELECT";
    ComponentTypes[ComponentTypes["TEXT_INPUT"] = 4] = "TEXT_INPUT";
    ComponentTypes[ComponentTypes["USER_SELECT"] = 5] = "USER_SELECT";
    ComponentTypes[ComponentTypes["ROLE_SELECT"] = 6] = "ROLE_SELECT";
    ComponentTypes[ComponentTypes["MENTIONABLE_SELECT"] = 7] = "MENTIONABLE_SELECT";
    ComponentTypes[ComponentTypes["CHANNEL_SELECT"] = 8] = "CHANNEL_SELECT";
})(ComponentTypes = exports.ComponentTypes || (exports.ComponentTypes = {}));
var ButtonStyles;
(function (ButtonStyles) {
    ButtonStyles[ButtonStyles["PRIMARY"] = 1] = "PRIMARY";
    ButtonStyles[ButtonStyles["SECONDARY"] = 2] = "SECONDARY";
    ButtonStyles[ButtonStyles["SUCCESS"] = 3] = "SUCCESS";
    ButtonStyles[ButtonStyles["DANGER"] = 4] = "DANGER";
    ButtonStyles[ButtonStyles["LINK"] = 5] = "LINK";
})(ButtonStyles = exports.ButtonStyles || (exports.ButtonStyles = {}));
var TextInputStyles;
(function (TextInputStyles) {
    TextInputStyles[TextInputStyles["SHORT"] = 1] = "SHORT";
    TextInputStyles[TextInputStyles["PARAGRAPH"] = 2] = "PARAGRAPH";
})(TextInputStyles = exports.TextInputStyles || (exports.TextInputStyles = {}));
var MessageFlags;
(function (MessageFlags) {
    MessageFlags[MessageFlags["CROSSPOSTED"] = 1] = "CROSSPOSTED";
    MessageFlags[MessageFlags["IS_CROSSPOST"] = 2] = "IS_CROSSPOST";
    MessageFlags[MessageFlags["SUPPRESS_EMBEDS"] = 4] = "SUPPRESS_EMBEDS";
    MessageFlags[MessageFlags["SOURCE_MESSAGE_DELETED"] = 8] = "SOURCE_MESSAGE_DELETED";
    MessageFlags[MessageFlags["URGENT"] = 16] = "URGENT";
    MessageFlags[MessageFlags["HAS_THREAD"] = 32] = "HAS_THREAD";
    MessageFlags[MessageFlags["EPHEMERAL"] = 64] = "EPHEMERAL";
    MessageFlags[MessageFlags["LOADING"] = 128] = "LOADING";
    MessageFlags[MessageFlags["FAILED_TO_MENTION_SOME_ROLES_IN_THREAD"] = 256] = "FAILED_TO_MENTION_SOME_ROLES_IN_THREAD";
    MessageFlags[MessageFlags["SHOULD_SHOW_LINK_NOT_DISCORD_WARNING"] = 1024] = "SHOULD_SHOW_LINK_NOT_DISCORD_WARNING";
})(MessageFlags = exports.MessageFlags || (exports.MessageFlags = {}));
var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["DEFAULT"] = 0] = "DEFAULT";
    MessageTypes[MessageTypes["RECIPIENT_ADD"] = 1] = "RECIPIENT_ADD";
    MessageTypes[MessageTypes["RECIPIENT_REMOVE"] = 2] = "RECIPIENT_REMOVE";
    MessageTypes[MessageTypes["CALL"] = 3] = "CALL";
    MessageTypes[MessageTypes["CHANNEL_NAME_CHANGE"] = 4] = "CHANNEL_NAME_CHANGE";
    MessageTypes[MessageTypes["CHANNEL_ICON_CHANGE"] = 5] = "CHANNEL_ICON_CHANGE";
    MessageTypes[MessageTypes["CHANNEL_PINNED_MESSAGE"] = 6] = "CHANNEL_PINNED_MESSAGE";
    MessageTypes[MessageTypes["USER_JOIN"] = 7] = "USER_JOIN";
    MessageTypes[MessageTypes["GUILD_BOOST"] = 8] = "GUILD_BOOST";
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_1"] = 9] = "GUILD_BOOST_TIER_1";
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_2"] = 10] = "GUILD_BOOST_TIER_2";
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_3"] = 11] = "GUILD_BOOST_TIER_3";
    MessageTypes[MessageTypes["CHANNEL_FOLLOW_ADD"] = 12] = "CHANNEL_FOLLOW_ADD";
    MessageTypes[MessageTypes["GUILD_STREAM"] = 13] = "GUILD_STREAM";
    MessageTypes[MessageTypes["GUILD_DISCOVERY_DISQUALIFIED"] = 14] = "GUILD_DISCOVERY_DISQUALIFIED";
    MessageTypes[MessageTypes["GUILD_DISCOVERY_REQUALIFIED"] = 15] = "GUILD_DISCOVERY_REQUALIFIED";
    MessageTypes[MessageTypes["GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING"] = 16] = "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING";
    MessageTypes[MessageTypes["GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING"] = 17] = "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING";
    MessageTypes[MessageTypes["THREAD_CREATED"] = 18] = "THREAD_CREATED";
    MessageTypes[MessageTypes["REPLY"] = 19] = "REPLY";
    MessageTypes[MessageTypes["CHAT_INPUT_COMMAND"] = 20] = "CHAT_INPUT_COMMAND";
    MessageTypes[MessageTypes["THREAD_STARTER_MESSAGE"] = 21] = "THREAD_STARTER_MESSAGE";
    MessageTypes[MessageTypes["GUILD_INVITE_REMINDER"] = 22] = "GUILD_INVITE_REMINDER";
    MessageTypes[MessageTypes["CONTEXT_MENU_COMMAND"] = 23] = "CONTEXT_MENU_COMMAND";
    MessageTypes[MessageTypes["AUTO_MODERATION_ACTION"] = 24] = "AUTO_MODERATION_ACTION";
    MessageTypes[MessageTypes["ROLE_SUBSCRIPTION_PURCHASE"] = 25] = "ROLE_SUBSCRIPTION_PURCHASE";
    MessageTypes[MessageTypes["INTERACTION_PREMIUM_UPSELL"] = 26] = "INTERACTION_PREMIUM_UPSELL";
    MessageTypes[MessageTypes["STAGE_START"] = 27] = "STAGE_START";
    MessageTypes[MessageTypes["STAGE_END"] = 28] = "STAGE_END";
    MessageTypes[MessageTypes["STAGE_SPEAKER"] = 29] = "STAGE_SPEAKER";
    MessageTypes[MessageTypes["STAGE_RAISE_HAND"] = 30] = "STAGE_RAISE_HAND";
    MessageTypes[MessageTypes["STAGE_TOPIC_CHANGE"] = 31] = "STAGE_TOPIC_CHANGE";
    MessageTypes[MessageTypes["GUILD_APPLICATION_PREMIUM_SUBSCRIPTION"] = 32] = "GUILD_APPLICATION_PREMIUM_SUBSCRIPTION";
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
var MessageActivityTypes;
(function (MessageActivityTypes) {
    MessageActivityTypes[MessageActivityTypes["JOIN"] = 1] = "JOIN";
    MessageActivityTypes[MessageActivityTypes["SPECTATE"] = 2] = "SPECTATE";
    MessageActivityTypes[MessageActivityTypes["LISTEN"] = 3] = "LISTEN";
    MessageActivityTypes[MessageActivityTypes["JOIN_REQUEST"] = 5] = "JOIN_REQUEST";
})(MessageActivityTypes = exports.MessageActivityTypes || (exports.MessageActivityTypes = {}));
var InteractionTypes;
(function (InteractionTypes) {
    InteractionTypes[InteractionTypes["PING"] = 1] = "PING";
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
    InteractionTypes[InteractionTypes["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
    InteractionTypes[InteractionTypes["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
})(InteractionTypes = exports.InteractionTypes || (exports.InteractionTypes = {}));
var InviteTargetTypes;
(function (InviteTargetTypes) {
    InviteTargetTypes[InviteTargetTypes["STREAM"] = 1] = "STREAM";
    InviteTargetTypes[InviteTargetTypes["EMBEDDED_APPLICATION"] = 2] = "EMBEDDED_APPLICATION";
    InviteTargetTypes[InviteTargetTypes["ROLE_SUBSCRIPTIONS_PURCHASE"] = 3] = "ROLE_SUBSCRIPTIONS_PURCHASE";
})(InviteTargetTypes = exports.InviteTargetTypes || (exports.InviteTargetTypes = {}));
var StageInstancePrivacyLevels;
(function (StageInstancePrivacyLevels) {
    /** @deprecated */
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["PUBLIC"] = 1] = "PUBLIC";
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(StageInstancePrivacyLevels = exports.StageInstancePrivacyLevels || (exports.StageInstancePrivacyLevels = {}));
var ApplicationCommandTypes;
(function (ApplicationCommandTypes) {
    ApplicationCommandTypes[ApplicationCommandTypes["CHAT_INPUT"] = 1] = "CHAT_INPUT";
    ApplicationCommandTypes[ApplicationCommandTypes["USER"] = 2] = "USER";
    ApplicationCommandTypes[ApplicationCommandTypes["MESSAGE"] = 3] = "MESSAGE";
})(ApplicationCommandTypes = exports.ApplicationCommandTypes || (exports.ApplicationCommandTypes = {}));
var ApplicationCommandOptionTypes;
(function (ApplicationCommandOptionTypes) {
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["STRING"] = 3] = "STRING";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["INTEGER"] = 4] = "INTEGER";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["BOOLEAN"] = 5] = "BOOLEAN";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["USER"] = 6] = "USER";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["CHANNEL"] = 7] = "CHANNEL";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ROLE"] = 8] = "ROLE";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["MENTIONABLE"] = 9] = "MENTIONABLE";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["NUMBER"] = 10] = "NUMBER";
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ATTACHMENT"] = 11] = "ATTACHMENT";
})(ApplicationCommandOptionTypes = exports.ApplicationCommandOptionTypes || (exports.ApplicationCommandOptionTypes = {}));
var ApplicationCommandPermissionTypes;
(function (ApplicationCommandPermissionTypes) {
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["ROLE"] = 1] = "ROLE";
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["USER"] = 2] = "USER";
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["CHANNEL"] = 3] = "CHANNEL";
})(ApplicationCommandPermissionTypes = exports.ApplicationCommandPermissionTypes || (exports.ApplicationCommandPermissionTypes = {}));
var InteractionResponseTypes;
(function (InteractionResponseTypes) {
    InteractionResponseTypes[InteractionResponseTypes["PONG"] = 1] = "PONG";
    InteractionResponseTypes[InteractionResponseTypes["CHANNEL_MESSAGE_WITH_SOURCE"] = 4] = "CHANNEL_MESSAGE_WITH_SOURCE";
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"] = 5] = "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_UPDATE_MESSAGE"] = 6] = "DEFERRED_UPDATE_MESSAGE";
    InteractionResponseTypes[InteractionResponseTypes["UPDATE_MESSAGE"] = 7] = "UPDATE_MESSAGE";
    InteractionResponseTypes[InteractionResponseTypes["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"] = 8] = "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT";
    InteractionResponseTypes[InteractionResponseTypes["MODAL"] = 9] = "MODAL";
})(InteractionResponseTypes = exports.InteractionResponseTypes || (exports.InteractionResponseTypes = {}));
var Intents;
(function (Intents) {
    Intents[Intents["GUILDS"] = 1] = "GUILDS";
    Intents[Intents["GUILD_MEMBERS"] = 2] = "GUILD_MEMBERS";
    Intents[Intents["GUILD_BANS"] = 4] = "GUILD_BANS";
    Intents[Intents["GUILD_EMOJIS_AND_STICKERS"] = 8] = "GUILD_EMOJIS_AND_STICKERS";
    Intents[Intents["GUILD_INTEGRATIONS"] = 16] = "GUILD_INTEGRATIONS";
    Intents[Intents["GUILD_WEBHOOKS"] = 32] = "GUILD_WEBHOOKS";
    Intents[Intents["GUILD_INVITES"] = 64] = "GUILD_INVITES";
    Intents[Intents["GUILD_VOICE_STATES"] = 128] = "GUILD_VOICE_STATES";
    Intents[Intents["GUILD_PRESENCES"] = 256] = "GUILD_PRESENCES";
    Intents[Intents["GUILD_MESSAGES"] = 512] = "GUILD_MESSAGES";
    Intents[Intents["GUILD_MESSAGE_REACTIONS"] = 1024] = "GUILD_MESSAGE_REACTIONS";
    Intents[Intents["GUILD_MESSAGE_TYPING"] = 2048] = "GUILD_MESSAGE_TYPING";
    Intents[Intents["DIRECT_MESSAGES"] = 4096] = "DIRECT_MESSAGES";
    Intents[Intents["DIRECT_MESSAGE_REACTIONS"] = 8192] = "DIRECT_MESSAGE_REACTIONS";
    Intents[Intents["DIRECT_MESSAGE_TYPING"] = 16384] = "DIRECT_MESSAGE_TYPING";
    Intents[Intents["MESSAGE_CONTENT"] = 32768] = "MESSAGE_CONTENT";
    Intents[Intents["GUILD_SCHEDULED_EVENTS"] = 65536] = "GUILD_SCHEDULED_EVENTS";
    Intents[Intents["AUTO_MODERATION_CONFIGURATION"] = 131072] = "AUTO_MODERATION_CONFIGURATION";
    Intents[Intents["AUTO_MODERATION_EXECUTION"] = 262144] = "AUTO_MODERATION_EXECUTION";
})(Intents = exports.Intents || (exports.Intents = {}));
exports.AllNonPrivilegedIntents = Intents.GUILDS |
    Intents.GUILD_BANS |
    Intents.GUILD_EMOJIS_AND_STICKERS |
    Intents.GUILD_INTEGRATIONS |
    Intents.GUILD_WEBHOOKS |
    Intents.GUILD_INVITES |
    Intents.GUILD_VOICE_STATES |
    Intents.GUILD_MESSAGES |
    Intents.GUILD_MESSAGE_REACTIONS |
    Intents.GUILD_MESSAGE_TYPING |
    Intents.DIRECT_MESSAGES |
    Intents.DIRECT_MESSAGE_REACTIONS |
    Intents.DIRECT_MESSAGE_TYPING |
    Intents.GUILD_SCHEDULED_EVENTS |
    Intents.AUTO_MODERATION_CONFIGURATION |
    Intents.AUTO_MODERATION_EXECUTION;
exports.AllPrivilegedIntents = Intents.GUILD_MEMBERS |
    Intents.GUILD_PRESENCES |
    Intents.MESSAGE_CONTENT;
exports.AllIntents = exports.AllNonPrivilegedIntents | exports.AllPrivilegedIntents;
var GatewayOPCodes;
(function (GatewayOPCodes) {
    GatewayOPCodes[GatewayOPCodes["DISPATCH"] = 0] = "DISPATCH";
    GatewayOPCodes[GatewayOPCodes["HEARTBEAT"] = 1] = "HEARTBEAT";
    GatewayOPCodes[GatewayOPCodes["IDENTIFY"] = 2] = "IDENTIFY";
    GatewayOPCodes[GatewayOPCodes["PRESENCE_UPDATE"] = 3] = "PRESENCE_UPDATE";
    GatewayOPCodes[GatewayOPCodes["VOICE_STATE_UPDATE"] = 4] = "VOICE_STATE_UPDATE";
    GatewayOPCodes[GatewayOPCodes["RESUME"] = 6] = "RESUME";
    GatewayOPCodes[GatewayOPCodes["RECONNECT"] = 7] = "RECONNECT";
    GatewayOPCodes[GatewayOPCodes["REQUEST_GUILD_MEMBERS"] = 8] = "REQUEST_GUILD_MEMBERS";
    GatewayOPCodes[GatewayOPCodes["INVALID_SESSION"] = 9] = "INVALID_SESSION";
    GatewayOPCodes[GatewayOPCodes["HELLO"] = 10] = "HELLO";
    GatewayOPCodes[GatewayOPCodes["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
})(GatewayOPCodes = exports.GatewayOPCodes || (exports.GatewayOPCodes = {}));
var GatewayCloseCodes;
(function (GatewayCloseCodes) {
    GatewayCloseCodes[GatewayCloseCodes["UNKNOWN_ERROR"] = 4000] = "UNKNOWN_ERROR";
    GatewayCloseCodes[GatewayCloseCodes["UNKNOWN_OPCODE"] = 4001] = "UNKNOWN_OPCODE";
    GatewayCloseCodes[GatewayCloseCodes["DECODE_ERROR"] = 4002] = "DECODE_ERROR";
    GatewayCloseCodes[GatewayCloseCodes["NOT_AUTHENTICATED"] = 4003] = "NOT_AUTHENTICATED";
    GatewayCloseCodes[GatewayCloseCodes["AUTHENTICATION_FAILED"] = 4004] = "AUTHENTICATION_FAILED";
    GatewayCloseCodes[GatewayCloseCodes["ALREADY_AUTHENTICATED"] = 4005] = "ALREADY_AUTHENTICATED";
    GatewayCloseCodes[GatewayCloseCodes["INVALID_SEQUENCE"] = 4007] = "INVALID_SEQUENCE";
    GatewayCloseCodes[GatewayCloseCodes["RATE_LIMITED"] = 4008] = "RATE_LIMITED";
    GatewayCloseCodes[GatewayCloseCodes["SESSION_TIMEOUT"] = 4009] = "SESSION_TIMEOUT";
    GatewayCloseCodes[GatewayCloseCodes["INVALID_SHARD"] = 4010] = "INVALID_SHARD";
    GatewayCloseCodes[GatewayCloseCodes["SHARDING_REQUIRED"] = 4011] = "SHARDING_REQUIRED";
    GatewayCloseCodes[GatewayCloseCodes["INVALID_API_VERSION"] = 4012] = "INVALID_API_VERSION";
    GatewayCloseCodes[GatewayCloseCodes["INVALID_INTENTS"] = 4013] = "INVALID_INTENTS";
    GatewayCloseCodes[GatewayCloseCodes["DISALLOWED_INTENTS"] = 4014] = "DISALLOWED_INTENTS";
})(GatewayCloseCodes = exports.GatewayCloseCodes || (exports.GatewayCloseCodes = {}));
var VoiceOPCodes;
(function (VoiceOPCodes) {
    VoiceOPCodes[VoiceOPCodes["IDENTIFY"] = 0] = "IDENTIFY";
    VoiceOPCodes[VoiceOPCodes["SELECT_PROTOCOL"] = 1] = "SELECT_PROTOCOL";
    VoiceOPCodes[VoiceOPCodes["READY"] = 2] = "READY";
    VoiceOPCodes[VoiceOPCodes["HEARTBEAT"] = 3] = "HEARTBEAT";
    VoiceOPCodes[VoiceOPCodes["SESSION_DESCRIPTION"] = 4] = "SESSION_DESCRIPTION";
    VoiceOPCodes[VoiceOPCodes["SPEAKING"] = 5] = "SPEAKING";
    VoiceOPCodes[VoiceOPCodes["HEARTBEAT_ACK"] = 6] = "HEARTBEAT_ACK";
    VoiceOPCodes[VoiceOPCodes["RESUME"] = 7] = "RESUME";
    VoiceOPCodes[VoiceOPCodes["HELLO"] = 8] = "HELLO";
    VoiceOPCodes[VoiceOPCodes["RESUMED"] = 9] = "RESUMED";
    VoiceOPCodes[VoiceOPCodes["CLIENT_DISCONNECT"] = 13] = "CLIENT_DISCONNECT";
})(VoiceOPCodes = exports.VoiceOPCodes || (exports.VoiceOPCodes = {}));
var VoiceCloseCodes;
(function (VoiceCloseCodes) {
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_OPCODE"] = 4001] = "UNKNOWN_OPCODE";
    VoiceCloseCodes[VoiceCloseCodes["DECODE_ERROR"] = 4002] = "DECODE_ERROR";
    VoiceCloseCodes[VoiceCloseCodes["NOT_AUTHENTICATED"] = 4003] = "NOT_AUTHENTICATED";
    VoiceCloseCodes[VoiceCloseCodes["AUTHENTICATION_FAILED"] = 4004] = "AUTHENTICATION_FAILED";
    VoiceCloseCodes[VoiceCloseCodes["ALREADY_AUTHENTICATED"] = 4005] = "ALREADY_AUTHENTICATED";
    VoiceCloseCodes[VoiceCloseCodes["INVALID_SESSION"] = 4006] = "INVALID_SESSION";
    VoiceCloseCodes[VoiceCloseCodes["SESSION_TIMEOUT"] = 4009] = "SESSION_TIMEOUT";
    VoiceCloseCodes[VoiceCloseCodes["SERVER_NOT_FOUND"] = 4011] = "SERVER_NOT_FOUND";
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_PROTOCOL"] = 4012] = "UNKNOWN_PROTOCOL";
    VoiceCloseCodes[VoiceCloseCodes["DISCONNECTED"] = 4013] = "DISCONNECTED";
    VoiceCloseCodes[VoiceCloseCodes["VOICE_SERVER_CRASHED"] = 4014] = "VOICE_SERVER_CRASHED";
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_ENCRYPTION_MODE"] = 4015] = "UNKNOWN_ENCRYPTION_MODE";
})(VoiceCloseCodes = exports.VoiceCloseCodes || (exports.VoiceCloseCodes = {}));
var HubTypes;
(function (HubTypes) {
    HubTypes[HubTypes["DEFAULT"] = 0] = "DEFAULT";
    HubTypes[HubTypes["HIGH_SCHOOL"] = 1] = "HIGH_SCHOOL";
    HubTypes[HubTypes["COLLEGE"] = 2] = "COLLEGE";
})(HubTypes = exports.HubTypes || (exports.HubTypes = {}));
var ActivityTypes;
(function (ActivityTypes) {
    ActivityTypes[ActivityTypes["GAME"] = 0] = "GAME";
    ActivityTypes[ActivityTypes["STREAMING"] = 1] = "STREAMING";
    ActivityTypes[ActivityTypes["LISTENING"] = 2] = "LISTENING";
    ActivityTypes[ActivityTypes["WATCHING"] = 3] = "WATCHING";
    ActivityTypes[ActivityTypes["CUSTOM"] = 4] = "CUSTOM";
    ActivityTypes[ActivityTypes["COMPETING"] = 5] = "COMPETING";
})(ActivityTypes = exports.ActivityTypes || (exports.ActivityTypes = {}));
var ActivityFlags;
(function (ActivityFlags) {
    ActivityFlags[ActivityFlags["INSTANCE"] = 1] = "INSTANCE";
    ActivityFlags[ActivityFlags["JOIN"] = 2] = "JOIN";
    ActivityFlags[ActivityFlags["SPECTATE"] = 4] = "SPECTATE";
    ActivityFlags[ActivityFlags["JOIN_REQUEST"] = 8] = "JOIN_REQUEST";
    ActivityFlags[ActivityFlags["SYNC"] = 16] = "SYNC";
    ActivityFlags[ActivityFlags["PLAY"] = 32] = "PLAY";
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_FRIENDS_ONLY"] = 64] = "PARTY_PRIVACY_FRIENDS_ONLY";
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_VOICE_CHANNEL"] = 128] = "PARTY_PRIVACY_VOICE_CHANNEL";
    ActivityFlags[ActivityFlags["EMBEDDED"] = 256] = "EMBEDDED";
})(ActivityFlags = exports.ActivityFlags || (exports.ActivityFlags = {}));
var ThreadMemberFlags;
(function (ThreadMemberFlags) {
    ThreadMemberFlags[ThreadMemberFlags["HAS_INTERACTED"] = 1] = "HAS_INTERACTED";
    ThreadMemberFlags[ThreadMemberFlags["ALL_MESSAGES"] = 2] = "ALL_MESSAGES";
    ThreadMemberFlags[ThreadMemberFlags["ONLY_MENTIONS"] = 4] = "ONLY_MENTIONS";
    ThreadMemberFlags[ThreadMemberFlags["NO_MESSAGES"] = 8] = "NO_MESSAGES";
})(ThreadMemberFlags = exports.ThreadMemberFlags || (exports.ThreadMemberFlags = {}));
var RoleConnectionMetadataTypes;
(function (RoleConnectionMetadataTypes) {
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_LESS_THAN_OR_EQUAL"] = 1] = "INTEGER_LESS_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_GREATER_THAN_OR_EQUAL"] = 2] = "INTEGER_GREATER_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_EQUAL"] = 3] = "INTEGER_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_NOT_EQUAL"] = 4] = "INTEGER_NOT_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_LESS_THAN_OR_EQUAL"] = 5] = "DATETIME_LESS_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_GREATER_THAN_OR_EQUAL"] = 6] = "DATETIME_GREATER_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_EQUAL"] = 7] = "BOOLEAN_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_NOT_EQUAL"] = 8] = "BOOLEAN_NOT_EQUAL";
})(RoleConnectionMetadataTypes = exports.RoleConnectionMetadataTypes || (exports.RoleConnectionMetadataTypes = {}));
// entries are intentionally not aligned
/** The error codes that can be received. See [Discord's Documentation](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json). */
var JSONErrorCodes;
(function (JSONErrorCodes) {
    JSONErrorCodes[JSONErrorCodes["GENERAL_ERROR"] = 0] = "GENERAL_ERROR";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ACCOUNT"] = 10001] = "UNKNOWN_ACCOUNT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_APPLICATION"] = 10002] = "UNKNOWN_APPLICATION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_CHANNEL"] = 10003] = "UNKNOWN_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD"] = 10004] = "UNKNOWN_GUILD";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_INTEGRATION"] = 10005] = "UNKNOWN_INTEGRATION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_INVITE"] = 10006] = "UNKNOWN_INVITE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_MEMBER"] = 10007] = "UNKNOWN_MEMBER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_MESSAGE"] = 10008] = "UNKNOWN_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_OVERWRITE"] = 10009] = "UNKNOWN_OVERWRITE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_PROVIDER"] = 10010] = "UNKNOWN_PROVIDER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ROLE"] = 10011] = "UNKNOWN_ROLE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_TOKEN"] = 10012] = "UNKNOWN_TOKEN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_USER"] = 10013] = "UNKNOWN_USER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_EMOJI"] = 10014] = "UNKNOWN_EMOJI";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_WEBHOOK"] = 10015] = "UNKNOWN_WEBHOOK";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_WEBHOOK_SERVICE"] = 10016] = "UNKNOWN_WEBHOOK_SERVICE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_SESSION"] = 10020] = "UNKNOWN_SESSION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_BAN"] = 10026] = "UNKNOWN_BAN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_SKU"] = 10027] = "UNKNOWN_SKU";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STORE_LISTING"] = 10028] = "UNKNOWN_STORE_LISTING";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ENTITLEMENT"] = 10029] = "UNKNOWN_ENTITLEMENT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_BUILD"] = 10030] = "UNKNOWN_BUILD";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_LOBBY"] = 10031] = "UNKNOWN_LOBBY";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_BRANCH"] = 10032] = "UNKNOWN_BRANCH";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STORE_DIRECTORY_LAYOUT"] = 10036] = "UNKNOWN_STORE_DIRECTORY_LAYOUT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_REDISTRIBUTABLE"] = 10037] = "UNKNOWN_REDISTRIBUTABLE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GIFT_CODE"] = 10038] = "UNKNOWN_GIFT_CODE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STREAM"] = 10049] = "UNKNOWN_STREAM";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN"] = 10050] = "UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_TEMPLATE"] = 10057] = "UNKNOWN_GUILD_TEMPLATE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_DISCOVERABLE_SERVER_CATEGORY"] = 10059] = "UNKNOWN_DISCOVERABLE_SERVER_CATEGORY";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STICKER"] = 10060] = "UNKNOWN_STICKER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_INTERACTION"] = 10062] = "UNKNOWN_INTERACTION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_APPLICATION_COMMAND"] = 10063] = "UNKNOWN_APPLICATION_COMMAND";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_APPLICATION_COMMAND_PERMISSIONS"] = 10066] = "UNKNOWN_APPLICATION_COMMAND_PERMISSIONS";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STAGE_INSTANCE"] = 10067] = "UNKNOWN_STAGE_INSTANCE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM"] = 10068] = "UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_WELCOME_SCREEN"] = 10069] = "UNKNOWN_GUILD_WELCOME_SCREEN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_SCHEDULED_EVENT"] = 10070] = "UNKNOWN_GUILD_SCHEDULED_EVENT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_SCHEDULED_EVENT_USER"] = 10071] = "UNKNOWN_GUILD_SCHEDULED_EVENT_USER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_TAG"] = 10087] = "UNKNOWN_TAG";
    JSONErrorCodes[JSONErrorCodes["BOTS_CANNOT_USE_THIS_ENDPOINT"] = 20001] = "BOTS_CANNOT_USE_THIS_ENDPOINT";
    JSONErrorCodes[JSONErrorCodes["ONLY_BOTS_CAN_USE_THIS_ENDPOINT"] = 20002] = "ONLY_BOTS_CAN_USE_THIS_ENDPOINT";
    JSONErrorCodes[JSONErrorCodes["EXPLICIT_CONTENT"] = 20009] = "EXPLICIT_CONTENT";
    JSONErrorCodes[JSONErrorCodes["NOT_AUTHORIZED_FOR_APPLICATION"] = 20012] = "NOT_AUTHORIZED_FOR_APPLICATION";
    JSONErrorCodes[JSONErrorCodes["SLOWMODE_RATE_LIMIT"] = 20016] = "SLOWMODE_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["ACCOUNT_OWNER_ONLY"] = 20018] = "ACCOUNT_OWNER_ONLY";
    JSONErrorCodes[JSONErrorCodes["ANNOUNCEMENT_EDIT_LIMIT_EXCEEDED"] = 20022] = "ANNOUNCEMENT_EDIT_LIMIT_EXCEEDED";
    JSONErrorCodes[JSONErrorCodes["UNDER_MINIMUM_AGE"] = 20024] = "UNDER_MINIMUM_AGE";
    JSONErrorCodes[JSONErrorCodes["CHANNEL_WRITE_RATE_LIMIT"] = 20028] = "CHANNEL_WRITE_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["GUILD_WRITE_RATE_LIMIT"] = 20029] = "GUILD_WRITE_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["WORDS_NOT_ALLOWED"] = 20031] = "WORDS_NOT_ALLOWED";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_GUILDS"] = 30001] = "MAXIMUM_NUMBER_OF_GUILDS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_FRIENDS"] = 30002] = "MAXIMUM_NUMBER_OF_FRIENDS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_PINS"] = 30003] = "MAXIMUM_NUMBER_OF_PINS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_RECIPIENTS"] = 30004] = "MAXIMUM_NUMBER_OF_RECIPIENTS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_GUILD_ROLES"] = 30005] = "MAXIMUM_NUMBER_OF_GUILD_ROLES";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_WEBHOOKS"] = 30007] = "MAXIMUM_NUMBER_OF_WEBHOOKS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_EMOJIS"] = 30008] = "MAXIMUM_NUMBER_OF_EMOJIS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_REACTIONS"] = 30010] = "MAXIMUM_NUMBER_OF_REACTIONS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_CHANNELS"] = 30013] = "MAXIMUM_NUMBER_OF_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_ATTACHMENTS"] = 30015] = "MAXIMUM_NUMBER_OF_ATTACHMENTS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_INVITES"] = 30016] = "MAXIMUM_NUMBER_OF_INVITES";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_ANIMATED_EMOJIS"] = 30018] = "MAXIMUM_NUMBER_OF_ANIMATED_EMOJIS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_SERVER_MEMBERS"] = 30019] = "MAXIMUM_NUMBER_OF_SERVER_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_SERVER_CATEGORIES"] = 30030] = "MAXIMUM_NUMBER_OF_SERVER_CATEGORIES";
    JSONErrorCodes[JSONErrorCodes["GUILD_ALREADY_HAS_TEMPLATE"] = 30031] = "GUILD_ALREADY_HAS_TEMPLATE";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_APPLICATION_COMMANDS"] = 30032] = "MAXIMUM_NUMBER_OF_APPLICATION_COMMANDS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_THREAD_PARTICIPANTS"] = 30033] = "MAXIMUM_NUMBER_OF_THREAD_PARTICIPANTS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_APPLICATION_COMMAND_CREATES"] = 30034] = "MAXIMUM_NUMBER_OF_APPLICATION_COMMAND_CREATES";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_BANS_FOR_NON_GUILD_MEMBERS"] = 30035] = "MAXIMUM_NUMBER_OF_BANS_FOR_NON_GUILD_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_BAN_FETCHES"] = 30037] = "MAXIMUM_NUMBER_OF_BAN_FETCHES";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_UNCOMPLETED_GUILD_SCHEDULED_EVENTS"] = 30038] = "MAXIMUM_NUMBER_OF_UNCOMPLETED_GUILD_SCHEDULED_EVENTS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_STICKERS"] = 30039] = "MAXIMUM_NUMBER_OF_STICKERS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_PRUNE_REQUESTS"] = 30040] = "MAXIMUM_NUMBER_OF_PRUNE_REQUESTS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_GUILD_WIDGET_SETTINGS_UPDATES"] = 30042] = "MAXIMUM_NUMBER_OF_GUILD_WIDGET_SETTINGS_UPDATES";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OR_EDITS_TO_MESSAGES_OLDER_THAN_1_HOUR"] = 30046] = "MAXIMUM_NUMBER_OR_EDITS_TO_MESSAGES_OLDER_THAN_1_HOUR";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_PINNED_THREADS"] = 30047] = "MAXIMUM_NUMBER_OF_PINNED_THREADS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_FORUM_TAGS"] = 30048] = "MAXIMUM_NUMBER_OF_FORUM_TAGS";
    JSONErrorCodes[JSONErrorCodes["BITRATE_TOO_HIGH"] = 30052] = "BITRATE_TOO_HIGH";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_PREMIUM_EMOJIS"] = 30056] = "MAXIMUM_PREMIUM_EMOJIS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_GUILD_WEBHOOKS"] = 30058] = "MAXIMUM_GUILD_WEBHOOKS";
    JSONErrorCodes[JSONErrorCodes["RESOURCE_RATE_LIMITED"] = 31002] = "RESOURCE_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["UNAUTHORIZED"] = 40001] = "UNAUTHORIZED";
    JSONErrorCodes[JSONErrorCodes["ACCOUNT_VERIFICATION_REQUIRED"] = 40002] = "ACCOUNT_VERIFICATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["DIRECT_MESSAGES_RATE_LIMIT"] = 40003] = "DIRECT_MESSAGES_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["SENDING_MESSAGES_TEMPORARILY_DISABLED"] = 40004] = "SENDING_MESSAGES_TEMPORARILY_DISABLED";
    JSONErrorCodes[JSONErrorCodes["REQUEST_ENTITY_TOO_LARGE"] = 40005] = "REQUEST_ENTITY_TOO_LARGE";
    JSONErrorCodes[JSONErrorCodes["FEATURE_TEMPORARILY_DISABLED"] = 40006] = "FEATURE_TEMPORARILY_DISABLED";
    JSONErrorCodes[JSONErrorCodes["USER_BANNED"] = 40007] = "USER_BANNED";
    JSONErrorCodes[JSONErrorCodes["CONNECTION_REVOKED"] = 40012] = "CONNECTION_REVOKED";
    JSONErrorCodes[JSONErrorCodes["TARGET_USER_NOT_CONNECTED_TO_VOICE"] = 40032] = "TARGET_USER_NOT_CONNECTED_TO_VOICE";
    JSONErrorCodes[JSONErrorCodes["ALREADY_CROSSPOSTED"] = 40033] = "ALREADY_CROSSPOSTED";
    JSONErrorCodes[JSONErrorCodes["APPLICATION_COMMAND_ALREADY_EXISTS"] = 40041] = "APPLICATION_COMMAND_ALREADY_EXISTS";
    JSONErrorCodes[JSONErrorCodes["INTERACTION_FAILED_TO_SEND"] = 40043] = "INTERACTION_FAILED_TO_SEND";
    JSONErrorCodes[JSONErrorCodes["CANNOT_SEND_MESSAGES_IN_FORUM_CHANNEL"] = 40058] = "CANNOT_SEND_MESSAGES_IN_FORUM_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["INTERACTION_ALREADY_ACKNOWLEDGED"] = 40060] = "INTERACTION_ALREADY_ACKNOWLEDGED";
    JSONErrorCodes[JSONErrorCodes["TAG_NAMES_MUST_BE_UNIQUE"] = 40061] = "TAG_NAMES_MUST_BE_UNIQUE";
    JSONErrorCodes[JSONErrorCodes["SERVICE_RESOURCE_RATE_LIMITED"] = 40062] = "SERVICE_RESOURCE_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["NO_NON_MODERATOR_TAGS"] = 40066] = "NO_NON_MODERATOR_TAGS";
    JSONErrorCodes[JSONErrorCodes["TAG_REQUIRED"] = 40067] = "TAG_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["MISSING_ACCESS"] = 50001] = "MISSING_ACCESS";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACCOUNT_TYPE"] = 50002] = "INVALID_ACCOUNT_TYPE";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EXECUTE_ON_DM"] = 50003] = "CANNOT_EXECUTE_ON_DM";
    JSONErrorCodes[JSONErrorCodes["GUILD_WIDGET_DISABLED"] = 50004] = "GUILD_WIDGET_DISABLED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EDIT_MESSAGE_BY_OTHER"] = 50005] = "CANNOT_EDIT_MESSAGE_BY_OTHER";
    JSONErrorCodes[JSONErrorCodes["CANNOT_SEND_EMPTY_MESSAGE"] = 50006] = "CANNOT_SEND_EMPTY_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["CANNOT_MESSAGE_USER"] = 50007] = "CANNOT_MESSAGE_USER";
    JSONErrorCodes[JSONErrorCodes["CANNOT_SEND_MESSAGES_IN_NON_TEXT_CHANNEL"] = 50008] = "CANNOT_SEND_MESSAGES_IN_NON_TEXT_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["CHANNEL_VERIFICATION_LEVEL_TOO_HIGH"] = 50009] = "CHANNEL_VERIFICATION_LEVEL_TOO_HIGH";
    JSONErrorCodes[JSONErrorCodes["OAUTH2_APPLICATION_BOT_ABSENT"] = 50010] = "OAUTH2_APPLICATION_BOT_ABSENT";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_OAUTH2_APPLICATIONS"] = 50011] = "MAXIMUM_OAUTH2_APPLICATIONS";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH_STATE"] = 50012] = "INVALID_OAUTH_STATE";
    JSONErrorCodes[JSONErrorCodes["YOU_LACK_PERMISSIONS"] = 50013] = "YOU_LACK_PERMISSIONS";
    JSONErrorCodes[JSONErrorCodes["INVALID_AUTHENTICATION_TOKEN"] = 50014] = "INVALID_AUTHENTICATION_TOKEN";
    JSONErrorCodes[JSONErrorCodes["NOTE_IS_TOO_LONG"] = 50015] = "NOTE_IS_TOO_LONG";
    JSONErrorCodes[JSONErrorCodes["INVALID_BULK_DELETE_QUANTITY"] = 50016] = "INVALID_BULK_DELETE_QUANTITY";
    JSONErrorCodes[JSONErrorCodes["INVALID_MFA_LEVEL"] = 50017] = "INVALID_MFA_LEVEL";
    JSONErrorCodes[JSONErrorCodes["INVALID_CHANNEL_PIN"] = 50019] = "INVALID_CHANNEL_PIN";
    JSONErrorCodes[JSONErrorCodes["INVALID_OR_TAKEN_INVITE_CODE"] = 50020] = "INVALID_OR_TAKEN_INVITE_CODE";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EXECUTE_ON_SYSTEM_MESSAGE"] = 50021] = "CANNOT_EXECUTE_ON_SYSTEM_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EXECUTE_ON_CHANNEL_TYPE"] = 50024] = "CANNOT_EXECUTE_ON_CHANNEL_TYPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH_TOKEN"] = 50025] = "INVALID_OAUTH_TOKEN";
    JSONErrorCodes[JSONErrorCodes["MISSING_OAUTH_SCOPE"] = 50026] = "MISSING_OAUTH_SCOPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_WEBHOOK_TOKEN"] = 50027] = "INVALID_WEBHOOK_TOKEN";
    JSONErrorCodes[JSONErrorCodes["INVALID_ROLE"] = 50028] = "INVALID_ROLE";
    JSONErrorCodes[JSONErrorCodes["INVALID_RECIPIENTS"] = 50033] = "INVALID_RECIPIENTS";
    JSONErrorCodes[JSONErrorCodes["BULK_DELETE_MESSAGE_TOO_OLD"] = 50034] = "BULK_DELETE_MESSAGE_TOO_OLD";
    JSONErrorCodes[JSONErrorCodes["INVALID_FORM_BODY"] = 50035] = "INVALID_FORM_BODY";
    JSONErrorCodes[JSONErrorCodes["INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT"] = 50036] = "INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_ACTION"] = 500039] = "INVALID_ACTIVITY_ACTION";
    JSONErrorCodes[JSONErrorCodes["INVALID_API_VERSION"] = 50041] = "INVALID_API_VERSION";
    JSONErrorCodes[JSONErrorCodes["FILE_UPLOADED_EXCEEDS_MAXIMUM_SIZE"] = 50045] = "FILE_UPLOADED_EXCEEDS_MAXIMUM_SIZE";
    JSONErrorCodes[JSONErrorCodes["INVALID_FILE_UPLOADED"] = 50046] = "INVALID_FILE_UPLOADED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_SELF_REDEEM_GIFT"] = 50054] = "CANNOT_SELF_REDEEM_GIFT";
    JSONErrorCodes[JSONErrorCodes["INVALID_GUILD"] = 50055] = "INVALID_GUILD";
    JSONErrorCodes[JSONErrorCodes["INVALID_REQUEST_ORIGIN"] = 50067] = "INVALID_REQUEST_ORIGIN";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_TYPE"] = 50068] = "INVALID_MESSAGE_TYPE";
    JSONErrorCodes[JSONErrorCodes["PAYMENT_SOURCE_REQUIRED"] = 50070] = "PAYMENT_SOURCE_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_MODIFY_SYSTEM_WEBHOOK"] = 50073] = "CANNOT_MODIFY_SYSTEM_WEBHOOK";
    JSONErrorCodes[JSONErrorCodes["CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL"] = 50074] = "CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EDIT_MESSAGE_STICKERS"] = 50080] = "CANNOT_EDIT_MESSAGE_STICKERS";
    JSONErrorCodes[JSONErrorCodes["INVALID_STICKER_SENT"] = 50081] = "INVALID_STICKER_SENT";
    JSONErrorCodes[JSONErrorCodes["THREAD_ARCHIVED"] = 50083] = "THREAD_ARCHIVED";
    JSONErrorCodes[JSONErrorCodes["INVALID_THREAD_NOTIFICATION_SETTINGS"] = 50084] = "INVALID_THREAD_NOTIFICATION_SETTINGS";
    JSONErrorCodes[JSONErrorCodes["BEFORE_EARLIER_THAN_THREAD_CREATION_DATE"] = 50085] = "BEFORE_EARLIER_THAN_THREAD_CREATION_DATE";
    JSONErrorCodes[JSONErrorCodes["COMMUNITY_CHANNELS_MUST_BE_TEXT"] = 50086] = "COMMUNITY_CHANNELS_MUST_BE_TEXT";
    JSONErrorCodes[JSONErrorCodes["SERVER_NOT_AVAILABLE_IN_LOCATION"] = 50095] = "SERVER_NOT_AVAILABLE_IN_LOCATION";
    JSONErrorCodes[JSONErrorCodes["MONETIZATION_REQUIRED"] = 50097] = "MONETIZATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["BOOSTS_REQUIRED"] = 50101] = "BOOSTS_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["INVALID_JSON"] = 50109] = "INVALID_JSON";
    JSONErrorCodes[JSONErrorCodes["OWNERSHIP_CANNOT_BE_TRANSFERRED_TO_BOT"] = 50132] = "OWNERSHIP_CANNOT_BE_TRANSFERRED_TO_BOT";
    JSONErrorCodes[JSONErrorCodes["FAILED_TO_RESIZE_ASSET"] = 50138] = "FAILED_TO_RESIZE_ASSET";
    JSONErrorCodes[JSONErrorCodes["CANNOT_MIX_SUBSCRIPTION_AND_NON_SUBSCRIPTION_ROLES"] = 50144] = "CANNOT_MIX_SUBSCRIPTION_AND_NON_SUBSCRIPTION_ROLES";
    JSONErrorCodes[JSONErrorCodes["CANNOT_CONVERT_BETWEEN_PREMIUM_AND_NORMAL_EMOJI"] = 50145] = "CANNOT_CONVERT_BETWEEN_PREMIUM_AND_NORMAL_EMOJI";
    JSONErrorCodes[JSONErrorCodes["UPLOADED_FILE_NOT_FOUND"] = 50146] = "UPLOADED_FILE_NOT_FOUND";
    JSONErrorCodes[JSONErrorCodes["NO_PERMISSION_TO_SEND_STICKER"] = 50600] = "NO_PERMISSION_TO_SEND_STICKER";
    JSONErrorCodes[JSONErrorCodes["TWO_FACTOR_REQUIRED"] = 60003] = "TWO_FACTOR_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["NO_USERS_WITH_DISCORDTAG_EXIST"] = 80004] = "NO_USERS_WITH_DISCORDTAG_EXIST";
    JSONErrorCodes[JSONErrorCodes["REACTION_BLOCKED"] = 90001] = "REACTION_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["INELIGIBLE_FOR_SUBSCRIPTION"] = 100053] = "INELIGIBLE_FOR_SUBSCRIPTION";
    JSONErrorCodes[JSONErrorCodes["APPLICATION_NOT_AVAILABLE"] = 110001] = "APPLICATION_NOT_AVAILABLE";
    JSONErrorCodes[JSONErrorCodes["API_RESOURCE_IS_CURRENTLY_OVERLOADED"] = 130000] = "API_RESOURCE_IS_CURRENTLY_OVERLOADED";
    JSONErrorCodes[JSONErrorCodes["STAGE_ALREADY_OPEN"] = 150006] = "STAGE_ALREADY_OPEN";
    JSONErrorCodes[JSONErrorCodes["CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY"] = 160002] = "CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY";
    JSONErrorCodes[JSONErrorCodes["THREAD_ALREADY_CREATED_FOR_MESSAGE"] = 160004] = "THREAD_ALREADY_CREATED_FOR_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["THREAD_IS_LOCKED"] = 160005] = "THREAD_IS_LOCKED";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_ACTIVE_THREADS"] = 160006] = "MAXIMUM_NUMBER_OF_ACTIVE_THREADS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OF_ACTIVE_ANNOUNCEMENT_THREADS"] = 160007] = "MAXIMUM_NUMBER_OF_ACTIVE_ANNOUNCEMENT_THREADS";
    JSONErrorCodes[JSONErrorCodes["INVALID_LOTTIE_JSON"] = 170001] = "INVALID_LOTTIE_JSON";
    JSONErrorCodes[JSONErrorCodes["UPLOADED_LOTTIE_RASTERIZED"] = 170002] = "UPLOADED_LOTTIE_RASTERIZED";
    JSONErrorCodes[JSONErrorCodes["STICKER_MAXIMUM_FRAMERATE_EXCEEDED"] = 170003] = "STICKER_MAXIMUM_FRAMERATE_EXCEEDED";
    JSONErrorCodes[JSONErrorCodes["STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM"] = 170004] = "STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM";
    JSONErrorCodes[JSONErrorCodes["LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED"] = 170005] = "LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED";
    JSONErrorCodes[JSONErrorCodes["STICKER_FRAME_RATE_TOO_SMALL_OR_LARGE"] = 170006] = "STICKER_FRAME_RATE_TOO_SMALL_OR_LARGE";
    JSONErrorCodes[JSONErrorCodes["STICKER_ANIMATION_DURATION_TOO_LONG"] = 170007] = "STICKER_ANIMATION_DURATION_TOO_LONG";
    JSONErrorCodes[JSONErrorCodes["CANNOT_UPDATE_FINISHED_EVENT"] = 180000] = "CANNOT_UPDATE_FINISHED_EVENT";
    JSONErrorCodes[JSONErrorCodes["FAILED_TO_CREATE_STAGE_INSTANCE"] = 180002] = "FAILED_TO_CREATE_STAGE_INSTANCE";
    JSONErrorCodes[JSONErrorCodes["MESSAGE_BLOCKED_BY_AUTOMATIC_MODERATION"] = 200000] = "MESSAGE_BLOCKED_BY_AUTOMATIC_MODERATION";
    JSONErrorCodes[JSONErrorCodes["TITLE_BLOCKED_BY_AUTOMATIC_MODERATION"] = 200001] = "TITLE_BLOCKED_BY_AUTOMATIC_MODERATION";
    JSONErrorCodes[JSONErrorCodes["WEBHOOKS_POSTED_TO_FORUM_CHANNELS_MUST_HAVE_THREAD_NAME_OR_THREAD_ID"] = 220001] = "WEBHOOKS_POSTED_TO_FORUM_CHANNELS_MUST_HAVE_THREAD_NAME_OR_THREAD_ID";
    JSONErrorCodes[JSONErrorCodes["WEBHOOKS_POSTED_TO_FORUM_CHANNELS_CANNOT_HAVE_BOTH_THREAD_NAME_AND_THREAD_ID"] = 220002] = "WEBHOOKS_POSTED_TO_FORUM_CHANNELS_CANNOT_HAVE_BOTH_THREAD_NAME_AND_THREAD_ID";
    JSONErrorCodes[JSONErrorCodes["WEBHOOKS_CAN_ONLY_CREATE_THREADS_IN_FORUM_CHANNELS"] = 220003] = "WEBHOOKS_CAN_ONLY_CREATE_THREADS_IN_FORUM_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["WEBHOOK_SERVICES_CANNOT_BE_USED_IN_FORUM_CHANNELS"] = 220004] = "WEBHOOK_SERVICES_CANNOT_BE_USED_IN_FORUM_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["MESSAGE_BLOCKED_BY_HARMFUL_LINKS_FILTER"] = 220005] = "MESSAGE_BLOCKED_BY_HARMFUL_LINKS_FILTER";
})(JSONErrorCodes = exports.JSONErrorCodes || (exports.JSONErrorCodes = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsOENBQThDO0FBQzlDLHdCQUF3QjtBQUNYLFFBQUEsZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFBLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDbEIsUUFBQSxRQUFRLEdBQUcscUJBQXFCLENBQUM7QUFDakMsUUFBQSxPQUFPLEdBQUcsR0FBRyxnQkFBUSxTQUFTLG9CQUFZLEVBQUUsQ0FBQztBQUM3QyxRQUFBLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDbEIsUUFBQSxVQUFVLEdBQUcsV0FBVyxlQUFPLHlDQUF5QyxDQUFDO0FBQ3pFLFFBQUEsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUNwQixRQUFBLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFFdEIsUUFBQSxXQUFXLEdBQUc7SUFDdkIsS0FBSztJQUNMLE1BQU07SUFDTixLQUFLO0lBQ0wsT0FBTztJQUNQLFFBQVE7Q0FDRixDQUFDO0FBR0UsUUFBQSxZQUFZLEdBQUc7SUFDeEIsS0FBSztJQUNMLE1BQU07SUFDTixLQUFLO0lBQ0wsTUFBTTtJQUNOLEtBQUs7Q0FDQyxDQUFDO0FBR1gsSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3BCLHVEQUFvQixDQUFBO0lBQ3BCLHVFQUFvQixDQUFBO0lBQ3BCLDZEQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFKVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUl2QjtBQUVELElBQVksWUFLWDtBQUxELFdBQVksWUFBWTtJQUNwQiwrQ0FBaUIsQ0FBQTtJQUNqQixpRUFBaUIsQ0FBQTtJQUNqQixpREFBaUIsQ0FBQTtJQUNqQiw2REFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUFFRCxJQUFZLFNBeUJYO0FBekJELFdBQVksU0FB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