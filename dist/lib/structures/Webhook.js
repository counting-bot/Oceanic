/** @module Webhook */
import Base from "./Base.js";
import { BASE_URL } from "../Constants.js";
import * as Routes from "../util/Routes.js";
/** Represents a webhook. */
export default class Webhook extends Base {
    _cachedChannel;
    _cachedGuild;
    /** The application associated with this webhook. */
    application;
    /** The ID of the application associated with this webhook. */
    applicationID;
    /** The hash of this webhook's avatar. */
    avatar;
    /** The ID of the channel this webhook is for, if applicable. */
    channelID;
    /** The id of the guild this webhook is in, if applicable. */
    guildID;
    /** The username of this webhook, if any. */
    name;
    /** The source channel for this webhook (channel follower only). */
    sourceChannel;
    /** The source guild for this webhook (channel follower only). */
    sourceGuild;
    /** The token for this webhook (not present for webhooks created by other applications) */
    token;
    /** The [type](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types) of this webhook. */
    type;
    constructor(data, client) {
        super(data.id, client);
        this.application = client["_application"] && data.application_id === null ? null : (client.application.id === data.application_id ? client.application : undefined);
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
    get url() {
        return `${BASE_URL}${Routes.WEBHOOK(this.id, this.token)}`;
    }
    /**
     * Delete this webhook (requires a bot user, see `deleteToken`).
     * @param reason The reason for deleting this webhook.
     */
    async delete(reason) {
        return this.client.rest.webhooks.delete(this.id, reason);
    }
    /**
     * Delete a message from this webhook.
     * @param messageID The ID of the message.
     * @param options The options for deleting the message.
     * @param token The token for the webhook, if not already present.
     */
    async deleteMessage(messageID, options, token) {
        const t = this.token ?? token;
        if (!t) {
            throw new Error("Token is not present on webhook, and was not provided in options.");
        }
        return this.client.rest.webhooks.deleteMessage(this.id, t, messageID, options);
    }
    /**
     * Delete this webhook via its token.
     * @param token The token for the webhook, if not already present.
     */
    async deleteToken(token) {
        const t = this.token ?? token;
        if (!t) {
            throw new Error("Token is not present on webhook, and was not provided in options.");
        }
        return this.client.rest.webhooks.deleteToken(this.id, t);
    }
    /**
     * Edit this webhook (requires a bot user, see `editToken`).
     * @param options The options for editing the webhook.
     */
    async edit(options) {
        return this.client.rest.webhooks.edit(this.id, options);
    }
    /**
     * Edit a webhook message.
     * @param id The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     */
    async editMessage(messageID, options, token) {
        const t = this.token ?? token;
        if (!t) {
            throw new Error("Token is not present on webhook, and was not provided in options.");
        }
        return this.client.rest.webhooks.editMessage(this.id, t, messageID, options);
    }
    /**
     * Edit a webhook via its token.
     * @param options The options for editing the webhook.
     * @param token The token for the webhook, if not already present.
     */
    async editToken(options, token) {
        const t = this.token ?? token;
        if (!t) {
            throw new Error("Token is not present on webhook, and was not provided in options.");
        }
        return this.client.rest.webhooks.editToken(this.id, t, options);
    }
    async execute(options, token) {
        const t = this.token ?? token;
        if (!t) {
            throw new Error("Token is not present on webhook, and was not provided in options.");
        }
        return this.client.rest.webhooks.execute(this.id, t, options);
    }
    async executeGithub(options, token) {
        const t = this.token ?? token;
        if (!t) {
            throw new Error("Token is not present on webhook, and was not provided in options.");
        }
        return this.client.rest.webhooks.executeGithub(this.id, t, options);
    }
    /**
     * Get a webhook message.
     * @param messageID The ID of the message.
     * @param threadID The ID of the thread the message is in.
     * @param token The token for the webhook, if not already present.
     */
    async getMessage(messageID, threadID, token) {
        const t = this.token ?? token;
        if (!t) {
            throw new Error("Token is not present on webhook, and was not provided in options.");
        }
        return this.client.rest.webhooks.getMessage(this.id, t, messageID, threadID);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            avatar: this.avatar,
            channelID: this.channelID ?? null,
            guildID: this.guildID,
            name: this.name,
            sourceChannel: this.sourceChannel,
            sourceGuild: this.sourceGuild,
            token: this.token,
            type: this.type
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1dlYmhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0JBQXNCO0FBQ3RCLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUs3QixPQUFPLEVBQUUsUUFBUSxFQUFxQixNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sS0FBSyxNQUFNLE1BQU0sbUJBQW1CLENBQUM7QUFhNUMsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLElBQUk7SUFDN0IsY0FBYyxDQUE4QjtJQUM1QyxZQUFZLENBQWdCO0lBQ3BDLG9EQUFvRDtJQUNwRCxXQUFXLENBQTRCO0lBQ3ZDLDhEQUE4RDtJQUM5RCxhQUFhLENBQWdCO0lBQzdCLHlDQUF5QztJQUN6QyxNQUFNLENBQWdCO0lBQ3RCLGdFQUFnRTtJQUNoRSxTQUFTLENBQWdCO0lBQ3pCLDZEQUE2RDtJQUM3RCxPQUFPLENBQWdCO0lBQ3ZCLDRDQUE0QztJQUM1QyxJQUFJLENBQWdCO0lBQ3BCLG1FQUFtRTtJQUNuRSxhQUFhLENBQW1DO0lBQ2hELGlFQUFpRTtJQUNqRSxXQUFXLENBQTBDO0lBQ3JELDBGQUEwRjtJQUMxRixLQUFLLENBQVU7SUFDZixzSEFBc0g7SUFDdEgsSUFBSSxDQUFlO0lBQ25CLFlBQVksSUFBZ0IsRUFBRSxNQUFjO1FBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcs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