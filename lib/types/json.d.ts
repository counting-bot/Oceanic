/** @module Types/JSON */
/* eslint-disable @typescript-eslint/no-empty-interface */
import type { InstallParams } from "./oauth.js";
import type { ApplicationCommandOptions, LocaleMap } from "./application-commands.js";
import type { ApplicationCommandInteractionData, AutocompleteInteractionData, MessageComponentButtonInteractionData, MessageComponentSelectMenuInteractionData } from "./interactions.js";
import type { RawGuild, RoleTags } from "./guilds.js";
import type {
    ChannelMention,
    MessageActivity,
    MessageReference,
    RawChannel,
    StickerItem,
    MessageReaction,
    ThreadMetadata,
    PrivateThreadMetadata,
    ForumTag,
    ForumEmoji,
    Embed
} from "./channels.js";
import type {
    ApplicationCommandTypes,
    ChannelTypes,
    GuildChannelTypes,
    InteractionTypes,
    InviteTargetTypes,
    MessageTypes,
    OverwriteTypes,
    PrivateChannelTypes,
    RESTMethod,
    TextChannelTypes,
    ThreadAutoArchiveDuration,
    ThreadChannelTypes,
    WebhookTypes,
    SortOrderTypes,
    ForumLayoutTypes
} from "../Constants.js";

export interface JSONAnnouncementChannel extends JSONTextableChannel {
    rateLimitPerUser: 0;
    threads: Array<string>;
    type: ChannelTypes.GUILD_ANNOUNCEMENT;
}
export interface JSONAnnouncementThreadChannel extends JSONThreadChannel {
    threadMetadata: ThreadMetadata;
    type: ChannelTypes.ANNOUNCEMENT_THREAD;
}
export interface JSONApplication extends JSONClientApplication {
    botPublic: boolean;
    botRequireCodeGrant: boolean;
    coverImage: string | null;
    customInstallURL?: string;
    description: string;
    guildID?: string;
    icon: string | null;
    installParams?: InstallParams;
    name: string;
    ownerID: string;
    primarySKUID?: string;
    privacyPolicyURL?: string;
    rpcOrigins: Array<string>;
    slug?: string;
    tags?: Array<string>;
    termsOfServiceURL?: string;
    verifyKey: string;
}
export interface JSONApplicationCommand extends JSONBase {
    applicationID: string;
    defaultMemberPermissions?: JSONPermission;
    description: string;
    descriptionLocalizations?: LocaleMap | null;
    dmPermission?: boolean;
    guildID?: string;
    name: string;
    nameLocalizations?: LocaleMap | null;
    nsfw?: boolean;
    options?: Array<ApplicationCommandOptions>;
    type: ApplicationCommandTypes;
    version: string;
}
export interface JSONAttachment extends JSONBase {
    contentType?: string;
    description?: string;
    ephemeral?: boolean;
    filename: string;
    height?: number;
    proxyURL: string;
    size: number;
    url: string;
    width?: number;
}
export interface JSONAutocompleteInteraction extends JSONInteraction {
    appPermissions?: JSONPermission;
    channel: string;
    data: AutocompleteInteractionData;
    guildID?: string;
    guildLocale?: string;
    locale: string;
    member?: JSONMember;
    type: InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE;
    user: JSONUser;
}
export interface JSONBase {
    createdAt: number;
    id: string;
}
export interface JSONCategoryChannel extends JSONGuildChannel {
    channels: Array<string>;
    permissionOverwrites: Array<JSONPermissionOverwrite>;
    position: number;
    type: ChannelTypes.GUILD_CATEGORY;
}
export interface JSONChannel extends JSONBase {
    type: ChannelTypes;
}
export interface JSONClientApplication extends JSONBase {
    flags: number;
}
export interface JSONClientUser extends JSONUser {
    email: string | null;
    flags: number;
    locale: string;
    mfaEnabled: boolean;
    verified: boolean;
}
export interface JSONCommandInteraction extends JSONInteraction {
    appPermissions?: JSONPermission;
    channelID: string;
    data: ApplicationCommandInteractionData;
    guildID?: string;
    guildLocale?: string;
    locale: string;
    member?: JSONMember;
    type: InteractionTypes.APPLICATION_COMMAND;
    user: JSONUser;
}
export interface JSONComponentInteraction extends JSONInteraction {
    appPermissions?: JSONPermission;
    channelID: string;
    data: MessageComponentButtonInteractionData | MessageComponentSelectMenuInteractionData;
    guildID?: string;
    guildLocale?: string;
    locale: string;
    member?: JSONMember;
    type: InteractionTypes.MESSAGE_COMPONENT;
    user: JSONUser;
}
export interface JSONDiscordHTTPError {
    message: string;
    method: RESTMethod;
    name: string;
    resBody: Record<string, unknown> | null;
    stack: string;
}
export interface JSONDiscordRESTError {
    message: string;
    method: RESTMethod;
    name: string;
    resBody: Record<string, unknown> | null;
    stack: string;
}
export interface JSONExtendedUser extends JSONUser {
    email: string | null;
    flags: number;
    locale?: string;
    mfaEnabled: boolean;
    verified: boolean;
}
export interface JSONForumChannel extends JSONGuildChannel {
    availableTags: Array<ForumTag>;
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration;
    defaultForumLayout: ForumLayoutTypes;
    defaultReactionEmoji: ForumEmoji | null;
    defaultSortOrder: SortOrderTypes | null;
    defaultThreadRateLimitPerUser: number;
    flags: number;
    lastThreadID: string | null;
    permissionOverwrites: Array<JSONPermissionOverwrite>;
    position: number;
    rateLimitPerUser: number;
    template: string;
    threads: Array<string>;
    topic: string | null;
}
export interface JSONGuild extends JSONBase {
    application?: string;
    approximateMemberCount?: number;
    approximatePresenceCount?: number;
    channels: Array<string>;
    icon: string | null;
    large: boolean;
    maxMembers?: number;
    maxPresences?: number;
    memberCount: number;
    members: Array<string>;
    name: string;
    ownerID: string;
    preferredLocale: string;
    region?: string | null;
    roles: Array<JSONRole>;
    threads: Array<string>;
    unavailable: boolean;
    vanityURLCode: string | null;
}
export interface JSONGuildChannel extends JSONChannel {
    guildID: string;
    name: string;
    parentID: string | null;
    type: GuildChannelTypes;
}
export interface JSONInteraction extends JSONBase {
    applicationID: string;
    token: string;
    type: InteractionTypes;
    version: 1;
}
export interface JSONInvite {
    approximateMemberCount?: number;
    approximatePresenceCount?: number;
    channelID?: string;
    code: string;
    createdAt?: number;
    expiresAt?: number;
    guildID?: string;
    inviter?: string;
    maxAge?: number;
    maxUses?: number;
    targetApplication?: JSONPartialApplication;
    targetType?: InviteTargetTypes;
    targetUser?: string;
    temporary?: boolean;
    uses?: number;
}
export interface JSONMember extends JSONBase {
    guildID: string;
    roles: Array<string>;
    user: JSONUser;
}
export interface JSONMessage extends JSONBase {
    activity?: MessageActivity;
    applicationID?: string;
    attachments: Array<JSONAttachment>;
    author: JSONUser;
    channelID: string;
    content: string;
    embeds: Array<Embed>;
    flags?: number;
    guildID?: string;
    interaction?: {
        id: string;
        member?: JSONMember;
        name: string;
        type: InteractionTypes;
        user: JSONUser;
    };
    mentionChannels?: Array<ChannelMention>;
    mentions: {
        channels: Array<string>;
        everyone: boolean;
        members: Array<JSONMember>;
        roles: Array<string>;
        users: Array<JSONUser>;
    };
    messageReference?: MessageReference;
    nonce?: number | string;
    position?: number;
    reactions: Record<string, MessageReaction>;
    referencedMessage?: JSONMessage | null;
    stickerItems?: Array<StickerItem>;
    thread?: JSONAnnouncementThreadChannel | JSONPublicThreadChannel | JSONPrivateThreadChannel;
    timestamp: number;
    type: MessageTypes;
    webhook?: string;
}
export interface JSONPartialApplication extends JSONBase {
    botPublic?: boolean;
    botRequireCodeGrant?: boolean;
    description: string;
    icon: string | null;
    name: string;
    verifyKey?: string;
}
export interface JSONPermission {
    allow: string;
    deny: string;
}
export interface JSONPermissionOverwrite extends JSONBase {
    permission: JSONPermission;
    type: OverwriteTypes;
}
export interface JSONPingInteraction extends JSONInteraction {
    type: InteractionTypes.PING;
}
export interface JSONPrivateChannel extends JSONChannel {
    lastMessageID: string | null;
    messages: Array<string>;
    recipient: JSONUser;
    type: ChannelTypes.DM;
}
export interface JSONPrivateThreadChannel extends JSONThreadChannel {
    threadMetadata: PrivateThreadMetadata;
    type: ChannelTypes.PRIVATE_THREAD;
}
export interface JSONPublicThreadChannel extends JSONThreadChannel {
    appliedTags: Array<string>;
    threadMetadata: ThreadMetadata;
    type: ChannelTypes.PUBLIC_THREAD;
}
export interface JSONRole extends JSONBase {
    color: number;
    guildID: string;
    hoist: boolean;
    icon: string | null;
    managed: boolean;
    mentionable: boolean;
    name: string;
    permissions: JSONPermission;
    position: number;
    tags: RoleTags;
    unicodeEmoji: string | null;
}

