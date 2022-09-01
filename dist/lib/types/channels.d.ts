import type { PartialEmoji, PartialGuild, RawMember } from "./guilds";
import type { RawApplication, RawPartialApplication } from "./oauth";
import type { RawUser, RawUserWithMember } from "./users";
import type { File } from "./request-handler";
import type { RawScheduledEvent } from "./scheduled-events";
import type {
    ButtonStyles,
    ChannelTypes,
    ComponentTypes,
    GuildChannelTypes,
    InteractionTypes,
    InviteTargetTypes,
    MessageActivityTypes,
    MessageTypes,
    OverwriteTypes,
    StickerFormatTypes,
    TextInputStyles,
    ThreadAutoArchiveDuration,
    ThreadChannelTypes,
    VideoQualityModes
} from "../Constants";
import type CategoryChannel from "../structures/CategoryChannel";
import type GroupChannel from "../structures/GroupChannel";
import type Member from "../structures/Member";
import type AnnouncementChannel from "../structures/AnnouncementChannel";
import type AnnouncementThreadChannel from "../structures/AnnouncementThreadChannel";
import type PrivateChannel from "../structures/PrivateChannel";
import type PrivateThreadChannel from "../structures/PrivateThreadChannel";
import type PublicThreadChannel from "../structures/PublicThreadChannel";
import type StageChannel from "../structures/StageChannel";
import type TextChannel from "../structures/TextChannel";
import type User from "../structures/User";
import type VoiceChannel from "../structures/VoiceChannel";
import type ForumChannel from "../structures/ForumChannel";

export interface RawChannel {
    application_id?: string;
    available_tags?: Array<RawForumTag>;
    bitrate?: number;
    default_auto_archive_duration?: ThreadAutoArchiveDuration;
    default_reaction_emoji?: {
        emoji_id: string | null;
        emoji_name: string;
    } | null;
    default_thread_rate_limit_per_user?: number;
    flags?: number;
    guild_id?: string;
    icon?: string | null;
    id: string;
    last_message_id?: string | null;
    last_pin_timestamp?: string | null;
    member?: RawChannelThreadMember;
    member_count?: number;
    message_count?: number;
    name?: string | null;
    newly_created?: boolean;
    nsfw?: boolean;
    owner_id?: string;
    parent_id?: string | null;
    permission_overwrites?: Array<RawOverwrite>;
    permissions?: string;
    position?: number;
    rate_limit_per_user?: number;
    recipients?: Array<RawUser>;
    rtc_region?: string | null;
    template?: string;
    thread_metadata?: RawThreadMetadata;
    topic?: string | null;
    total_message_sent?: number;
    type: ChannelTypes;
    user_limit?: number;
    video_quality_mode?: VideoQualityModes;
}
export type RawGuildChannel = Required<Pick<RawChannel, "id" | "guild_id" | "parent_id">> & { name: string; type: GuildChannelTypes; };
export type RawPrivateChannel = Required<Pick<RawChannel, "id" | "last_message_id" | "recipients">> & { type: ChannelTypes.DM; };
// managed and nicks are undocumented, creating a group dm DOES work, and they show in the client, so we're supporting them
export type RawGroupChannel = Required<Pick<RawChannel, "id" | "recipients" | "application_id" | "icon" | "owner_id" | "nsfw" | "last_message_id">> & { managed: boolean; name: string; nicks?: Array<Record<"id" | "nick", string>>; type: ChannelTypes.GROUP_DM; };
export type RawTextChannel = Omit<RawGuildChannel, "type"> & Required<Pick<RawChannel, "default_auto_archive_duration" | "last_message_id" | "last_pin_timestamp" | "rate_limit_per_user" | "topic" | "nsfw" | "permission_overwrites" | "position">> & { type: ChannelTypes.GUILD_TEXT; };
export type RawCategoryChannel = Omit<RawGuildChannel, "type"> & Required<Pick<RawChannel,  "permission_overwrites" | "position">> & { type: ChannelTypes.GUILD_CATEGORY; };
export type RawAnnouncementChannel = Omit<RawTextChannel, "type"> & { type: ChannelTypes.GUILD_ANNOUNCEMENT; };
export type RawVoiceChannel = Omit<RawGuildChannel, "type"> & Required<Pick<RawChannel, "bitrate" | "user_limit" | "video_quality_mode" | "rtc_region" | "nsfw" | "topic" | "permission_overwrites" | "position">> & { type: ChannelTypes.GUILD_VOICE; };
export type RawStageChannel = Omit<RawGuildChannel, "type"> & Required<Pick<RawChannel, "bitrate" | "rtc_region" | "topic" | "permission_overwrites" | "position">> & { type: ChannelTypes.GUILD_STAGE_VOICE; };
export type RawThreadChannel = RawAnnouncementThreadChannel | RawPublicThreadChannel | RawPrivateThreadChannel;
export type RawAnnouncementThreadChannel = Required<Pick<RawChannel, "id" | "guild_id" | "parent_id" | "owner_id" | "last_message_id" | "thread_metadata" | "message_count" | "member_count" | "rate_limit_per_user" | "flags" | "total_message_sent" | "newly_created" | "member">> & { name: string; type: ChannelTypes.ANNOUNCEMENT_THREAD; };
export type RawPublicThreadChannel = Omit<RawAnnouncementThreadChannel, "type"> & { type: ChannelTypes.PUBLIC_THREAD; };
export type RawPrivateThreadChannel = Omit<RawAnnouncementThreadChannel, "type"> & { member: RawChannel["member"]; type: ChannelTypes.PRIVATE_THREAD; };
export type RawForumChannel = Omit<RawGuildChannel, "type"> & Required<Pick<RawChannel, "position" | "topic" | "flags" | "permission_overwrites" | "rate_limit_per_user" | "nsfw" | "available_tags" | "template" | "default_reaction_emoji" | "last_message_id" | "default_thread_rate_limit_per_user" | "default_auto_archive_duration">> & { type: ChannelTypes.GUILD_FORUM; };

