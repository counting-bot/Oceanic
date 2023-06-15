/** @module Routes/Webhooks */
import type {
    CreateWebhookOptions,
    DeleteWebhookMessageOptions,
    EditWebhookMessageOptions,
    EditWebhookOptions,
    EditWebhookTokenOptions,
    ExecuteWebhookOptions,
    ExecuteWebhookWaitOptions,
    RawWebhook
} from "../types/webhooks.js";
import type { AnyTextChannelWithoutGroup, RawMessage } from "../types/channels.js";
import * as Routes from "../util/Routes.js";
import Webhook from "../structures/Webhook.js";
import type RESTManager from "../rest/RESTManager.js";
import type { Uncached } from "../types/shared.js";

/** Various methods for interacting with webhooks. */
export default class Webhooks {
    #manager: RESTManager;
    constructor(manager: RESTManager) {
        this.#manager = manager;
    }
    /**
     * Creat a channel webhook.
     * @param channelID The ID of the channel to create the webhook in.
     * @param options The options to create the webhook with.
     */
    async create(channelID: string, options: CreateWebhookOptions): Promise<Webhook> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest<RawWebhook>({
            method: "POST",
            path:   Routes.CHANNEL_WEBHOOKS(channelID),
            json:   {
                avatar: options.avatar,
                name:   options.name
            },
            reason
        }).then(data => new Webhook(data, this.#manager.client));
    }

    /**
     * Delete a webhook.
     * @param webhookID The ID of the webhook.
     * @param reason The reason for deleting the webhook.
     */
    async delete(webhookID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.WEBHOOK(webhookID),
            reason
        });
    }

    /**
     * Delete a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param options The options for deleting the message.
     */
    async deleteMessage(webhookID: string, token: string, messageID: string, options?: DeleteWebhookMessageOptions): Promise<void> {
        const query = new URLSearchParams();
        if (options?.threadID !== undefined) {
            query.set("thread_id", options.threadID);
        }
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.WEBHOOK_MESSAGE(webhookID, token, messageID)
        });
    }

    /**
     * Delete a webhook via its token.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     */
    async deleteToken(webhookID: string, token: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.WEBHOOK(webhookID, token)
        });
    }

    /**
     * Edit a webhook.
     * @param webhookID The ID of the webhook.
     * @param options The options for editing the webhook.
     */
    async edit(webhookID: string, options: EditWebhookOptions): Promise<Webhook> {
        const reason = options.reason;
        if (options.reason) {
            delete options.reason;
        }
        return this.#manager.authRequest<RawWebhook>({
            method: "PATCH",
            path:   Routes.WEBHOOK(webhookID),
            json:   {
                avatar:     options.avatar,
                channel_id: options.channelID,
                name:       options.name
            },
            reason
        }).then(data => new Webhook(data, this.#manager.client));
    }

    /**
     * Edit a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    async editMessage(webhookID: string, token: string, messageID: string, options: EditWebhookMessageOptions): Promise<object> {
        const files = options.files;
        if (options.files) {
            delete options.files;
        }
        const query = new URLSearchParams();
        if (options.threadID !== undefined) {
            query.set("thread_id", options.threadID);
        }
        return this.#manager.authRequest<RawMessage>({
            method: "PATCH",
            path:   Routes.WEBHOOK_MESSAGE(webhookID, token, messageID),
            json:   {
                allowed_mentions: options.allowedMentions ? this.#manager.client.util.formatAllowedMentions(options.allowedMentions) : undefined,
                attachments:      options.attachments,
                components:       options.components ? options.components : undefined,
                content:          options.content,
                embeds:           options.embeds ? options.embeds : undefined
            },
            query,
            files
        });
    }

    /**
     * Edit a webhook via its token.
     * @param webhookID The ID of the webhook.
     * @param options The options for editing the webhook.
     */
    async editToken(webhookID: string, token: string, options: EditWebhookTokenOptions): Promise<Webhook> {
        return this.#manager.authRequest<RawWebhook>({
            method: "PATCH",
            path:   Routes.WEBHOOK(webhookID, token),
            json:   {
                avatar: options.avatar,
                name:   options.name
            }
        }).then(data => new Webhook(data, this.#manager.client));
    }

    /**
     * Execute a webhook.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param options The options for executing the webhook.
     */
    async execute<T extends AnyTextChannelWithoutGroup | Uncached>(webhookID: string, token: string, options: ExecuteWebhookWaitOptions): Promise<object>;
    async execute(webhookID: string, token: string, options: ExecuteWebhookOptions): Promise<void>;
    async execute(webhookID: string, token: string, options: ExecuteWebhookOptions): Promise<object| void> {
        const files = options.files;
        if (options.files) {
            delete options.files;
        }
        const query = new URLSearchParams();
        if (options.wait !== undefined) {
            query.set("wait", options.wait.toString());
        }
        if (options.threadID !== undefined) {
            query.set("thread_id", options.threadID);
        }
        return this.#manager.authRequest<object>({
            method: "POST",
            path:   Routes.WEBHOOK(webhookID, token),
            query,
            json:   {
                allowed_mentions: this.#manager.client.util.formatAllowedMentions(options.allowedMentions),
                attachments:      options.attachments,
                avatar_url:       options.avatarURL,
                components:       options.components ? options.components : undefined,
                content:          options.content,
                embeds:           options.embeds ? options.embeds : undefined,
                flags:            options.flags,
                thread_name:      options.threadName,
                tts:              options.tts,
                username:         options.username
            },
            files
        });
    }

    /**
     * Get a webhook by ID (and optionally token).
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     */
    async get(webhookID: string, token?: string): Promise<Webhook> {
        return this.#manager.authRequest<RawWebhook>({
            method: "GET",
            path:   Routes.WEBHOOK(webhookID, token)
        }).then(data => new Webhook(data, this.#manager.client));
    }

    /**
     * Get the webhooks in the specified channel.
     * @param channelID The ID of the channel to get the webhooks of.
     */
    async getForChannel(channelID: string): Promise<Array<Webhook>> {
        return this.#manager.authRequest<Array<RawWebhook>>({
            method: "GET",
            path:   Routes.CHANNEL_WEBHOOKS(channelID)
        }).then(data => data.map(d => new Webhook(d, this.#manager.client)));
    }

    /**
     * Get the webhooks in the specified guild.
     * @param guildID The ID of the guild to get the webhooks of.
     */
    async getForGuild(guildID: string): Promise<Array<Webhook>> {
        return this.#manager.authRequest<Array<RawWebhook>>({
            method: "GET",
            path:   Routes.GUILD_WEBHOOKS(guildID)
        }).then(data => data.map(d => new Webhook(d, this.#manager.client)));
    }

    /**
     * Get a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param threadID The ID of the thread the message is in.
     */
    async getMessage(webhookID: string, token: string, messageID: string, threadID?: string): Promise<object> {
        const query = new URLSearchParams();
        if (threadID !== undefined) {
            query.set("thread_id", threadID);
        }
        return this.#manager.authRequest<RawMessage>({
            method: "GET",
            path:   Routes.WEBHOOK_MESSAGE(webhookID, token, messageID)
        });
    }
}
