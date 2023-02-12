/** @module Message */
import Base from "./Base.js";
import Attachment from "./Attachment.js";
import User from "./User.js";
import type Member from "./Member.js";
import PartialApplication from "./PartialApplication.js";
import type ClientApplication from "./ClientApplication.js";
import type Client from "../Client.js";
import TypedCollection from "../util/TypedCollection.js";
import type { MessageTypes } from "../Constants.js";
import type { Uncached } from "../types/shared.js";
import type { AnyGuildTextChannel, AnyTextChannelWithoutGroup, ChannelMention, Embed, MessageActivity, MessageInteraction, MessageReference, RawAttachment, RawMessage, StickerItem, MessageReaction, AnyThreadChannel } from "../types/channels.js";
import type { JSONMessage } from "../types/json.js";
/** Represents a message. */
export default class Message<T extends AnyTextChannelWithoutGroup | Uncached = AnyTextChannelWithoutGroup | Uncached> extends Base {
    /** The [activity](https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure) associated with this message. */
    activity?: MessageActivity;
    /**
     * The application associated with this message. This can be present in two scenarios:
     * * If the message was from an interaction or application owned webhook ({@link ClientApplication} if any shard has reached READY, {@link PartialApplication} otherwise).
     * * If the message has a rich presence embed ({@link PartialApplication})
     */
    application?: PartialApplication | ClientApplication;
    /**
     * The ID of the application associated with this message. This can be present in two scenarios:
     * * If the message was from an interaction or application owned webhook ({@link ClientApplication} if any shard has reached READY, {@link PartialApplication} otherwise).
     * * If the message has a rich presence embed ({@link PartialApplication})
     */
    applicationID: string | null;
    /** The attachments on this message. */
    attachments: TypedCollection<string, RawAttachment, Attachment>;
    /** The author of this message. */
    author: User;
    /** The ID of the channel this message was created in. */
    channelID: string;
    /** The content of this message. */
    content: string;
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
    /** If this message is a `REPLY` or `THREAD_STARTER_MESSAGE`, some info about the referenced message. */
    messageReference?: MessageReference;
    /** A nonce for ensuring a message was sent. */
    nonce?: number | string;
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
    /** The [type](https://discord.com/developers/docs/resources/channel#message-object-message-types) of this message. */
    type: MessageTypes;
    /** The webhook associated with this message, if sent via a webhook. This only has an `id` property. */
    webhookID?: string;
    constructor(data: RawMessage, client: Client);
    protected update(data: Partial<RawMessage>): void;
    toJSON(): JSONMessage;
}
