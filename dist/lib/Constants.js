/* eslint-disable unicorn/prefer-math-trunc */
/** @module Constants */
export const GATEWAY_VERSION = 10;
export const REST_VERSION = 10;
export const BASE_URL = "https://discord.com";
export const API_URL = `${BASE_URL}/api/v${REST_VERSION}`;
export const VERSION = "1.3.1";
export const USER_AGENT = `Oceanic/${VERSION} (https://github.com/OceanicJS/Oceanic)`;
export const MIN_IMAGE_SIZE = 64;
export const MAX_IMAGE_SIZE = 4096;
export const RESTMethods = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
];
export const ImageFormats = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif"
];
export var WebhookTypes;
(function (WebhookTypes) {
    WebhookTypes[WebhookTypes["INCOMING"] = 1] = "INCOMING";
    WebhookTypes[WebhookTypes["CHANNEL_FOLLOWER"] = 2] = "CHANNEL_FOLLOWER";
    WebhookTypes[WebhookTypes["APPLICATION"] = 3] = "APPLICATION";
})(WebhookTypes || (WebhookTypes = {}));
export var ApplicationFlags;
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
})(ApplicationFlags || (ApplicationFlags = {}));
export var DefaultMessageNotificationLevels;
(function (DefaultMessageNotificationLevels) {
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ALL_MESSAGES"] = 0] = "ALL_MESSAGES";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ONLY_MENTIONS"] = 1] = "ONLY_MENTIONS";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NO_MESSAGES"] = 2] = "NO_MESSAGES";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NULL"] = 3] = "NULL";
})(DefaultMessageNotificationLevels || (DefaultMessageNotificationLevels = {}));
export var ExplicitContentFilterLevels;
(function (ExplicitContentFilterLevels) {
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["DISABLED"] = 0] = "DISABLED";
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["MEMBERS_WITHOUT_ROLES"] = 1] = "MEMBERS_WITHOUT_ROLES";
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["ALL_MEMBERS"] = 2] = "ALL_MEMBERS";
})(ExplicitContentFilterLevels || (ExplicitContentFilterLevels = {}));
export var MFALevels;
(function (MFALevels) {
    MFALevels[MFALevels["NONE"] = 0] = "NONE";
    MFALevels[MFALevels["ELEVATED"] = 1] = "ELEVATED";
})(MFALevels || (MFALevels = {}));
export var VerificationLevels;
(function (VerificationLevels) {
    VerificationLevels[VerificationLevels["NONE"] = 0] = "NONE";
    VerificationLevels[VerificationLevels["LOW"] = 1] = "LOW";
    VerificationLevels[VerificationLevels["MEDIUM"] = 2] = "MEDIUM";
    VerificationLevels[VerificationLevels["HIGH"] = 3] = "HIGH";
    VerificationLevels[VerificationLevels["VERY_HIGH"] = 4] = "VERY_HIGH";
})(VerificationLevels || (VerificationLevels = {}));
export var GuildNSFWLevels;
(function (GuildNSFWLevels) {
    GuildNSFWLevels[GuildNSFWLevels["DEFAULT"] = 0] = "DEFAULT";
    GuildNSFWLevels[GuildNSFWLevels["EXPLICIT"] = 1] = "EXPLICIT";
    GuildNSFWLevels[GuildNSFWLevels["SAFE"] = 2] = "SAFE";
    GuildNSFWLevels[GuildNSFWLevels["AGE_RESTRICTED"] = 3] = "AGE_RESTRICTED";
})(GuildNSFWLevels || (GuildNSFWLevels = {}));
export var PremiumTiers;
(function (PremiumTiers) {
    PremiumTiers[PremiumTiers["NONE"] = 0] = "NONE";
    PremiumTiers[PremiumTiers["TIER_1"] = 1] = "TIER_1";
    PremiumTiers[PremiumTiers["TIER_2"] = 2] = "TIER_2";
    PremiumTiers[PremiumTiers["TIER_3"] = 3] = "TIER_3";
})(PremiumTiers || (PremiumTiers = {}));
export var SystemChannelFlags;
(function (SystemChannelFlags) {
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATIONS"] = 1] = "SUPPRESS_JOIN_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_PREMIUM_SUBSCRIPTIONS"] = 2] = "SUPPRESS_PREMIUM_SUBSCRIPTIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_GUILD_REMINDER_NOTIFICATIONS"] = 4] = "SUPPRESS_GUILD_REMINDER_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATION_REPLIES"] = 8] = "SUPPRESS_JOIN_NOTIFICATION_REPLIES";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS"] = 16] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS";
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES"] = 32] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES";
})(SystemChannelFlags || (SystemChannelFlags = {}));
export var StickerTypes;
(function (StickerTypes) {
    StickerTypes[StickerTypes["STANDARD"] = 1] = "STANDARD";
    StickerTypes[StickerTypes["GUILD"] = 2] = "GUILD";
})(StickerTypes || (StickerTypes = {}));
export var StickerFormatTypes;
(function (StickerFormatTypes) {
    StickerFormatTypes[StickerFormatTypes["PNG"] = 1] = "PNG";
    StickerFormatTypes[StickerFormatTypes["APNG"] = 2] = "APNG";
    StickerFormatTypes[StickerFormatTypes["LOTTIE"] = 3] = "LOTTIE";
    StickerFormatTypes[StickerFormatTypes["GIF"] = 4] = "GIF";
})(StickerFormatTypes || (StickerFormatTypes = {}));
export var ChannelTypes;
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
})(ChannelTypes || (ChannelTypes = {}));
export var OverwriteTypes;
(function (OverwriteTypes) {
    OverwriteTypes[OverwriteTypes["ROLE"] = 0] = "ROLE";
    OverwriteTypes[OverwriteTypes["MEMBER"] = 1] = "MEMBER";
})(OverwriteTypes || (OverwriteTypes = {}));
export var VideoQualityModes;
(function (VideoQualityModes) {
    VideoQualityModes[VideoQualityModes["AUTO"] = 1] = "AUTO";
    VideoQualityModes[VideoQualityModes["FULL"] = 2] = "FULL";
})(VideoQualityModes || (VideoQualityModes = {}));
export const ThreadAutoArchiveDurations = [
    60,
    1440,
    4320,
    10080
];
export var VisibilityTypes;
(function (VisibilityTypes) {
    VisibilityTypes[VisibilityTypes["NONE"] = 0] = "NONE";
    VisibilityTypes[VisibilityTypes["EVERYONE"] = 1] = "EVERYONE";
})(VisibilityTypes || (VisibilityTypes = {}));
// values won't be statically typed if we use bit shifting, and enums can't use bigints
export const Permissions = {
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
export const AllGuildPermissions = Permissions.KICK_MEMBERS |
    Permissions.BAN_MEMBERS |
    Permissions.ADMINISTRATOR |
    Permissions.MANAGE_CHANNELS |
    Permissions.MANAGE_GUILD |
    Permissions.VIEW_AUDIT_LOG |
    Permissions.VIEW_GUILD_INSIGHTS |
    Permissions.CHANGE_NICKNAME |
    Permissions.MANAGE_NICKNAMES |
    Permissions.MANAGE_ROLES |
    Permissions.MANAGE_WEBHOOKS |
    Permissions.MANAGE_EMOJIS_AND_STICKERS |
    Permissions.MANAGE_EVENTS |
    Permissions.MODERATE_MEMBERS |
    Permissions.VIEW_CREATOR_MONETIZATION_ANALYTICS;
export const AllTextPermissions = Permissions.CREATE_INSTANT_INVITE |
    Permissions.MANAGE_CHANNELS |
    Permissions.ADD_REACTIONS |
    Permissions.VIEW_CHANNEL |
    Permissions.SEND_MESSAGES |
    Permissions.SEND_TTS_MESSAGES |
    Permissions.MANAGE_MESSAGES |
    Permissions.EMBED_LINKS |
    Permissions.ATTACH_FILES |
    Permissions.READ_MESSAGE_HISTORY |
    Permissions.MENTION_EVERYONE |
    Permissions.USE_EXTERNAL_EMOJIS |
    Permissions.MANAGE_ROLES |
    Permissions.MANAGE_WEBHOOKS |
    Permissions.USE_APPLICATION_COMMANDS |
    Permissions.MANAGE_THREADS |
    Permissions.CREATE_PUBLIC_THREADS |
    Permissions.CREATE_PRIVATE_THREADS |
    Permissions.USE_EXTERNAL_STICKERS |
    Permissions.SEND_MESSAGES_IN_THREADS;
export const AllVoicePermissions = Permissions.CREATE_INSTANT_INVITE |
    Permissions.MANAGE_CHANNELS |
    Permissions.PRIORITY_SPEAKER |
    Permissions.STREAM |
    Permissions.VIEW_CHANNEL |
    Permissions.CONNECT |
    Permissions.SPEAK |
    Permissions.MUTE_MEMBERS |
    Permissions.DEAFEN_MEMBERS |
    Permissions.MOVE_MEMBERS |
    Permissions.USE_VAD |
    Permissions.MANAGE_ROLES |
    Permissions.REQUEST_TO_SPEAK |
    Permissions.USE_EMBEDDED_ACTIVITIES;
export const AllPermissions = AllGuildPermissions | AllTextPermissions | AllVoicePermissions;
export var ChannelFlags;
(function (ChannelFlags) {
    ChannelFlags[ChannelFlags["GUILD_FEED_REMOVED"] = 1] = "GUILD_FEED_REMOVED";
    /** For threads, if this thread is pinned in a forum channel. */
    ChannelFlags[ChannelFlags["PINNED"] = 2] = "PINNED";
    ChannelFlags[ChannelFlags["ACTIVE_CHANNELS_REMOVED"] = 4] = "ACTIVE_CHANNELS_REMOVED";
    /** For forums, if tags are required when creating threads. */
    ChannelFlags[ChannelFlags["REQUIRE_TAG"] = 16] = "REQUIRE_TAG";
    ChannelFlags[ChannelFlags["IS_SPAM"] = 32] = "IS_SPAM";
})(ChannelFlags || (ChannelFlags = {}));
export var SortOrderTypes;
(function (SortOrderTypes) {
    /** Sort forum threads by activity. */
    SortOrderTypes[SortOrderTypes["LATEST_ACTIVITY"] = 0] = "LATEST_ACTIVITY";
    /** Sort forum threads by creation time (from most recent to oldest). */
    SortOrderTypes[SortOrderTypes["CREATION_DATE"] = 1] = "CREATION_DATE";
})(SortOrderTypes || (SortOrderTypes = {}));
export var ForumLayoutTypes;
(function (ForumLayoutTypes) {
    /** A preferred forum layout hasn't been set by a server admin. */
    ForumLayoutTypes[ForumLayoutTypes["DEFAULT"] = 0] = "DEFAULT";
    /** List View: display forum posts in a text-focused list. */
    ForumLayoutTypes[ForumLayoutTypes["LIST"] = 1] = "LIST";
    /** Gallery View: display forum posts in a media-focused gallery. */
    ForumLayoutTypes[ForumLayoutTypes["GRID"] = 2] = "GRID";
})(ForumLayoutTypes || (ForumLayoutTypes = {}));
export var ComponentTypes;
(function (ComponentTypes) {
    ComponentTypes[ComponentTypes["ACTION_ROW"] = 1] = "ACTION_ROW";
    ComponentTypes[ComponentTypes["BUTTON"] = 2] = "BUTTON";
    ComponentTypes[ComponentTypes["STRING_SELECT"] = 3] = "STRING_SELECT";
    ComponentTypes[ComponentTypes["TEXT_INPUT"] = 4] = "TEXT_INPUT";
    ComponentTypes[ComponentTypes["USER_SELECT"] = 5] = "USER_SELECT";
    ComponentTypes[ComponentTypes["ROLE_SELECT"] = 6] = "ROLE_SELECT";
    ComponentTypes[ComponentTypes["MENTIONABLE_SELECT"] = 7] = "MENTIONABLE_SELECT";
    ComponentTypes[ComponentTypes["CHANNEL_SELECT"] = 8] = "CHANNEL_SELECT";
})(ComponentTypes || (ComponentTypes = {}));
export var ButtonStyles;
(function (ButtonStyles) {
    ButtonStyles[ButtonStyles["PRIMARY"] = 1] = "PRIMARY";
    ButtonStyles[ButtonStyles["SECONDARY"] = 2] = "SECONDARY";
    ButtonStyles[ButtonStyles["SUCCESS"] = 3] = "SUCCESS";
    ButtonStyles[ButtonStyles["DANGER"] = 4] = "DANGER";
    ButtonStyles[ButtonStyles["LINK"] = 5] = "LINK";
})(ButtonStyles || (ButtonStyles = {}));
export var TextInputStyles;
(function (TextInputStyles) {
    TextInputStyles[TextInputStyles["SHORT"] = 1] = "SHORT";
    TextInputStyles[TextInputStyles["PARAGRAPH"] = 2] = "PARAGRAPH";
})(TextInputStyles || (TextInputStyles = {}));
export var MessageTypes;
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
})(MessageTypes || (MessageTypes = {}));
export var MessageActivityTypes;
(function (MessageActivityTypes) {
    MessageActivityTypes[MessageActivityTypes["JOIN"] = 1] = "JOIN";
    MessageActivityTypes[MessageActivityTypes["SPECTATE"] = 2] = "SPECTATE";
    MessageActivityTypes[MessageActivityTypes["LISTEN"] = 3] = "LISTEN";
    MessageActivityTypes[MessageActivityTypes["JOIN_REQUEST"] = 5] = "JOIN_REQUEST";
})(MessageActivityTypes || (MessageActivityTypes = {}));
export var InteractionTypes;
(function (InteractionTypes) {
    InteractionTypes[InteractionTypes["PING"] = 1] = "PING";
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
    InteractionTypes[InteractionTypes["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
    InteractionTypes[InteractionTypes["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
})(InteractionTypes || (InteractionTypes = {}));
export var InviteTargetTypes;
(function (InviteTargetTypes) {
    InviteTargetTypes[InviteTargetTypes["STREAM"] = 1] = "STREAM";
    InviteTargetTypes[InviteTargetTypes["EMBEDDED_APPLICATION"] = 2] = "EMBEDDED_APPLICATION";
    InviteTargetTypes[InviteTargetTypes["ROLE_SUBSCRIPTIONS_PURCHASE"] = 3] = "ROLE_SUBSCRIPTIONS_PURCHASE";
})(InviteTargetTypes || (InviteTargetTypes = {}));
export var StageInstancePrivacyLevels;
(function (StageInstancePrivacyLevels) {
    /** @deprecated */
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["PUBLIC"] = 1] = "PUBLIC";
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(StageInstancePrivacyLevels || (StageInstancePrivacyLevels = {}));
export var ApplicationCommandTypes;
(function (ApplicationCommandTypes) {
    ApplicationCommandTypes[ApplicationCommandTypes["CHAT_INPUT"] = 1] = "CHAT_INPUT";
    ApplicationCommandTypes[ApplicationCommandTypes["USER"] = 2] = "USER";
    ApplicationCommandTypes[ApplicationCommandTypes["MESSAGE"] = 3] = "MESSAGE";
})(ApplicationCommandTypes || (ApplicationCommandTypes = {}));
export var ApplicationCommandOptionTypes;
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
})(ApplicationCommandOptionTypes || (ApplicationCommandOptionTypes = {}));
export var ApplicationCommandPermissionTypes;
(function (ApplicationCommandPermissionTypes) {
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["ROLE"] = 1] = "ROLE";
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["USER"] = 2] = "USER";
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["CHANNEL"] = 3] = "CHANNEL";
})(ApplicationCommandPermissionTypes || (ApplicationCommandPermissionTypes = {}));
export var InteractionResponseTypes;
(function (InteractionResponseTypes) {
    InteractionResponseTypes[InteractionResponseTypes["PONG"] = 1] = "PONG";
    InteractionResponseTypes[InteractionResponseTypes["CHANNEL_MESSAGE_WITH_SOURCE"] = 4] = "CHANNEL_MESSAGE_WITH_SOURCE";
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"] = 5] = "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_UPDATE_MESSAGE"] = 6] = "DEFERRED_UPDATE_MESSAGE";
    InteractionResponseTypes[InteractionResponseTypes["UPDATE_MESSAGE"] = 7] = "UPDATE_MESSAGE";
    InteractionResponseTypes[InteractionResponseTypes["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"] = 8] = "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT";
    InteractionResponseTypes[InteractionResponseTypes["MODAL"] = 9] = "MODAL";
})(InteractionResponseTypes || (InteractionResponseTypes = {}));
export var Intents;
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
})(Intents || (Intents = {}));
export const AllNonPrivilegedIntents = Intents.GUILDS |
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
export const AllPrivilegedIntents = Intents.GUILD_MEMBERS |
    Intents.GUILD_PRESENCES |
    Intents.MESSAGE_CONTENT;
