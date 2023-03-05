"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Message */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const User_js_1 = tslib_1.__importDefault(require("./User.js"));
const PartialApplication_js_1 = tslib_1.__importDefault(require("./PartialApplication.js"));
/** Represents a message. */
class Message extends Base_js_1.default {
    /** The [activity](https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure) associated with this message. */
    activity;
    /**
     * The application associated with this message. This can be present in two scenarios:
     * * If the message was from an interaction or application owned webhook ({@link ClientApplication} if any shard has reached READY, {@link PartialApplication} otherwise).
     * * If the message has a rich presence embed ({@link PartialApplication})
     */
    application;
    /**
     * The ID of the application associated with this message. This can be present in two scenarios:
     * * If the message was from an interaction or application owned webhook ({@link ClientApplication} if any shard has reached READY, {@link PartialApplication} otherwise).
     * * If the message has a rich presence embed ({@link PartialApplication})
     */
    applicationID;
    /** The author of this message. */
    author;
    /** The ID of the channel this message was created in. */
    channelID;
    /** The content of this message. */
    content;
    /** The embeds on this message. */
    embeds;
    /** The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) on this message. */
    flags;
    /** The ID of the guild this message is in. */
    guildID;
    /** The interaction info, if this message was the result of an interaction. */
    interaction;
    /** The member that created this message, if this message is in a guild. */
    member;
    /** Channels mentioned in a `CROSSPOSTED` channel follower message. See [Discord's docs](https://discord.com/developers/docs/resources/channel#channel-mention-object) for more information. */
    mentionChannels;
    /** If this message is a `REPLY` or `THREAD_STARTER_MESSAGE`, some info about the referenced message. */
    messageReference;
    /** A nonce for ensuring a message was sent. */
    nonce;
    /** This message's relative position, if in a thread. */
    position;
    /** The reactions on this message. */
    reactions;
    /** If this message is a `REPLY` or `THREAD_STARTER_MESSAGE`, this will be the message that's referenced. */
    referencedMessage;
    // stickers exists, but is deprecated
    /** The sticker items on this message. */
    stickerItems;
    /** The thread associated with this message, if any. */
    thread;
    /** The timestamp at which this message was sent. */
    timestamp;
    /** The [type](https://discord.com/developers/docs/resources/channel#message-object-message-types) of this message. */
    type;
    /** The webhook associated with this message, if sent via a webhook. This only has an `id` property. */
    webhookID;
    constructor(data, client) {
        super(data.id, client);
        this.channelID = data.channel_id;
        this.content = data.content;
        this.embeds = [];
        this.flags = 0;
        this.guildID = (data.guild_id === undefined ? null : data.guild_id);
        this.member = (data.member === undefined ? undefined : this.client.util.updateMember(data.guild_id, data.author.id, { ...data.member, user: data.author }));
        this.reactions = {};
        this.timestamp = new Date(data.timestamp);
        this.type = data.type;
        this.webhookID = data.webhook_id;
        this.update(data);
        this.author = data.author.discriminator === "0000" ? new User_js_1.default(data.author, client) : client.users.update(data.author);
        if (data.application_id === undefined) {
            this.applicationID = null;
        }
        else {
            if (client["_application"] && client.application.id === data.application_id) {
                if (data.application) {
                    client.application["update"](data.application);
                }
                this.application = client.application;
            }
            else {
                this.application = data.application ? new PartialApplication_js_1.default(data.application, client) : undefined;
            }
            this.applicationID = data.application_id;
        }
    }
    update(data) {
        if (data.activity !== undefined) {
            this.activity = data.activity;
        }
        if (data.content !== undefined) {
            this.content = data.content;
        }
        if (data.embeds !== undefined) {
            this.embeds = this.client.util.embedsToParsed(data.embeds);
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.interaction !== undefined) {
            let member;
            if (data.interaction.member) {
                member = {
                    ...data.interaction.member,
                    user: data.interaction.user
                };
            }
            this.interaction = {
                id: data.interaction.id,
                member: member ? this.client.util.updateMember(data.guild_id, member.user.id, member) : undefined,
                name: data.interaction.name,
                type: data.interaction.type,
                user: this.client.users.update(data.interaction.user)
            };
        }
        if (data.message_reference) {
            this.messageReference = {
                channelID: data.message_reference.channel_id,
                failIfNotExists: data.message_reference.fail_if_not_exists,
                guildID: data.message_reference.guild_id,
                messageID: data.message_reference.message_id
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
        if (data.thread !== undefined) {
            this.thread = this.client.util.updateThread(data.thread);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            activity: this.activity,
            applicationID: this.applicationID ?? undefined,
            author: this.author.toJSON(),
            channelID: this.channelID,
            content: this.content,
            embeds: this.embeds,
            flags: this.flags,
            guildID: this.guildID ?? undefined,
            interaction: this.interaction ? {
                id: this.interaction.id,
                member: this.interaction.member?.toJSON(),
                name: this.interaction.name,
                type: this.interaction.type,
                user: this.interaction.user.toJSON()
            } : undefined,
            mentionChannels: this.mentionChannels,
            messageReference: this.messageReference,
            nonce: this.nonce,
            position: this.position,
            reactions: this.reactions,
            referencedMessage: this.referencedMessage?.toJSON(),
            stickerItems: this.stickerItems,
            thread: this.thread?.toJSON(),
            timestamp: this.timestamp.getTime(),
            type: this.type,
            webhook: this.webhookID
        };
    }
}
exports.default = Message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLGdFQUE2QjtBQUM3QixnRUFBNkI7QUFFN0IsNEZBQXlEO0FBcUJ6RCw0QkFBNEI7QUFDNUIsTUFBcUIsT0FBaUcsU0FBUSxpQkFBSTtJQUM5SCxvSkFBb0o7SUFDcEosUUFBUSxDQUFtQjtJQUMzQjs7OztPQUlHO0lBQ0gsV0FBVyxDQUEwQztJQUNyRDs7OztPQUlHO0lBQ0gsYUFBYSxDQUFnQjtJQUM3QixrQ0FBa0M7SUFDbEMsTUFBTSxDQUFPO0lBQ2IseURBQXlEO0lBQ3pELFNBQVMsQ0FBUztJQUNsQixtQ0FBbUM7SUFDbkMsT0FBTyxDQUFTO0lBQ2hCLGtDQUFrQztJQUNsQyxNQUFNLENBQWU7SUFDckIsdUhBQXVIO0lBQ3ZILEtBQUssQ0FBUztJQUNkLDhDQUE4QztJQUM5QyxPQUFPLENBQXlEO0lBQ2hFLDhFQUE4RTtJQUM5RSxXQUFXLENBQXNCO0lBQ2pDLDJFQUEyRTtJQUMzRSxNQUFNLENBQThEO0lBQ3BFLCtMQUErTDtJQUMvTCxlQUFlLENBQXlCO0lBQ3hDLHdHQUF3RztJQUN4RyxnQkFBZ0IsQ0FBb0I7SUFDcEMsK0NBQStDO0lBQy9DLEtBQUssQ0FBbUI7SUFDeEIsd0RBQXdEO0lBQ3hELFFBQVEsQ0FBVTtJQUNsQixxQ0FBcUM7SUFDckMsU0FBUyxDQUFrQztJQUMzQyw0R0FBNEc7SUFDNUcsaUJBQWlCLENBQWtCO0lBQ25DLHFDQUFxQztJQUNyQyx5Q0FBeUM7SUFDekMsWUFBWSxDQUFzQjtJQUNsQyx1REFBdUQ7SUFDdkQsTUFBTSxDQUFvQjtJQUMxQixvREFBb0Q7SUFDcEQsU0FBUyxDQUFPO0lBQ2hCLHNIQUFzSDtJQUN0SCxJQUFJLENBQWU7SUFDbkIsdUdBQXVHO0lBQ3ZHLFNBQVMsQ0FBVTtJQUNuQixZQUFZLElBQWdC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