export type PartialChannel = Pick<RawChannel, "id" | "name" | "type">;

export interface RawOverwrite {
    allow: string;
    deny: string;
    id: string;
    type: OverwriteTypes;
}

export interface Overwrite {
    allow: string | bigint;
    deny: string | bigint;
    id: string;
    type: OverwriteTypes;
}

export interface OverwriteOptions {
    /** The permissions to allow. */
    allow?: string | bigint;
    /** The permissions to deny. */
    deny?: string | bigint;
    /** The ID of the user or role to apply the permissions to. */
    id: string;
    /** `0` for role, `1` for user. */
    type: OverwriteTypes;
}

export interface RawThreadMetadata {
    archive_timestamp: string;
    archived: boolean;
    auto_archive_duration: ThreadAutoArchiveDuration;
    create_timestamp?: string | null;
    invitable?: boolean;
    locked: boolean;
}

export interface RawThreadMember {
    flags: number;
    id: string;
    join_timestamp: string;
    user_id: string;
}
export type RawChannelThreadMember = Pick<RawThreadMember, "flags" | "join_timestamp">;

export interface ThreadMember {
    flags: number;
    id: string;
    joinTimestamp: Date;
    userID: string;
}
export interface GatewayThreadMember {
    flags: number;
    joinTimestamp: Date;
}
export interface EditGroupDMOptions {
    /** [Group DM] The icon of the channel. */
    icon?: string | Buffer;
    /** The name of the channel. */
    name?: string;
}