export const AllIntents = AllNonPrivilegedIntents | AllPrivilegedIntents;
export var GatewayOPCodes;
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
})(GatewayOPCodes || (GatewayOPCodes = {}));
export var GatewayCloseCodes;
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
})(GatewayCloseCodes || (GatewayCloseCodes = {}));
export var ActivityTypes;
(function (ActivityTypes) {
    ActivityTypes[ActivityTypes["GAME"] = 0] = "GAME";
    ActivityTypes[ActivityTypes["STREAMING"] = 1] = "STREAMING";
    ActivityTypes[ActivityTypes["LISTENING"] = 2] = "LISTENING";
    ActivityTypes[ActivityTypes["WATCHING"] = 3] = "WATCHING";
    ActivityTypes[ActivityTypes["CUSTOM"] = 4] = "CUSTOM";
    ActivityTypes[ActivityTypes["COMPETING"] = 5] = "COMPETING";
})(ActivityTypes || (ActivityTypes = {}));
export var RoleConnectionMetadataTypes;
(function (RoleConnectionMetadataTypes) {
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_LESS_THAN_OR_EQUAL"] = 1] = "INTEGER_LESS_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_GREATER_THAN_OR_EQUAL"] = 2] = "INTEGER_GREATER_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_EQUAL"] = 3] = "INTEGER_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_NOT_EQUAL"] = 4] = "INTEGER_NOT_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_LESS_THAN_OR_EQUAL"] = 5] = "DATETIME_LESS_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_GREATER_THAN_OR_EQUAL"] = 6] = "DATETIME_GREATER_THAN_OR_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_EQUAL"] = 7] = "BOOLEAN_EQUAL";
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_NOT_EQUAL"] = 8] = "BOOLEAN_NOT_EQUAL";
})(RoleConnectionMetadataTypes || (RoleConnectionMetadataTypes = {}));
// entries are intentionally not aligned
/** The error codes that can be received. See [Discord's Documentation](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json). */
export var JSONErrorCodes;
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
})(JSONErrorCodes || (JSONErrorCodes = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEM7QUFDOUMsd0JBQXdCO0FBQ3hCLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUMvQixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7QUFDOUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLEdBQUcsUUFBUSxTQUFTLFlBQVksRUFBRSxDQUFDO0FBQzFELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDL0IsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLFdBQVcsT0FBTyx5Q0FBeUMsQ0FBQztBQUN0RixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFFbkMsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHO0lBQ3ZCLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztJQUNMLE9BQU87SUFDUCxRQUFRO0NBQ0YsQ0FBQztBQUdYLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRztJQUN4QixLQUFLO0lBQ0wsTUFBTTtJQUNOLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztDQUNDLENBQUM7QUFHWCxNQUFNLENBQU4sSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3BCLHVEQUFvQixDQUFBO0lBQ3BCLHVFQUFvQixDQUFBO0lBQ3BCLDZEQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFKVyxZQUFZLEtBQVosWUFBWSxRQUl2QjtBQUVELE1BQU0sQ0FBTixJQUFZLGdCQWVYO0FBZkQsV0FBWSxnQkFBZ0I7SUFDeEIsaUZBQXlDLENBQUE7SUFDekMseUVBQXlDLENBQUE7SUFDekMsOEVB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QUFBO0lBQy9CLDZFQUF1QixDQUFBO0lBQ3ZCLHFFQUFtQixDQUFBO0lBQ25CLHFFQUFtQixDQUFBO0lBQ25CLHlGQUE2QixDQUFBO0lBQzdCLHFGQUEyQixDQUFBO0lBQzNCLHlFQUFxQixDQUFBO0lBQ3JCLHlFQUFxQixDQUFBO0lBQ3JCLDJFQUFzQixDQUFBO0lBQ3RCLDJHQUFzQyxDQUFBO0lBQ3RDLDZGQUErQixDQUFBO0lBQy9CLGlGQUF5QixDQUFBO0lBQ3pCLDJFQUFzQixDQUFBO0lBQ3RCLGlJQUFpRCxDQUFBO0lBQ2pELDJGQUE4QixDQUFBO0lBQzlCLHVIQUE0QyxDQUFBO0lBQzVDLDZFQUF1QixDQUFBO0lBQ3ZCLHFGQUEyQixDQUFBO0lBQzNCLHFHQUFtQyxDQUFBO0lBQ25DLDZIQUErQyxDQUFBO0lBQy9DLDJGQUE4QixDQUFBO0lBQzlCLDJIQUE4QyxDQUFBO0lBQzlDLHVHQUFvQyxDQUFBO0lBQ3BDLHlHQUFxQyxDQUFBO0lBQ3JDLG1IQUEwQyxDQUFBO0lBQzFDLHFFQUFtQixDQUFBO0lBQ25CLHlHQUFxQyxDQUFBO0lBQ3JDLDZHQUF1QyxDQUFBO0lBQ3ZDLCtFQUF3QixDQUFBO0lBQ3hCLDJHQUFzQyxDQUFBO0lBQ3RDLHFGQUEyQixDQUFBO0lBQzNCLG1GQUEwQixDQUFBO0lBQzFCLCtHQUF3QyxDQUFBO0lBQ3hDLGlGQUF5QixDQUFBO0lBQ3pCLCtGQUFnQyxDQUFBO0lBQ2hDLDJGQUE4QixDQUFBO0lBQzlCLGlGQUF5QixDQUFBO0lBQ3pCLCtGQUFnQyxDQUFBO0lBQ2hDLGlHQUFpQyxDQUFBO0lBQ2pDLDJGQUE4QixDQUFBO0lBQzlCLHVHQUFvQyxDQUFBO0lBQ3BDLHlHQUFxQyxDQUFBO0lBQ3JDLG1HQUFrQyxDQUFBO0lBQ2xDLCtGQUFnQyxDQUFBO0lBQ2hDLHFHQUFtQyxDQUFBO0lBQ25DLG1HQUFrQyxDQUFBO0lBQ2xDLHlHQUFxQyxDQUFBO0lBQ3JDLGlHQUFpQyxDQUFBO0lBQ2pDLGlIQUF5QyxDQUFBO0lBQ3pDLCtHQUF3QyxDQUFBO0lBQ3hDLHFIQUEyQyxDQUFBO0lBQzNDLG1HQUFrQyxDQUFBO0lBQ2xDLDJIQUE4QyxDQUFBO0lBQzlDLHlIQUE2QyxDQUFBO0lBQzdDLHlJQUFxRCxDQUFBO0lBQ3JELHVJQUFvRCxDQUFBO0lBQ3BELHlHQUFxQyxDQUFBO0lBQ3JDLHVKQUE0RCxDQUFBO0lBQzVELG1HQUFrQyxDQUFBO0lBQ2xDLCtHQUF3QyxDQUFBO0lBQ3hDLDZJQUF1RCxDQUFBO0lBQ3ZELHlKQUE2RCxDQUFBO0lBQzdELCtHQUF3QyxDQUFBO0lBQ3hDLHVHQUFvQyxDQUFBO0lBQ3BDLCtFQUF3QixDQUFBO0lBQ3hCLDJGQUE4QixDQUFBO0lBQzlCLDJGQUE4QixDQUFBO0lBQzlCLHlGQUE2QixDQUFBO0lBQzdCLHVFQUFvQixDQUFBO0lBQ3BCLHlHQUFxQyxDQUFBO0lBQ3JDLG1HQUFrQyxDQUFBO0lBQ2xDLHlIQUE2QyxDQUFBO0lBQzdDLCtGQUFnQyxDQUFBO0lBQ2hDLHVHQUFvQyxDQUFBO0lBQ3BDLHFFQUFtQixDQUFBO0lBQ25CLG1GQUEwQixDQUFBO0lBQzFCLG1IQUEwQyxDQUFBO0lBQzFDLHFGQUEyQixDQUFBO0lBQzNCLG1IQUEwQyxDQUFBO0lBQzFDLG1HQUFrQyxDQUFBO0lBQ2xDLHlIQUE2QyxDQUFBO0lBQzdDLCtHQUF3QyxDQUFBO0lBQ3hDLCtGQUFnQyxDQUFBO0lBQ2hDLHlHQUFxQyxDQUFBO0lBQ3JDLHlGQUE2QixDQUFBO0lBQzdCLHVFQUFvQixDQUFBO0lBQ3BCLDJFQUFzQixDQUFBO0lBQ3RCLHVGQUE0QixDQUFBO0lBQzVCLHVGQUE0QixDQUFBO0lBQzVCLHlGQUE2QixDQUFBO0lBQzdCLHVHQUFvQyxDQUFBO0lBQ3BDLGlHQUFpQyxDQUFBO0lBQ2pDLHFGQUEyQixDQUFBO0lBQzNCLCtIQUFnRCxDQUFBO0lBQ2hELHFIQUEyQyxDQUFBO0lBQzNDLHlHQUFxQyxDQUFBO0lBQ3JDLHFHQUFtQyxDQUFBO0lBQ25DLHFGQUEyQixDQUFBO0lBQzNCLHVGQUE0QixDQUFBO0lBQzVCLHVHQUFvQyxDQUFBO0lBQ3BDLCtFQUF3QixDQUFBO0lBQ3hCLHVHQUFvQyxDQUFBO0lBQ3BDLGlGQUF5QixDQUFBO0lBQ3pCLHFGQUEyQixDQUFBO0lBQzNCLHVHQUFvQyxDQUFBO0lBQ3BDLCtHQUF3QyxDQUFBO0lBQ3hDLDJHQUFzQyxDQUFBO0lBQ3RDLHFGQUEyQixDQUFBO0lBQzNCLHFGQUEyQixDQUFBO0lBQzNCLHlGQUE2QixDQUFBO0lBQzdCLHVFQUFvQixDQUFBO0lBQ3BCLG1GQUEwQixDQUFBO0lBQzFCLHFHQUFtQyxDQUFBO0lBQ25DLGlGQUF5QixDQUFBO0lBQ3pCLHFJQUFtRCxDQUFBO0lBQ25ELDhGQUFnQyxDQUFBO0lBQ2hDLHFGQUEyQixDQUFBO0lBQzNCLG1IQUEwQyxDQUFBO0lBQzFDLHlGQUE2QixDQUFBO0lBQzdCLDZGQUErQixDQUFBO0lBQy9CLHlFQUFxQixDQUFBO0lBQ3JCLDJGQUE4QixDQUFBO0lBQzlCLHVGQUE0QixDQUFBO0lBQzVCLDZGQUErQixDQUFBO0lBQy9CLHVHQUFvQyxDQUFBO0lBQ3BDLCtIQUFnRCxDQUFBO0lBQ2hELHVHQUFvQyxDQUFBO0lBQ3BDLHVGQUE0QixDQUFBO0lBQzVCLDZFQUF1QixDQUFBO0lBQ3ZCLHVIQUE0QyxDQUFBO0lBQzVDLCtIQUFnRCxDQUFBO0lBQ2hELDZHQUF1QyxDQUFBO0lBQ3ZDLCtHQUF3QyxDQUFBO0lBQ3hDLHlGQUE2QixDQUFBO0lBQzdCLDZFQUF1QixDQUFBO0lBQ3ZCLHVFQUFvQixDQUFBO0lBQ3BCLDJIQUE4QyxDQUFBO0lBQzlDLDJGQUE4QixDQUFBO0lBQzlCLG1KQUEwRCxDQUFBO0lBQzFELDZJQUF1RCxDQUFBO0lBQ3ZELDZGQUErQixDQUFBO0lBQy9CLHlHQUFxQyxDQUFBO0lBQ3JDLHFGQUEyQixDQUFBO0lBQzNCLDJHQUFzQyxDQUFBO0lBQ3RDLCtFQUF3QixDQUFBO0lBQ3hCLHNHQUFvQyxDQUFBO0lBQ3BDLGtHQUFrQyxDQUFBO0lBQ2xDLHdIQUE2QyxDQUFBO0lBQzdDLG9GQUEyQixDQUFBO0lBQzNCLGtJQUFrRCxDQUFBO0lBQ2xELG9IQUEyQyxDQUFBO0lBQzNDLGdGQUF5QixDQUFBO0lBQ3pCLGdIQUF5QyxDQUFBO0lBQ3pDLDBJQUFzRCxDQUFBO0lBQ3RELHNGQUE0QixDQUFBO0lBQzVCLG9HQUFtQyxDQUFBO0lBQ25DLG9IQUEyQyxDQUFBO0lBQzNDLHNIQUE0QyxDQUFBO0lBQzVDLHdJQUFxRCxDQUFBO0lBQ3JELDBIQUE4QyxDQUFBO0lBQzlDLHNIQUE0QyxDQUFBO0lBQzVDLHdHQUFxQyxDQUFBO0lBQ3JDLDhHQUF3QyxDQUFBO0lBQ3hDLDhIQUFnRCxDQUFBO0lBQ2hELDBIQUE4QyxDQUFBO0lBQzlDLHdMQUE2RSxDQUFBO0lBQzdFLHdNQUFxRixDQUFBO0lBQ3JGLG9KQUEyRCxDQUFBO0lBQzNELGtKQUEwRCxDQUFBO0lBQzFELDhIQUFnRCxDQUFBO0FBQ3BELENBQUMsRUEzTFcsY0FBYyxLQUFkLGNBQWMsUUEyTHpCIn0=