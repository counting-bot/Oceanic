/** @module ForumChannel */
import GuildChannel from "./GuildChannel.js";
import PublicThreadChannel from "./PublicThreadChannel.js";
import type Client from "../Client.js";
import type { RawForumChannel, RawPublicThreadChannel } from "../types/channels";
import type { JSONForumChannel } from "../types/json";
import TypedCollection from "../util/TypedCollection";
import type { ChannelTypes } from "../Constants";
/** Represents a forum channel. */
export default class ForumChannel extends GuildChannel {
    /** The most recently created thread. */
    lastThread?: PublicThreadChannel | null;
    /** The threads in this channel. */
    threads: TypedCollection<string, RawPublicThreadChannel, PublicThreadChannel>;
    type: ChannelTypes.GUILD_FORUM;
    constructor(data: RawForumChannel, client: Client);
    protected update(data: Partial<RawForumChannel>): void;
    toJSON(): JSONForumChannel;
}
