"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module TextableChannel */
const GuildChannel_js_1 = tslib_1.__importDefault(require("./GuildChannel.js"));
const PermissionOverwrite_js_1 = tslib_1.__importDefault(require("./PermissionOverwrite.js"));
const Message_js_1 = tslib_1.__importDefault(require("./Message.js"));
const Permission_js_1 = tslib_1.__importDefault(require("./Permission.js"));
const Constants_js_1 = require("../Constants.js");
const TypedCollection_js_1 = tslib_1.__importDefault(require("../util/TypedCollection.js"));
/** Represents a guild textable channel. */
class TextableChannel extends GuildChannel_js_1.default {
    /** The default auto archive duration for threads created in this channel. */
    defaultAutoArchiveDuration;
    /** The last message sent in this channel. This will only be present if a message has been sent within the current session. */
    lastMessage;
    /** The ID of last message sent in this channel. */
    lastMessageID;
    /** The cached messages in this channel. */
    messages;
    /** If this channel is age gated. */
    nsfw;
    /** The permission overwrites of this channel. */
    permissionOverwrites;
    /** The position of this channel on the sidebar. */
    position;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser;
    /** The topic of the channel. */
    topic;
    constructor(data, client) {
        super(data, client);
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        this.lastMessageID = data.last_message_id;
        this.messages = new TypedCollection_js_1.default((Message_js_1.default), client, client.options.collectionLimits.messages);
        this.nsfw = data.nsfw;
        this.permissionOverwrites = new TypedCollection_js_1.default(PermissionOverwrite_js_1.default, client);
        this.position = data.position;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.topic = data.topic;
        this.update(data);
    }
    update(data) {
        super.update(data);
        if (data.default_auto_archive_duration !== undefined) {
            this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        }
        if (data.last_message_id !== undefined) {
            this.lastMessage = data.last_message_id === null ? null : this.messages.get(data.last_message_id);
            this.lastMessageID = data.last_message_id;
        }
        if (data.nsfw !== undefined) {
            this.nsfw = data.nsfw;
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.rate_limit_per_user !== undefined) {
            this.rateLimitPerUser = data.rate_limit_per_user;
        }
        if (data.topic !== undefined) {
            this.topic = data.topic;
        }
        if (data.permission_overwrites !== undefined) {
            data.permission_overwrites.map(overwrite => this.permissionOverwrites.update(overwrite));
        }
    }
    get parent() {
        return super.parent;
    }
    /**
     * [Text] Convert this text channel to an announcement channel.
     *
     * [Announcement] Convert this announcement channel to a text channel.
     */
    async convert() {
        return this.edit({ type: this.type === Constants_js_1.ChannelTypes.GUILD_TEXT ? Constants_js_1.ChannelTypes.GUILD_ANNOUNCEMENT : Constants_js_1.ChannelTypes.GUILD_TEXT });
    }
    /**
     * Create an invite for this channel.
     * @param options The options for the invite.
     */
    async createInvite(options) {
        return this.client.rest.channels.createInvite(this.id, options);
    }
    /**
     * Create a message in this channel.
     * @param options The options for the message.
     */
    async createMessage(options) {
        return this.client.rest.channels.createMessage(this.id, options);
    }
    /**
     * Add a reaction to a message in this channel.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    async createReaction(messageID, emoji) {
        return this.client.rest.channels.createReaction(this.id, messageID, emoji);
    }
    /**
     * Delete a message in this channel.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     */
    async deleteMessage(messageID, reason) {
        return this.client.rest.channels.deleteMessage(this.id, messageID, reason);
    }
    /**
     * Bulk delete messages in this channel.
     * @param messageIDs The IDs of the messages to delete. Any duplicates or messages older than two weeks will cause an error.
     * @param reason The reason for deleting the messages.
     */
    async deleteMessages(messageIDs, reason) {
        return this.client.rest.channels.deleteMessages(this.id, messageIDs, reason);
    }
    /**
     * Delete a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    async deletePermission(overwriteID, reason) {
        return this.client.rest.channels.deletePermission(this.id, overwriteID, reason);
    }
    /**
     * Remove a reaction from a message in this channel.
     * @param messageID The ID of the message to remove a reaction from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     */
    async deleteReaction(messageID, emoji, user = "@me") {
        return this.client.rest.channels.deleteReaction(this.id, messageID, emoji, user);
    }
    /**
     * Remove all, or a specific emoji's reactions from a message in this channel.
     * @param messageID The ID of the message to remove reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     */
    async deleteReactions(messageID, emoji) {
        return this.client.rest.channels.deleteReactions(this.id, messageID, emoji);
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    async edit(options) {
        return this.client.rest.channels.edit(this.id, options);
    }
    /**
     * Edit a message in this channel.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    async editMessage(messageID, options) {
        return this.client.rest.channels.editMessage(this.id, messageID, options);
    }
    /**
     * Edit a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    async editPermission(overwriteID, options) {
        return this.client.rest.channels.editPermission(this.id, overwriteID, options);
    }
    /**
     * Get the invites of this channel.
     */
    async getInvites() {
        return this.client.rest.channels.getInvites(this.id);
    }
    /**
     * Get a message in this channel.
     * @param messageID The ID of the message to get.
     */
    async getMessage(messageID) {
        return this.client.rest.channels.getMessage(this.id, messageID);
    }
    /**
     * Get messages in this channel.
     * @param options The options for getting the messages. `before`, `after`, and `around `All are mutually exclusive.
     */
    async getMessages(options) {
        return this.client.rest.channels.getMessages(this.id, options);
    }
    /**
     * Get the pinned messages in this channel.
     */
    async getPinnedMessages() {
        return this.client.rest.channels.getPinnedMessages(this.id);
    }
    /**
     * Get the public archived threads in this channel.
     * @param options The options for getting the public archived threads.
     */
    async getPublicArchivedThreads(options) {
        return this.client.rest.channels.getPublicArchivedThreads(this.id, options);
    }
    /**
     * Get the users who reacted with a specific emoji on a message in this channel.
     * @param messageID The ID of the message to get reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param options The options for getting the reactions.
     */
    async getReactions(messageID, emoji, options) {
        return this.client.rest.channels.getReactions(this.id, messageID, emoji, options);
    }
    /**
     * Get the webhooks in this channel.
     */
    async getWebhooks() {
        return this.client.rest.webhooks.getForChannel(this.id);
    }
    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member) {
        if (typeof member === "string") {
            member = this.guild.members.get(member);
        }
        if (!member) {
            throw new Error(`Cannot use ${this.constructor.name}#permissionsOf with an ID without having the member cached.`);
        }
        let permission = this.guild.permissionsOf(member).allow;
        if (permission & Constants_js_1.Permissions.ADMINISTRATOR) {
            return new Permission_js_1.default(Constants_js_1.AllPermissions);
        }
        let overwrite = this.permissionOverwrites.get(this.guildID);
        if (overwrite) {
            permission = (permission & ~overwrite.deny) | overwrite.allow;
        }
        let deny = 0n;
        let allow = 0n;
        for (const id of member.roles) {
            if ((overwrite = this.permissionOverwrites.get(id))) {
                deny |= overwrite.deny;
                allow |= overwrite.allow;
            }
        }
        permission = (permission & ~deny) | allow;
        overwrite = this.permissionOverwrites.get(member.id);
        if (overwrite) {
            permission = (permission & ~overwrite.deny) | overwrite.allow;
        }
        return new Permission_js_1.default(permission);
    }
    /**
     * Pin a message in this channel.
     * @param messageID The ID of the message to pin.
     * @param reason The reason for pinning the message.
     */
    async pinMessage(messageID, reason) {
        return this.client.rest.channels.pinMessage(this.id, messageID, reason);
    }
    /**
     * Purge an amount of messages from this channel.
     * @param options The options to purge. `before`, `after`, and `around `All are mutually exclusive.
     */
    async purge(options) {
        return this.client.rest.channels.purgeMessages(this.id, options);
    }
    /**
     * Show a typing indicator in this channel. How long users see this varies from client to client.
     */
    async sendTyping() {
        return this.client.rest.channels.sendTyping(this.id);
    }
    /**
     * Create a thread from an existing message in this channel.
     * @param messageID The ID of the message to create a thread from.
     * @param options The options for creating the thread.
     */
    async startThreadFromMessage(messageID, options) {
        return this.client.rest.channels.startThreadFromMessage(this.id, messageID, options);
    }
    /**
     * Create a thread without an existing message in this channel.
     * @param options The options for creating the thread.
     */
    async startThreadWithoutMessage(options) {
        return this.client.rest.channels.startThreadWithoutMessage(this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            defaultAutoArchiveDuration: this.defaultAutoArchiveDuration,
            lastMessageID: this.lastMessageID,
            messages: this.messages.map(message => message.id),
            nsfw: this.nsfw,
            permissionOverwrites: this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            position: this.position,
            rateLimitPerUser: this.rateLimitPerUser,
            topic: this.topic,
            type: this.type
        };
    }
    /**
     * Unpin a message in this channel.
     * @param messageID The ID of the message to unpin.
     * @param reason The reason for unpinning the message.
     */
    async unpinMessage(messageID, reason) {
        return this.client.rest.channels.unpinMessage(this.id, messageID, reason);
    }
}
exports.default = TextableChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dGFibGVDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvVGV4dGFibGVDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhCQUE4QjtBQUM5QixnRkFBNkM7QUFHN0MsOEZBQTJEO0FBQzNELHNFQUFtQztBQU1uQyw0RUFBeUM7QUFJekMsa0RBQTRFO0FBRTVFLDRGQUF5RDtBQXFCekQsMkNBQTJDO0FBQzNDLE1BQXFCLGVBQWlHLFNBQVEseUJBQVk7SUFDdEksNkVBQTZFO0lBQzdFLDBCQUEwQixDQUE0QjtJQUN0RCw4SEFBOEg7SUFDOUgsV0FBVyxDQUFxQjtJQUNoQyxtREFBbUQ7SUFDbkQsYUFBYSxDQUFnQjtJQUM3QiwyQ0FBMkM7SUFDM0MsUUFBUSxDQUFrRDtJQUMxRCxvQ0FBb0M7SUFDcEMsSUFBSSxDQUFVO0lBQ2QsaURBQWlEO0lBQ2pELG9CQUFvQixDQUE2RDtJQUNqRixtREFBbUQ7SUFDbkQsUUFBUSxDQUFTO0lBQ2pCLHFFQUFxRTtJQUNyRSxnQkFBZ0IsQ0FBUztJQUN6QixnQ0FBZ0M7SUFDaEMsS0FBSyxDQUFnQjtJQUVyQixZQUFZLElBQTZDLEVBQUUsTUFBYztRQUNyRSxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUM7UUFDckUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSw0QkFBZSxDQUFDLENBQUEsb0JBQVUsQ0FBQSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSw0QkFBZSxDQUFDLGdDQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQStEO1FBQ3JGLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsNkJBQTZCLEtBQUssU0FBUyxFQUFFO1lBQ2xELElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUM7U0FDeEU7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUM3QztRQUNELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDakM7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztTQUNwRDtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLEtBQUssU0FBUyxFQUFFO1lBQzFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDNUY7SUFDTCxDQUFDO0lBRUQsSUFBYSxNQUFNO1FBQ2YsT0FBTyxLQUFLLENBQUMsTUFBNEMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssMkJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLDJCQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLDJCQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNsSSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUE0QjtRQUMzQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQW9CLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBNkI7UUFDN0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQWlCLEVBQUUsS0FBYTtRQUNqRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsTUFBZTtRQUNsRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQXlCLEVBQUUsTUFBZTtRQUMzRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsV0FBbUIsRUFBRSxNQUFlO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBaUIsRUFBRSxLQUFhLEVBQUUsSUFBSSxHQUFHLEtBQUs7UUFDL0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBaUIsRUFBRSxLQUFjO1FBQ25ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7OztPQUdHO0lBQ00sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFnQztRQUNoRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQW9DLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQWlCLEVBQUUsT0FBMkI7UUFDNUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUFtQixFQUFFLE9BQThCO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBaUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBbUM7UUFDakQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxPQUFtQztRQUM5RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBMEUsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6SixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQWlCLEVBQUUsS0FBYSxFQUFFLE9BQTZCO1FBQzlFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7O09BR0c7SUFDSCxhQUFhLENBQUMsTUFBdUI7UUFDakMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUUsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDZEQUE2RCxDQUFDLENBQUM7U0FDckg7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDeEQsSUFBSSxVQUFVLEdBQUcsMEJBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDeEMsT0FBTyxJQUFJLHVCQUFVLENBQUMsNkJBQWMsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUQsSUFBSSxTQUFTLEVBQUU7WUFDWCxVQUFVLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNqRTtRQUNELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLEtBQUssTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDakQsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLEtBQUssSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQzVCO1NBQ0o7UUFFRCxVQUFVLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDMUMsU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELElBQUksU0FBUyxFQUFFO1lBQ1gsVUFBVSxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDakU7UUFDRCxPQUFPLElBQUksdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBaUIsRUFBRSxNQUFlO1FBQy9DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUF3QjtRQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsc0JBQXNCLENBQUMsU0FBaUIsRUFBRSxPQUFzQztRQUNsRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBMEUsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEssQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxPQUF5QztRQUNyRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBMEUsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxSixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjtZQUMzRCxhQUFhLEVBQWUsSUFBSSxDQUFDLGFBQWE7WUFDOUMsUUFBUSxFQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDcEUsSUFBSSxFQUF3QixJQUFJLENBQUMsSUFBSTtZQUNyQyxvQkFBb0IsRUFBUSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFGLFFBQVEsRUFBb0IsSUFBSSxDQUFDLFFBQVE7WUFDekMsZ0JBQWdCLEVBQVksSUFBSSxDQUFDLGdCQUFnQjtZQUNqRCxLQUFLLEVBQXVCLElBQUksQ0FBQyxLQUFLO1lBQ3RDLElBQUksRUFBd0IsSUFBSSxDQUFDLElBQUk7U0FDeEMsQ0FBQztJQUNOLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFpQixFQUFFLE1BQWU7UUFDakQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDSjtBQXBVRCxrQ0FvVUMifQ==