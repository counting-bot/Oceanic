/** @module PrivateChannel */
import Channel from "./Channel.js";
import type User from "./User.js";
import Message from "./Message.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type {
    CreateMessageOptions,
    EditMessageOptions,
    RawMessage,
    RawPrivateChannel
} from "../types/channels.js";
import TypedCollection from "../util/TypedCollection.js";
import type { JSONPrivateChannel } from "../types/json.js";

/** Represents a direct message with a user. */
export default class PrivateChannel extends Channel {
    /** The last message sent in this channel. This will only be present if a message has been sent within the current session. */
    lastMessage?: Message<this> | null;
    /** The ID of last message sent in this channel. */
    lastMessageID: string | null;
    /** The cached messages in this channel. */
    messages: TypedCollection<string, RawMessage, Message<this>>;
    /** The other user in this direct message. */
    recipient: User;
    declare type: ChannelTypes.DM;
    constructor(data: RawPrivateChannel, client: Client) {
        super(data, client);
        this.messages = new TypedCollection(Message<this>, client, client.options.collectionLimits.messages);
        this.lastMessageID = data.last_message_id;
        this.recipient = client.users.update(data.recipients[0]);
    }

    protected override update(data: Partial<RawPrivateChannel>): void {
        if (data.last_message_id !== undefined) {
            this.lastMessage = data.last_message_id === null ? null : this.messages.get(data.last_message_id);
            this.lastMessageID = data.last_message_id;
        }
    }

    /**
     * Create a message in this channel.
     * @param options The options for creating the message.
     */
    async createMessage(options: CreateMessageOptions): Promise<Message<this>> {
        return this.client.rest.channels.createMessage<this>(this.id, options);
    }

    /**
     * Add a reaction to a message in this channel.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    async createReaction(messageID: string, emoji: string): Promise<void> {
        return this.client.rest.channels.createReaction(this.id, messageID, emoji);
    }

    /**
     * Delete a message in this channel.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     */
    async deleteMessage(messageID: string, reason?: string): Promise<void> {
        return this.client.rest.channels.deleteMessage(this.id, messageID, reason);
    }

    /**
     * Edit a message in this channel.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    async editMessage(messageID: string, options: EditMessageOptions): Promise<Message<this>> {
        return this.client.rest.channels.editMessage<this>(this.id, messageID, options);
    }

    override toJSON(): JSONPrivateChannel {
        return {
            ...super.toJSON(),
            lastMessageID: this.lastMessageID,
            messages:      this.messages.map(message => message.id),
            recipient:     this.recipient?.toJSON(),
            type:          this.type
        };
    }
}
