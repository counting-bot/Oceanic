/** @module TextableChannel */
import GuildChannel from "./GuildChannel.js";
import type AnnouncementChannel from "./AnnouncementChannel";
import type TextChannel from "./TextChannel";
import type Client from "../Client";
import type { RawAnnouncementChannel, RawTextChannel } from "../types/channels.js";
import type { JSONTextableChannel } from "../types/json.js";

/** Represents a guild textable channel. */
export default class TextableChannel<T extends TextChannel | AnnouncementChannel = TextChannel | AnnouncementChannel> extends GuildChannel {
    declare type: T["type"];
    constructor(data: RawTextChannel | RawAnnouncementChannel, client: Client) {
        super(data, client);
        this.update(data);
    }

    protected override update(data: Partial<RawTextChannel> | Partial<RawAnnouncementChannel>): void {
        super.update(data);
    }

    override toJSON(): JSONTextableChannel {
        return {
            ...super.toJSON(),
            type: this.type
        };
    }
}