export interface JSONTextableChannel extends JSONGuildChannel {
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration;
    lastMessageID: string | null;
    messages: Array<string>;
    nsfw: boolean;
    permissionOverwrites: Array<JSONPermissionOverwrite>;
    position: number;
    rateLimitPerUser: number;
    topic: string | null;
    type: Exclude<TextChannelTypes, PrivateChannelTypes>;
}
export interface JSONTextChannel extends JSONTextableChannel {
    threads: Array<string>;
    type: ChannelTypes.GUILD_TEXT;
}
export interface JSONThreadChannel extends JSONGuildChannel {
    flags: number;
    lastMessageID: string | null;
    memberCount: number;
    messageCount: number;
    messages: Array<string>;
    ownerID: string;
    rateLimitPerUser: number;
    threadMetadata: ThreadMetadata | PrivateThreadMetadata;
    totalMessageSent: number;
    type: ThreadChannelTypes;
}
export interface JSONUnavailableGuild extends JSONBase {
    unavailable: true;
}
export interface JSONUser extends JSONBase {
    accentColor?: number | null;
    avatar: string | null;
    banner?: string | null;
    bot: boolean;
    discriminator: string;
    publicFlags: number;
    system: boolean;
    username: string;
}

export interface JSONWebhook extends JSONBase {
    applicationID: string | null;
    avatar: string | null;
    channelID: string | null;
    guildID: string | null;
    name: string | null;
    sourceChannel?: Pick<RawChannel, "id" | "name">;
    sourceGuild?: Pick<RawGuild, "id" | "name" | "icon">;
    token?: string;
    type: WebhookTypes;
    user?: JSONUser;
}
