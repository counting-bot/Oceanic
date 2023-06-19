/** @module Routes/Webhooks */
import type { CreateWebhookOptions, DeleteWebhookMessageOptions, EditWebhookMessageOptions, EditWebhookOptions, EditWebhookTokenOptions, ExecuteWebhookOptions, ExecuteWebhookWaitOptions } from "../types/webhooks.js";
import type { AnyTextChannelWithoutGroup } from "../types/channels.js";
import Webhook from "../structures/Webhook.js";
import type RESTManager from "../rest/RESTManager.js";
import type { Uncached } from "../types/shared.js";
/** Various methods for interacting with webhooks. */
export default class Webhooks {
    #private;
    constructor(manager: RESTManager);
    /**
     * Creat a channel webhook.
     * @param channelID The ID of the channel to create the webhook in.
     * @param options The options to create the webhook with.
     */
    create(channelID: string, options: CreateWebhookOptions): Promise<Webhook>;
    /**
     * Delete a webhook.
     * @param webhookID The ID of the webhook.
     * @param reason The reason for deleting the webhook.
     */
    delete(webhookID: string, reason?: string): Promise<void>;
    /**
     * Delete a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param options The options for deleting the message.
     */
    deleteMessage(webhookID: string, token: string, messageID: string, options?: DeleteWebhookMessageOptions): Promise<void>;
    /**
     * Delete a webhook via its token.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     */
    deleteToken(webhookID: string, token: string): Promise<void>;
    /**
     * Edit a webhook.
     * @param webhookID The ID of the webhook.
     * @param options The options for editing the webhook.
     */
    edit(webhookID: string, options: EditWebhookOptions): Promise<Webhook>;
    /**
     * Edit a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    editMessage(webhookID: string, token: string, messageID: string, options: EditWebhookMessageOptions): Promise<object>;
    /**
     * Edit a webhook via its token.
     * @param webhookID The ID of the webhook.
     * @param options The options for editing the webhook.
     */
    editToken(webhookID: string, token: string, options: EditWebhookTokenOptions): Promise<Webhook>;
    /**
     * Execute a webhook.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param options The options for executing the webhook.
     */
    execute<T extends AnyTextChannelWithoutGroup | Uncached>(webhookID: string, token: string, options: ExecuteWebhookWaitOptions): Promise<object>;
    execute(webhookID: string, token: string, options: ExecuteWebhookOptions): Promise<void>;
    /**
     * Get a webhook by ID (and optionally token).
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     */
    get(webhookID: string, token?: string): Promise<Webhook>;
    /**
     * Get the webhooks in the specified channel.
     * @param channelID The ID of the channel to get the webhooks of.
     */
    getForChannel(channelID: string): Promise<Array<Webhook>>;
    /**
     * Get the webhooks in the specified guild.
     * @param guildID The ID of the guild to get the webhooks of.
     */
    getForGuild(guildID: string): Promise<Array<Webhook>>;
    /**
     * Get a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param threadID The ID of the thread the message is in.
     */
    getMessage(webhookID: string, token: string, messageID: string, threadID?: string): Promise<object>;
}
