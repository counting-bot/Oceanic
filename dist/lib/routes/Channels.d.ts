/** @module Routes/Channels */
import type { CreateInviteOptions, CreateMessageOptions, EditMessageOptions, EditPermissionOptions, GetArchivedThreadsOptions, ThreadMember, StartThreadFromMessageOptions, StartThreadInForumOptions, StartThreadWithoutMessageOptions } from "../types/channels.js";
import type RESTManager from "../rest/RESTManager.js";
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
    createDM(recipient: string): Promise<object>;
    /**
     * Create an invite for a channel.
     * @param channelID The ID of the channel to create an invite for.
     * @param options The options for creating the invite.
     */
    createInvite(channelID: string, options: CreateInviteOptions): Promise<object>;
    /**
     * Create a message in a channel.
     * @param channelID The ID of the channel to create the message in.
     * @param options The options for creating the message.
     */
    createMessage(channelID: string, options: CreateMessageOptions): Promise<object>;
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
     * Edit a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    editMessage(channelID: string, messageID: string, options: EditMessageOptions): Promise<object>;
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
    get(channelID: string): Promise<object>;
    /**
     * Get the private archived threads the current user has joined in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    getJoinedPrivateArchivedThreads(channelID: string, options?: GetArchivedThreadsOptions): Promise<object>;
    /**
     * Get a message in a channel.
     * @param channelID The ID of the channel the message is in
     * @param messageID The ID of the message to get.
     */
    getMessage(channelID: string, messageID: string): Promise<object>;
    /**
     * Get the private archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    getPrivateArchivedThreads(channelID: string, options?: GetArchivedThreadsOptions): Promise<object>;
    /**
     * Get the public archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    getPublicArchivedThreads(channelID: string, options?: GetArchivedThreadsOptions): Promise<object>;
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
    startThreadFromMessage(channelID: string, messageID: string, options: StartThreadFromMessageOptions): Promise<object>;
    /**
     * Create a thread in a forum channel.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     */
    startThreadInForum(channelID: string, options: StartThreadInForumOptions): Promise<object>;
    /**
     * Create a thread without an existing message.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     */
    startThreadWithoutMessage(channelID: string, options: StartThreadWithoutMessageOptions): Promise<object>;
}
