/** @module Routes/Webhooks */
import type { CreateWebhookOptions, DeleteWebhookMessageOptions, EditWebhookMessageOptions, EditWebhookOptions, EditWebhookTokenOptions, ExecuteWebhookOptions, ExecuteWebhookWaitOptions } from "../types/webhooks";
import type { AnyTextChannelWithoutGroup } from "../types/channels";
import Webhook from "../structures/Webhook";
import Message from "../structures/Message";
import type RESTManager from "../rest/RESTManager";
import type { Uncached } from "../types/shared";
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
     * @param id The ID of the webhook.
     * @param reason The reason for deleting the webhook.
     */
    delete(id: string, reason?: string): Promise<void>;
    /**
     * Delete a webhook message.
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param options The options for deleting the message.
     */
    deleteMessage(id: string, token: string, messageID: string, options?: DeleteWebhookMessageOptions): Promise<void>;
    /**
     * Delete a webhook via its token.
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     */
    deleteToken(id: string, token: string): Promise<void>;
    /**
     * Edit a webhook.
     * @param id The ID of the webhook.
     * @param options The options for editing the webhook.
     */
    edit(id: string, options: EditWebhookOptions): Promise<Webhook>;
    /**
     * Edit a webhook message.
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    editMessage<T extends AnyTextChannelWithoutGroup | Uncached>(id: string, token: string, messageID: string, options: EditWebhookMessageOptions): Promise<Message<T>>;
    /**
     * Edit a webhook via its token.
     * @param id The ID of the webhook.
     * @param options The options for editing the webhook.
     */
    editToken(id: string, token: string, options: EditWebhookTokenOptions): Promise<Webhook>;
    /**
     * Execute a webhook.
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     * @param options The options for executing the webhook.
     */
    execute<T extends AnyTextChannelWithoutGroup | Uncached>(id: string, token: string, options: ExecuteWebhookWaitOptions): Promise<Message<T>>;
    execute(id: string, token: string, options: ExecuteWebhookOptions): Promise<void>;
    /**
     * Execute a GitHub compatible webhook.
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     * @param options The options to send. See GitHub's documentation for more information.
     */
    executeGithub(id: string, token: string, options: Record<string, unknown> & {
        wait: false;
    }): Promise<void>;
    executeGithub<T extends AnyTextChannelWithoutGroup | Uncached>(id: string, token: string, options: Record<string, unknown> & {
        wait?: true;
    }): Promise<Message<T>>;
    /**
     * Execute a slack compatible webhook.
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     * @param options The options to send. See [Slack's Documentation](https://api.slack.com/incoming-webhooks) for more information.
     */
    executeSlack(id: string, token: string, options: Record<string, unknown> & {
        wait: false;
    }): Promise<void>;
    executeSlack<T extends AnyTextChannelWithoutGroup | Uncached>(id: string, token: string, options: Record<string, unknown> & {
        wait?: true;
    }): Promise<Message<T>>;
    /**
     * Get a webhook by ID (and optionally token).
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     */
    get(id: string, token?: string): Promise<Webhook>;
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
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param threadID The ID of the thread the message is in.
     */
    getMessage<T extends AnyTextChannelWithoutGroup | Uncached>(id: string, token: string, messageID: string, threadID?: string): Promise<Message<T>>;
}
