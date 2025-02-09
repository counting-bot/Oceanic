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
    CREATE_INSTANT_INVITE: 1n, // 1 << 0
    KICK_MEMBERS: 2n, // 1 << 1
    BAN_MEMBERS: 4n, // 1 << 2
    ADMINISTRATOR: 8n, // 1 << 3
    MANAGE_CHANNELS: 16n, // 1 << 4
    MANAGE_GUILD: 32n, // 1 << 5
    ADD_REACTIONS: 64n, // 1 << 6
    VIEW_AUDIT_LOG: 128n, // 1 << 7
    PRIORITY_SPEAKER: 256n, // 1 << 8
    STREAM: 512n, // 1 << 9
    VIEW_CHANNEL: 1024n, // 1 << 10
    SEND_MESSAGES: 2048n, // 1 << 11
    SEND_TTS_MESSAGES: 4096n, // 1 << 12
    MANAGE_MESSAGES: 8192n, // 1 << 13
    EMBED_LINKS: 16384n, // 1 << 14
    ATTACH_FILES: 32768n, // 1 << 15
    READ_MESSAGE_HISTORY: 65536n, // 1 << 16
    MENTION_EVERYONE: 131072n, // 1 << 17
    USE_EXTERNAL_EMOJIS: 262144n, // 1 << 18
    VIEW_GUILD_INSIGHTS: 524288n, // 1 << 19
    CONNECT: 1048576n, // 1 << 20
    SPEAK: 2097152n, // 1 << 21
    MUTE_MEMBERS: 4194304n, // 1 << 22
    DEAFEN_MEMBERS: 8388608n, // 1 << 23
    MOVE_MEMBERS: 16777216n, // 1 << 24
    USE_VAD: 33554432n, // 1 << 25
    CHANGE_NICKNAME: 67108864n, // 1 << 26
    MANAGE_NICKNAMES: 134217728n, // 1 << 27
    MANAGE_ROLES: 268435456n, // 1 << 28
    MANAGE_WEBHOOKS: 536870912n, // 1 << 29
    MANAGE_EMOJIS_AND_STICKERS: 1073741824n, // 1 << 30
    USE_APPLICATION_COMMANDS: 2147483648n, // 1 << 31
    REQUEST_TO_SPEAK: 4294967296n, // 1 << 32
    MANAGE_EVENTS: 8589934592n, // 1 << 33
    MANAGE_THREADS: 17179869184n, // 1 << 34
    CREATE_PUBLIC_THREADS: 34359738368n, // 1 << 35
    CREATE_PRIVATE_THREADS: 68719476736n, // 1 << 36
    USE_EXTERNAL_STICKERS: 137438953472n, // 1 << 37
    SEND_MESSAGES_IN_THREADS: 274877906944n, // 1 << 38
    USE_EMBEDDED_ACTIVITIES: 549755813888n, // 1 << 39
    MODERATE_MEMBERS: 1099511627776n, // 1 << 40
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEM7QUFDOUMsd0JBQXdCO0FBQ3hCLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUMvQixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7QUFDOUMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLEdBQUcsUUFBUSxTQUFTLFlBQVksRUFBRSxDQUFDO0FBQzFELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDL0IsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLFdBQVcsT0FBTyx5Q0FBeUMsQ0FBQztBQUN0RixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFFbkMsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHO0lBQ3ZCLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztJQUNMLE9BQU87SUFDUCxRQUFRO0NBQ0YsQ0FBQztBQUdYLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRztJQUN4QixLQUFLO0lBQ0wsTUFBTTtJQUNOLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztDQUNDLENBQUM7QUFHWCxNQUFNLENBQU4sSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3BCLHVEQUFvQixDQUFBO0lBQ3BCLHVFQUFvQixDQUFBO0lBQ3BCLDZEQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFKVyxZQUFZLEtBQVosWUFBWSxRQUl2QjtBQUVELE1BQU0sQ0FBTixJQUFZLGdCQWVYO0FBZkQsV0FBWSxnQkFBZ0I7SUFDeEIsaUZBQXlDLENBQUE7SUFDekMseUVBQXlDLENBQUE7SUFDekMsOEVB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SUFDdkMsK0VBQXdCLENBQUE7SUFDeEIsMkdBQXNDLENBQUE7SUFDdEMscUZBQTJCLENBQUE7SUFDM0IsbUZBQTBCLENBQUE7SUFDMUIsK0dBQXdDLENBQUE7SUFDeEMsaUZBQXlCLENBQUE7SUFDekIsK0ZBQWdDLENBQUE7SUFDaEMsMkZBQThCLENBQUE7SUFDOUIsaUZBQXlCLENBQUE7SUFDekIsK0ZBQWdDLENBQUE7SUFDaEMsaUdBQWlDLENBQUE7SUFDakMsMkZBQThCLENBQUE7SUFDOUIsdUdBQW9DLENBQUE7SUFDcEMseUdBQXFDLENBQUE7SUFDckMsbUdBQWtDLENBQUE7SUFDbEMsK0ZBQWdDLENBQUE7SUFDaEMscUdBQW1DLENBQUE7SUFDbkMsbUdBQWtDLENBQUE7SUFDbEMseUdBQXFDLENBQUE7SUFDckMsaUdBQWlDLENBQUE7SUFDakMsaUhBQXlDLENBQUE7SUFDekMsK0dBQXdDLENBQUE7SUFDeEMscUhBQTJDLENBQUE7SUFDM0MsbUdBQWtDLENBQUE7SUFDbEMsMkhBQThDLENBQUE7SUFDOUMseUhBQTZDLENBQUE7SUFDN0MseUlBQXFELENBQUE7SUFDckQsdUlBQW9ELENBQUE7SUFDcEQseUdBQXFDLENBQUE7SUFDckMsdUpBQTRELENBQUE7SUFDNUQsbUdBQWtDLENBQUE7SUFDbEMsK0dBQXdDLENBQUE7SUFDeEMsNklBQXVELENBQUE7SUFDdkQseUpBQTZELENBQUE7SUFDN0QsK0dBQXdDLENBQUE7SUFDeEMsdUdBQW9DLENBQUE7SUFDcEMsK0VBQXdCLENBQUE7SUFDeEIsMkZBQThCLENBQUE7SUFDOUIsMkZBQThCLENBQUE7SUFDOUIseUZBQTZCLENBQUE7SUFDN0IsdUVBQW9CLENBQUE7SUFDcEIseUdBQXFDLENBQUE7SUFDckMsbUdBQWtDLENBQUE7SUFDbEMseUhBQTZDLENBQUE7SUFDN0MsK0ZBQWdDLENBQUE7SUFDaEMsdUdBQW9DLENBQUE7SUFDcEMscUVBQW1CLENBQUE7SUFDbkIsbUZBQTBCLENBQUE7SUFDMUIsbUhBQTBDLENBQUE7SUFDMUMscUZBQTJCLENBQUE7SUFDM0IsbUhBQTBDLENBQUE7SUFDMUMsbUdBQWtDLENBQUE7SUFDbEMseUhBQTZDLENBQUE7SUFDN0MsK0dBQXdDLENBQUE7SUFDeEMsK0ZBQWdDLENBQUE7SUFDaEMseUdBQXFDLENBQUE7SUFDckMseUZBQTZCLENBQUE7SUFDN0IsdUVBQW9CLENBQUE7SUFDcEIsMkVBQXNCLENBQUE7SUFDdEIsdUZBQTRCLENBQUE7SUFDNUIsdUZBQTRCLENBQUE7SUFDNUIseUZBQTZCLENBQUE7SUFDN0IsdUdBQW9DLENBQUE7SUFDcEMsaUdBQWlDLENBQUE7SUFDakMscUZBQTJCLENBQUE7SUFDM0IsK0hBQWdELENBQUE7SUFDaEQscUhBQTJDLENBQUE7SUFDM0MseUdBQXFDLENBQUE7SUFDckMscUdBQW1DLENBQUE7SUFDbkMscUZBQTJCLENBQUE7SUFDM0IsdUZBQTRCLENBQUE7SUFDNUIsdUdBQW9DLENBQUE7SUFDcEMsK0VBQXdCLENBQUE7SUFDeEIsdUdBQW9DLENBQUE7SUFDcEMsaUZBQXlCLENBQUE7SUFDekIscUZBQTJCLENBQUE7SUFDM0IsdUdBQW9DLENBQUE7SUFDcEMsK0dBQXdDLENBQUE7SUFDeEMsMkdBQXNDLENBQUE7SUFDdEMscUZBQTJCLENBQUE7SUFDM0IscUZBQTJCLENBQUE7SUFDM0IseUZBQTZCLENBQUE7SUFDN0IsdUVBQW9CLENBQUE7SUFDcEIsbUZBQTBCLENBQUE7SUFDMUIscUdBQW1DLENBQUE7SUFDbkMsaUZBQXlCLENBQUE7SUFDekIscUlBQW1ELENBQUE7SUFDbkQsOEZBQWdDLENBQUE7SUFDaEMscUZBQTJCLENBQUE7SUFDM0IsbUhBQTBDLENBQUE7SUFDMUMseUZBQTZCLENBQUE7SUFDN0IsNkZBQStCLENBQUE7SUFDL0IseUVBQXFCLENBQUE7SUFDckIsMkZBQThCLENBQUE7SUFDOUIsdUZBQTRCLENBQUE7SUFDNUIsNkZBQStCLENBQUE7SUFDL0IsdUdBQW9DLENBQUE7SUFDcEMsK0hBQWdELENBQUE7SUFDaEQsdUdBQW9DLENBQUE7SUFDcEMsdUZBQTRCLENBQUE7SUFDNUIsNkVBQXVCLENBQUE7SUFDdkIsdUhBQTRDLENBQUE7SUFDNUMsK0hBQWdELENBQUE7SUFDaEQsNkdBQXVDLENBQUE7SUFDdkMsK0dBQXdDLENBQUE7SUFDeEMseUZBQTZCLENBQUE7SUFDN0IsNkVBQXVCLENBQUE7SUFDdkIsdUVBQW9CLENBQUE7SUFDcEIsMkhBQThDLENBQUE7SUFDOUMsMkZBQThCLENBQUE7SUFDOUIsbUpBQTBELENBQUE7SUFDMUQsNklBQXVELENBQUE7SUFDdkQsNkZBQStCLENBQUE7SUFDL0IseUdBQXFDLENBQUE7SUFDckMscUZBQTJCLENBQUE7SUFDM0IsMkdBQXNDLENBQUE7SUFDdEMsK0VBQXdCLENBQUE7SUFDeEIsc0dBQW9DLENBQUE7SUFDcEMsa0dBQWtDLENBQUE7SUFDbEMsd0hBQTZDLENBQUE7SUFDN0Msb0ZBQTJCLENBQUE7SUFDM0Isa0lBQWtELENBQUE7SUFDbEQsb0hBQTJDLENBQUE7SUFDM0MsZ0ZBQXlCLENBQUE7SUFDekIsZ0hBQXlDLENBQUE7SUFDekMsMElBQXNELENBQUE7SUFDdEQsc0ZBQTRCLENBQUE7SUFDNUIsb0dBQW1DLENBQUE7SUFDbkMsb0hBQTJDLENBQUE7SUFDM0Msc0hBQTRDLENBQUE7SUFDNUMsd0lBQXFELENBQUE7SUFDckQsMEhBQThDLENBQUE7SUFDOUMsc0hBQTRDLENBQUE7SUFDNUMsd0dBQXFDLENBQUE7SUFDckMsOEdBQXdDLENBQUE7SUFDeEMsOEhBQWdELENBQUE7SUFDaEQsMEhBQThDLENBQUE7SUFDOUMsd0xBQTZFLENBQUE7SUFDN0Usd01BQXFGLENBQUE7SUFDckYsb0pBQTJELENBQUE7SUFDM0Qsa0pBQTBELENBQUE7SUFDMUQsOEhBQWdELENBQUE7QUFDcEQsQ0FBQyxFQTNMVyxjQUFjLEtBQWQsY0FBYyxRQTJMekIifQ==