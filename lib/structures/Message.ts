/** @module Message */
import Base from "./Base.js";
import PartialApplication from "./PartialApplication.js";
import type ClientApplication from "./ClientApplication.js";
import type Client from "../Client.js";
import type { MessageTypes } from "../Constants.js";
import type { Uncached } from "../types/shared.js";
import type {
    AnyGuildTextChannel,
    AnyTextChannelWithoutGroup,
    ChannelMention,
    Embed,
    MessageActivity,
    MessageInteraction,
    MessageReference,
    RawMessage,
    StickerItem,
    MessageReaction,
    AnyThreadChannel
} from "../types/channels.js";
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
    // stickers exists, but is deprecated
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
    constructor(data: RawMessage, client: Client) {
        super(data.id, client);
        this.channelID = data.channel_id;
        this.content = data.content;
        this.embeds = [];
        this.flags = 0;
        this.guildID = (data.guild_id === undefined ? null : data.guild_id) as T extends AnyGuildTextChannel ? string : string | null;
        this.reactions = {};
        this.timestamp = new Date(data.timestamp);
        this.type = data.type;
        this.webhookID = data.webhook_id;
        this.update(data);
        if (data.application_id === undefined) {
            this.applicationID = null;
        } else {
            if (client["_application"] && client.application.id === data.application_id) {
                if (data.application) {
                    client.application["update"](data.application);
                }
                this.application = client.application;
            } else {
                this.application = data.application ? new PartialApplication(data.application, client) : undefined;
            }
            this.applicationID = data.application_id;
        }
    }

    protected override update(data: Partial<RawMessage>): void {
        if (data.activity !== undefined) {
            this.activity = data.activity;
        }
        if (data.content !== undefined) {
            this.content = data.content;
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.message_reference) {
            this.messageReference = {
                channelID:       data.message_reference.channel_id,
                failIfNotExists: data.message_reference.fail_if_not_exists,
                guildID:         data.message_reference.guild_id,
                messageID:       data.message_reference.message_id
            };
        }

        if (data.nonce !== undefined) {
            this.nonce = data.nonce;
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }

        if (data.sticker_items !== undefined) {
            this.stickerItems = data.sticker_items;
        }
    }

    override toJSON(): JSONMessage {
        return {
            ...super.toJSON(),
            activity:          this.activity,
            applicationID:     this.applicationID ?? undefined,
            channelID:         this.channelID,
            content:           this.content,
            embeds:            this.embeds,
            flags:             this.flags,
            guildID:           this.guildID ?? undefined,
            mentionChannels:   this.mentionChannels,
            messageReference:  this.messageReference,
            nonce:             this.nonce,
            position:          this.position,
            reactions:         this.reactions,
            referencedMessage: this.referencedMessage?.toJSON(),
            stickerItems:      this.stickerItems,
            thread:            this.thread?.toJSON(),
            timestamp:         this.timestamp.getTime(),
            type:              this.type,
            webhook:           this.webhookID
        };
    }
}
