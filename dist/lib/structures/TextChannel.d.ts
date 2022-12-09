/** @module TextChannel */
import TextableChannel from "./TextableChannel.js";
import type PublicThreadChannel from "./PublicThreadChannel.js";
import type PrivateThreadChannel from "./PrivateThreadChannel.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { ArchivedThreads, EditTextChannelOptions, GetArchivedThreadsOptions, RawPrivateThreadChannel, RawPublicThreadChannel, RawTextChannel } from "../types/channels.js";
import type { JSONTextChannel } from "../types/json.js";
import TypedCollection from "../util/TypedCollection.js";
/** Represents a guild text channel. */
export default class TextChannel extends TextableChannel<TextChannel> {
    /** The threads in this channel. */
    threads: TypedCollection<string, RawPublicThreadChannel | RawPrivateThreadChannel, PublicThreadChannel | PrivateThreadChannel>;
    type: ChannelTypes.GUILD_TEXT;
    constructor(data: RawTextChannel, client: Client);
    /**
     * Edit this channel.
     * @param options The options for editing the channel
     */
    edit(options: EditTextChannelOptions): Promise<this>;
    /**
     * Get the private archived threads the current user has joined in this channel.
     * @param options The options for getting the joined private archived threads.
     */
    getJoinedPrivateArchivedThreads(options?: GetArchivedThreadsOptions): Promise<ArchivedThreads<PrivateThreadChannel>>;
    /**
     * Get the private archived threads in this channel.
     * @param options The options for getting the private archived threads.
     */
    getPrivateArchivedThreads(options?: GetArchivedThreadsOptions): Promise<ArchivedThreads<PrivateThreadChannel>>;
    toJSON(): JSONTextChannel;
}