export interface EditGuildChannelOptions {
    /** [Thread] If the thread is archived. */
    archived?: boolean;
    /** [Thread] The duration after which the thread will be archived. */
    autoArchiveDuration?: ThreadAutoArchiveDuration;
    /** [Forum] The {@link types/channels.ForumTag | tags} available in the channel. */
    availableTags?: Array<ForumTag>;
    /** [Stage, Voice] The bitrate of the channel. Minimum 8000. */
    bitrate?: number | null;
    /** [Announcement, Text] The default auto archive duration for threads made in this channel. */
    defaultAutoArchiveDuration?: ThreadAutoArchiveDuration | null;
    /** [Forum] The default auto archive duration for threads. */
    defaultReactionEmoji?: ForumEmoji | null;
    /** [Forum] The default reaction emoji for threads. */
    defaultThreadRateLimitPerUser?: number;
    /** [Forum, Thread] The {@link Constants.ChannelFlags | Channel Flags} to set on the channel. */
    flags?: number;
    /** [Private Thread] If non-moderators can add other non-moderators to the thread. */
    invitable?: boolean;
    /** [Thread] If the thread should be locked. */
    locked?: boolean;
    /** The name of the channel. */
    name?: string;
    /** [Announcement, Text, Voice] If the channel is age gated. */
    nsfw?: string | null;
    /** [Announcement, Forum, Text, Voice] The id of the parent category channel. */
    parentID?: string | null;
    /** Channel or category specific permissions. */
    permissionOverwrites?: Array<RawOverwrite> | null;
    /** The position of the channel in the channel list. */
    position?: number | null;
    /** [Forum, Text, Thread] The seconds between sending messages for users. Between 0 and 21600. */
    rateLimitPerUser?: number | null;
    /** The reason to be displayed in the audit log. */
    reason?: string;
    /** [Stage, Voice] The voice region id of the channel, null for automatic. */
    rtcRegion?: string | null;
    /** [Forum] Undocumented property. */
    template?: string;
    /** [Announcement, Forum, Text, Voice] The topic of the channel. In forum channels, this is the `Guidelines` section. */
    topic?: string | null;
    /** [Announcement, Text] Provide the opposite type to convert the channel. */
    type?: ChannelTypes.GUILD_TEXT | ChannelTypes.GUILD_ANNOUNCEMENT;
    /** [Voice] The maximum amount of users in the channel. `0` is unlimited, values range 1-99. */
    userLimit?: number | null;
    /** [Voice] The [video quality mode](https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of the channel. */
    videoQualityMode?: VideoQualityModes | null;
}

export type EditChannelOptions = EditGroupDMOptions & EditGuildChannelOptions;
export type EditAnyGuildChannelOptions = Pick<EditGuildChannelOptions, "name" | "position" | "permissionOverwrites">;
export type EditTextChannelOptions = EditAnyGuildChannelOptions & Pick<EditGuildChannelOptions, "topic" | "nsfw" | "rateLimitPerUser" | "parentID" | "defaultAutoArchiveDuration"> & { type?: ChannelTypes.GUILD_ANNOUNCEMENT; };
export type EditAnnouncementChannelOptions = Omit<EditTextChannelOptions, "rateLimitPerUser"> & { type?: ChannelTypes.GUILD_TEXT; };
export type EditVoiceChannelOptions = EditAnyGuildChannelOptions & Pick<EditGuildChannelOptions, "nsfw" | "bitrate" | "userLimit" | "parentID" | "rtcRegion" | "videoQualityMode">;
export type EditStageChannelOptions = EditAnyGuildChannelOptions & Pick<EditGuildChannelOptions, "bitrate" | "rtcRegion">;
export type EditThreadChannelOptions = EditPublicThreadChannelOptions | EditPrivateThreadChannelOptions;
export type EditPublicThreadChannelOptions = Pick<EditGuildChannelOptions, "name" | "archived" | "autoArchiveDuration" | "locked" | "rateLimitPerUser" | "flags">;
export type EditPrivateThreadChannelOptions = EditPublicThreadChannelOptions & Pick<EditGuildChannelOptions, "invitable">;
export type EditForumChannelOptions = EditAnyGuildChannelOptions & Pick<EditGuildChannelOptions, "availableTags" | "defaultReactionEmoji" | "defaultThreadRateLimitPerUser" | "flags" | "nsfw"  | "rateLimitPerUser" | "template" | "topic">;

export interface AddGroupRecipientOptions {
    /** The access token of the user to add. */
    accessToken: string;
    /** The nickname of the user to add. */
    nick?: string;
    /** The id of the user to add. */
    userID: string;
}

export interface CreateMessageOptions {
    /** An object that specifies the allowed mentions in this message. */
    allowedMentions?: AllowedMentions;
    /** An array of [partial attachments](https://discord.com/developers/docs/resources/channel#attachment-object) related to the sent files. */
    attachments?: Array<MessageAttachment>;
    /** An array of [components](https://discord.com/developers/docs/interactions/message-components) to send. Convert `snake_case` keys to `camelCase`. */
    components?: Array<MessageActionRow>;
    /** The content of the message. */
    content?: string;
    /** An array of [embeds](https://discord.com/developers/docs/resources/channel#embed-object) to send. */
    embeds?: Array<EmbedOptions>;
    /** The files to send. */
    files?: Array<File>;
    /** The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to send with the message. */
    flags?: number;
    /** Reply to a message. */
    messageReference?: MessageReference;
    /** The IDs of up to 3 stickers from the current guild to send. */
    stickerIDs?: Array<string>;
    /** If the message should be spoken aloud. */
    tts?: boolean;
}

