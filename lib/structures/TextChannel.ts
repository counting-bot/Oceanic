/** @module TextChannel */
import TextableChannel from "./TextableChannel.js";
import type PublicThreadChannel from "./PublicThreadChannel.js";
import type PrivateThreadChannel from "./PrivateThreadChannel.js";
import ThreadChannel from "./ThreadChannel.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type {
    ArchivedThreads,
    EditTextChannelOptions,
    GetArchivedThreadsOptions,
    RawPrivateThreadChannel,
    RawPublicThreadChannel,
    RawTextChannel
} from "../types/channels.js";
import type { JSONTextChannel } from "../types/json.js";
import TypedCollection from "../util/TypedCollection.js";

/** Represents a guild text channel. */
export default class TextChannel extends TextableChannel<TextChannel> {
    /** The threads in this channel. */
    threads: TypedCollection<string, RawPublicThreadChannel | RawPrivateThreadChannel, PublicThreadChannel | PrivateThreadChannel>;
    declare type: ChannelTypes.GUILD_TEXT;
    constructor(data: RawTextChannel, client: Client) {
        super(data, client);
        this.threads = new TypedCollection(ThreadChannel, client) as TypedCollection<string, RawPublicThreadChannel | RawPrivateThreadChannel, PublicThreadChannel | PrivateThreadChannel>;
    }


    /**
     * Edit this channel.
     * @param options The options for editing the channel
     */
    override async edit(options: EditTextChannelOptions): Promise<this> {
        return this.client.rest.channels.edit<this>(this.id, options);
    }

    /**
     * Get the private archived threads the current user has joined in this channel.
     * @param options The options for getting the joined private archived threads.
     */
    async getJoinedPrivateArchivedThreads(options?: GetArchivedThreadsOptions): Promise<ArchivedThreads<PrivateThreadChannel>> {
        return this.client.rest.channels.getJoinedPrivateArchivedThreads(this.id, options);
    }

    /**
     * Get the private archived threads in this channel.
     * @param options The options for getting the private archived threads.
     */
    async getPrivateArchivedThreads(options?: GetArchivedThreadsOptions): Promise<ArchivedThreads<PrivateThreadChannel>> {
        return this.client.rest.channels.getPrivateArchivedThreads(this.id, options);
    }

    override toJSON(): JSONTextChannel {
        return {
            ...super.toJSON(),
            threads: this.threads.map(thread => thread.id),
            type:    this.type
        };
    }
}
