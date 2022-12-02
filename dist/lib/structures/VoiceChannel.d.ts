/** @module VoiceChannel */
import GuildChannel from "./GuildChannel.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import Message from "./Message.js";
import type Member from "./Member.js";
import type CategoryChannel from "./CategoryChannel.js";
import Permission from "./Permission.js";
import type Invite from "./Invite.js";
import type User from "./User.js";
import type Webhook from "./Webhook.js";
import type { ChannelTypes, VideoQualityModes } from "../Constants.js";
import type Client from "../Client.js";
import TypedCollection from "../util/TypedCollection.js";
import type { CreateInviteOptions, CreateMessageOptions, EditMessageOptions, EditPermissionOptions, EditVoiceChannelOptions, GetChannelMessagesOptions, GetReactionsOptions, RawMessage, RawOverwrite, RawVoiceChannel, PurgeOptions } from "../types/channels.js";
import type { JSONVoiceChannel } from "../types/json.js";
/** Represents a guild voice channel. */
export default class VoiceChannel extends GuildChannel {
    /** The bitrate of the voice channel. */
    bitrate: number;
    /** The last message sent in this channel. This will only be present if a message has been sent within the current session. */
    lastMessage?: Message<this> | null;
    /** The ID of last message sent in this channel. */
    lastMessageID: string | null;
    /** The cached messages in this channel. */
    messages: TypedCollection<string, RawMessage, Message<this>>;
    /** If this channel is age gated. */
    nsfw: boolean;
    /** The permission overwrites of this channel. */
    permissionOverwrites: TypedCollection<string, RawOverwrite, PermissionOverwrite>;
    /** The position of this channel on the sidebar. */
    position: number;
    /** The id of the voice region of the channel, `null` is automatic. */
    rtcRegion: string | null;
    /** The topic of the channel. */
    topic: string | null;
    type: ChannelTypes.GUILD_VOICE;
    /** The maximum number of members in this voice channel. `0` is unlimited. */
    userLimit: number;
    /** The [video quality mode](https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of this channel. */
    videoQualityMode: VideoQualityModes;
    constructor(data: RawVoiceChannel, client: Client);
    protected update(data: Partial<RawVoiceChannel>): void;
    get parent(): CategoryChannel | null | undefined;
    /**
     * Create an invite for this channel.
     * @param options The options for creating the invite.
     */
    createInvite(options: CreateInviteOptions): Promise<Invite<"withMetadata", this>>;
    /**
     * Create a message in this channel.
     * @param options The options for creating the message.
     */
    createMessage(options: CreateMessageOptions): Promise<Message<this>>;
    /**
     * Add a reaction to a message in this channel.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     */
    createReaction(messageID: string, emoji: string): Promise<void>;
    /**
     * Delete a message in this channel.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     */
    deleteMessage(messageID: string, reason?: string): Promise<void>;
    /**
     * Bulk delete messages in this channel.
     * @param messageIDs The IDs of the messages to delete. Any duplicates or messages older than two weeks will cause an error.
     * @param reason The reason for deleting the messages.
     */
    deleteMessages(messageIDs: Array<string>, reason?: string): Promise<number>;
    /**
     * Delete a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    deletePermission(overwriteID: string, reason?: string): Promise<void>;
    /**
     * Remove a reaction from a message in this channel.
     * @param messageID The ID of the message to remove a reaction from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     */
    deleteReaction(messageID: string, emoji: string, user?: string): Promise<void>;
    /**
     * Remove all, or a specific emoji's reactions from a message in this channel.
     * @param messageID The ID of the message to remove reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     */
    deleteReactions(messageID: string, emoji?: string): Promise<void>;
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    edit(options: EditVoiceChannelOptions): Promise<this>;
    /**
     * Edit a message in this channel.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    editMessage(messageID: string, options: EditMessageOptions): Promise<Message<this>>;
    /**
     * Edit a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    editPermission(overwriteID: string, options: EditPermissionOptions): Promise<void>;
    /**
     * Get the invites of this channel.
     */
    getInvites(): Promise<Array<Invite<"withMetadata", this>>>;
    /**
     * Get a message in this channel.
     * @param messageID The ID of the message to get.
     */
    getMessage(messageID: string): Promise<Message<this>>;
    /**
     * Get messages in this channel.
     * @param options The options for getting the messages. `before`, `after`, and `around `All are mutually exclusive.
     */
    getMessages(options?: GetChannelMessagesOptions): Promise<Array<Message<this>>>;
    /**
     * Get the pinned messages in this channel.
     */
    getPinnedMessages(): Promise<Array<Message<this>>>;
    /**
     * Get the users who reacted with a specific emoji on a message in this channel.
     * @param messageID The ID of the message to get reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param options The options for getting the reactions.
     */
    getReactions(messageID: string, emoji: string, options?: GetReactionsOptions): Promise<Array<User>>;
    /**
     * Get the webhooks in this channel.
     */
    getWebhooks(): Promise<Array<Webhook>>;
    /**
     * Get the permissions of a member.
     * @param member The member to get the permissions of.  If providing an ID, the member must be cached.
     */
    permissionsOf(member: string | Member): Permission;
    /**
     * Pin a message in this channel.
     * @param messageID The ID of the message to pin.
     * @param reason The reason for pinning the message.
     */
    pinMessage(messageID: string, reason?: string): Promise<void>;
    /**
     * Purge an amount of messages from this channel.
     * @param options The options to purge. `before`, `after`, and `around `All are mutually exclusive.
     */
    purge(options: PurgeOptions<this>): Promise<number>;
    /**
     * Show a typing indicator in this channel. How long users see this varies from client to client.
     */
    sendTyping(): Promise<void>;
    toJSON(): JSONVoiceChannel;
    /**
     * Unpin a message in this channel.
     * @param messageID The ID of the message to unpin.
     * @param reason The reason for unpinning the message.
     */
    unpinMessage(messageID: string, reason?: string): Promise<void>;
}
