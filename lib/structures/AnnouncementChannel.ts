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
    declare rateLimitPerUser: 0;
    /** The threads in this channel. */
    threads: TypedCollection<string, RawAnnouncementThreadChannel, AnnouncementThreadChannel>;
    declare type: ChannelTypes.GUILD_ANNOUNCEMENT;
    constructor(data: RawAnnouncementChannel, client: Client) {
        super(data, client);
        this.threads = new TypedCollection(AnnouncementThreadChannel, client);
    }

    override get parent(): CategoryChannel | null | undefined {
        return super.parent;
    }

    override toJSON(): JSONAnnouncementChannel {
        return {
            ...super.toJSON(),
            rateLimitPerUser: 0,
            threads:          this.threads.map(thread => thread.id),
            type:             this.type
        };
    }
}
