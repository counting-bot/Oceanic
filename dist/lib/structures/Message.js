"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Message */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const Attachment_js_1 = tslib_1.__importDefault(require("./Attachment.js"));
const User_js_1 = tslib_1.__importDefault(require("./User.js"));
const PartialApplication_js_1 = tslib_1.__importDefault(require("./PartialApplication.js"));
const TypedCollection_js_1 = tslib_1.__importDefault(require("../util/TypedCollection.js"));
const Constants_js_1 = require("../Constants.js");
const Routes = tslib_1.__importStar(require("../util/Routes.js"));
/** Represents a message. */
class Message extends Base_js_1.default {
    _cachedChannel;
    _cachedGuild;
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
    /** The attachments on this message. */
    attachments;
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
        this.attachments = new TypedCollection_js_1.default(Attachment_js_1.default, client);
        this.channelID = data.channel_id;
        this.content = data.content;
        this.embeds = [];
        this.flags = 0;
        this.guildID = (data.guild_id === undefined ? null : data.guild_id);
        this.member = (data.member !== undefined ? this.client.util.updateMember(data.guild_id, data.author.id, { ...data.member, user: data.author }) : undefined);
        this.reactions = {};
        this.timestamp = new Date(data.timestamp);
        this.type = data.type;
        this.webhookID = data.webhook_id;
        this.update(data);
        this.author = data.author.discriminator !== "0000" ? client.users.update(data.author) : new User_js_1.default(data.author, client);
        if (data.application_id !== undefined) {
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
        else {
            this.applicationID = null;
        }
        if (data.attachments) {
            for (const attachment of data.attachments) {
                this.attachments.update(attachment);
            }
        }
    }
    update(data) {
        if (data.activity !== undefined) {
            this.activity = data.activity;
        }
        if (data.attachments !== undefined) {
            for (const id of this.attachments.keys()) {
                if (!data.attachments.some(attachment => attachment.id === id)) {
                    this.attachments.delete(id);
                }
            }
            for (const attachment of data.attachments) {
                this.attachments.update(attachment);
            }
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
    /** The channel this message was created in. */
    get channel() {
        return this._cachedChannel ?? (this._cachedChannel = this.client.getChannel(this.channelID));
    }
    /** The guild this message is in. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            if (!this._cachedGuild) {
                this._cachedGuild = this.client.guilds.get(this.guildID);
                if (!this._cachedGuild) {
                    throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
                }
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    /** A link to this message. */
    get jumpLink() {
        return `${Constants_js_1.BASE_URL}${Routes.MESSAGE_LINK(this.guildID ?? "@me", this.channelID, this.id)}`;
    }
    /**
     * Add a reaction to this message.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    async createReaction(emoji) {
        return this.client.rest.channels.createReaction(this.channelID, this.id, emoji);
    }
    /**
     * Delete this message.
     * @param reason The reason for deleting the message.
     */
    async delete(reason) {
        return this.client.rest.channels.deleteMessage(this.channelID, this.id, reason);
    }
    /**
     * Delete this message as a webhook.
     * @param token The token of the webhook.
     * @param options Options for deleting the message.
     */
    async deleteWebhook(token, options) {
        if (!this.webhookID) {
            throw new Error("This message is not a webhook message.");
        }
        return this.client.rest.webhooks.deleteMessage(this.webhookID, token, this.id, options);
    }
    /**
     * Edit this message as a webhook.
     * @param token The token of the webhook.
     * @param options The options for editing the message.
     */
    async editWebhook(token, options) {
        if (!this.webhookID) {
            throw new Error("This message is not a webhook message.");
        }
        return this.client.rest.webhooks.editMessage(this.webhookID, token, this.id, options);
    }
    /**
     * Create a thread from this message.
     * @param options The options for creating the thread.
     */
    async startThread(options) {
        return this.client.rest.channels.startThreadFromMessage(this.channelID, this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            activity: this.activity,
            applicationID: this.applicationID ?? undefined,
            attachments: this.attachments.map(attachment => attachment.toJSON()),
            author: this.author.toJSON(),
            channelID: this.channelID,
            content: this.content,
            embeds: this.embeds,
            flags: this.flags,
            guildID: this.guildID ?? undefined,
            interaction: !this.interaction ? undefined : {
                id: this.interaction.id,
                member: this.interaction.member?.toJSON(),
                name: this.interaction.name,
                type: this.interaction.type,
                user: this.interaction.user.toJSON()
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLGdFQUE2QjtBQUM3Qiw0RUFBeUM7QUFDekMsZ0VBQTZCO0FBRzdCLDRGQUF5RDtBQU96RCw0RkFBeUQ7QUFDekQsa0RBQXlEO0FBb0J6RCxrRUFBNEM7QUFFNUMsNEJBQTRCO0FBQzVCLE1BQXFCLE9BQWlHLFNBQVEsaUJBQUk7SUFDdEgsY0FBYyxDQUF3RDtJQUN0RSxZQUFZLENBQXdEO0lBQzVFLG9KQUFvSjtJQUNwSixRQUFRLENBQW1CO0lBQzNCOzs7O09BSUc7SUFDSCxXQUFXLENBQTBDO0lBQ3JEOzs7O09BSUc7SUFDSCxhQUFhLENBQWdCO0lBQzdCLHVDQUF1QztJQUN2QyxXQUFXLENBQXFEO0lBQ2hFLGtDQUFrQztJQUNsQyxNQUFNLENBQU87SUFDYix5REFBeUQ7SUFDekQsU0FBUyxDQUFTO0lBQ2xCLG1DQUFtQztJQUNuQyxPQUFPLENBQVM7SUFDaEIsa0NBQWtDO0lBQ2xDLE1BQU0sQ0FBZTtJQUNyQix1SEFBdUg7SUFDdkgsS0FBSyxDQUFTO0lBQ2QsOENBQThDO0lBQzlDLE9BQU8sQ0FBeUQ7SUFDaEUsOEVBQThFO0lBQzlFLFdBQVcsQ0FBc0I7SUFDakMsMkVBQTJFO0lBQzNFLE1BQU0sQ0FBOEQ7SUFDcEUsK0xBQStMO0lBQy9MLGVBQWUsQ0FBeUI7SUFDeEMsd0dBQXdHO0lBQ3hHLGdCQUFnQixDQUFvQjtJQUNwQywrQ0FBK0M7SUFDL0MsS0FBSyxDQUFtQjtJQUN4Qix3REFBd0Q7SUFDeEQsUUFBUSxDQUFVO0lBQ2xCLHFDQUFxQztJQUNyQyxTQUFTLENBQWtDO0lBQzNDLDRHQUE0RztJQUM1RyxpQkFBaUIsQ0FBa0I7SUFDbkMscUNBQXFDO0lBQ3JDLHlDQUF5QztJQUN6QyxZQUFZLENBQXNCO0lBQ2xDLHVEQUF1RDtJQUN2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