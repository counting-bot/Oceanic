import * as Routes from "../util/Routes.js";
import Message from "../structures/Message.js";
/** Various methods for interacting with channels. */
export default class Channels {
    #manager;
    constructor(manager) {
        this.#manager = manager;
    }
    /**
     * Add a member to a thread.
     * @param channelID The ID of the thread to add them to.
     * @param userID The ID of the user to add to the thread.
     */
    async addThreadMember(channelID, userID) {
        await this.#manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        });
    }
    /**
     * Create a direct message. This will not create a new channel if you have already started a dm with the user.
     * @param recipient The ID of the recipient of the direct message.
     */
    async createDM(recipient) {
        return this.#manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_CHANNELS,
            json: { recipient_id: recipient }
        });
    }
    /**
     * Create an invite for a channel.
     * @param channelID The ID of the channel to create an invite for.
     * @param options The options for creating the invite.
     */
    async createInvite(channelID, options) {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_INVITES(channelID),
            json: {
                max_age: options.maxAge,
                max_uses: options.maxUses,
                target_application_id: options.targetApplicationID,
                target_type: options.targetType,
                target_user_id: options.targetUserID,
                temporary: options.temporary,
                unique: options.unique
            },
            reason
        });
    }
    /**
     * Create a message in a channel.
     * @param channelID The ID of the channel to create the message in.
     * @param options The options for creating the message.
     */
    async createMessage(channelID, options) {
        const files = options.files;
        if (options.files) {
            delete options.files;
        }
        return this.#manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_MESSAGES(channelID),
            json: {
                allowed_mentions: this.#manager.client.util.formatAllowedMentions(options.allowedMentions),
                attachments: options.attachments,
                components: options.components ? options.components : undefined,
                content: options.content,
                embeds: options.embeds,
                flags: options.flags,
                sticker_ids: options.stickerIDs,
                message_reference: options.messageReference ? {
                    channel_id: options.messageReference.channelID,
                    fail_if_not_exists: options.messageReference.failIfNotExists,
                    guild_id: options.messageReference.guildID,
                    message_id: options.messageReference.messageID
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
    async createReaction(channelID, messageID, emoji) {
        if (emoji === decodeURIComponent(emoji)) {
            emoji = encodeURIComponent(emoji);
        }
        await this.#manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, "@me")
        });
    }
    /**
     * Delete or close a channel.
     * @param channelID The ID of the channel to delete or close.
     * @param reason The reason to be displayed in the audit log.
     */
    async delete(channelID, reason) {
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL(channelID),
            reason
        });
    }
    /**
     * Delete a message.
     * @param channelID The ID of the channel to delete the message in.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     */
    async deleteMessage(channelID, messageID, reason) {
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_MESSAGE(channelID, messageID),
            reason
        });
    }
    /**
     * Delete a permission overwrite.
     * @param channelID The ID of the channel to delete the permission overwrite in.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    async deletePermission(channelID, overwriteID, reason) {
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_PERMISSION(channelID, overwriteID),
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
    async deleteReaction(channelID, messageID, emoji, user = "@me") {
        if (emoji === decodeURIComponent(emoji)) {
            emoji = encodeURIComponent(emoji);
        }
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, user)
        });
    }
    /**
     * Remove all, or a specific emoji's reactions from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     */
    async deleteReactions(channelID, messageID, emoji) {
        if (emoji && emoji === decodeURIComponent(emoji)) {
            emoji = encodeURIComponent(emoji);
        }
        await this.#manager.authRequest({
            method: "DELETE",
            path: emoji ? Routes.CHANNEL_REACTION(channelID, messageID, emoji) : Routes.CHANNEL_REACTIONS(channelID, messageID)
        });
    }
    /**
     * Edit a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    async editMessage(channelID, messageID, options) {
        const files = options.files;
        if (options.files) {
            delete options.files;
        }
        return this.#manager.authRequest({
            method: "PATCH",
            path: Routes.CHANNEL_MESSAGE(channelID, messageID),
            json: {
                allowed_mentions: options.allowedMentions ? this.#manager.client.util.formatAllowedMentions(options.allowedMentions) : undefined,
                attachments: options.attachments,
                components: options.components ? options.components : undefined,
                content: options.content,
                embeds: options.embeds,
                flags: options.flags
            },
            files
        }).then(data => new Message(data, this.#manager.client));
    }
    /**
     * Edit a permission overwrite.
     * @param channelID The ID of the channel to edit the permission overwrite for.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    async editPermission(channelID, overwriteID, options) {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        await this.#manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_PERMISSION(channelID, overwriteID),
            json: {
                allow: options.allow,
                deny: options.deny,
                type: options.type
            },
            reason
        });
    }
    /**
     * Get a channel.
     * @param channelID The ID of the channel to get.
     */
    async get(channelID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL(channelID)
        });
    }
    /**
     * Get the private archived threads the current user has joined in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    async getJoinedPrivateArchivedThreads(channelID, options) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PRIVATE_ARCHIVED_THREADS(channelID),
            json: {
                before: options?.before,
                limit: options?.limit
            }
        });
    }
    /**
     * Get a message in a channel.
     * @param channelID The ID of the channel the message is in
     * @param messageID The ID of the message to get.
     */
    async getMessage(channelID, messageID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_MESSAGE(channelID, messageID)
        }).then(data => new Message(data, this.#manager.client));
    }
    /**
     * Get messages in a channel.
     * @param channelID The ID of the channel to get messages from.
     * @param options The options for getting messages. `before`, `after`, and `around `All are mutually exclusive.
     */
    async getMessages(channelID, options) {
        const _getMessages = async (_options) => {
            const query = new URLSearchParams();
            if (_options?.after !== undefined) {
                query.set("after", _options.after);
            }
            if (_options?.around !== undefined) {
                query.set("around", _options.around);
            }
            if (_options?.before !== undefined) {
                query.set("before", _options.before);
            }
            if (_options?.limit !== undefined) {
                query.set("limit", _options.limit.toString());
            }
            return this.#manager.authRequest({
                method: "GET",
                path: Routes.CHANNEL_MESSAGES(channelID),
                query
            }).then(data => data.map(d => new Message(d, this.#manager.client)));
        };
        const limit = options?.limit ?? 100;
        let chosenOption;
        if (options?.after) {
            chosenOption = "after";
        }
        else if (options?.around) {
            chosenOption = "around";
        }
        else if (options?.before) {
            chosenOption = "before";
        }
        else {
            chosenOption = "before";
        }
        let optionValue = options?.[chosenOption] ?? undefined;
        let messages = [];
        while (messages.length < limit) {
            const limitLeft = limit - messages.length;
            const limitToFetch = limitLeft <= 100 ? limitLeft : 100;
            if (options?.limit && options?.limit > 100) {
                this.#manager.client.emit("debug", `Getting ${limitLeft} more message${limitLeft === 1 ? "" : "s"} for ${channelID}: ${optionValue ?? ""}`);
            }
            const messagesChunk = await _getMessages({
                limit: limitToFetch,
                [chosenOption]: optionValue
            });
            if (messagesChunk.length === 0) {
                break;
            }
            messages = messages.concat(messagesChunk);
            if (chosenOption === "around") {
                break;
            }
            else {
                optionValue = messages.at(-1).id;
            }
            if (messagesChunk.length < 100) {
                break;
            }
        }
        return messages;
    }
    /**
     * Get the private archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    async getPrivateArchivedThreads(channelID, options) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PRIVATE_ARCHIVED_THREADS(channelID),
            json: {
                before: options?.before,
                limit: options?.limit
            }
        });
    }
    /**
     * Get the public archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     */
    async getPublicArchivedThreads(channelID, options) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PUBLIC_ARCHIVED_THREADS(channelID),
            json: {
                before: options?.before,
                limit: options?.limit
            }
        });
    }
    /**
     * Get a thread member.
     * @param channelID The ID of the thread.
     * @param userID The ID of the user to get the thread member of.
     */
    async getThreadMember(channelID, userID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        }).then(data => ({
            flags: data.flags,
            id: data.id,
            joinTimestamp: new Date(data.join_timestamp),
            userID: data.user_id
        }));
    }
    /**
     * Get the members of a thread.
     * @param channelID The ID of the thread.
     */
    async getThreadMembers(channelID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_THREAD_MEMBERS(channelID)
        }).then(data => data.map(d => ({
            flags: d.flags,
            id: d.id,
            joinTimestamp: new Date(d.join_timestamp),
            userID: d.user_id
        })));
    }
    /**
     * Join a thread.
     * @param channelID The ID of the thread to join.
     */
    async joinThread(channelID) {
        await this.#manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, "@me")
        });
    }
    /**
     * Leave a thread.
     * @param channelID The ID of the thread to leave.
     */
    async leaveThread(channelID) {
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, "@me")
        });
    }
    /**
     * Remove a member from a thread.
     * @param channelID The ID of the thread to remove them from.
     * @param userID The ID of the user to remove from the thread.
     */
    async removeThreadMember(channelID, userID) {
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        });
    }
    /**
     * Create a thread from an existing message.
     * @param channelID The ID of the channel to create the thread in.
     * @param messageID The ID of the message to create the thread from.
     * @param options The options for starting the thread.
     */
    async startThreadFromMessage(channelID, messageID, options) {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_MESSAGE_THREADS(channelID, messageID),
            json: {
                auto_archive_duration: options.autoArchiveDuration,
                name: options.name,
                rate_limit_per_user: options.rateLimitPerUser
            },
            reason
        });
    }
    /**
     * Create a thread in a forum channel.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     */
    async startThreadInForum(channelID, options) {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        const files = options.message.files;
        if (options.message.files) {
            delete options.message.files;
        }
        return this.#manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_THREADS(channelID),
            json: {
                auto_archive_duration: options.autoArchiveDuration,
                message: {
                    allowed_mentions: this.#manager.client.util.formatAllowedMentions(options.message.allowedMentions),
                    attachments: options.message.attachments,
                    components: options.message.components ? options.message.components : undefined,
                    content: options.message.content,
                    embeds: options.message.embeds ? options.message.embeds : undefined,
                    flags: options.message.flags,
                    sticker_ids: options.message.stickerIDs
                },
                name: options.name,
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
    async startThreadWithoutMessage(channelID, options) {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_THREADS(channelID),
            json: {
                auto_archive_duration: options.autoArchiveDuration,
                invitable: options.invitable,
                name: options.name,
                rate_limit_per_user: options.rateLimitPerUser,
                type: options.type
            },
            reason
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL0NoYW5uZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQSxPQUFPLEtBQUssTUFBTSxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sT0FBTyxNQUFNLDBCQUEwQixDQUFDO0FBSS9DLHFEQUFxRDtBQUNyRCxNQUFNLENBQUMsT0FBTyxPQUFPLFFBQVE7SUFDekIsUUFBUSxDQUFjO0lBQ3RCLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQWlCLEVBQUUsTUFBYztRQUNuRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDO1NBQzFELENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQWlCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQW9CO1lBQ2hELE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFJLE1BQU0sQ0FBQyxjQUFjO1lBQzdCLElBQUksRUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUU7U0FDdEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQWlCLEVBQUUsT0FBNEI7UUFDOUQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMs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