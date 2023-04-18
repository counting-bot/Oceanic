/** @module Events */
import type { AnyGuildChannelWithoutThreads } from "./channels.js";
import type { RawRequest } from "./request-handler.js";
import type { AnyDispatchPacket } from "./gateway-raw.js";
import type { DeletedPrivateChannel } from "./gateway.js";
import type { Uncached } from "./shared.js";
import type {
    JSONCategoryChannel,
    JSONForumChannel,
    JSONGuild,
    JSONMember,
    JSONTextChannel,
    JSONUser
} from "./json.js";
import type Guild from "../structures/Guild.js";
import type UnavailableGuild from "../structures/UnavailableGuild.js";
import type TextChannel from "../structures/TextChannel.js";
import type CategoryChannel from "../structures/CategoryChannel.js";
import type User from "../structures/User.js";
import type Member from "../structures/Member.js";
import type PrivateChannel from "../structures/PrivateChannel.js";
import type ForumChannel from "../structures/ForumChannel.js";


export interface ClientEvents {
    /** @event Emitted when a channel is created. Requires the `GUILDS` intent. */
    channelCreate: [channel: AnyGuildChannelWithoutThreads];
    /** @event Emitted when channel is deleted. Requires the `GUILDS` intent. */
    channelDelete: [channel: AnyGuildChannelWithoutThreads | PrivateChannel | DeletedPrivateChannel];
    /** @event Emitted when a channel is updated. Requires the `GUILDS` intent. */
    channelUpdate: [channel: TextChannel, oldChannel: JSONTextChannel | null] | [channel: CategoryChannel, oldChannel: JSONCategoryChannel | null] | [channel: ForumChannel, oldChannel: JSONForumChannel | null];
    /** @event Emitted when a shard connects. */
    connect: [id: number];
    /** @event Emitted with various information for debugging. */
    debug: [info: string, shard?: number];
    /** @event Emitted when all shards disconnect. */
    disconnect: [];
    /** @event Emitted when an error happens. If an error is emitted and no handlers are present, the error will be thrown. */
    error: [info: Error | string, shard?: number];
    /** @event Emitted when a guild becomes available. Requires the `GUILDS` intent. */
    guildAvailable: [guild: Guild];
    /** @event Emitted when a guild ban is created. Requires the `GUILD_BANS` intent. */
    guildBanAdd: [guild: Guild | Uncached, user: User];
    /** @event Emitted when a guild ban is revoked. Requires the `GUILD_BANS` intent. */
    guildBanRemove: [guild: Guild | Uncached, user: User];
    /** @event Emitted when the client joins a new guild. Requires the `GUILDS` intent. */
    guildCreate: [guild: Guild];
    /** @event Emitted when the client leaves a guild. Requires the `GUILDS` intent. */
    guildDelete: [guild: Guild | Uncached];
    /** @event Emitted when a member joins a guild. Requires the `GUILD_MEMBERS` intent. */
    guildMemberAdd: [member: Member];
    /** @event Emitted when a chunk of guild members is received from Discord. */
    guildMemberChunk: [members: Array<Member>];
    /** @event Emitted when a member leaves a guild. Requires the `GUILD_MEMBERS` intent. If the member is uncached, the first parameter will be a user. If the guild is uncached, the first parameter will be a user, and the second will be an object with only an `id`. */
    guildMemberRemove: [member: Member | User, guild: Guild | Uncached];
    /** @event Emitted when a guild member is updates. Requires the `GUILD_MEMBERS` intent.*/
    guildMemberUpdate: [member: Member, oldMember: JSONMember | null];
    /** @event Emitted when a guild becomes unavailable. Requires the `GUILDS` intent. */
    guildUnavailable: [guild: UnavailableGuild];
    /** @event Emitted when a guild is updated. Requires the `GUILDS` intent. */
    guildUpdate: [guild: Guild, oldGuild: JSONGuild | null];
    /** @event Emitted when a shard receives the HELLO packet. */
    hello: [interval: number, shard: number];
    /** @event Emitted when a raw dispatch packet is received. */
    packet: [data: AnyDispatchPacket, shard: number];
    /** @event Emitted when all shards are ready. */
    ready: [];
    /** @event Emitted when a request is made. */
    request: [rawRequest: RawRequest];
    /** @event Emitted when this shard disconnects.*/
    shardDisconnect: [err: Error | undefined, id: number];
    /** @event Emitted when this shard has processed the READY packet from Discord. */
    shardPreReady: [id: number];
    /** @event Emitted when a shard is fully ready. */
    shardReady: [id: number];
    /** @event Emitted when a shard resumes a connection. */
    shardResume: [id: number];
    /** @event Emitted when a guild is created, but is unavailable. Requires the `GUILDS` intent.*/
    unavailableGuildCreate: [guild: UnavailableGuild];
    /** @event Emitted when a user is updated. */
    userUpdate: [user: User, oldUser: JSONUser | null];
    /** @event Emitted with various warning information. */
    warn: [info: string, shard?: number];
    /** @event Emitted when a thread is updated. Requires the `GUILDS` intent. */
    threadUpdate: [thread: AnnouncementThreadChannel, oldThread: JSONAnnouncementThreadChannel | null] | [thread: PublicThreadChannel, oldThread: JSONPublicThreadChannel | null] | [thread: PrivateThreadChannel, oldThread: JSONPrivateThreadChannel | null];
    /** @event Emitted when a thread is created. Requires the `GUILDS` intent. */
    threadCreate: [thread: AnyThreadChannel];
    /** @event Emitted when a thread is deleted. Requires the `GUILDS` intent. */
    threadDelete: [thread: PossiblyUncachedThread];
    /** @event Emitted when the client's thread member is updated. Requires the `GUILDS` intent. */
    threadMemberUpdate: [thread: MinimalPossiblyUncachedThread, member: ThreadMember, oldMember: ThreadMember | null];
    /** @event Emitted when the members of a thread are updated. Requires the `GUILDS` intent. The received information will be different if `GUILD_MEMBERS` is also used. */
    threadMembersUpdate: [thread: MinimalPossiblyUncachedThread, addedMembers: Array<ThreadMember>, removedMembers: Array<ThreadMember | UncachedThreadMember>];
}

export interface ShardEvents {
    /** @event Emitted with various information for debugging. */
    debug: [info: string];
    /** @event Emitted when this shard disconnects.*/
    disconnect: [err?: Error];
    /** @event Emitted when an error happens. If an error is emitted and no handlers are present, the error will be thrown. */
    error: [info: Error | string];
    /** @event Emitted when this shard has processed the READY packet from Discord. */
    preReady: [];
    /** @event Emitted when this shard is fully ready. */
    ready: [];
    /** @event Emitted when this shard resumes a connection. */
    resume: [];
    /** @event Emitted with various warning information. */
    warn: [info: string];
}
