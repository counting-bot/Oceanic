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
] as const;
export type RESTMethod = typeof RESTMethods[number];

export const ImageFormats = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif"
] as const;
export type ImageFormat = typeof ImageFormats[number];

export enum WebhookTypes {
    INCOMING         = 1,
    CHANNEL_FOLLOWER = 2,
    APPLICATION      = 3,
}

export enum ApplicationFlags {
    EMBEDDED_RELEASED                = 1 << 1,
    MANAGED_EMOJI                    = 1 << 2,
    GROUP_DM_CREATE                  = 1 << 4,
    GATEWAY_PRESENCE                 = 1 << 12,
    GATEWAY_PRESENCE_LIMITED         = 1 << 13,
    GATEWAY_GUILD_MEMBERS            = 1 << 14,
    GATEWAY_GUILD_MEMBERS_LIMITED    = 1 << 15,
    VERIFICATION_PENDING_GUILD_LIMIT = 1 << 16,
    EMBEDDED                         = 1 << 17,
    GATEWAY_MESSAGE_CONTENT          = 1 << 18,
    GATEWAY_MESSAGE_CONTENT_LIMITED  = 1 << 19,
    EMBEDDED_FIRST_PARTY             = 1 << 20,
    APPLICATION_COMMAND_BADGE        = 1 << 21,
    ACTIVE                           = 1 << 24,
}

export enum DefaultMessageNotificationLevels {
    ALL_MESSAGES  = 0,
    ONLY_MENTIONS = 1,
    NO_MESSAGES   = 2,
    NULL          = 3,
}

export enum ExplicitContentFilterLevels {
    DISABLED              = 0,
    MEMBERS_WITHOUT_ROLES = 1,
    ALL_MEMBERS           = 2,
}

export enum MFALevels {
    NONE     = 0,
    ELEVATED = 1,
}

export enum VerificationLevels {
    NONE      = 0,
    LOW       = 1,
    MEDIUM    = 2,
    HIGH      = 3,
    VERY_HIGH = 4,
}

export enum GuildNSFWLevels {
    DEFAULT        = 0,
    EXPLICIT       = 1,
    SAFE           = 2,
    AGE_RESTRICTED = 3,
}

export enum PremiumTiers {
    NONE   = 0,
    TIER_1 = 1,
    TIER_2 = 2,
    TIER_3 = 3,
}

export enum SystemChannelFlags {
    SUPPRESS_JOIN_NOTIFICATIONS                              = 1 << 0,
    SUPPRESS_PREMIUM_SUBSCRIPTIONS                           = 1 << 1,
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS                    = 1 << 2,
    SUPPRESS_JOIN_NOTIFICATION_REPLIES                       = 1 << 3,
    SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS        = 1 << 4,
    SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES = 1 << 5,
}

export enum StickerTypes {
    STANDARD = 1,
    GUILD    = 2,
}

export enum StickerFormatTypes {
    PNG    = 1,
    APNG   = 2,
    LOTTIE = 3,
    GIF    = 4,
}

export enum ChannelTypes {
    GUILD_TEXT           = 0,
    DM                   = 1,
    GUILD_VOICE          = 2,
    GROUP_DM             = 3,
    GUILD_CATEGORY       = 4,
    GUILD_ANNOUNCEMENT   = 5,

    ANNOUNCEMENT_THREAD  = 10,
    PUBLIC_THREAD        = 11,
    PRIVATE_THREAD       = 12,
    GUILD_STAGE_VOICE    = 13,
    GUILD_DIRECTORY      = 14,
    GUILD_FORUM          = 15,
}

export type NotImplementedChannelTypes = ChannelTypes.GUILD_DIRECTORY;
export type PrivateChannelTypes = ChannelTypes.DM | ChannelTypes.GROUP_DM;
export type GuildChannelTypes = Exclude<ChannelTypes, PrivateChannelTypes | NotImplementedChannelTypes>;
export type GuildChannelTypesWithoutThreads = Exclude<GuildChannelTypes, ThreadChannelTypes>;
export type TextChannelTypes = ChannelTypes.GUILD_TEXT | ChannelTypes.DM | ChannelTypes.GROUP_DM | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.ANNOUNCEMENT_THREAD | ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD;
export type GuildTextChannelTypes = Exclude<TextChannelTypes, PrivateChannelTypes>;
export type ThreadChannelTypes = ChannelTypes.ANNOUNCEMENT_THREAD | ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD;

