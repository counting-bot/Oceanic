/** @module AnnouncementChannel */
import TextableChannel from "./TextableChannel.js";
import type TextChannel from "./TextChannel.js";
import type CategoryChannel from "./CategoryChannel.js";
import AnnouncementThreadChannel from "./AnnouncementThreadChannel.js";
import type Message from "./Message.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { EditGuildChannelOptions, RawAnnouncementChannel, RawAnnouncementThreadChannel } from "../types/channels.js";
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
    /**
     * Convert this announcement channel to a text channel.
     */
    convert(): Promise<TextChannel>;
    /**
     * Crosspost a message in this channel.
     * @param messageID The ID of the message to crosspost.
     */
    crosspostMessage(messageID: string): Promise<Message<this>>;
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    edit(options: EditGuildChannelOptions): Promise<this>;
    toJSON(): JSONAnnouncementChannel;
}
