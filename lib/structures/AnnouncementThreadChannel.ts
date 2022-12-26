/** @module AnnouncementThreadChannel */
import ThreadChannel from "./ThreadChannel.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { EditPublicThreadChannelOptions, RawAnnouncementThreadChannel, ThreadMetadata } from "../types/channels.js";
import type { JSONAnnouncementThreadChannel } from "../types/json.js";

/** Represents a public thread channel in an announcement channel. */
export default class AnnouncementThreadChannel extends ThreadChannel<AnnouncementThreadChannel> {
    declare threadMetadata: ThreadMetadata;
    declare type: ChannelTypes.ANNOUNCEMENT_THREAD;
    constructor(data: RawAnnouncementThreadChannel, client: Client) {
        super(data, client);
    }


    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    override async edit(options: EditPublicThreadChannelOptions): Promise<this> {
        return this.client.rest.channels.edit<this>(this.id, options);
    }

    override toJSON(): JSONAnnouncementThreadChannel {
        return {
            ...super.toJSON(),
            threadMetadata: this.threadMetadata,
            type:           this.type
        };
    }
}