export enum OverwriteTypes {
    ROLE   = 0,
    MEMBER = 1,
}

export enum VideoQualityModes {
    AUTO = 1,
    FULL = 2,
}

export const ThreadAutoArchiveDurations = [
    60,
    1440,
    4320,
    10080
] as const;
export type ThreadAutoArchiveDuration = typeof ThreadAutoArchiveDurations[number];

export enum VisibilityTypes {
    NONE     = 0,
    EVERYONE = 1,
}

// values won't be statically typed if we use bit shifting, and enums can't use bigints
export const Permissions = {
    CREATE_INSTANT_INVITE:               1n,             // 1 << 0
    KICK_MEMBERS:                        2n,             // 1 << 1
    BAN_MEMBERS:                         4n,             // 1 << 2
    ADMINISTRATOR:                       8n,             // 1 << 3
    MANAGE_CHANNELS:                     16n,            // 1 << 4
    MANAGE_GUILD:                        32n,            // 1 << 5
    ADD_REACTIONS:                       64n,            // 1 << 6
    VIEW_AUDIT_LOG:                      128n,           // 1 << 7
    PRIORITY_SPEAKER:                    256n,           // 1 << 8
    STREAM:                              512n,           // 1 << 9
    VIEW_CHANNEL:                        1024n,          // 1 << 10
    SEND_MESSAGES:                       2048n,          // 1 << 11
    SEND_TTS_MESSAGES:                   4096n,          // 1 << 12
    MANAGE_MESSAGES:                     8192n,          // 1 << 13
    EMBED_LINKS:                         16384n,         // 1 << 14
    ATTACH_FILES:                        32768n,         // 1 << 15
    READ_MESSAGE_HISTORY:                65536n,         // 1 << 16
    MENTION_EVERYONE:                    131072n,        // 1 << 17
    USE_EXTERNAL_EMOJIS:                 262144n,        // 1 << 18
    VIEW_GUILD_INSIGHTS:                 524288n,        // 1 << 19
    CONNECT:                             1048576n,       // 1 << 20
    SPEAK:                               2097152n,       // 1 << 21
    MUTE_MEMBERS:                        4194304n,       // 1 << 22
    DEAFEN_MEMBERS:                      8388608n,       // 1 << 23
    MOVE_MEMBERS:                        16777216n,      // 1 << 24
    USE_VAD:                             33554432n,      // 1 << 25
    CHANGE_NICKNAME:                     67108864n,      // 1 << 26
    MANAGE_NICKNAMES:                    134217728n,     // 1 << 27
    MANAGE_ROLES:                        268435456n,     // 1 << 28
    MANAGE_WEBHOOKS:                     536870912n,     // 1 << 29
    MANAGE_EMOJIS_AND_STICKERS:          1073741824n,    // 1 << 30
    USE_APPLICATION_COMMANDS:            2147483648n,    // 1 << 31
    REQUEST_TO_SPEAK:                    4294967296n,    // 1 << 32
    MANAGE_EVENTS:                       8589934592n,    // 1 << 33
    MANAGE_THREADS:                      17179869184n,   // 1 << 34
    CREATE_PUBLIC_THREADS:               34359738368n,   // 1 << 35
    CREATE_PRIVATE_THREADS:              68719476736n,   // 1 << 36
    USE_EXTERNAL_STICKERS:               137438953472n,  // 1 << 37
    SEND_MESSAGES_IN_THREADS:            274877906944n,  // 1 << 38
    USE_EMBEDDED_ACTIVITIES:             549755813888n,  // 1 << 39
    MODERATE_MEMBERS:                    1099511627776n, // 1 << 40
    VIEW_CREATOR_MONETIZATION_ANALYTICS: 2199023255552n  // 1 << 41
} as const;
export type PermissionName = keyof typeof Permissions;
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

export enum ChannelFlags {
    GUILD_FEED_REMOVED      = 1 << 0,
    /** For threads, if this thread is pinned in a forum channel. */
    PINNED                  = 1 << 1,
    ACTIVE_CHANNELS_REMOVED = 1 << 2,
    /** For forums, if tags are required when creating threads. */
    REQUIRE_TAG             = 1 << 4,
    IS_SPAM                 = 1 << 5,
}

