/** @module AnnouncementChannel */
import TextableChannel from "./TextableChannel.js";
import type CategoryChannel from "./CategoryChannel.js";
import AnnouncementThreadChannel from "./AnnouncementThreadChannel.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { RawAnnouncementChannel, RawAnnouncementThreadChannel } from "../types/channels.js";
import type { JSONAnnouncementChannel } from "../types/json.js";
import TypedCollection from "../util/TypedCollection.js";
/** Represents a guild announcement channel. */
export default class AnnouncementChannel extends TextableChannel<AnnouncementChannel> {
    /** The amount of seconds between non-moderators sending messages. Always zero in announcement channels. */
    rateLimitPerUser: 0;
    /** The threads in this channel. */
    threads: TypedCollection<string, RawAnnouncementThreadChannel, AnnouncementThreadChannel>;
    type: ChannelTypes.GUILD_ANNOUNCEMENT;
    constructor(data: RawAnnouncementChannel, client: Client);
    get parent(): CategoryChannel | null | undefined;
    toJSON(): JSONAnnouncementChannel;
}