export interface EmbedOptions {
    author?: EmbedAuthorOptions;
    color?: number;
    description?: string;
    fields?: Array<EmbedField>;
    footer?: EmbedFooterOptions;
    image?: EmbedImageOptions;
    thumbnail?: EmbedThumbnailOptions;
    timestamp?: string;
    title?: string;
    url?: string;
}
export interface Embed {
    author?: EmbedAuthor;
    color?: number;
    description?: string;
    fields?: Array<EmbedField>;
    footer?: EmbedFooter;
    image?: EmbedImage;
    provider?: EmbedProvider;
    thumbnail?: EmbedThumbnail;
    timestamp?: string;
    title?: string;
    type?: EmbedType;
    url?: string;
    video?: EmbedVideo;
}
export type EmbedType = "rich" | "image" | "video" | "gifv" | "article" | "link";

export interface EmbedFooterOptions {
    icon_url?: string;
    text: string;
}
export interface EmbedImageOptions {
    url: string;
}

export interface EmbedThumbnailOptions {
    url: string;
}

export interface EmbedAuthorOptions {
    icon_url?: string;
    name: string;
    url?: string;
}

export interface EmbedField {
    inline?: boolean;
    name: string;
    value: string;
}
export interface EmbedFooter extends EmbedFooterOptions {
    proxy_icon_url?: string;
}
export interface EmbedImage extends EmbedImageOptions {
    height?: number;
    proxy_url?: string;
    width?: number;
}

export interface EmbedThumbnail extends EmbedThumbnailOptions {
    height?: number;
    proxy_url?: string;
    width?: number;
}

export interface EmbedVideo {
    height?: number;
    proxy_url?: string;
    url?: string;
    width?: number;
}

export interface EmbedProvider {
    name?: string;
    url?: string;
}
export interface EmbedAuthor extends EmbedAuthorOptions {
    proxy_icon_url?: string;
}

export interface AllowedMentions {
    /** If `@everyone`/`@here` mentions should be allowed. */
    everyone?: boolean;
    /** If the replied user (`messageReference`) should be mentioned. */
    repliedUser?: boolean;
    /** An array of role ids that are allowed to be mentioned, or a boolean value to allow all or none. */
    roles?: boolean | Array<string>;
    /** An array of user ids that are allowed to be mentioned, or a boolean value to allow all or none. */
    users?: boolean | Array<string>;
}

export interface MessageReference {
    /** The ID of the channel the replied message is in. */
    channelID?: string;
    /** If creating the message should fail if the message to reply to does not exist. */
    failIfNotExists?: boolean;
    /** The ID of the guild the replied message is in. */
    guildID?: string;
    /** The ID of the message to reply to. */
    messageID?: string;
}

export type RawComponent = RawMessageComponent | RawModalComponent;
export type RawMessageComponent = RawButtonComponent | RawSelectMenu;
export type RawModalComponent = RawTextInput;
export type RawButtonComponent = RawTextButton | URLButton;
export interface RawActionRowBase {
    components: Array<RawComponent>;
    type: ComponentTypes.ACTION_ROW;
}

export interface RawMessageActionRow extends RawActionRowBase {
    components: Array<RawMessageComponent>;
}

export interface RawModalActionRow extends RawActionRowBase {
    components: Array<RawModalComponent>;
}

export type Component = MessageComponent | ModalComponent;
export type MessageComponent = ButtonComponent | SelectMenu;
export type ModalComponent = TextInput;
export type ButtonComponent = TextButton | URLButton;
export interface ActionRowBase {
    components: Array<Component>;
    type: ComponentTypes.ACTION_ROW;
}

export interface MessageActionRow extends ActionRowBase {
    components: Array<MessageComponent>;
}

export interface ModalActionRow extends ActionRowBase {
    components: Array<ModalComponent>;
}

