/** @module Routes/Channels */
import type {
    CreateInviteOptions,
    CreateMessageOptions,
    EditMessageOptions,
    EditPermissionOptions,
    GetArchivedThreadsOptions,
    RawArchivedThreads,
    RawChannel,
    RawInvite,
    RawMessage,
    RawPrivateThreadChannel,
    RawPublicThreadChannel,
    ThreadMember,
    StartThreadFromMessageOptions,
    StartThreadInForumOptions,
    StartThreadWithoutMessageOptions,
    RawThreadMember,
    RawPrivateChannel,
    RawThreadChannel
} from "../types/channels.js";
import * as Routes from "../util/Routes.js";
import type RESTManager from "../rest/RESTManager.js";

/** Various methods for interacting with channels. */
export default class Channels {
    #manager: RESTManager;
    constructor(manager: RESTManager) {
        this.#manager = manager;
    }

    /**
     * Add a member to a thread.
     * @param channelID The ID of the thread to add them to.
     * @param userID The ID of the user to add to the thread.
     */
    async addThreadMember(channelID: string, userID: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "PUT",
            path:   Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        });
    }
    /**
     * Create a direct message. This will not create a new channel if you have already started a dm with the user.
     * @param recipient The ID of the recipient of the direct message.
     */
    async createDM(recipient: string): Promise<object> {
        return this.#manager.authRequest<RawPrivateChannel>({
            method: "POST",
            path:   Routes.OAUTH_CHANNELS,
            json:   { recipient_id: recipient }
        });
    }

    /**
     * Create an invite for a channel.
     * @param channelID The ID of the channel to create an invite for.
     * @param options The options for creating the invite.
     */
    async createInvite(channelID: string, options: CreateInviteOptions): Promise<object> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest<RawInvite>({
            method: "POST",
            path:   Routes.CHANNEL_INVITES(channelID),
            json:   {
                max_age:               options.maxAge,
                max_uses:              options.maxUses,
                target_application_id: options.targetApplicationID,
                target_type:           options.targetType,
                target_user_id:        options.targetUserID,
                temporary:             options.temporary,
                unique:                options.unique
            },
            reason
        });
    }

    /**
     * Create a message in a channel.
     * @param channelID The ID of the channel to create the message in.
     * @param options The options for creating the message.
     */
    async createMessage(channelID: string, options: CreateMessageOptions): Promise<object> {
        const files = options.files;
        if (options.files) {
            delete options.files;
        }
        return this.#manager.authRequest<RawMessage>({
            method: "POST",
            path:   Routes.CHANNEL_MESSAGES(channelID),
            json:   {
                allowed_mentions:  this.#manager.client.util.formatAllowedMentions(options.allowedMentions),
                attachments:       options.attachments,
                components:        options.components ? options.components : undefined,
                content:           options.content,
                embeds:            options.embeds,
                flags:             options.flags,
                sticker_ids:       options.stickerIDs,
                message_reference: options.messageReference ? {
                    channel_id:         options.messageReference.channelID,
                    fail_if_not_exists: options.messageReference.failIfNotExists,
                    guild_id:           options.messageReference.guildID,
                    message_id:         options.messageReference.messageID
                } : undefined,
                tts: options.tts
            },
            files
        });
    }

    /**
     * Add a reaction to a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    async createReaction(channelID: string, messageID: string, emoji: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "PUT",
            path:   Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, "@me")
        });
    }

    /**
     * Delete or close a channel.
     * @param channelID The ID of the channel to delete or close.
     * @param reason The reason to be displayed in the audit log.
     */
    async delete(channelID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<RawChannel>({
            method: "DELETE",
            path:   Routes.CHANNEL(channelID),
            reason
        });
    }

    /**
     * Delete a message.
     * @param channelID The ID of the channel to delete the message in.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     */
    async deleteMessage(channelID: string, messageID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<RawMessage>({
            method: "DELETE",
            path:   Routes.CHANNEL_MESSAGE(channelID, messageID),
            reason
        });
    }

    /**
     * Delete a permission overwrite.
     * @param channelID The ID of the channel to delete the permission overwrite in.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    async deletePermission(channelID: string, overwriteID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.CHANNEL_PERMISSION(channelID, overwriteID),
            reason
        });
    }

    /**
     * Remove a reaction from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove a reaction from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     */
    async deleteReaction(channelID: string, messageID: string, emoji: string, user = "@me"): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, user)
        });
    }

    /**
     * Remove all, or a specific emoji's reactions from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     */
    async deleteReactions(channelID: string, messageID: string, emoji?: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   emoji ? Routes.CHANNEL_REACTION(channelID, messageID, emoji) : Routes.CHANNEL_REACTIONS(channelID, messageID)
        });
    }

    /**
     * Edit a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    async editMessage(channelID: string, messageID: string, options: EditMessageOptions): Promise<object> {
        const files = options.files;
        if (options.files) {
            delete options.files;
        }
        return this.#manager.authRequest<RawMessage>({
            method: "PATCH",
            path:   Routes.CHANNEL_MESSAGE(channelID, messageID),
            json:   {
                allowed_mentions: options.allowedMentions ? this.#manager.client.util.formatAllowedMentions(options.allowedMentions) : undefined,
                attachments:      options.attachments,
                components:       options.components ? options.components : undefined,
                content:          options.content,
                embeds:           options.embeds,
                flags:            options.flags
            },
            files
        });
    }

    /**
     * Edit a permission overwrite.
     * @param channelID The ID of the channel to edit the permission overwrite for.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    async editPermission(channelID: string, overwriteID: string, options: EditPermissionOptions): Promise<void> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        await this.#manager.authRequest<null>({
            method: "PUT",
            path:   Routes.CHANNEL_PERMISSION(channelID, overwriteID),
            json:   {
                allow: options.allow,
                deny:  options.deny,
                type:  options.type
            },
            reason
        });
    }

    /**
     * Get a channel.
     * @param channelID The ID of the channel to get.
     */
    async get(channelID: string): Promise<object> {
        return this.#manager.authRequest<RawChannel>({
            method: "GET",
            path:   Routes.CHANNEL(channelID)
        });
    }

    /**
     * Get the private archived threads the current user has joined in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    async getJoinedPrivateArchivedThreads(channelID: string, options?: GetArchivedThreadsOptions): Promise<object> {
        return this.#manager.authRequest<object>({
            method: "GET",
            path:   Routes.CHANNEL_PRIVATE_ARCHIVED_THREADS(channelID),
            json:   {
                before: options?.before,
                limit:  options?.limit
            }
        });
    }

    /**
     * Get a message in a channel.
     * @param channelID The ID of the channel the message is in
     * @param messageID The ID of the message to get.
     */
    async getMessage(channelID: string, messageID: string): Promise<object> {
        return this.#manager.authRequest<RawMessage>({
            method: "GET",
            path:   Routes.CHANNEL_MESSAGE(channelID, messageID)
        });
    }

    /**
     * Get the private archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    async getPrivateArchivedThreads(channelID: string, options?: GetArchivedThreadsOptions): Promise<object> {
        return this.#manager.authRequest<RawArchivedThreads<RawPrivateThreadChannel>>({
            method: "GET",
            path:   Routes.CHANNEL_PRIVATE_ARCHIVED_THREADS(channelID),
            json:   {
                before: options?.before,
                limit:  options?.limit
            }
        });
    }

    /**
     * Get the public archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    async getPublicArchivedThreads(channelID: string, options?: GetArchivedThreadsOptions): Promise<object> {
        return this.#manager.authRequest<RawArchivedThreads<RawPublicThreadChannel>>({
            method: "GET",
            path:   Routes.CHANNEL_PUBLIC_ARCHIVED_THREADS(channelID),
            json:   {
                before: options?.before,
                limit:  options?.limit
            }
        });
    }

    /**
     * Get a thread member.
     * @param channelID The ID of the thread.
     * @param userID The ID of the user to get the thread member of.
     */
    async getThreadMember(channelID: string, userID: string): Promise<ThreadMember> {
        return this.#manager.authRequest<RawThreadMember>({
            method: "GET",
            path:   Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        }).then(data => ({
            flags:         data.flags,
            id:            data.id,
            joinTimestamp: new Date(data.join_timestamp),
            userID:        data.user_id
        }));
    }

    /**
     * Get the members of a thread.
     * @param channelID The ID of the thread.
     */
    async getThreadMembers(channelID: string): Promise<Array<ThreadMember>> {
        return this.#manager.authRequest<Array<RawThreadMember>>({
            method: "GET",
            path:   Routes.CHANNEL_THREAD_MEMBERS(channelID)
        }).then(data => data.map(d => ({
            flags:         d.flags,
            id:            d.id,
            joinTimestamp: new Date(d.join_timestamp),
            userID:        d.user_id
        })));
    }

    /**
     * Join a thread.
     * @param channelID The ID of the thread to join.
     */
    async joinThread(channelID: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "PUT",
            path:   Routes.CHANNEL_THREAD_MEMBER(channelID, "@me")
        });
    }

    /**
     * Leave a thread.
     * @param channelID The ID of the thread to leave.
     */
    async leaveThread(channelID: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.CHANNEL_THREAD_MEMBER(channelID, "@me")
        });
    }

    /**
     * Remove a member from a thread.
     * @param channelID The ID of the thread to remove them from.
     * @param userID The ID of the user to remove from the thread.
     */
    async removeThreadMember(channelID: string, userID: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        });
    }

    /**
     * Create a thread from an existing message.
     * @param channelID The ID of the channel to create the thread in.
     * @param messageID The ID of the message to create the thread from.
     * @param options The options for starting the thread.
     */
    async startThreadFromMessage(channelID: string, messageID: string, options: StartThreadFromMessageOptions): Promise<object> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest<RawThreadChannel>({
            method: "POST",
            path:   Routes.CHANNEL_MESSAGE_THREADS(channelID, messageID),
            json:   {
                auto_archive_duration: options.autoArchiveDuration,
                name:                  options.name,
                rate_limit_per_user:   options.rateLimitPerUser
            },
            reason
        });
    }

    /**
     * Create a thread in a forum channel.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     */
    async startThreadInForum(channelID: string, options: StartThreadInForumOptions): Promise<object> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        const files = options.message.files;
        if (options.message.files) {
            delete options.message.files;
        }
        return this.#manager.authRequest<RawThreadChannel>({
            method: "POST",
            path:   Routes.CHANNEL_THREADS(channelID),
            json:   {
                auto_archive_duration: options.autoArchiveDuration,
                message:               {
                    allowed_mentions: this.#manager.client.util.formatAllowedMentions(options.message.allowedMentions),
                    attachments:      options.message.attachments,
                    components:       options.message.components ? options.message.components : undefined,
                    content:          options.message.content,
                    embeds:           options.message.embeds ? options.message.embeds : undefined,
                    flags:            options.message.flags,
                    sticker_ids:      options.message.stickerIDs
                },
                name:                options.name,
                rate_limit_per_user: options.rateLimitPerUser
            },
            reason,
            files
        });
    }

    /**
     * Create a thread without an existing message.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     */
    async startThreadWithoutMessage(channelID: string, options: StartThreadWithoutMessageOptions): Promise<object> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest<RawThreadChannel>({
            method: "POST",
            path:   Routes.CHANNEL_THREADS(channelID),
            json:   {
                auto_archive_duration: options.autoArchiveDuration,
                invitable:             options.invitable,
                name:                  options.name,
                rate_limit_per_user:   options.rateLimitPerUser,
                type:                  options.type
            },
            reason
        });
    }
}
