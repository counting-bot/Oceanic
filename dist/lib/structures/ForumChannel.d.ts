/** @module ForumChannel */
import GuildChannel from "./GuildChannel.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import PublicThreadChannel from "./PublicThreadChannel.js";
import type Member from "./Member.js";
import Permission from "./Permission.js";
import type CategoryChannel from "./CategoryChannel.js";
import type Client from "../Client.js";
import type { ForumEmoji, ForumTag, RawForumChannel, RawOverwrite, RawPublicThreadChannel } from "../types/channels";
import type { JSONForumChannel } from "../types/json";
import TypedCollection from "../util/TypedCollection";
import { type SortOrderTypes, type ForumLayoutTypes, type ChannelTypes, type ThreadAutoArchiveDuration } from "../Constants";
/** Represents a forum channel. */
export default class ForumChannel extends GuildChannel {
    /** The usable tags for threads. */
    availableTags: Array<ForumTag>;
    /** The default auto archive duration for threads. */
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration;
    /** The default forum layout used to display threads. */
    defaultForumLayout: ForumLayoutTypes;
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
     * Get the permissions of a member.  If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission;
    toJSON(): JSONForumChannel;
}
