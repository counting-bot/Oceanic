/** @module PrivateThreadChannel */
import ThreadChannel from "./ThreadChannel.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { EditPrivateThreadChannelOptions, PrivateThreadMetadata, RawPrivateThreadChannel } from "../types/channels.js";
import type { JSONPrivateThreadChannel } from "../types/json.js";
/** Represents a private thread channel.. */
export default class PrivateThreadChannel extends ThreadChannel<PrivateThreadChannel> {
    threadMetadata: PrivateThreadMetadata;
    type: ChannelTypes.PRIVATE_THREAD;
    constructor(data: RawPrivateThreadChannel, client: Client);
    /**
     * Edit this channel.
     * @param options The options to edit the channel with.
     */
    edit(options: EditPrivateThreadChannelOptions): Promise<this>;
    toJSON(): JSONPrivateThreadChannel;
}
