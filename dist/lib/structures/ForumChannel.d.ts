/** @module ForumChannel */
import GuildChannel from "./GuildChannel.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import PublicThreadChannel from "./PublicThreadChannel.js";
import type Invite from "./Invite.js";
import type Member from "./Member.js";
import Permission from "./Permission.js";
import type CategoryChannel from "./CategoryChannel.js";
import type Webhook from "./Webhook.js";
import type Client from "../Client.js";
import type { ArchivedThreads, CreateInviteOptions, EditForumChannelOptions, EditPermissionOptions, ForumEmoji, ForumTag, GetArchivedThreadsOptions, RawForumChannel, RawOverwrite, RawPublicThreadChannel, StartThreadInForumOptions } from "../types/channels.js";
import type { JSONForumChannel } from "../types/json.js";
import TypedCollection from "../util/TypedCollection.js";
import type { ChannelTypes, ThreadAutoArchiveDuration } from "../Constants.js";
import { SortOrderTypes } from "../Constants.js";
/** Represents a forum channel. */
export default class ForumChannel extends GuildChannel {
    /** The usable tags for threads. */
    availableTags: Array<ForumTag>;
    /** The default auto archive duration for threads. */
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration;
    /** The default reaction emoji for threads. */
    defaultReactionEmoji: ForumEmoji | null;
    /** The default sort order mode used to sort threads. */
    defaultSortOrder: SortOrderTypes | null;
    /** The default amount of seconds between non-moderators sending messages in threads. */
    defaultThreadRateLimitPerUser: number;
    /** The flags for this channel, see {@link Constants.ChannelFlags}. */
    flags: number;
    /** The most recently created thread. */
    lastThread?: PublicThreadChannel | null;
    /** The ID of most recently created thread. */
    lastThreadID: string | null;
    /** If this channel is age gated. */
    nsfw: boolean;
    /** The permission overwrites of this channel. */
    permissionOverwrites: TypedCollection<string, RawOverwrite, PermissionOverwrite>;
    /** The position of this channel on the sidebar. */
    position: number;
    /** The amount of seconds between non-moderators creating threads. */
    rateLimitPerUser: number;
    /** Undocumented property. */
    template: string;
    /** The threads in this channel. */
    threads: TypedCollection<string, RawPublicThreadChannel, PublicThreadChannel>;
    /** The `guidelines` of this forum channel. */
    topic: string | null;
    type: ChannelTypes.GUILD_FORUM;
    constructor(data: RawForumChannel, client: Client);
    protected update(data: Partial<RawForumChannel>): void;
    get parent(): CategoryChannel | null | undefined;
    /**
     * Create an invite for this channel.
     * @param options The options for the invite.
     */
    createInvite(options: CreateInviteOptions): Promise<Invite<"withMetadata", this>>;
    /**
     * Delete a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    deletePermission(overwriteID: string, reason?: string): Promise<void>;
    /**
     * Edit this channel.
     * @param options The options for editing the channel
     */
    edit(options: EditForumChannelOptions): Promise<this>;
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
     * Get the public archived threads in this channel.
     * @param options The options for getting the public archived threads.
     */
    getPublicArchivedThreads(options?: GetArchivedThreadsOptions): Promise<ArchivedThreads<PublicThreadChannel>>;
    /**
     * Get the webhooks in this channel.
     */
    getWebhooks(): Promise<Array<Webhook>>;
    /**
     * Get the permissions of a member.  If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission;
    /**
     * Create a thread in a forum channel.
     * @param options The options for starting the thread.
     */
    startThread(options: StartThreadInForumOptions): Promise<PublicThreadChannel>;
    toJSON(): JSONForumChannel;
}
