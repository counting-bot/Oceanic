/** @module Webhook */
import Base from "./Base.js";
import type Message from "./Message";
import type ClientApplication from "./ClientApplication";
import type Client from "../Client";
import { type WebhookTypes } from "../Constants.js";
import type { AnyGuildTextChannel, RawChannel } from "../types/channels";
import type { RawGuild } from "../types/guilds";
import type { DeleteWebhookMessageOptions, EditWebhookMessageOptions, EditWebhookOptions, ExecuteWebhookOptions, ExecuteWebhookWaitOptions, RawWebhook } from "../types/webhooks.js";
import type { JSONWebhook } from "../types/json.js";
/** Represents a webhook. */
export default class Webhook extends Base {
    private _cachedChannel?;
    private _cachedGuild?;
    /** The application associated with this webhook. */
    application?: ClientApplication | null;
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
    get url(): string;
    /**
     * Delete this webhook (requires a bot user, see `deleteToken`).
     * @param reason The reason for deleting this webhook.
     */
    delete(reason?: string): Promise<void>;
    /**
     * Delete a message from this webhook.
     * @param messageID The ID of the message.
     * @param options The options for deleting the message.
     * @param token The token for the webhook, if not already present.
     */
    deleteMessage(messageID: string, options?: DeleteWebhookMessageOptions, token?: string): Promise<void>;
    /**
     * Delete this webhook via its token.
     * @param token The token for the webhook, if not already present.
     */
    deleteToken(token?: string): Promise<void>;
    /**
     * Edit this webhook (requires a bot user, see `editToken`).
     * @param options The options for editing the webhook.
     */
    edit(options: EditWebhookOptions): Promise<Webhook>;
    /**
     * Edit a webhook message.
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    editMessage<T extends AnyGuildTextChannel = AnyGuildTextChannel>(messageID: string, options: EditWebhookMessageOptions, token?: string): Promise<Message<T>>;
    /**
     * Edit a webhook via its token.
     * @param options The options for editing the webhook.
     * @param token The token for the webhook, if not already present.
     */
    editToken(options: EditWebhookOptions, token?: string): Promise<Webhook>;
    /**
     * Execute the webhook.
     * @param options The options for executing the webhook.
     * @param token The token for the webhook, if not already present.
     */
    execute<T extends AnyGuildTextChannel>(options: ExecuteWebhookWaitOptions, token?: string): Promise<Message<T>>;
    execute(options: ExecuteWebhookOptions, token?: string): Promise<void>;
    /**
     * Execute this webhook as GitHub compatible.
     * @param options The options to send. See GitHub's documentation for more information.
     * @param token The token for the webhook, if not already present.
     */
    executeGithub(options: Record<string, unknown> & {
        wait: false;
    }, token?: string): Promise<void>;
    executeGithub<T extends AnyGuildTextChannel>(options: Record<string, unknown> & {
        wait?: true;
    }, token?: string): Promise<Message<T>>;
    /**
     * Get a webhook message.
     * @param messageID The ID of the message.
     * @param threadID The ID of the thread the message is in.
     * @param token The token for the webhook, if not already present.
     */
    getMessage<T extends AnyGuildTextChannel>(messageID: string, threadID?: string, token?: string): Promise<Message<T>>;
    toJSON(): JSONWebhook;
}
