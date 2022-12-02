"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Message */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const Attachment_js_1 = tslib_1.__importDefault(require("./Attachment.js"));
const User_js_1 = tslib_1.__importDefault(require("./User.js"));
const PartialApplication_js_1 = tslib_1.__importDefault(require("./PartialApplication.js"));
const GuildChannel_js_1 = tslib_1.__importDefault(require("./GuildChannel.js"));
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
     * * If the message was from an interaction or application owned webhook (`ClientApplication`).
     * * If the message has a rich presence embed (`PartialApplication`)
     */
    application;
    /**
     * The ID of the application associated with this message. This can be present in two scenarios:
     * * If the message was from an interaction or application owned webhook (`ClientApplication`).
     * * If the message has a rich presence embed (`PartialApplication`)
     */
    applicationID;
    /** The attachments on this message. */
    attachments;
    /** The author of this message. */
    author;
    /** The ID of the channel this message was created in. */
    channelID;
    /** The components on this message. */
    components;
    /** The content of this message. */
    content;
    /** The timestamp at which this message was last edited. */
    editedTimestamp;
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
    /** The mentions in this message. */
    mentions;
    /** If this message is a `REPLY` or `THREAD_STARTER_MESSAGE`, some info about the referenced message. */
    messageReference;
    /** A nonce for ensuring a message was sent. */
    nonce;
    /** If this message is pinned. */
    pinned;
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
    /** If this message was read aloud. */
    tts;
    /** The [type](https://discord.com/developers/docs/resources/channel#message-object-message-types) of this message. */
    type;
    /** The webhook associated with this message, if sent via a webhook. This only has an `id` property. */
    webhookID;
    constructor(data, client) {
        super(data.id, client);
        this.attachments = new TypedCollection_js_1.default(Attachment_js_1.default, client);
        this.channelID = data.channel_id;
        this.components = [];
        this.content = data.content;
        this.editedTimestamp = null;
        this.embeds = [];
        this.flags = 0;
        this.guildID = (data.guild_id === undefined ? null : data.guild_id);
        this.member = (data.member !== undefined ? this.client.util.updateMember(data.guild_id, data.author.id, { ...data.member, user: data.author }) : undefined);
        this.mentions = {
            channels: [],
            everyone: false,
            members: [],
            roles: [],
            users: []
        };
        this.pinned = !!data.pinned;
        this.reactions = {};
        this.timestamp = new Date(data.timestamp);
        this.tts = data.tts;
        this.type = data.type;
        this.webhookID = data.webhook_id;
        this.update(data);
        this.author = data.author.discriminator !== "0000" ? client.users.update(data.author) : new User_js_1.default(data.author, client);
        if (data.application !== undefined) {
            this.application = new PartialApplication_js_1.default(data.application, client);
            this.applicationID = data.application.id;
        }
        else if (data.application_id !== undefined) {
            this.application = client["_application"] && client.application.id === data.application_id ? client.application : undefined;
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
        if (data.mention_everyone !== undefined) {
            this.mentions.everyone = data.mention_everyone;
        }
        if (data.mention_roles !== undefined) {
            this.mentions.roles = data.mention_roles;
        }
        if (data.mentions !== undefined) {
            const members = [];
            this.mentions.users = data.mentions.map(user => {
                if (this.channel && "guildID" in this.channel && user.member) {
                    members.push(this.client.util.updateMember(this.channel.guildID, user.id, { ...user.member, user }));
                }
                return this.client.users.update(user);
            });
            this.mentions.members = members;
        }
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
        if (data.components !== undefined) {
            this.components = this.client.util.componentsToParsed(data.components);
        }
        if (data.content !== undefined) {
            this.content = data.content;
            this.mentions.channels = (data.content.match(/<#\d{17,21}>/g) ?? []).map(mention => mention.slice(2, -1));
        }
        if (data.edited_timestamp !== undefined) {
            this.editedTimestamp = data.edited_timestamp ? new Date(data.edited_timestamp) : null;
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
        if (data.pinned !== undefined) {
            this.pinned = data.pinned;
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.reactions) {
            for (const reaction of data.reactions) {
                const name = reaction.emoji.id ? `${reaction.emoji.name}:${reaction.emoji.id}` : reaction.emoji.name;
                this.reactions[name] = {
                    count: reaction.count,
                    me: reaction.me
                };
            }
        }
        if (data.referenced_message !== undefined) {
            if (data.referenced_message === null) {
                this.referencedMessage = null;
            }
            else {
                this.referencedMessage = this.channel ? this.channel.messages?.update(data.referenced_message) : new Message(data.referenced_message, this.client);
            }
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
     * Crosspost this message in an announcement channel.
     */
    async crosspost() {
        return this.client.rest.channels.crosspostMessage(this.channelID, this.id);
    }
    /**
     * Delete this message.
     * @param reason The reason for deleting the message.
     */
    async delete(reason) {
        return this.client.rest.channels.deleteMessage(this.channelID, this.id, reason);
    }
    /**
     * Remove a reaction from this message.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     */
    async deleteReaction(emoji, user = "@me") {
        return this.client.rest.channels.deleteReaction(this.channelID, this.id, emoji, user);
    }
    /**
     * Remove all, or a specific emoji's reactions from this message.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     */
    async deleteReactions(emoji) {
        return this.client.rest.channels.deleteReactions(this.channelID, this.id, emoji);
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
     * Edit this message.
     * @param options The options for editing the message.
     */
    async edit(options) {
        return this.client.rest.channels.editMessage(this.channelID, this.id, options);
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
     * Get the users who reacted with a specific emoji on this message.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param options The options for getting the reactions.
     */
    async getReactions(emoji, options) {
        return this.client.rest.channels.getReactions(this.channelID, this.id, emoji, options);
    }
    /** Whether this message belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the message properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_js_1.default;
    }
    /** Whether this message belongs to a direct message channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the message properties typing definitions based on the channel it belongs to. */
    inDirectMessageChannel() {
        return this.guildID === null;
    }
    /**
     * Pin this message.
     * @param reason The reason for pinning the message.
     */
    async pin(reason) {
        return this.client.rest.channels.pinMessage(this.channelID, this.id, reason);
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
            components: this.components,
            content: this.content,
            editedTimestamp: this.editedTimestamp?.getTime() ?? null,
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
            mentions: {
                channels: this.mentions.channels,
                everyone: this.mentions.everyone,
                members: this.mentions.members.map(member => member.toJSON()),
                roles: this.mentions.roles,
                users: this.mentions.users.map(user => user.toJSON())
            },
            messageReference: this.messageReference,
            nonce: this.nonce,
            pinned: this.pinned,
            position: this.position,
            reactions: this.reactions,
            referencedMessage: this.referencedMessage?.toJSON(),
            stickerItems: this.stickerItems,
            thread: this.thread?.toJSON(),
            timestamp: this.timestamp.getTime(),
            tts: this.tts,
            type: this.type,
            webhook: this.webhookID
        };
    }
    /**
     * Unpin this message.
     * @param reason The reason for unpinning the message.
     */
    async unpin(reason) {
        return this.client.rest.channels.unpinMessage(this.channelID, this.id, reason);
    }
}
exports.default = Message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLGdFQUE2QjtBQUM3Qiw0RUFBeUM7QUFDekMsZ0VBQTZCO0FBRzdCLDRGQUF5RDtBQU16RCxnRkFBNkM7QUFHN0MsNEZBQXlEO0FBQ3pELGtEQUF5RDtBQXVCekQsa0VBQTRDO0FBRTVDLDRCQUE0QjtBQUM1QixNQUFxQixPQUFpRyxTQUFRLGlCQUFJO0lBQ3RILGNBQWMsQ0FBd0Q7SUFDdEUsWUFBWSxDQUF3RDtJQUM1RSxvSkFBb0o7SUFDcEosUUFBUSxDQUFtQjtJQUMzQjs7OztPQUlHO0lBQ0gsV0FBVyxDQUFpRDtJQUM1RDs7OztPQUlHO0lBQ0gsYUFBYSxDQUFnQjtJQUM3Qix1Q0FBdUM7SUFDdkMsV0FBVyxDQUFxRDtJQUNoRSxrQ0FBa0M7SUFDbEMsTUFBTSxDQUFPO0lBQ2IseURBQXlEO0lBQ3pELFNBQVMsQ0FBUztJQUNsQixzQ0FBc0M7SUFDdEMsVUFBVSxDQUEwQjtJQUNwQyxtQ0FBbUM7SUFDbkMsT0FBTyxDQUFTO0lBQ2hCLDJEQUEyRDtJQUMzRCxlQUFlLENBQWM7SUFDN0Isa0NBQWtDO0lBQ2xDLE1BQU0sQ0FBZTtJQUNyQix1SEFBdUg7SUFDdkgsS0FBSyxDQUFTO0lBQ2QsOENBQThDO0lBQzlDLE9BQU8sQ0FBeUQ7SUFDaEUsOEVBQThFO0lBQzlFLFdBQVcsQ0FBc0I7SUFDakMsMkVBQTJFO0lBQzNFLE1BQU0sQ0FBOEQ7SUFDcEUsK0xBQStMO0lBQy9MLGVBQWUsQ0FBeUI7SUFDeEMsb0NBQW9DO0lBQ3BDLFFBQVEsQ0FXTjtJQUNGLHdHQUF3RztJQUN4RyxnQkFBZ0IsQ0FBb0I7SUFDcEMsK0NBQStDO0lBQy9DLEtBQUssQ0FBbUI7SUFDeEIsaUNBQWlDO0lBQ2pDLE1BQU0sQ0FBVTtJQUNoQix3REFBd0Q7SUFDeEQsUUFB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