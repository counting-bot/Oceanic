/** @module PrivateChannel */
import Channel from "./Channel.js";
import type User from "./User.js";
import Message from "./Message.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { CreateMessageOptions, EditMessageOptions, RawMessage, RawPrivateChannel } from "../types/channels.js";
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
    type: ChannelTypes.DM;
    constructor(data: RawPrivateChannel, client: Client);
    protected update(data: Partial<RawPrivateChannel>): void;
    /**
     * Create a message in this channel.
     * @param options The options for creating the message.
     */
    createMessage(options: CreateMessageOptions): Promise<Message<this>>;
    /**
     * Add a reaction to a message in this channel.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    createReaction(messageID: string, emoji: string): Promise<void>;
    /**
     * Delete a message in this channel.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     */
    deleteMessage(messageID: string, reason?: string): Promise<void>;
    /**
     * Edit a message in this channel.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    editMessage(messageID: string, options: EditMessageOptions): Promise<Message<this>>;
    toJSON(): JSONPrivateChannel;
}
