/** @module ThreadChannel */
import GuildChannel from "./GuildChannel.js";
import Message from "./Message.js";
import type User from "./User.js";
import type Member from "./Member.js";
import type Permission from "./Permission.js";
import type { ThreadChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import TypedCollection from "../util/TypedCollection.js";
import type { AnyThreadChannel, CreateMessageOptions, EditMessageOptions, EditThreadChannelOptions, GetChannelMessagesOptions, PrivateThreadMetadata, RawMessage, RawThreadChannel, ThreadMember, ThreadMetadata, ThreadParentChannel } from "../types/channels.js";
import type { JSONThreadChannel } from "../types/json.js";
/** Represents a guild thread channel. */
export default class ThreadChannel<T extends AnyThreadChannel = AnyThreadChannel> extends GuildChannel {
    /** The [flags](https://discord.com/developers/docs/resources/channel#channel-object-channel-flags) for this thread channel. */
    flags: number;
    /** The last message sent in this channel. This will only be present if a message has been sent within the current session. */
    lastMessage?: Message<T> | null;
    /** The ID of last message sent in this channel. */
    lastMessageID: string | null;
    /** The approximate number of members in this thread. Stops counting after 50. */
    memberCount: number;
    /** The members of this thread. */
    members: Array<ThreadMember>;
    /** The number of messages (not including the initial message or deleted messages) in the thread. Stops counting after 50. */
    messageCount: number;
    /** The cached messages in this channel. */
    messages: TypedCollection<string, RawMessage, Message<T>>;
    /** The owner of this thread. */
    owner?: User;
    /** The ID of the owner of this thread. */
    ownerID: string;
    parentID: string;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser: number;
    /** The [thread metadata](https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure) associated with this thread. */
    threadMetadata: ThreadMetadata | PrivateThreadMetadata;
    /** The total number of messages ever sent in the thread. Includes deleted messages. */
    totalMessageSent: number;
    type: ThreadChannelTypes;
    constructor(data: RawThreadChannel, client: Client);
    protected update(data: Partial<RawThreadChannel>): void;
    get parent(): ThreadParentChannel | undefined;
    /**
     * Add a member to this thread.
     * @param userID The ID of the user to add to the thread.
     */
    addMember(userID: string): Promise<void>;
    /**
     * Create a message in this thread.
     * @param options The options for creating the message.
     */
    createMessage(options: CreateMessageOptions): Promise<Message<T>>;
    /**
     * Add a reaction to a message in this thread.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    createReaction(messageID: string, emoji: string): Promise<void>;
    /**
     * Delete a message in this thread.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     */
    deleteMessage(messageID: string, reason?: string): Promise<void>;
    /**
     * Edit this thread.
     * @param options The options for editing the channel.
     */
    edit(options: EditThreadChannelOptions): Promise<AnyThreadChannel>;
    /**
     * Edit a message in this thread.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    editMessage(messageID: string, options: EditMessageOptions): Promise<Message<T>>;
    /**
     * Get a thread member in this thread.
     * @param userID The ID of the user to get the thread member of.
     */
    getMember(userID: string): Promise<ThreadMember>;
    /**
     * Get the members of this thread.
     */
    getMembers(): Promise<Array<ThreadMember>>;
    /**
     * Get a message in this thread.
     * @param messageID The ID of the message to get.
     */
    getMessage(messageID: string): Promise<Message<T>>;
    /**
     * Get messages in this thread.
     * @param options The options for getting the messages. `before`, `after`, and `around `All are mutually exclusive.
     */
    getMessages(options?: GetChannelMessagesOptions): Promise<Array<Message<T>>>;
    /**
     * Join this thread.
     */
    join(): Promise<void>;
    /**
     * Leave this thread.
     */
    leave(): Promise<void>;
    /**
     * Get the permissions of a member. If providing an id, the member must be cached. The parent channel must be cached as threads themselves do not have permissions.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission;
    /**
     * Remove a member from this thread.
     * @param userID The ID of the user to remove from the thread.
     */
    removeMember(userID: string): Promise<void>;
    toJSON(): JSONThreadChannel;
}