export enum SortOrderTypes {
    /** Sort forum threads by activity. */
    LATEST_ACTIVITY = 0,
    /** Sort forum threads by creation time (from most recent to oldest). */
    CREATION_DATE = 1,
}

export enum ForumLayoutTypes {
    /** A preferred forum layout hasn't been set by a server admin. */
    DEFAULT = 0,
    /** List View: display forum posts in a text-focused list. */
    LIST = 1,
    /** Gallery View: display forum posts in a media-focused gallery. */
    GRID = 2,
}

export enum ComponentTypes {
    ACTION_ROW         = 1,
    BUTTON             = 2,
    STRING_SELECT      = 3,
    TEXT_INPUT         = 4,
    USER_SELECT        = 5,
    ROLE_SELECT        = 6,
    MENTIONABLE_SELECT = 7,
    CHANNEL_SELECT     = 8,
}

export type SelectMenuNonResolvedTypes = ComponentTypes.STRING_SELECT;
export type SelectMenuResolvedTypes = ComponentTypes.USER_SELECT | ComponentTypes.ROLE_SELECT | ComponentTypes.MENTIONABLE_SELECT | ComponentTypes.CHANNEL_SELECT;
export type SelectMenuTypes = SelectMenuNonResolvedTypes | SelectMenuResolvedTypes;

export enum ButtonStyles {
    PRIMARY   = 1,
    SECONDARY = 2,
    SUCCESS   = 3,
    DANGER    = 4,
    LINK      = 5,
}

export enum TextInputStyles {
    SHORT     = 1,
    PARAGRAPH = 2,
}

export enum MessageTypes {
    DEFAULT                                      = 0,
    RECIPIENT_ADD                                = 1,
    RECIPIENT_REMOVE                             = 2,
    CALL                                         = 3,
    CHANNEL_NAME_CHANGE                          = 4,
    CHANNEL_ICON_CHANGE                          = 5,
    CHANNEL_PINNED_MESSAGE                       = 6,
    USER_JOIN                                    = 7,
    GUILD_BOOST                                  = 8,
    GUILD_BOOST_TIER_1                           = 9,
    GUILD_BOOST_TIER_2                           = 10,
    GUILD_BOOST_TIER_3                           = 11,
    CHANNEL_FOLLOW_ADD                           = 12,
    GUILD_STREAM                                 = 13,
    GUILD_DISCOVERY_DISQUALIFIED                 = 14,
    GUILD_DISCOVERY_REQUALIFIED                  = 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING   = 17,
    THREAD_CREATED                               = 18,
    REPLY                                        = 19,
    CHAT_INPUT_COMMAND                           = 20,
    THREAD_STARTER_MESSAGE                       = 21,
    GUILD_INVITE_REMINDER                        = 22,
    CONTEXT_MENU_COMMAND                         = 23,
    AUTO_MODERATION_ACTION                       = 24,
    ROLE_SUBSCRIPTION_PURCHASE                   = 25,
    INTERACTION_PREMIUM_UPSELL                   = 26,
    STAGE_START                                  = 27,
    STAGE_END                                    = 28,
    STAGE_SPEAKER                                = 29,
    STAGE_RAISE_HAND                             = 30,
    STAGE_TOPIC_CHANGE                           = 31,
    GUILD_APPLICATION_PREMIUM_SUBSCRIPTION       = 32,
}

export enum MessageActivityTypes {
    JOIN         = 1,
    SPECTATE     = 2,
    LISTEN       = 3,
    JOIN_REQUEST = 5,
}

export enum InteractionTypes {
    PING                             = 1,
    APPLICATION_COMMAND              = 2,
    MESSAGE_COMPONENT                = 3,
    APPLICATION_COMMAND_AUTOCOMPLETE = 4,
    MODAL_SUBMIT                     = 5,
}

export enum InviteTargetTypes {
    STREAM                      = 1,
    EMBEDDED_APPLICATION        = 2,
    ROLE_SUBSCRIPTIONS_PURCHASE = 3,
}

export enum StageInstancePrivacyLevels {
    /** @deprecated */
    PUBLIC     = 1,
    GUILD_ONLY = 2,
}

export enum ApplicationCommandTypes {
    CHAT_INPUT = 1,
    USER       = 2,
    MESSAGE    = 3,
}