export interface ButtonBase {
    disabled?: boolean;
    emoji?: PartialEmoji;
    label?: string;
    style: ButtonStyles;
    type: ComponentTypes.BUTTON;
}

export interface RawTextButton extends ButtonBase {
    custom_id: string;
    style: ButtonStyles.PRIMARY | ButtonStyles.SECONDARY | ButtonStyles.SUCCESS | ButtonStyles.DANGER;
}

export interface TextButton extends ButtonBase {
    customID: string;
    style: ButtonStyles.PRIMARY | ButtonStyles.SECONDARY | ButtonStyles.SUCCESS | ButtonStyles.DANGER;
}

export interface URLButton extends ButtonBase {
    style: ButtonStyles.LINK;
    url: string;
}

export interface RawSelectMenu {
    custom_id: string;
    disabled?: boolean;
    max_values?: number;
    min_values?: number;
    options: Array<SelectOption>;
    placeholder?: string;
    type: ComponentTypes.SELECT_MENU;
}

export interface SelectMenu {
    customID: string;
    disabled?: boolean;
    maxValues?: number;
    minValues?: number;
    options: Array<SelectOption>;
    placeholder?: string;
    type: ComponentTypes.SELECT_MENU;
}

export interface SelectOption {
    default?: boolean;
    description?: string;
    emoji?: PartialEmoji;
    label: string;
    value: string;
}

export interface RawTextInput {
    custom_id: string;
    label: string;
    max_length?: boolean;
    min_length?: number;
    placeholder?: string;
    required?: boolean;
    style: TextInputStyles;
    type: ComponentTypes.TEXT_INPUT;
    value?: string;
}

export interface TextInput {
    customID: string;
    label: string;
    maxLength?: boolean;
    minLength?: number;
    placeholder?: string;
    required?: boolean;
    style: TextInputStyles;
    type: ComponentTypes.TEXT_INPUT;
    value?: string;
}

export interface RawAttachment {
    content_type?: string;
    description?: string;
    ephemeral?: boolean;
    filename: string;
    height?: number;
    id: string;
    proxy_url: string;
    size: number;
    url: string;
    width?: number;
}
// @TODO verify what can be sent with `attachments` in message creation/deletion, this is an assumption
export type MessageAttachment = Pick<RawAttachment, "id"> & Partial<Pick<RawAttachment, "description" | "filename">>;

export interface RawAllowedMentions {
    parse: Array<"everyone" | "roles" | "users">;
    replied_user?: boolean;
    roles?: Array<string>;
    users?: Array<string>;
}

export interface RawMessage {
    activity?: MessageActivity;
    application?: RawApplication; // @TODO specific properties sent
    application_id?: string;
    attachments: Array<RawAttachment>;
    author: RawUser; // this can be an invalid user if `webhook_id` is set
    channel_id: string;
    components?: Array<RawMessageActionRow>;
    content: string;
    edited_timestamp: string | null;
    embeds: Array<Embed>;
    flags?: number;
    guild_id?: string;
    id: string;
    interaction?: RawMessageInteraction;
    member?: RawMember;
    mention_channels?: Array<ChannelMention>;
    mention_everyone: boolean;
    mention_roles: Array<string>;
    mentions: Array<RawUserWithMember>;
    message_reference?: RawMessageReference;
    nonce?: number | string;
    pinned: boolean;
    position?: number;
    reactions?: Array<RawMessageReaction>;
    referenced_message?: RawMessage | null;
    // stickers exists, but is deprecated
    sticker_items?: Array<StickerItem>;
    thread?: RawAnnouncementThreadChannel | RawPublicThreadChannel | RawPrivateThreadChannel;
    timestamp: string;
    tts: boolean;
    type: MessageTypes;
    webhook_id?: string;
}

export interface ChannelMention {
    guild_id: string;
    id: string;
    name: string;
    type: ChannelTypes;
}

export interface RawMessageReaction {
    count: number;
    emoji: PartialEmoji;
    me: boolean;
}

export interface MessageReaction {
    count: number;
    me: boolean;
}

export interface MessageActivity {
    party_id?: string;
    type: MessageActivityTypes;
}


export interface RawMessageReference {
    channel_id: string;
    fail_if_not_exists: boolean;
    guild_id: string;
    message_id: string;
}

