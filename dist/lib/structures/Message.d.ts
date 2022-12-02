/** @module Message */
import Base from "./Base.js";
import Attachment from "./Attachment.js";
import User from "./User.js";
import type Guild from "./Guild.js";
import type Member from "./Member.js";
import PartialApplication from "./PartialApplication.js";
import type ClientApplication from "./ClientApplication.js";
import type AnnouncementChannel from "./AnnouncementChannel.js";
import type AnnouncementThreadChannel from "./AnnouncementThreadChannel.js";
import type PublicThreadChannel from "./PublicThreadChannel.js";
import type TextChannel from "./TextChannel.js";
import type PrivateChannel from "./PrivateChannel.js";
import type Client from "../Client.js";
import TypedCollection from "../util/TypedCollection.js";
import { MessageTypes } from "../Constants.js";
import type { Uncached } from "../types/shared.js";
import type { AnyGuildTextChannel, AnyTextChannelWithoutGroup, ChannelMention, EditMessageOptions, Embed, GetReactionsOptions, MessageActivity, MessageInteraction, MessageReference, RawAttachment, RawMessage, StartThreadFromMessageOptions, StickerItem, MessageReaction, MessageActionRow, AnyThreadChannel } from "../types/channels.js";
import type { DeleteWebhookMessageOptions, EditWebhookMessageOptions } from "../types/webhooks.js";
import type { JSONMessage } from "../types/json.js";
/** Represents a message. */
export default class Message<T extends AnyTextChannelWithoutGroup | Uncached = AnyTextChannelWithoutGroup | Uncached> extends Base {
    private _cachedChannel;
    private _cachedGuild?;
    /** The [activity](https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure) associated with this message. */
    activity?: MessageActivity;
    /**
     * The application associated with this message. This can be present in two scenarios:
     * * If the message was from an interaction or application owned webhook (`ClientApplication`).
     * * If the message has a rich presence embed (`PartialApplication`)
     */
    application?: PartialApplication | ClientApplication | null;
    /**
     * The ID of the application associated with this message. This can be present in two scenarios:
     * * If the message was from an interaction or application owned webhook (`ClientApplication`).
     * * If the message has a rich presence embed (`PartialApplication`)
     */
    applicationID: string | null;
    /** The attachments on this message. */
    attachments: TypedCollection<string, RawAttachment, Attachment>;
    /** The author of this message. */
    author: User;
    /** The ID of the channel this message was created in. */
    channelID: string;
    /** The components on this message. */
    components: Array<MessageActionRow>;
    /** The content of this message. */
    content: string;
    /** The timestamp at which this message was last edited. */
    editedTimestamp: Date | null;
    /** The embeds on this message. */
    embeds: Array<Embed>;
    /** The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) on this message. */
    flags: number;
    /** The ID of the guild this message is in. */
    guildID: T extends AnyGuildTextChannel ? string : string | null;
    /** The interaction info, if this message was the result of an interaction. */
    interaction?: MessageInteraction;
    /** The member that created this message, if this message is in a guild. */
    member: T extends AnyGuildTextChannel ? Member : Member | undefined;
    /** Channels mentioned in a `CROSSPOSTED` channel follower message. See [Discord's docs](https://discord.com/developers/docs/resources/channel#channel-mention-object) for more information. */
    mentionChannels?: Array<ChannelMention>;
    /** The mentions in this message. */
    mentions: {
        /** The ids of the channels mentioned in this message. */
        channels: Array<string>;
        /** If @everyone/@here is mentioned in this message. */
        everyone: boolean;
        /** The members mentioned in this message. */
        members: Array<Member>;
        /** The ids of the roles mentioned in this message. */
        roles: Array<string>;
        /** The users mentioned in this message. */
        users: Array<User>;
    };
    /** If this message is a `REPLY` or `THREAD_STARTER_MESSAGE`, some info about the referenced message. */
    messageReference?: MessageReference;
    /** A nonce for ensuring a message was sent. */
    nonce?: number | string;
    /** If this message is pinned. */
    pinned: boolean;
    /** This message's relative position, if in a thread. */
    position?: number;
    /** The reactions on this message. */
    reactions: Record<string, MessageReaction>;
    /** If this message is a `REPLY` or `THREAD_STARTER_MESSAGE`, this will be the message that's referenced. */
    referencedMessage?: Message | null;
    /** The sticker items on this message. */
    stickerItems?: Array<StickerItem>;
    /** The thread associated with this message, if any. */
    thread?: AnyThreadChannel;
    /** The timestamp at which this message was sent. */
    timestamp: Date;
    /** If this message was read aloud. */
    tts: boolean;
    /** The [type](https://discord.com/developers/docs/resources/channel#message-object-message-types) of this message. */
    type: MessageTypes;
    /** The webhook associated with this message, if sent via a webhook. This only has an `id` property. */
    webhookID?: string;
    constructor(data: RawMessage, client: Client);
    protected update(data: Partial<RawMessage>): void;
    /** The channel this message was created in. */
    get channel(): T extends AnyTextChannelWithoutGroup ? T : undefined;
    /** The guild this message is in. This will throw an error if the guild is not cached. */
    get guild(): T extends AnyGuildTextChannel ? Guild : Guild | null;
    /** A link to this message. */
    get jumpLink(): string;
    /**
     * Add a reaction to this message.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    createReaction(emoji: string): Promise<void>;
    /**
     * Crosspost this message in an announcement channel.
     */
    crosspost(): Promise<Message<T>>;
    /**
     * Delete this message.
     * @param reason The reason for deleting the message.
     */
    delete(reason?: string): Promise<void>;
    /**
     * Remove a reaction from this message.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     */
    deleteReaction(emoji: string, user?: string): Promise<void>;
    /**
     * Remove all, or a specific emoji's reactions from this message.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     */
    deleteReactions(emoji?: string): Promise<void>;
    /**
     * Delete this message as a webhook.
     * @param token The token of the webhook.
     * @param options Options for deleting the message.
     */
    deleteWebhook(token: string, options: DeleteWebhookMessageOptions): Promise<void>;
    /**
     * Edit this message.
     * @param options The options for editing the message.
     */
    edit(options: EditMessageOptions): Promise<Message<T>>;
    /**
     * Edit this message as a webhook.
     * @param token The token of the webhook.
     * @param options The options for editing the message.
     */
    editWebhook(token: string, options: EditWebhookMessageOptions): Promise<Message<T>>;
    /**
     * Get the users who reacted with a specific emoji on this message.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param options The options for getting the reactions.
     */
    getReactions(emoji: string, options?: GetReactionsOptions): Promise<Array<User>>;
    /** Whether this message belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the message properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel(): this is Message<AnyGuildTextChannel>;
    /** Whether this message belongs to a direct message channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the message properties typing definitions based on the channel it belongs to. */
    inDirectMessageChannel(): this is Message<PrivateChannel | Uncached>;
    /**
     * Pin this message.
     * @param reason The reason for pinning the message.
     */
    pin(reason?: string): Promise<void>;
    /**
     * Create a thread from this message.
     * @param options The options for creating the thread.
     */
    startThread(options: StartThreadFromMessageOptions): Promise<T extends AnnouncementChannel ? AnnouncementThreadChannel : T extends TextChannel ? PublicThreadChannel : never>;
    toJSON(): JSONMessage;
    /**
     * Unpin this message.
     * @param reason The reason for unpinning the message.
     */
    unpin(reason?: string): Promise<void>;
}