export enum ApplicationCommandOptionTypes {
    SUB_COMMAND       = 1,
    SUB_COMMAND_GROUP = 2,
    STRING            = 3,
    INTEGER           = 4,
    BOOLEAN           = 5,
    USER              = 6,
    CHANNEL           = 7,
    ROLE              = 8,
    MENTIONABLE       = 9,
    NUMBER            = 10,
    ATTACHMENT        = 11,
}

export enum ApplicationCommandPermissionTypes {
    ROLE    = 1,
    USER    = 2,
    CHANNEL = 3,
}

export enum InteractionResponseTypes {
    PONG                                    = 1,
    CHANNEL_MESSAGE_WITH_SOURCE             = 4,
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE    = 5,
    DEFERRED_UPDATE_MESSAGE                 = 6,
    UPDATE_MESSAGE                          = 7,
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
    MODAL                                   = 9,
}

export enum Intents {
    GUILDS                        = 1 << 0,
    GUILD_MEMBERS                 = 1 << 1,
    GUILD_BANS                    = 1 << 2,
    GUILD_EMOJIS_AND_STICKERS     = 1 << 3,
    GUILD_INTEGRATIONS            = 1 << 4,
    GUILD_WEBHOOKS                = 1 << 5,
    GUILD_INVITES                 = 1 << 6,
    GUILD_VOICE_STATES            = 1 << 7,
    GUILD_PRESENCES               = 1 << 8,
    GUILD_MESSAGES                = 1 << 9,
    GUILD_MESSAGE_REACTIONS       = 1 << 10,
    GUILD_MESSAGE_TYPING          = 1 << 11,
    DIRECT_MESSAGES               = 1 << 12,
    DIRECT_MESSAGE_REACTIONS      = 1 << 13,
    DIRECT_MESSAGE_TYPING         = 1 << 14,
    MESSAGE_CONTENT               = 1 << 15,
    GUILD_SCHEDULED_EVENTS        = 1 << 16,
    AUTO_MODERATION_CONFIGURATION = 1 << 17,
    AUTO_MODERATION_EXECUTION     = 1 << 18,
}

export type IntentNames = keyof typeof Intents;

export const AllNonPrivilegedIntents =
    Intents.GUILDS |
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
export const AllPrivilegedIntents =
    Intents.GUILD_MEMBERS |
    Intents.GUILD_PRESENCES |
    Intents.MESSAGE_CONTENT;
export const AllIntents = AllNonPrivilegedIntents | AllPrivilegedIntents;

export enum GatewayOPCodes {
    DISPATCH              = 0,
    HEARTBEAT             = 1,
    IDENTIFY              = 2,
    PRESENCE_UPDATE       = 3,
    VOICE_STATE_UPDATE    = 4,
    RESUME                = 6,
    RECONNECT             = 7,
    REQUEST_GUILD_MEMBERS = 8,
    INVALID_SESSION       = 9,
    HELLO                 = 10,
    HEARTBEAT_ACK         = 11,
}

export enum GatewayCloseCodes {
    UNKNOWN_ERROR         = 4000,
    UNKNOWN_OPCODE        = 4001,
    DECODE_ERROR          = 4002,
    NOT_AUTHENTICATED     = 4003,
    AUTHENTICATION_FAILED = 4004,
    ALREADY_AUTHENTICATED = 4005,
    INVALID_SEQUENCE      = 4007,
    RATE_LIMITED          = 4008,
    SESSION_TIMEOUT       = 4009,
    INVALID_SHARD         = 4010,
    SHARDING_REQUIRED     = 4011,
    INVALID_API_VERSION   = 4012,
    INVALID_INTENTS       = 4013,
    DISALLOWED_INTENTS    = 4014,
}

export enum ActivityTypes {
    GAME      = 0,
    STREAMING = 1,
    LISTENING = 2,
    WATCHING  = 3,
    CUSTOM    = 4,
    COMPETING = 5,
}

export enum RoleConnectionMetadataTypes {
    INTEGER_LESS_THAN_OR_EQUAL     = 1,
    INTEGER_GREATER_THAN_OR_EQUAL  = 2,
    INTEGER_EQUAL                  = 3,
    INTEGER_NOT_EQUAL              = 4,
    DATETIME_LESS_THAN_OR_EQUAL    = 5,
    DATETIME_GREATER_THAN_OR_EQUAL = 6,
    BOOLEAN_EQUAL                  = 7,
    BOOLEAN_NOT_EQUAL              = 8,
}

