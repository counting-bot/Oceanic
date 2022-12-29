/** @module AnnouncementThreadChannel */
import ThreadChannel from "./ThreadChannel.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { RawAnnouncementThreadChannel, ThreadMetadata } from "../types/channels.js";
import type { JSONAnnouncementThreadChannel } from "../types/json.js";
/** Represents a public thread channel in an announcement channel. */
export default class AnnouncementThreadChannel extends ThreadChannel<AnnouncementThreadChannel> {
    threadMetadata: ThreadMetadata;
    type: ChannelTypes.ANNOUNCEMENT_THREAD;
    constructor(data: RawAnnouncementThreadChannel, client: Client);
    toJSON(): JSONAnnouncementThreadChannel;
}
