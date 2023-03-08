/** @module Routes/Channels */
import type { AnyChannel, AnyTextChannelWithoutGroup, ArchivedThreads, CreateInviteOptions, CreateMessageOptions, EditChannelOptions, EditMessageOptions, EditPermissionOptions, GetChannelMessagesOptions, GetArchivedThreadsOptions, ThreadMember, StartThreadFromMessageOptions, StartThreadInForumOptions, StartThreadWithoutMessageOptions, AnyEditableChannel } from "../types/channels";
import Message from "../structures/Message";
import Invite from "../structures/Invite";
import type AnnouncementThreadChannel from "../structures/AnnouncementThreadChannel";
import type PublicThreadChannel from "../structures/PublicThreadChannel";
import type PrivateThreadChannel from "../structures/PrivateThreadChannel";
import type RESTManager from "../rest/RESTManager";
import type PrivateChannel from "../structures/PrivateChannel";
import type { Uncached } from "../types/shared";
/** Various methods for interacting with channels. */
export default class Channels {
    #private;
    constructor(manager: RESTManager);
    /**
     * Add a member to a thread.
     * @param channelID The ID of the thread to add them to.
     * @param userID The ID of the user to add to the thread.
     */
    addThreadMember(channelID: string, userID: string): Promise<void>;
    /**
     * Create a direct message. This will not create a new channel if you have already started a dm with the user.
     * @param recipient The ID of the recipient of the direct message.
     */
    createDM(recipient: string): Promise<PrivateChannel>;
    /**
     * Create an invite for a channel.
     * @param channelID The ID of the channel to create an invite for.
     * @param options The options for creating the invite.
     */
    createInvite(channelID: string, options: CreateInviteOptions): Promise<Invite>;
    /**
     * Create a message in a channel.
     * @param channelID The ID of the channel to create the message in.
     * @param options The options for creating the message.
     */
    createMessage<T extends AnyTextChannelWithoutGroup | Uncached = AnyTextChannelWithoutGroup | Uncached>(channelID: string, options: CreateMessageOptions): Promise<Message<T>>;
    /**
     * Add a reaction to a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    createReaction(channelID: string, messageID: string, emoji: string): Promise<void>;
    /**
     * Delete or close a channel.
     * @param channelID The ID of the channel to delete or close.
     * @param reason The reason to be displayed in the audit log.
     */
    delete(channelID: string, reason?: string): Promise<void>;
    /**
     * Delete a message.
     * @param channelID The ID of the channel to delete the message in.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     */
    deleteMessage(channelID: string, messageID: string, reason?: string): Promise<void>;
    /**
     * Delete a permission overwrite.
     * @param channelID The ID of the channel to delete the permission overwrite in.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    deletePermission(channelID: string, overwriteID: string, reason?: string): Promise<void>;
    /**
     * Remove a reaction from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove a reaction from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     */
    deleteReaction(channelID: string, messageID: string, emoji: string, user?: string): Promise<void>;
    /**
     * Remove all, or a specific emoji's reactions from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     */
    deleteReactions(channelID: string, messageID: string, emoji?: string): Promise<void>;
    /**
     * Edit a channel.
     * @param channelID The ID of the channel to edit.
     * @param options The options for editing the channel.
     */
    edit<T extends AnyEditableChannel = AnyEditableChannel>(channelID: string, options: EditChannelOptions): Promise<T>;
    /**
     * Edit a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    editMessage<T extends AnyTextChannelWithoutGroup | Uncached = AnyTextChannelWithoutGroup | Uncached>(channelID: string, messageID: string, options: EditMessageOptions): Promise<Message<T>>;
    /**
     * Edit a permission overwrite.
     * @param channelID The ID of the channel to edit the permission overwrite for.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    editPermission(channelID: string, overwriteID: string, options: EditPermissionOptions): Promise<void>;
    /**
     * Get a channel.
     * @param channelID The ID of the channel to get.
     */
    get<T extends AnyChannel = AnyChannel>(channelID: string): Promise<T>;
    /**
     * Get the private archived threads the current user has joined in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    getJoinedPrivateArchivedThreads(channelID: string, options?: GetArchivedThreadsOptions): Promise<ArchivedThreads<PrivateThreadChannel>>;
    /**
     * Get a message in a channel.
     * @param channelID The ID of the channel the message is in
     * @param messageID The ID of the message to get.
     */
    getMessage<T extends AnyTextChannelWithoutGroup | Uncached = AnyTextChannelWithoutGroup | Uncached>(channelID: string, messageID: string): Promise<Message<T>>;
    /**
     * Get messages in a channel.
     * @param channelID The ID of the channel to get messages from.
     * @param options The options for getting messages. `before`, `after`, and `around `All are mutually exclusive.
     */
    getMessages<T extends AnyTextChannelWithoutGroup | Uncached = AnyTextChannelWithoutGroup | Uncached>(channelID: string, options?: GetChannelMessagesOptions): Promise<Array<Message<T>>>;
    /**
     * Get the private archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    getPrivateArchivedThreads(channelID: string, options?: GetArchivedThreadsOptions): Promise<ArchivedThreads<PrivateThreadChannel>>;
    /**
     * Get the public archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    getPublicArchivedThreads<T extends AnnouncementThreadChannel | PublicThreadChannel = AnnouncementThreadChannel | PublicThreadChannel>(channelID: string, options?: GetArchivedThreadsOptions): Promise<ArchivedThreads<T>>;
    /**
     * Get a thread member.
     * @param channelID The ID of the thread.
     * @param userID The ID of the user to get the thread member of.
     */
    getThreadMember(channelID: string, userID: string): Promise<ThreadMember>;
    /**
     * Get the members of a thread.
     * @param channelID The ID of the thread.
     */
    getThreadMembers(channelID: string): Promise<Array<ThreadMember>>;
    /**
     * Join a thread.
     * @param channelID The ID of the thread to join.
     */
    joinThread(channelID: string): Promise<void>;
    /**
     * Leave a thread.
     * @param channelID The ID of the thread to leave.
     */
    leaveThread(channelID: string): Promise<void>;
    /**
     * Remove a member from a thread.
     * @param channelID The ID of the thread to remove them from.
     * @param userID The ID of the user to remove from the thread.
     */
    removeThreadMember(channelID: string, userID: string): Promise<void>;
    /**
     * Create a thread from an existing message.
     * @param channelID The ID of the channel to create the thread in.
     * @param messageID The ID of the message to create the thread from.
     * @param options The options for starting the thread.
     */
    startThreadFromMessage<T extends AnnouncementThreadChannel | PublicThreadChannel = AnnouncementThreadChannel | PublicThreadChannel>(channelID: string, messageID: string, options: StartThreadFromMessageOptions): Promise<T>;
    /**
     * Create a thread in a forum channel.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     */
    startThreadInForum(channelID: string, options: StartThreadInForumOptions): Promise<PublicThreadChannel>;
    /**
     * Create a thread without an existing message.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     */
    startThreadWithoutMessage<T extends AnnouncementThreadChannel | PublicThreadChannel | PrivateThreadChannel = AnnouncementThreadChannel | PublicThreadChannel | PrivateThreadChannel>(channelID: string, options: StartThreadWithoutMessageOptions): Promise<T>;
}
