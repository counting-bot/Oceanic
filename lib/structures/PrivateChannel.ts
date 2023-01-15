/** @module PrivateChannel */
import Channel from "./Channel.js";
import type User from "./User.js";
import Message from "./Message.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { RawMessage, RawPrivateChannel } from "../types/channels.js";
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