// entries are intentionally not aligned
/** The error codes that can be received. See [Discord's Documentation](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json). */
export enum JSONErrorCodes {
    GENERAL_ERROR = 0,
    UNKNOWN_ACCOUNT = 10001,
    UNKNOWN_APPLICATION = 10002,
    UNKNOWN_CHANNEL = 10003,
    UNKNOWN_GUILD = 10004,
    UNKNOWN_INTEGRATION = 10005,
    UNKNOWN_INVITE = 10006,
    UNKNOWN_MEMBER = 10007,
    UNKNOWN_MESSAGE = 10008,
    UNKNOWN_OVERWRITE = 10009,
    UNKNOWN_PROVIDER = 10010,
    UNKNOWN_ROLE = 10011,
    UNKNOWN_TOKEN = 10012,
    UNKNOWN_USER = 10013,
    UNKNOWN_EMOJI = 10014,
    UNKNOWN_WEBHOOK = 10015,
    UNKNOWN_WEBHOOK_SERVICE = 10016,
    UNKNOWN_SESSION = 10020,
    UNKNOWN_BAN = 10026,
    UNKNOWN_SKU = 10027,
    UNKNOWN_STORE_LISTING = 10028,
    UNKNOWN_ENTITLEMENT = 10029,
    UNKNOWN_BUILD = 10030,
    UNKNOWN_LOBBY = 10031,
    UNKNOWN_BRANCH = 10032,
    UNKNOWN_STORE_DIRECTORY_LAYOUT = 10036,
    UNKNOWN_REDISTRIBUTABLE = 10037,
    UNKNOWN_GIFT_CODE = 10038,
    UNKNOWN_STREAM = 10049,
    UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN = 10050,
    UNKNOWN_GUILD_TEMPLATE = 10057,
    UNKNOWN_DISCOVERABLE_SERVER_CATEGORY = 10059,
    UNKNOWN_STICKER = 10060,
    UNKNOWN_INTERACTION = 10062,
    UNKNOWN_APPLICATION_COMMAND = 10063,
    UNKNOWN_APPLICATION_COMMAND_PERMISSIONS = 10066,
    UNKNOWN_STAGE_INSTANCE = 10067,
    UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM = 10068,
    UNKNOWN_GUILD_WELCOME_SCREEN = 10069,
    UNKNOWN_GUILD_SCHEDULED_EVENT = 10070,
    UNKNOWN_GUILD_SCHEDULED_EVENT_USER = 10071,
    UNKNOWN_TAG = 10087,
    BOTS_CANNOT_USE_THIS_ENDPOINT = 20001,
    ONLY_BOTS_CAN_USE_THIS_ENDPOINT = 20002,
    EXPLICIT_CONTENT = 20009,
    NOT_AUTHORIZED_FOR_APPLICATION = 20012,
    SLOWMODE_RATE_LIMIT = 20016,
    ACCOUNT_OWNER_ONLY = 20018,
    ANNOUNCEMENT_EDIT_LIMIT_EXCEEDED = 20022,
    UNDER_MINIMUM_AGE = 20024,
    CHANNEL_WRITE_RATE_LIMIT = 20028,
    GUILD_WRITE_RATE_LIMIT = 20029,
    WORDS_NOT_ALLOWED = 20031,
    MAXIMUM_NUMBER_OF_GUILDS = 30001,
    MAXIMUM_NUMBER_OF_FRIENDS = 30002,
    MAXIMUM_NUMBER_OF_PINS = 30003,
    MAXIMUM_NUMBER_OF_RECIPIENTS = 30004,
    MAXIMUM_NUMBER_OF_GUILD_ROLES = 30005,
    MAXIMUM_NUMBER_OF_WEBHOOKS = 30007,
    MAXIMUM_NUMBER_OF_EMOJIS = 30008,
    MAXIMUM_NUMBER_OF_REACTIONS = 30010,
    MAXIMUM_NUMBER_OF_CHANNELS = 30013,
    MAXIMUM_NUMBER_OF_ATTACHMENTS = 30015,
    MAXIMUM_NUMBER_OF_INVITES = 30016,
    MAXIMUM_NUMBER_OF_ANIMATED_EMOJIS = 30018,
    MAXIMUM_NUMBER_OF_SERVER_MEMBERS = 30019,
    MAXIMUM_NUMBER_OF_SERVER_CATEGORIES = 30030,
    GUILD_ALREADY_HAS_TEMPLATE = 30031,
    MAXIMUM_NUMBER_OF_APPLICATION_COMMANDS = 30032,
    MAXIMUM_NUMBER_OF_THREAD_PARTICIPANTS = 30033,
    MAXIMUM_NUMBER_OF_APPLICATION_COMMAND_CREATES = 30034,
    MAXIMUM_NUMBER_OF_BANS_FOR_NON_GUILD_MEMBERS = 30035,
    MAXIMUM_NUMBER_OF_BAN_FETCHES = 30037,
    MAXIMUM_NUMBER_OF_UNCOMPLETED_GUILD_SCHEDULED_EVENTS = 30038,
    MAXIMUM_NUMBER_OF_STICKERS = 30039,
    MAXIMUM_NUMBER_OF_PRUNE_REQUESTS = 30040,
    MAXIMUM_NUMBER_OF_GUILD_WIDGET_SETTINGS_UPDATES = 30042,
    MAXIMUM_NUMBER_OR_EDITS_TO_MESSAGES_OLDER_THAN_1_HOUR = 30046,
    MAXIMUM_NUMBER_OF_PINNED_THREADS = 30047,
    MAXIMUM_NUMBER_OF_FORUM_TAGS = 30048,
    BITRATE_TOO_HIGH = 30052,
    MAXIMUM_PREMIUM_EMOJIS = 30056,
    MAXIMUM_GUILD_WEBHOOKS = 30058,
    RESOURCE_RATE_LIMITED = 31002,
    UNAUTHORIZED = 40001,
    ACCOUNT_VERIFICATION_REQUIRED = 40002,
    DIRECT_MESSAGES_RATE_LIMIT = 40003,
    SENDING_MESSAGES_TEMPORARILY_DISABLED = 40004,
    REQUEST_ENTITY_TOO_LARGE = 40005,
    FEATURE_TEMPORARILY_DISABLED = 40006,
    USER_BANNED = 40007,
    CONNECTION_REVOKED = 40012,
    TARGET_USER_NOT_CONNECTED_TO_VOICE = 40032,
    ALREADY_CROSSPOSTED = 40033,
    APPLICATION_COMMAND_ALREADY_EXISTS = 40041,
    INTERACTION_FAILED_TO_SEND = 40043,
    CANNOT_SEND_MESSAGES_IN_FORUM_CHANNEL = 40058,
    INTERACTION_ALREADY_ACKNOWLEDGED = 40060,
    TAG_NAMES_MUST_BE_UNIQUE = 40061,
    SERVICE_RESOURCE_RATE_LIMITED = 40062,
    NO_NON_MODERATOR_TAGS = 40066,
    TAG_REQUIRED = 40067,
    MISSING_ACCESS = 50001,
    INVALID_ACCOUNT_TYPE = 50002,
    CANNOT_EXECUTE_ON_DM = 50003,
    GUILD_WIDGET_DISABLED = 50004,
    CANNOT_EDIT_MESSAGE_BY_OTHER = 50005,
    CANNOT_SEND_EMPTY_MESSAGE = 50006,
    CANNOT_MESSAGE_USER = 50007,
    CANNOT_SEND_MESSAGES_IN_NON_TEXT_CHANNEL = 50008,
    CHANNEL_VERIFICATION_LEVEL_TOO_HIGH = 50009,
    OAUTH2_APPLICATION_BOT_ABSENT = 50010,
    MAXIMUM_OAUTH2_APPLICATIONS = 50011,
    INVALID_OAUTH_STATE = 50012,
    YOU_LACK_PERMISSIONS = 50013,
    INVALID_AUTHENTICATION_TOKEN = 50014,
    NOTE_IS_TOO_LONG = 50015,
    INVALID_BULK_DELETE_QUANTITY = 50016,
    INVALID_MFA_LEVEL = 50017,
    INVALID_CHANNEL_PIN = 50019,
    INVALID_OR_TAKEN_INVITE_CODE = 50020,
    CANNOT_EXECUTE_ON_SYSTEM_MESSAGE = 50021,
    CANNOT_EXECUTE_ON_CHANNEL_TYPE = 50024,
    INVALID_OAUTH_TOKEN = 50025,
    MISSING_OAUTH_SCOPE = 50026,
    INVALID_WEBHOOK_TOKEN = 50027,
    INVALID_ROLE = 50028,
    INVALID_RECIPIENTS = 50033,
    BULK_DELETE_MESSAGE_TOO_OLD = 50034,
    INVALID_FORM_BODY = 50035,
    INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT = 50036,
    INVALID_ACTIVITY_ACTION = 500039,
    INVALID_API_VERSION = 50041,
    FILE_UPLOADED_EXCEEDS_MAXIMUM_SIZE = 50045,
    INVALID_FILE_UPLOADED = 50046,
    CANNOT_SELF_REDEEM_GIFT = 50054,
    INVALID_GUILD = 50055,
    INVALID_REQUEST_ORIGIN = 50067,
    INVALID_MESSAGE_TYPE = 50068,
    PAYMENT_SOURCE_REQUIRED = 50070,
    CANNOT_MODIFY_SYSTEM_WEBHOOK = 50073,
    CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL = 50074,
    CANNOT_EDIT_MESSAGE_STICKERS = 50080,
    INVALID_STICKER_SENT = 50081,
    THREAD_ARCHIVED = 50083,
    INVALID_THREAD_NOTIFICATION_SETTINGS = 50084,
    BEFORE_EARLIER_THAN_THREAD_CREATION_DATE = 50085,
    COMMUNITY_CHANNELS_MUST_BE_TEXT = 50086,
    SERVER_NOT_AVAILABLE_IN_LOCATION = 50095,
    MONETIZATION_REQUIRED = 50097,
    BOOSTS_REQUIRED = 50101,
    INVALID_JSON = 50109,
    OWNERSHIP_CANNOT_BE_TRANSFERRED_TO_BOT = 50132,
    FAILED_TO_RESIZE_ASSET = 50138,
    CANNOT_MIX_SUBSCRIPTION_AND_NON_SUBSCRIPTION_ROLES = 50144,
    CANNOT_CONVERT_BETWEEN_PREMIUM_AND_NORMAL_EMOJI = 50145,
    UPLOADED_FILE_NOT_FOUND = 50146,
    NO_PERMISSION_TO_SEND_STICKER = 50600,
    TWO_FACTOR_REQUIRED = 60003,
    NO_USERS_WITH_DISCORDTAG_EXIST = 80004,
    REACTION_BLOCKED = 90001,
    INELIGIBLE_FOR_SUBSCRIPTION = 100053,
    APPLICATION_NOT_AVAILABLE = 110001,
    API_RESOURCE_IS_CURRENTLY_OVERLOADED = 130000,
    STAGE_ALREADY_OPEN = 150006,
    CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY = 160002,
    THREAD_ALREADY_CREATED_FOR_MESSAGE = 160004,
    THREAD_IS_LOCKED = 160005,
    MAXIMUM_NUMBER_OF_ACTIVE_THREADS = 160006,
    MAXIMUM_NUMBER_OF_ACTIVE_ANNOUNCEMENT_THREADS = 160007,
    INVALID_LOTTIE_JSON = 170001,
    UPLOADED_LOTTIE_RASTERIZED = 170002,
    STICKER_MAXIMUM_FRAMERATE_EXCEEDED = 170003,
    STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM = 170004,
    LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED = 170005,
    STICKER_FRAME_RATE_TOO_SMALL_OR_LARGE = 170006,
    STICKER_ANIMATION_DURATION_TOO_LONG = 170007,
    CANNOT_UPDATE_FINISHED_EVENT = 180000,
    FAILED_TO_CREATE_STAGE_INSTANCE = 180002,
    MESSAGE_BLOCKED_BY_AUTOMATIC_MODERATION = 200000,
    TITLE_BLOCKED_BY_AUTOMATIC_MODERATION = 200001,
    WEBHOOKS_POSTED_TO_FORUM_CHANNELS_MUST_HAVE_THREAD_NAME_OR_THREAD_ID = 220001,
    WEBHOOKS_POSTED_TO_FORUM_CHANNELS_CANNOT_HAVE_BOTH_THREAD_NAME_AND_THREAD_ID = 220002,
    WEBHOOKS_CAN_ONLY_CREATE_THREADS_IN_FORUM_CHANNELS = 220003,
    WEBHOOK_SERVICES_CANNOT_BE_USED_IN_FORUM_CHANNELS = 220004,
    MESSAGE_BLOCKED_BY_HARMFUL_LINKS_FILTER = 220005,
}
