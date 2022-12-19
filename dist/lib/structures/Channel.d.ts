/** @module Channel */
import Base from "./Base.js";
import { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { AnyChannel, RawChannel } from "../types/channels.js";
import type { JSONChannel } from "../types/json.js";
/** Represents a channel. */
export default class Channel extends Base {
    /** The [type](https://discord.com/developers/docs/resources/channel#channel-object-channel-types) of this channel. */
    type: ChannelTypes;
    constructor(data: RawChannel, client: Client);
    static from<T extends AnyChannel = AnyChannel>(data: RawChannel, client: Client): T;
    toJSON(): JSONChannel;
}
