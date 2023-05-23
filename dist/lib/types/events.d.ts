/** @module Events */
import type { RawRequest } from "./request-handler.js";
import type { AnyDispatchPacket } from "./gateway-raw.js";
import type { Uncached } from "./shared.js";
import type { JSONGuild, JSONUser } from "./json.js";

export interface ClientEvents {
    connect: [id: number];
    /** @event Emitted with various information for debugging. */
    debug: [info: string, shard?: number];
    /** @event Emitted when all shards disconnect. */
    disconnect: [];
    /** @event Emitted when an error happens. If an error is emitted and no handlers are present, the error will be thrown. */
    error: [info: Error | string, shard?: number];
    /** @event Emitted when a guild becomes available. Requires the `GUILDS` intent. */
    guildAvailable: [guild: Guild];
    /** @event Emitted when the client joins a new guild. Requires the `GUILDS` intent. */
    guildCreate: [guild: Guild];
    /** @event Emitted when the client leaves a guild. Requires the `GUILDS` intent. */
    guildDelete: [guild: Guild | Uncached];
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
