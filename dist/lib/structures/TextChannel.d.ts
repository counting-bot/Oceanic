/** @module TextChannel */
import TextableChannel from "./TextableChannel.js";
import type PublicThreadChannel from "./PublicThreadChannel.js";
import type PrivateThreadChannel from "./PrivateThreadChannel.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { RawPrivateThreadChannel, RawPublicThreadChannel, RawTextChannel } from "../types/channels.js";
import type { JSONTextChannel } from "../types/json.js";
import TypedCollection from "../util/TypedCollection.js";
/** Represents a guild text channel. */
export default class TextChannel extends TextableChannel<TextChannel> {
    /** The threads in this channel. */
    threads: TypedCollection<string, RawPublicThreadChannel | RawPrivateThreadChannel, PublicThreadChannel | PrivateThreadChannel>;
    type: ChannelTypes.GUILD_TEXT;
    constructor(data: RawTextChannel, client: Client);
    toJSON(): JSONTextChannel;
}
