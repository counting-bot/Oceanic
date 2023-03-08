/** @module PrivateChannel */
import Channel from "./Channel.js";
import type User from "./User.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { RawPrivateChannel } from "../types/channels.js";
import type { JSONPrivateChannel } from "../types/json.js";
/** Represents a direct message with a user. */
export default class PrivateChannel extends Channel {
    /** The other user in this direct message. */
    recipient: User;
    type: ChannelTypes.DM;
    constructor(data: RawPrivateChannel, client: Client);
    toJSON(): JSONPrivateChannel;
}
