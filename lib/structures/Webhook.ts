/** @module Webhook */
import Base from "./Base.js";
import type Client from "../Client";
import type { WebhookTypes } from "../Constants.js";
import type { AnyGuildTextChannel, RawChannel } from "../types/channels";
import type { RawGuild } from "../types/guilds";
import type { RawWebhook } from "../types/webhooks.js";
import type { JSONWebhook } from "../types/json.js";

/** Represents a webhook. */
export default class Webhook extends Base {
    private _cachedChannel?: AnyGuildTextChannel | null;
    /** The ID of the application associated with this webhook. */
    applicationID: string | null;
    /** The hash of this webhook's avatar. */
    avatar: string | null;
    /** The ID of the channel this webhook is for, if applicable. */
    channelID: string | null;
    /** The id of the guild this webhook is in, if applicable. */
    guildID: string | null;
    /** The username of this webhook, if any. */
    name: string | null;
    /** The source channel for this webhook (channel follower only). */
    sourceChannel?: Pick<RawChannel, "id" | "name">;
    /** The source guild for this webhook (channel follower only). */
    sourceGuild?: Pick<RawGuild, "id" | "name" | "icon">;
    /** The token for this webhook (not present for webhooks created by other applications) */
    token?: string;
    /** The [type](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types) of this webhook. */
    type: WebhookTypes;
    constructor(data: RawWebhook, client: Client) {
        super(data.id, client);
        this.applicationID = data.application_id;
        this.avatar = data.avatar ?? null;
        this.channelID = data.channel_id;
        this.guildID = data.guild_id ?? null;
        this.name = data.name;
        this.sourceChannel = data.source_channel;
        this.sourceGuild = data.source_guild;
        this.token = data.token;
        this.type = data.type;
    }

    override toJSON(): JSONWebhook {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            avatar:        this.avatar,
            channelID:     this.channelID ?? null,
            guildID:       this.guildID,
            name:          this.name,
            sourceChannel: this.sourceChannel,
            sourceGuild:   this.sourceGuild,
            token:         this.token,
            type:          this.type
        };
    }
}