export interface RawMessageInteraction {
    id: string;
    member?: RawMember;
    name: string;
    type: InteractionTypes;
    user: RawUser;
}

export interface MessageInteraction {
    id: string;
    member?: Member;
    name: string;
    type: InteractionTypes;
    user: User;
}


export interface StickerItem {
    format_type: StickerFormatTypes;
    id: string;
    name: string;
}


// @TODO directory & forum
export type AnyChannel = TextChannel | PrivateChannel | VoiceChannel | GroupChannel | CategoryChannel | AnnouncementChannel | AnnouncementThreadChannel | PublicThreadChannel | PrivateThreadChannel | StageChannel | ForumChannel;
export type AnyPrivateChannel = PrivateChannel | GroupChannel;
export type AnyGuildChannel = Exclude<AnyChannel, AnyPrivateChannel>;
export type AnyGuildChannelWithoutThreads = Exclude<AnyGuildChannel, AnyThreadChannel>;
export type AnyTextChannelWithoutThreads = Exclude<AnyTextChannel, AnyThreadChannel>;
export type AnyTextChannel = TextChannel | PrivateChannel | VoiceChannel | GroupChannel | AnnouncementChannel | AnnouncementThreadChannel | PublicThreadChannel | PrivateThreadChannel;
export type AnyGuildTextChannel = Exclude<AnyTextChannel, AnyPrivateChannel>;
export type AnyThreadChannel = AnnouncementThreadChannel | PublicThreadChannel | PrivateThreadChannel;
export type AnyVoiceChannel = VoiceChannel | StageChannel;
export type InviteChannel = Exclude<AnyGuildChannel, CategoryChannel | AnyThreadChannel>;

export interface PartialInviteChannel {
    icon?: string | null;
    id: string;
    name: string | null;
    type: Exclude<ChannelTypes, ChannelTypes.GUILD_CATEGORY>;
}

export interface GetChannelMessagesOptions {
    /** Get messages after this message id. */
    after?: string;
    /** Get messages around this message id. */
    around?: string;
    /** Get messages before this message id. */
    before?: string;
    /** The maximum amount of messages to get. */
    limit?: number;
}

export interface GetReactionsOptions {
    after?: string;
    limit?: number;
}

export type EditMessageOptions = Pick<CreateMessageOptions, "content" | "embeds" | "allowedMentions" | "components" | "attachments" | "files" | "flags">;

export interface EditPermissionOptions {
    /** The permissions to allow. */
    allow?: bigint | string;
    /** The permissions to deny. */
    deny?: bigint | string;
    /** The reason for editing the permission. */
    reason?: string;
    /** The type of the permission overwrite. */
    type: OverwriteTypes;
}

export interface RawInvite {
    approximate_member_count?: number;
    approximate_presence_count?: number;
    channel?: PartialChannel;
    code: string;
    expires_at?: string;
    guild?: PartialGuild;
    guild_scheduled_event?: RawScheduledEvent;
    inviter?: RawUser;
    /** @deprecated */
    stage_instance?: RawInviteStageInstance;
    target_application?: RawPartialApplication;
    target_type?: InviteTargetTypes;
    target_user?: RawUser;
}

export interface RawInviteWithMetadata extends RawInvite {
    created_at: string;
    max_age: number;
    max_uses: number;
    temporary: boolean;
    uses: number;
}


export interface RawInviteStageInstance {
    members: Array<RawMember>;
    participant_count: number;
    speaker_count: number;
    topic: string;
}


export interface InviteStageInstance {
    members: Array<Member>;
    participantCount: number;
    speakerCount: number;
    topic: string;
}

export interface CreateInviteOptions {
    /** How long the invite should last. */
    maxAge?: number;
    /** How many times the invite can be used. */
    maxUses?: number;
    /** The reason for creating the invite. */
    reason?: string;
    /** The id of the embedded application to open for this invite. */
    targetApplicationID?: string;
    /** The [type of target](https://discord.com/developers/docs/resources/channel#invite-target-types) for the invite. */
    targetType?: InviteTargetTypes;
    /** The ID of the user whose stream to display for this invite. */
    targetUserID?: string;
    /** If the invite should be temporary. */
    temporary?: boolean;
    /** If the invite should be unique. */
    unique?: boolean;
}

