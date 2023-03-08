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
    declare type: ChannelTypes.GUILD_FORUM;
    constructor(data: RawForumChannel, client: Client) {
        super(data, client);
        this.threads = new TypedCollection<string, RawPublicThreadChannel, PublicThreadChannel>(PublicThreadChannel, client);
        this.update(data);
    }

    protected override update(data: Partial<RawForumChannel>): void {
        super.update(data);
    }

    override toJSON(): JSONForumChannel {
        return {
            ...super.toJSON(),
            threads: this.threads.map(thread => thread.id)
        };
    }
}
