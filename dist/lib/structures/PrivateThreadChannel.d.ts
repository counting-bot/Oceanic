/** @module PrivateThreadChannel */
import ThreadChannel from "./ThreadChannel.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { PrivateThreadMetadata, RawPrivateThreadChannel } from "../types/channels.js";
import type { JSONPrivateThreadChannel } from "../types/json.js";
/** Represents a private thread channel.. */
export default class PrivateThreadChannel extends ThreadChannel<PrivateThreadChannel> {
    threadMetadata: PrivateThreadMetadata;
    type: ChannelTypes.PRIVATE_THREAD;
    constructor(data: RawPrivateThreadChannel, client: Client);
    toJSON(): JSONPrivateThreadChannel;
}
