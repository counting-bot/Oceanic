/** @module GuildChannel */
import Channel from "./Channel.js";
import type Guild from "./Guild.js";
import type CategoryChannel from "./CategoryChannel.js";
import type TextChannel from "./TextChannel.js";
import type AnnouncementChannel from "./AnnouncementChannel.js";
import type ForumChannel from "./ForumChannel.js";
import type { GuildChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { RawGuildChannel } from "../types/channels.js";
import type { JSONGuildChannel } from "../types/json.js";

/** Represents a guild channel. */
export default class GuildChannel extends Channel {
    private _cachedGuild?: Guild;
    private _cachedParent?: TextChannel | AnnouncementChannel | CategoryChannel | ForumChannel | null;
    /** The id of the guild this channel is in. */
    guildID: string;
    /** The name of this channel. */
    name: string;
    /** The ID of the parent of this channel, if applicable. */
    parentID: string | null;
    declare type: GuildChannelTypes;
    constructor(data: RawGuildChannel, client: Client) {
        super(data, client);
        this.guildID = data.guild_id;
        this.name = data.name;
        this.parentID = data.parent_id;
    }

    protected override update(data: Partial<RawGuildChannel>): void {
        super.update(data);
        if (data.guild_id !== undefined) {
            this.guildID = data.guild_id;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.parent_id !== undefined) {
            this.parentID = data.parent_id;
        }
    }

    /** The guild associated with this channel. This will throw an error if the guild is not cached. */
    get guild(): Guild {
        if (!this._cachedGuild) {
            this._cachedGuild = this.client.guilds.get(this.guildID);

            if (!this._cachedGuild) {
                throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
            }
        }

        return this._cachedGuild;
    }

    /** The parent of this channel, if applicable. This will be a text/announcement/forum channel if we're in a thread, category otherwise. */
    get parent(): TextChannel | AnnouncementChannel | CategoryChannel | ForumChannel | null | undefined {
        if (this.parentID !== null && this._cachedParent !== null) {
            return this._cachedParent ?? (this._cachedParent = this.client.getChannel<TextChannel | AnnouncementChannel | CategoryChannel | ForumChannel>(this.parentID));
        }

        return this._cachedParent === null ? this._cachedParent : (this._cachedParent = null);
    }

    override toJSON(): JSONGuildChannel {
        return {
            ...super.toJSON(),
            guildID:  this.guildID,
            name:     this.name,
            parentID: this.parentID,
            type:     this.type
        };
    }
}
