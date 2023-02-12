/** @module ThreadChannel */
import GuildChannel from "./GuildChannel";
import Message from "./Message";
import type User from "./User";
import type Member from "./Member";
import type Permission from "./Permission";
import type { ThreadChannelTypes } from "../Constants";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type { AnyThreadChannel, RawMessage, RawThreadChannel, ThreadMember } from "../types/channels.js";
import type { JSONThreadChannel } from "../types/json.js";
/** Represents a guild thread channel. */
export default class ThreadChannel<T extends AnyThreadChannel = AnyThreadChannel> extends GuildChannel {
    /** The [flags](https://discord.com/developers/docs/resources/channel#channel-object-channel-flags) for this thread channel. */
    flags: number;
    /** The last message sent in this channel. This will only be present if a message has been sent within the current session. */
    lastMessage?: Message<T> | null;
    /** The ID of last message sent in this channel. */
    lastMessageID: string | null;
    /** The approximate number of members in this thread. Stops counting after 50. */
    memberCount: number;
    /** The members of this thread. */
    members: Array<ThreadMember>;
    /** The number of messages (not including the initial message or deleted messages) in the thread. Stops counting after 50. */
    messageCount: number;
    /** The cached messages in this channel. */
    messages: TypedCollection<string, RawMessage, Message<T>>;
    /** The owner of this thread. */
    owner?: User;
    /** The ID of the owner of this thread. */
    ownerID: string;
    parentID: string;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser: number;
    /** The total number of messages ever sent in the thread. Includes deleted messages. */
    totalMessageSent: number;
    type: ThreadChannelTypes;
    constructor(data: RawThreadChannel, client: Client);
    protected update(data: Partial<RawThreadChannel>): void;
    /**
     * Get the permissions of a member. If providing an id, the member must be cached. The parent channel must be cached as threads themselves do not have permissions.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission;
    toJSON(): JSONThreadChannel;
}
