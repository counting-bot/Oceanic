/** @module ThreadChannel */
import GuildChannel from "./GuildChannel";
import Message from "./Message";
import type User from "./User";
import type Member from "./Member";
import type Permission from "./Permission";
import type { ThreadChannelTypes } from "../Constants";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type {
    AnyThreadChannel,
    RawMessage,
    RawThreadChannel,
    ThreadMember
} from "../types/channels.js";
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
    declare parentID: string;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser: number;
    /** The total number of messages ever sent in the thread. Includes deleted messages. */
    totalMessageSent: number;
    declare type: ThreadChannelTypes;
    constructor(data: RawThreadChannel, client: Client) {
        super(data, client);
        this.flags = data.flags;
        this.lastMessageID = data.last_message_id;
        this.memberCount = 0;
        this.members = [];
        this.messageCount = 0;
        this.messages = new TypedCollection(Message<T>, client, client.options.collectionLimits.messages);
        this.ownerID = data.owner_id;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.totalMessageSent = 0;
        this.update(data);
    }

    protected override update(data: Partial<RawThreadChannel>): void {
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.last_message_id !== undefined) {
            this.lastMessage = data.last_message_id === null ? null : this.messages.get(data.last_message_id);
            this.lastMessageID = data.last_message_id;
        }
        // @TODO look over this to see if we can make it "safer" (accessing Client#user)
        if (data.member) {
            const index = this.members.findIndex(m => m.userID === this.client.user.id);
            if (index === -1) {
                this.members.push({ flags: data.member.flags, id: this.id, joinTimestamp: new Date(data.member.join_timestamp), userID: this.client.user.id });
            } else {
                this.members[index] = {
                    ...this.members[index],
                    flags:         data.member.flags,
                    joinTimestamp: new Date(data.member.join_timestamp)
                };
            }

        }
        if (data.member_count !== undefined) {
            this.memberCount = data.member_count;
        }
        if (data.message_count !== undefined) {
            this.messageCount = data.message_count;
        }
        if (data.owner_id !== undefined) {
            this.owner = this.client.users.get(data.owner_id);
            this.ownerID = data.owner_id;
        }
        if (data.rate_limit_per_user !== undefined) {
            this.rateLimitPerUser = data.rate_limit_per_user;
        }
        if (data.total_message_sent !== undefined) {
            this.totalMessageSent = data.total_message_sent;
        }
    }

    /**
     * Get the permissions of a member. If providing an id, the member must be cached. The parent channel must be cached as threads themselves do not have permissions.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission {
        if (!this.parent) {
            throw new Error(`Cannot use ${this.constructor.name}#permissionsOf without having the parent channel cached.`);
        }
        return this.parent.permissionsOf(member);
    }

    override toJSON(): JSONThreadChannel {
        return {
            ...super.toJSON(),
            flags:            this.flags,
            lastMessageID:    this.lastMessageID,
            memberCount:      this.memberCount,
            messageCount:     this.messageCount,
            messages:         this.messages.map(m => m.id),
            ownerID:          this.ownerID,
            rateLimitPerUser: this.rateLimitPerUser,
            totalMessageSent: this.totalMessageSent,
            type:             this.type
        };
    }
}
