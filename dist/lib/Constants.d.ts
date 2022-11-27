export declare const GATEWAY_VERSION = 10;
export declare const REST_VERSION = 10;
export declare const BASE_URL = "https://discord.com";
export declare const API_URL: string;
export declare const VERSION: string;
export declare const USER_AGENT: string;
export declare const MIN_IMAGE_SIZE = 64;
export declare const MAX_IMAGE_SIZE = 4096;
export declare const RESTMethods: readonly ["GET", "POST", "PUT", "PATCH", "DELETE"];
export type RESTMethod = typeof RESTMethods[number];
export declare const ImageFormats: readonly ["jpg", "jpeg", "png", "webp", "gif"];
export type ImageFormat = typeof ImageFormats[number];
export declare enum WebhookTypes {
    INCOMING = 1,
    CHANNEL_FOLLOWER = 2,
    APPLICATION = 3
}
export declare enum PremiumTypes {
    NONE = 0,
    NITRO_CLASSIC = 1,
    NITRO = 2,
    NITRO_BASIC = 3
}
export declare enum UserFlags {
    STAFF = 1,
    PARTNER = 2,
    HYPESQUAD = 4,
    /** @deprecated Use {@link Constants~UserFlags#BUG_HUNTER_LEVEL_1 | BUG_HUNTER_LEVEL_1}. This will be removed in `1.5.0`. */
    BUGHUNTER_LEVEL_1 = 8,
    BUG_HUNTER_LEVEL_1 = 8,
    HYPESQUAD_BRAVERY = 64,
    HYPESQUAD_BRILLIANCE = 128,
    HYPESQUAD_BALANCE = 256,
    EARLY_SUPPORTER = 512,
    PSEUDO_TEAM_USER = 1024,
    SYSTEM = 4096,
    BUG_HUNTER_LEVEL_2 = 16384,
    VERIFIED_BOT = 65536,
    VERIFIED_DEVELOPER = 131072,
    CERTIFIED_MODERATOR = 262144,
    BOT_HTTP_INTERACTIONS = 524288,
    SPAMMER = 1048576,
    ACTIVE_DEVELOPER = 4194304
}
export declare enum ApplicationFlags {
    EMBEDDED_RELEASED = 2,
    MANAGED_EMOJI = 4,
    GROUP_DM_CREATE = 16,
    GATEWAY_PRESENCE = 4096,
    GATEWAY_PRESENCE_LIMITED = 8192,
    GATEWAY_GUILD_MEMBERS = 16384,
    GATEWAY_GUILD_MEMBERS_LIMITED = 32768,
    VERIFICATION_PENDING_GUILD_LIMIT = 65536,
    EMBEDDED = 131072,
    GATEWAY_MESSAGE_CONTENT = 262144,
    GATEWAY_MESSAGE_CONTENT_LIMITED = 524288,
    EMBEDDED_FIRST_PARTY = 1048576,
    APPLICATION_COMMAND_BADGE = 2097152,
    ACTIVE = 16777216
}
export declare const GuildFeatures: readonly ["APPLICATION_COMMAND_PERMISSIONS_V2", "ANIMATED_BANNER", "ANIMATED_ICON", "AUTO_MODERATION", "BANNER", "BOT_DEVELOPER_EARLY_ACCESS", "COMMUNITY", "CREATOR_MONETIZABLE", "CREATOR_MONETIZABLE_DISABLED", "DEVELOPER_SUPPORT_SERVER", "DISCOVERABLE", "DISCOVERABLE_DISABLED", "ENABLED_DISCOVERABLE_BEFORE", "EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT", "FEATURABLE", "GUILD_HOME_TEST", "HAD_EARLY_ACTIVITIES_ACCESS", "HAS_DIRECTORY_ENTRY", "HUB", "INCREASED_THREAD_LIMIT", "INTERNAL_EMPLOYEE_ONLY", "INVITES_DISABLED", "INVITE_SPLASH", "LINKED_TO_HUB", "MEMBER_PROFILES", "MEMBER_VERIFICATION_GATE_ENABLED", "MONETIZATION_ENABLED", "MORE_EMOJI", "MORE_EMOJIS", "MORE_STICKERS", "NEWS", "NEW_THREAD_PERMISSIONS", "PARTNERED", "PREVIEW_ENABLED", "PREVIOUSLY_DISCOVERABLE", "ROLE_ICONS", "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE", "ROLE_SUBSCRIPTIONS_ENABLED", "SEVEN_DAY_THREAD_ARCHIVE", "TEXT_IN_VOICE_ENABLED", "THREADS_ENABLED", "THREADS_ENABLED_TESTING", "THREE_DAY_THREAD_ARCHIVE", "TICKETED_EVENTS_ENABLED", "VANITY_URL", "VERIFIED", "VIP_REGIONS", "WELCOME_SCREEN_ENABLED"];
export type GuildFeature = typeof GuildFeatures[number];
export declare enum DefaultMessageNotificationLevels {
    ALL_MESSAGES = 0,
    ONLY_MENTIONS = 1
}
export declare enum ExplicitContentFilterLevels {
    DISABLED = 0,
    MEMBERS_WITHOUT_ROLES = 1,
    ALL_MEMBERS = 2
}
export declare enum MFALevels {
    NONE = 0,
    ELEVATED = 1
}
export declare enum VerificationLevels {
    NONE = 0,
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    VERY_HIGH = 4
}
export declare enum GuildNSFWLevels {
    DEFAULT = 0,
    EXPLICIT = 1,
    SAFE = 2,
    AGE_RESTRICTED = 3
}
export declare enum PremiumTiers {
    NONE = 0,
    TIER_1 = 1,
    TIER_2 = 2,
    TIER_3 = 3
}
export declare enum SystemChannelFlags {
    SUPPRESS_JOIN_NOTIFICATIONS = 1,
    SUPPRESS_PREMIUM_SUBSCRIPTIONS = 2,
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 4,
    SUPPRESS_JOIN_NOTIFICATION_REPLIES = 8
}
export declare enum StickerTypes {
    STANDARD = 1,
    GUILD = 2
}
export declare enum StickerFormatTypes {
    PNG = 1,
    APNG = 2,
    LOTTIE = 3
}
export declare enum ChannelTypes {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_ANNOUNCEMENT = 5,
    ANNOUNCEMENT_THREAD = 10,
    PUBLIC_THREAD = 11,
    PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15
}
export type NotImplementedChannelTypes = ChannelTypes.GUILD_DIRECTORY;
export type PrivateChannelTypes = ChannelTypes.DM | ChannelTypes.GROUP_DM;
export type GuildChannelTypes = Exclude<ChannelTypes, PrivateChannelTypes | NotImplementedChannelTypes>;
export type GuildChannelTypesWithoutThreads = Exclude<GuildChannelTypes, ThreadChannelTypes>;
export type TextChannelTypes = ChannelTypes.GUILD_TEXT | ChannelTypes.DM | ChannelTypes.GROUP_DM | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.ANNOUNCEMENT_THREAD | ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD;
export type GuildTextChannelTypes = Exclude<TextChannelTypes, PrivateChannelTypes>;
export type ThreadChannelTypes = ChannelTypes.ANNOUNCEMENT_THREAD | ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD;
export type VoiceChannelTypes = ChannelTypes.GUILD_VOICE | ChannelTypes.GUILD_STAGE_VOICE;
export declare enum OverwriteTypes {
    ROLE = 0,
    MEMBER = 1
}
export declare enum VideoQualityModes {
    AUTO = 1,
    FULL = 2
}
export declare const ThreadAutoArchiveDurations: readonly [60, 1440, 4320, 10080];
export type ThreadAutoArchiveDuration = typeof ThreadAutoArchiveDurations[number];
export declare enum VisibilityTypes {
    NONE = 0,
    EVERYONE = 1
}
export declare const ConnectionServices: readonly ["battlenet", "ebay", "epicgames", "facebook", "github", "leagueoflegends", "paypal", "playstation", "reddit", "riotgames", "spotify", "skype", "steam", "tiktok", "twitch", "twitter", "xbox", "youtube"];
export type ConnectionService = typeof ConnectionServices[number];
export declare const IntegrationTypes: readonly ["twitch", "youtube", "discord"];
export type IntegrationType = typeof IntegrationTypes[number];
export declare enum IntegrationExpireBehaviors {
    REMOVE_ROLE = 0,
    KICK = 1
}
export declare const Permissions: {
    readonly CREATE_INSTANT_INVITE: 1n;
    readonly KICK_MEMBERS: 2n;
    readonly BAN_MEMBERS: 4n;
    readonly ADMINISTRATOR: 8n;
    readonly MANAGE_CHANNELS: 16n;
    readonly MANAGE_GUILD: 32n;
    readonly ADD_REACTIONS: 64n;
    readonly VIEW_AUDIT_LOG: 128n;
    readonly PRIORITY_SPEAKER: 256n;
    readonly STREAM: 512n;
    readonly VIEW_CHANNEL: 1024n;
    readonly SEND_MESSAGES: 2048n;
    readonly SEND_TTS_MESSAGES: 4096n;
    readonly MANAGE_MESSAGES: 8192n;
    readonly EMBED_LINKS: 16384n;
    readonly ATTACH_FILES: 32768n;
    readonly READ_MESSAGE_HISTORY: 65536n;
    readonly MENTION_EVERYONE: 131072n;
    readonly USE_EXTERNAL_EMOJIS: 262144n;
    readonly VIEW_GUILD_INSIGHTS: 524288n;
    readonly CONNECT: 1048576n;
    readonly SPEAK: 2097152n;
    readonly MUTE_MEMBERS: 4194304n;
    readonly DEAFEN_MEMBERS: 8388608n;
    readonly MOVE_MEMBERS: 16777216n;
    readonly USE_VAD: 33554432n;
    readonly CHANGE_NICKNAME: 67108864n;
    readonly MANAGE_NICKNAMES: 134217728n;
    readonly MANAGE_ROLES: 268435456n;
    readonly MANAGE_WEBHOOKS: 536870912n;
    readonly MANAGE_EMOJIS_AND_STICKERS: 1073741824n;
    readonly USE_APPLICATION_COMMANDS: 2147483648n;
    readonly REQUEST_TO_SPEAK: 4294967296n;
    readonly MANAGE_EVENTS: 8589934592n;
    readonly MANAGE_THREADS: 17179869184n;
    readonly CREATE_PUBLIC_THREADS: 34359738368n;
    readonly CREATE_PRIVATE_THREADS: 68719476736n;
    readonly USE_EXTERNAL_STICKERS: 137438953472n;
    readonly SEND_MESSAGES_IN_THREADS: 274877906944n;
    readonly USE_EMBEDDED_ACTIVITIES: 549755813888n;
    readonly MODERATE_MEMBERS: 1099511627776n;
    readonly VIEW_CREATOR_MONETIZATION_ANALYTICS: 2199023255552n;
};
export type PermissionName = keyof typeof Permissions;
export declare const AllGuildPermissions: bigint;
export declare const AllTextPermissions: bigint;
export declare const AllVoicePermissions: bigint;
export declare const AllPermissions: bigint;
export declare enum ChannelFlags {
    GUILD_FEED_REMOVED = 1,
    /** For threads, if this thread is pinned in a forum channel. */
    PINNED = 2,
    ACTIVE_CHANNELS_REMOVED = 4,
    /** For forums, if tags are required when creating threads. */
    REQUIRE_TAG = 16,
    IS_SPAM = 32
}
export declare enum SortOrderTypes {
    /** Sort forum threads by activity. */
    LATEST_ACTIVITY = 0,
    /** Sort forum threads by creation time (from most recent to oldest). */
    CREATION_DATE = 1
}
export declare enum TeamMembershipState {
    INVITED = 1,
    ACCEPTED = 2
}
export declare enum OAuthScopes {
    /** allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval */
    ACTIVITIES_READ = "activities.read",
    /** allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR [GAMESDK ACTIVITY MANAGER](https://discord.com/developers/docs/game-sdk/activities)) */
    ACTIVITIES_WRITE = "activities.write",
    /** allows your app to read build data for a user's applications */
    APPLICATIONS_BUILDS_READ = "applications.builds.read",
    /** allows your app to upload/update builds for a user's applications - requires Discord approval */
    APPLICATIONS_BUILDS_UPLOAD = "applications.builds.upload",
    /** allows your app to use [commands](https://discord.com/developers/docs/interactions/application-commands) in a guild */
    APPLICATIONS_COMMANDS = "applications.commands",
    APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE = "applications.commands.permissions.update",
    /** allows your app to update its [commands](https://discord.com/developers/docs/interactions/application-commands) using a Bearer token - [client credentials grant](https://discord.com/developers/docs/topics/oauth2#client-credentials-grant) only */
    APPLICATIONS_COMMANDS_UPDATE = "applications.commands.update",
    /** allows your app to read entitlements for a user's applications */
    APPLICATIONS_ENTITLEMENTS = "applications.entitlements",
    /** allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications */
    APPLICATIONS_STORE_UPDATE = "applications.store.update",
    /** for oauth2 bots, this puts the bot in the user's selected guild by default */
    BOT = "bot",
    /** allows [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections) to return linked third-party accounts */
    CONNECTIONS = "connections",
    /** allows your app to see information about the user's DMs and group DMs - requires Discord approval */
    DM_CHANNELS_READ = "dm_channels.read",
    /** enables [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) to return an `email` */
    EMAIL = "email",
    /** allows your app to [join users to a group dm](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient) */
    GDM_JOIN = "gdm.join",
    /** allows [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds) to return basic information about all of a user's guilds */
    GUILDS = "guilds",
    /** allows [/guilds/\{guild.id\}/members/\{user.id\}](https://discord.com/developers/docs/resources/guild#add-guild-member) to be used for joining users to a guild */
    GUILDS_JOIN = "guilds.join",
    /** allows [/users/@me/guilds/\{guild.id\}/member](https://discord.com/developers/docs/resources/user#get-current-user-guild-member) to return a user's member information in a guild */
    GUILDS_MEMBERS_READ = "guilds.members.read",
    /** allows [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) without `email` */
    IDENTIFY = "identify",
    /** for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) */
    MESSAGES_READ = "messages.read",
    /** allows your app to know a user's friends and implicit relationships - requires Discord approval */
    RELATIONSHIPS_READ = "relationships.read",
    /** allows your app to update your connection and metadata for the app */
    ROLE_CONNECTIONS_WRITE = "role_connection.write",
    /** for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval */
    RPC = "rpc",
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    RPC_ACTIVITIES_READ = "rpc.activities.read",
    /** for local rpc server access, this allows you to update a user's activity - requires Discord approval */
    RPC_ACTIVITIES_WRITE = "rpc.activities.write",
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    RPC_NOTIFICATIONS_READ = "rpc.notifications.read",
    /** for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval */
    RPC_VOICE_READ = "rpc.voice.read",
    /** for local rpc server access, this allows you to update a user's voice settings - requires Discord approval */
    RPC_VOICE_WRITE = "rpc.voice.write",
    /** allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval */
    VOICE = "voice",
    /** This generates a webhook that is returned in the oauth token response for authorization code grants. */
    WEBHOOK_INCOMING = "webhook.incoming"
}
export declare enum ComponentTypes {
    ACTION_ROW = 1,
    BUTTON = 2,
    STRING_SELECT = 3,
    TEXT_INPUT = 4,
    USER_SELECT = 5,
    ROLE_SELECT = 6,
    MENTIONABLE_SELECT = 7,
    CHANNEL_SELECT = 8
}
export type SelectMenuNonResolvedTypes = ComponentTypes.STRING_SELECT;
export type SelectMenuResolvedTypes = ComponentTypes.USER_SELECT | ComponentTypes.ROLE_SELECT | ComponentTypes.MENTIONABLE_SELECT | ComponentTypes.CHANNEL_SELECT;
export type SelectMenuTypes = SelectMenuNonResolvedTypes | SelectMenuResolvedTypes;
export type MessageComponentTypes = ComponentTypes.BUTTON | SelectMenuTypes;
export type ModalComponentTypes = ComponentTypes.TEXT_INPUT;
export declare enum ButtonStyles {
    PRIMARY = 1,
    SECONDARY = 2,
    SUCCESS = 3,
    DANGER = 4,
    LINK = 5
}
export declare enum TextInputStyles {
    SHORT = 1,
    PARAGRAPH = 2
}
export declare enum MessageFlags {
    CROSSPOSTED = 1,
    IS_CROSSPOST = 2,
    SUPPRESS_EMBEDS = 4,
    SOURCE_MESSAGE_DELETED = 8,
    URGENT = 16,
    HAS_THREAD = 32,
    EPHEMERAL = 64,
    LOADING = 128,
    FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 256
}
export declare enum MessageTypes {
    DEFAULT = 0,
    RECIPIENT_ADD = 1,
    RECIPIENT_REMOVE = 2,
    CALL = 3,
    CHANNEL_NAME_CHANGE = 4,
    CHANNEL_ICON_CHANGE = 5,
    CHANNEL_PINNED_MESSAGE = 6,
    USER_JOIN = 7,
    GUILD_BOOST = 8,
    GUILD_BOOST_TIER_1 = 9,
    GUILD_BOOST_TIER_2 = 10,
    GUILD_BOOST_TIER_3 = 11,
    CHANNEL_FOLLOW_ADD = 12,
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    GUILD_DISCOVERY_REQUALIFIED = 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
    THREAD_CREATED = 18,
    REPLY = 19,
    CHAT_INPUT_COMMAND = 20,
    THREAD_STARTER_MESSAGE = 21,
    GUILD_INVITE_REMINDER = 22,
    CONTEXT_MENU_COMMAND = 23,
    AUTO_MODERATION_ACTION = 24,
    ROLE_SUBSCRIPTION_PURCHASE = 25
}
export declare enum MessageActivityTypes {
    JOIN = 1,
    SPECTATE = 2,
    LISTEN = 3,
    JOIN_REQUEST = 5
}
export declare enum InteractionTypes {
    PING = 1,
    APPLICATION_COMMAND = 2,
    MESSAGE_COMPONENT = 3,
    APPLICATION_COMMAND_AUTOCOMPLETE = 4,
    MODAL_SUBMIT = 5
}
export declare enum InviteTargetTypes {
    STREAM = 1,
    EMBEDDED_APPLICATION = 2
}
export declare enum StageInstancePrivacyLevels {
    /** @deprecated */
    PUBLIC = 1,
    GUILD_ONLY = 2
}
export declare enum ApplicationCommandTypes {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3
}
export declare enum ApplicationCommandOptionTypes {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}
export declare enum ApplicationCommandPermissionTypes {
    ROLE = 1,
    USER = 2,
    CHANNEL = 3
}
export declare enum InteractionResponseTypes {
    PONG = 1,
    CHANNEL_MESSAGE_WITH_SOURCE = 4,
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
    DEFERRED_UPDATE_MESSAGE = 6,
    UPDATE_MESSAGE = 7,
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
    MODAL = 9
}
export declare enum Intents {
    GUILDS = 1,
    GUILD_MEMBERS = 2,
    GUILD_BANS = 4,
    GUILD_EMOJIS_AND_STICKERS = 8,
    GUILD_INTEGRATIONS = 16,
    GUILD_WEBHOOKS = 32,
    GUILD_INVITES = 64,
    GUILD_VOICE_STATES = 128,
    GUILD_PRESENCES = 256,
    GUILD_MESSAGES = 512,
    GUILD_MESSAGE_REACTIONS = 1024,
    GUILD_MESSAGE_TYPING = 2048,
    DIRECT_MESSAGES = 4096,
    DIRECT_MESSAGE_REACTIONS = 8192,
    DIRECT_MESSAGE_TYPING = 16384,
    MESSAGE_CONTENT = 32768,
    GUILD_SCHEDULED_EVENTS = 65536,
    AUTO_MODERATION_CONFIGURATION = 1048576,
    AUTO_MODERATION_EXECUTION = 2097152
}
export type IntentNames = keyof typeof Intents;
export declare const AllNonPrivilegedIntents: number;
export declare const AllPrivilegedIntents: number;
export declare const AllIntents: number;
export declare enum GatewayOPCodes {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    PRESENCE_UPDATE = 3,
    VOICE_STATE_UPDATE = 4,
    RESUME = 6,
    RECONNECT = 7,
    REQUEST_GUILD_MEMBERS = 8,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11
}
export declare enum GatewayCloseCodes {
    UNKNOWN_ERROR = 4000,
    UNKNOWN_OPCODE = 4001,
    DECODE_ERROR = 4002,
    NOT_AUTHENTICATED = 4003,
    AUTHENTICATION_FAILED = 4004,
    ALREADY_AUTHENTICATED = 4005,
    INVALID_SEQUENCE = 4007,
    RATE_LIMITED = 4008,
    SESSION_TIMEOUT = 4009,
    INVALID_SHARD = 4010,
    SHARDING_REQUIRED = 4011,
    INVALID_API_VERSION = 4012,
    INVALID_INTENTS = 4013,
    DISALLOWED_INTENTS = 4014
}
export declare enum VoiceOPCodes {
    IDENTIFY = 0,
    SELECT_PROTOCOL = 1,
    READY = 2,
    HEARTBEAT = 3,
    SESSION_DESCRIPTION = 4,
    SPEAKING = 5,
    HEARTBEAT_ACK = 6,
    RESUME = 7,
    HELLO = 8,
    RESUMED = 9,
    CLIENT_DISCONNECT = 13
}
export declare enum VoiceCloseCodes {
    UNKNOWN_OPCODE = 4001,
    DECODE_ERROR = 4002,
    NOT_AUTHENTICATED = 4003,
    AUTHENTICATION_FAILED = 4004,
    ALREADY_AUTHENTICATED = 4005,
    INVALID_SESSION = 4006,
    SESSION_TIMEOUT = 4009,
    SERVER_NOT_FOUND = 4011,
    UNKNOWN_PROTOCOL = 4012,
    DISCONNECTED = 4013,
    VOICE_SERVER_CRASHED = 4014,
    UNKNOWN_ENCRYPTION_MODE = 4015
}
export declare enum ActivityTypes {
    GAME = 0,
    STREAMING = 1,
    LISTENING = 2,
    WATCHING = 3,
    CUSTOM = 4,
    COMPETING = 5
}
export declare enum ActivityFlags {
    INSTANCE = 1,
    JOIN = 2,
    SPECTATE = 4,
    JOIN_REQUEST = 8,
    SYNC = 16,
    PLAY = 32,
    PARTY_PRIVACY_FRIENDS_ONLY = 64,
    PARTY_PRIVACY_VOICE_CHANNEL = 128,
    EMBEDDED = 256
}
export declare enum ThreadMemberFlags {
    HAS_INTERACTED = 1,
    ALL_MESSAGES = 2,
    ONLY_MENTIONS = 4,
    NO_MESSAGES = 8
}
/** The error codes that can be received. See [Discord's Documentation](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json). */
export declare enum JSONErrorCodes {
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
    MESSAGE_BLOCKED_BY_HARMFUL_LINKS_FILTER = 220005
}