export interface RawFollowedChannel {
    channel_id: string;
    webhook_id: string;
}

export interface FollowedChannel {
    channelID: string;
    webhookID: string;
}

export interface StartThreadFromMessageOptions {
    /** The duration of no activity after which this thread will be automatically archived. */
    autoArchiveDuration?: ThreadAutoArchiveDuration;
    /** The name of the thread. */
    name: string;
    /** The amount of seconds a user has to wait before sending another message. */
    rateLimitPerUser?: number | null;
    /** The reason for creating the thread. */
    reason?: string;
}

export interface StartThreadWithoutMessageOptions extends StartThreadFromMessageOptions {
    /** [Private Thread Only] If non-moderators can add other non-moderators to the thread. */
    invitable?: boolean;
    /** The type of thread to create. */
    type: ThreadChannelTypes;
}

export interface StartThreadInForumOptions extends StartThreadFromMessageOptions {
    /** The message to start the thread with. */
    message: ForumThreadStarterMessageOptions;
}

export type ForumThreadStarterMessageOptions = Pick<CreateMessageOptions, "content" | "embeds" | "allowedMentions" | "components" | "stickerIDs" | "attachments" | "flags" | "files">;

export interface GetArchivedThreadsOptions {
    /** A **timestamp** to get threads before. */
    before?: string;
    /** The maximum amount of threads to get. */
    limit?: number;
}

export interface RawArchivedThreads<T extends RawAnnouncementThreadChannel | RawPublicThreadChannel | RawPrivateThreadChannel> {
    has_more: boolean;
    members: Array<RawThreadMember>;
    threads: Array<T>;
}

export interface ArchivedThreads<T extends AnnouncementThreadChannel | PublicThreadChannel | PrivateThreadChannel> {
    hasMore: boolean;
    members: Array<ThreadMember>;
    threads: Array<T>;
}

export interface GetInviteOptions {
    /** The id of the guild scheduled event to include with the invite. */
    guildScheduledEventID?: string;
    /** If the invite should contain approximate member counts. */
    withCounts?: boolean;
    /** If the invite should contain expiration data.  */
    withExpiration?: boolean;
}

export interface GetInviteWithCountsOptions extends Omit<GetInviteOptions, "withCounts"> {
    /** If the invite should contain approximate member counts. */
    withCounts: true;
}

export interface GetInviteWithExpirationOptions extends Omit<GetInviteOptions, "withExpiration"> {
    /** If the invite should contain expiration data.  */
    withExpiration: true;
}


export interface GetInviteWithCountsAndExpirationOptions extends Omit<GetInviteOptions, "withCounts" | "withExpiration"> {
    /** If the invite should contain approximate member counts. */
    withCounts: true;
    /** If the invite should contain expiration data.  */
    withExpiration: true;
}


export interface GetInviteWithNoneOptions extends Omit<GetInviteOptions, "withCounts" | "withExpiration"> {
    /** If the invite should contain approximate member counts. */
    withCounts?: false;
    /** If the invite should contain expiration data.  */
    withExpiration?: false;
}

// for the love of god find a way to make this not so shit
export type InviteInfoTypes = "withMetadata" | "withCounts" | "withoutCounts" | "withExpiration" | "withoutExpiration";


export interface ThreadMetadata {
    archiveTimestamp: Date;
    archived: boolean;
    autoArchiveDuration: ThreadAutoArchiveDuration;
    createTimestamp: Date | null;
    locked: boolean;
}

export interface PrivateThreadmetadata extends ThreadMetadata {
    invitable: boolean;
}

export interface RawForumTag {
    emoji_id: string | null;
    emoji_name: string | null;
    id: string;
    moderated: boolean;
    name: string;
}

export interface ForumTag {
    /** The emoji for this tag. */
    emoji: ForumEmoji | null;
    /** The ID of this tag. */
    id: string;
    /** If this tag can only be used by moderators. */
    moderated: boolean;
    /** The name of this tag. */
    name: string;
}

export interface ForumEmoji {
    /** The ID of this emoji if custom, null otherwise. */
    id: string | null;
    /** The unicode codepoint of this emoji if default, null otherwise. */
    name: string | null;
}
