/** @module TextableChannel */
import GuildChannel from "./GuildChannel.js";
import type AnnouncementChannel from "./AnnouncementChannel";
import type TextChannel from "./TextChannel.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import Message from "./Message.js";
import type Invite from "./Invite.js";
import type PublicThreadChannel from "./PublicThreadChannel.js";
import type AnnouncementThreadChannel from "./AnnouncementThreadChannel.js";
import type CategoryChannel from "./CategoryChannel.js";
import type Member from "./Member.js";
import Permission from "./Permission.js";
import type Webhook from "./Webhook.js";
import type { ThreadAutoArchiveDuration } from "../Constants.js";
import { AllPermissions, Permissions } from "../Constants.js";
import type Client from "../Client.js";
import TypedCollection from "../util/TypedCollection.js";
import type {
    CreateInviteOptions,
    CreateMessageOptions,
    GetArchivedThreadsOptions,
    GetChannelMessagesOptions,
    RawMessage,
    RawAnnouncementChannel,
    RawOverwrite,
    RawTextChannel,
    StartThreadFromMessageOptions,
    StartThreadWithoutMessageOptions,
    ArchivedThreads
} from "../types/channels.js";
import type { JSONTextableChannel } from "../types/json.js";

/** Represents a guild textable channel. */
export default class TextableChannel<T extends TextChannel | AnnouncementChannel = TextChannel | AnnouncementChannel> extends GuildChannel {
    /** The default auto archive duration for threads created in this channel. */
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration;
    /** The last message sent in this channel. This will only be present if a message has been sent within the current session. */
    lastMessage?: Message<T> | null;
    /** The ID of last message sent in this channel. */
    lastMessageID: string | null;
    /** The cached messages in this channel. */
    messages: TypedCollection<string, RawMessage, Message<T>>;
    /** If this channel is age gated. */
    nsfw: boolean;
    /** The permission overwrites of this channel. */
    permissionOverwrites: TypedCollection<string, RawOverwrite, PermissionOverwrite>;
    /** The position of this channel on the sidebar. */
    position: number;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser: number;
    /** The topic of the channel. */
    topic: string | null;
    declare type: T["type"];
    constructor(data: RawTextChannel | RawAnnouncementChannel, client: Client) {
        super(data, client);
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        this.lastMessageID = data.last_message_id;
        this.messages = new TypedCollection(Message<T>, client, client.options.collectionLimits.messages);
        this.nsfw = data.nsfw;
        this.permissionOverwrites = new TypedCollection(PermissionOverwrite, client);
        this.position = data.position;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.topic = data.topic;
        this.update(data);
    }

    protected override update(data: Partial<RawTextChannel> | Partial<RawAnnouncementChannel>): void {
        super.update(data);
        if (data.last_message_id !== undefined) {
            this.lastMessage = data.last_message_id === null ? null : this.messages.get(data.last_message_id);
            this.lastMessageID = data.last_message_id;
        }
        if (data.rate_limit_per_user !== undefined) {
            this.rateLimitPerUser = data.rate_limit_per_user;
        }
        if (data.permission_overwrites !== undefined) {
            data.permission_overwrites.map(overwrite => this.permissionOverwrites.update(overwrite));
        }
    }

    override get parent(): CategoryChannel | undefined | null {
        return super.parent as CategoryChannel | undefined | null;
    }

    /**
     * Create an invite for this channel.
     * @param options The options for the invite.
     */
    async createInvite(options: CreateInviteOptions): Promise<Invite<"withMetadata", T>> {
        return this.client.rest.channels.createInvite<"withMetadata", T>(this.id, options);
    }

    /**
     * Create a message in this channel.
     * @param options The options for the message.
     */
    async createMessage(options: CreateMessageOptions): Promise<Message<T>> {
        return this.client.rest.channels.createMessage<T>(this.id, options);
    }

    /**
     * Add a reaction to a message in this channel.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    async createReaction(messageID: string, emoji: string): Promise<void> {
        return this.client.rest.channels.createReaction(this.id, messageID, emoji);
    }

    /**
     * Delete a message in this channel.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     */
    async deleteMessage(messageID: string, reason?: string): Promise<void> {
        return this.client.rest.channels.deleteMessage(this.id, messageID, reason);
    }

    /**
     * Get the invites of this channel.
     */
    async getInvites(): Promise<Array<Invite<"withMetadata", T>>> {
        return this.client.rest.channels.getInvites<T>(this.id);
    }

    /**
     * Get a message in this channel.
     * @param messageID The ID of the message to get.
     */
    async getMessage(messageID: string): Promise<Message<T>> {
        return this.client.rest.channels.getMessage<T>(this.id, messageID);
    }

    /**
     * Get messages in this channel.
     * @param options The options for getting the messages. `before`, `after`, and `around `All are mutually exclusive.
     */
    async getMessages(options?: GetChannelMessagesOptions): Promise<Array<Message<T>>> {
        return this.client.rest.channels.getMessages<T>(this.id, options);
    }

    /**
     * Get the public archived threads in this channel.
     * @param options The options for getting the public archived threads.
     */
    async getPublicArchivedThreads(options?: GetArchivedThreadsOptions): Promise<ArchivedThreads<T extends TextChannel ? PublicThreadChannel : AnnouncementThreadChannel>> {
        return this.client.rest.channels.getPublicArchivedThreads<T extends TextChannel ? PublicThreadChannel : AnnouncementThreadChannel>(this.id, options);
    }

    /**
     * Get the webhooks in this channel.
     */
    async getWebhooks(): Promise<Array<Webhook>> {
        return this.client.rest.webhooks.getForChannel(this.id);
    }

    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission {
        if (typeof member === "string") {
            member = this.guild.members.get(member)!;
        }
        if (!member) {
            throw new Error(`Cannot use ${this.constructor.name}#permissionsOf with an ID without having the member cached.`);
        }
        let permission = this.guild.permissionsOf(member).allow;
        if (permission & Permissions.ADMINISTRATOR) {
            return new Permission(AllPermissions);
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
        return new Permission(permission);
    }

    /**
     * Create a thread from an existing message in this channel.
     * @param messageID The ID of the message to create a thread from.
     * @param options The options for creating the thread.
     */
    async startThreadFromMessage(messageID: string, options: StartThreadFromMessageOptions): Promise<T extends TextChannel ? AnnouncementThreadChannel : PublicThreadChannel> {
        return this.client.rest.channels.startThreadFromMessage<T extends TextChannel ? AnnouncementThreadChannel : PublicThreadChannel>(this.id, messageID, options);
    }

    /**
     * Create a thread without an existing message in this channel.
     * @param options The options for creating the thread.
     */
    async startThreadWithoutMessage(options: StartThreadWithoutMessageOptions): Promise<T extends TextChannel ? AnnouncementThreadChannel : PublicThreadChannel> {
        return this.client.rest.channels.startThreadWithoutMessage<T extends TextChannel ? AnnouncementThreadChannel : PublicThreadChannel>(this.id, options);
    }

    override toJSON(): JSONTextableChannel {
        return {
            ...super.toJSON(),
            defaultAutoArchiveDuration: this.defaultAutoArchiveDuration,
            lastMessageID:              this.lastMessageID,
            messages:                   this.messages.map(message => message.id),
            nsfw:                       this.nsfw,
            permissionOverwrites:       this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            position:                   this.position,
            rateLimitPerUser:           this.rateLimitPerUser,
            topic:                      this.topic,
            type:                       this.type
        };
    }
}
