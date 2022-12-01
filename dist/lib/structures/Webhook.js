/** @module Webhook */
import Base from "./Base";
import { BASE_URL } from "../Constants";
import * as Routes from "../util/Routes";
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
    /** The user that created this webhook. */
    user;
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
        this.user = data.user === undefined ? null : client.users.update(data.user);
    }
    /** The channel this webhook is for, if applicable. */
    get channel() {
        if (this.channelID !== null && this._cachedChannel !== null) {
            return this._cachedChannel ?? (this._cachedChannel = this.client.getChannel(this.channelID));
        }
        return this._cachedChannel === null ? this._cachedChannel : (this._cachedChannel = null);
    }
    /** The guild this webhook is for, if applicable. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            if (!this._cachedGuild) {
                this._cachedGuild = this.client.guilds.get(this.guildID);
                if (!this._cachedGuild) {
                    throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
                }
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    get url() {
        return `${BASE_URL}${Routes.WEBHOOK(this.id, this.token)}`;
    }
    /**
     * The url of this webhook's avatar.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    avatarURL(format, size) {
        return this.avatar === null ? null : this.client.util.formatImage(Routes.USER_AVATAR(this.id, this.avatar), format, size);
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
    async executeSlack(options, token) {
        const t = this.token ?? token;
        if (!t) {
            throw new Error("Token is not present on webhook, and was not provided in options.");
        }
        return this.client.rest.webhooks.executeSlack(this.id, t, options);
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
    /**
     * The url of this webhook's `sourceGuild` icon (only present on channel follower webhooks).
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    sourceGuildIconURL(format, size) {
        return !this.sourceGuild?.icon ? null : this.client.util.formatImage(Routes.GUILD_ICON(this.id, this.sourceGuild?.icon), format, size);
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
            type: this.type,
            user: this.user?.toJSON()
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1dlYmhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0JBQXNCO0FBQ3RCLE9BQU8sSUFBSSxNQUFNLFFBQVEsQ0FBQztBQU8xQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sS0FBSyxNQUFNLE1BQU0sZ0JBQWdCLENBQUM7QUFhekMsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLElBQUk7SUFDN0IsY0FBYyxDQUE4QjtJQUM1QyxZQUFZLENBQWdCO0lBQ3BDLG9EQUFvRDtJQUNwRCxXQUFXLENBQTRCO0lBQ3ZDLDhEQUE4RDtJQUM5RCxhQUFhLENBQWdCO0lBQzdCLHlDQUF5QztJQUN6QyxNQUFNLENBQWdCO0lBQ3RCLGdFQUFnRTtJQUNoRSxTQUFTLENBQWdCO0lBQ3pCLDZEQUE2RDtJQUM3RCxPQUFPLENBQWdCO0lBQ3ZCLDRDQUE0QztJQUM1QyxJQUFJLENBQWdCO0lBQ3BCLG1FQUFtRTtJQUNuRSxhQUFhLENBQW1DO0lBQ2hELGlFQUFpRTtJQUNqRSxXQUFXLENBQTBDO0lBQ3JELDBGQUEwRjtJQUMxRixLQUFLLENBQVU7SUFDZixzSEFBc0g7SUFDdEgsSUFBSSxDQUFlO0lBQ25CLDBDQUEwQztJQUMxQyxJQUFJLENBQWM7SUFDbEIsWUFBWSxJQUFnQixFQUFFLE1BQWM7UUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFD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