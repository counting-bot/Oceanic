/** @module Webhook */
import Base from "./Base.js";
import type Client from "../Client";
import type { WebhookTypes } from "../Constants.js";
import type { RawChannel } from "../types/channels";
import type { RawGuild } from "../types/guilds";
import type { RawWebhook } from "../types/webhooks.js";
import type { JSONWebhook } from "../types/json.js";
/** Represents a webhook. */
export default class Webhook extends Base {
    private _cachedChannel?;
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
    constructor(data: RawWebhook, client: Client);
    toJSON(): JSONWebhook;
}
