/** @module Types/Webhooks */
import type { CreateMessageOptions, RawChannel } from "./channels.js";
import type { RawGuild } from "./guilds.js";
import type { RawUser } from "./users.js";
import type { WebhookTypes } from "../Constants.js";

export interface RawWebhook {
    application_id: string | null;
    avatar: string | null;
    channel_id: string | null;
    guild_id?: string | null;
    id: string;
    name: string | null;
    source_channel?: Pick<RawChannel, "id" | "name">;
    source_guild?: Pick<RawGuild, "id" | "name" | "icon">;
    token?: string;
    type: WebhookTypes;
    url?: string;
    user?: RawUser;
}
export type BasicWebhook = Pick<RawWebhook, "type" | "id" | "name" | "avatar" | "channel_id" | "guild_id" | "application_id">;
export type OAuthWebhook = Required<BasicWebhook & Pick<RawWebhook, "url" | "token">>;
export type GuildWebhook = BasicWebhook & Pick<RawWebhook, "user" | "token">;
export type ApplicationWebhook = Pick<RawWebhook, "type" | "id" | "name" | "avatar" | "channel_id" | "guild_id" | "application_id"> & Required<Pick<RawWebhook, "token">>;
export type ChannelFollowerWebhook = BasicWebhook & Required<Pick<RawWebhook, "source_guild" | "source_channel">> & Pick<RawWebhook, "user">;

export interface CreateWebhookOptions {
    /** The avatar (buffer, or full data url). */
    avatar?: Buffer | string | null;
    /** The name of the webhook. */
    name?: string;
    /** The reason for creating this webhook. */
    reason?: string;
}

export interface EditWebhookTokenOptions  {
    /** The new avatar (buffer, or full data url). `null` to reset. */
    avatar?: Buffer | string | null;
    /** The name of the webhook. */
    name?: string;
}
export interface EditWebhookOptions extends EditWebhookTokenOptions {
    /** The id of the channel to move this webhook to. */
    channelID?: string;
    /** The reason for editing this webhook. */
    reason?: string;
}

export type ExecuteWebhookOptions = Pick<CreateMessageOptions, "content" | "tts" | "embeds" | "allowedMentions" | "components" | "attachments" | "flags" | "files"> & {
    /** The url of an avatar to use. */
    avatarURL?: string;
    /** The id of the thread to send the message to. */
    threadID?: string;
    /** The name of the thread to create (forum channels). */
    threadName?: string;
    /** The username to use. */
    username?: string;
    /** If the created message should be returned. */
    wait?: boolean;
};
export type ExecuteWebhookWaitOptions = Omit<ExecuteWebhookOptions, "wait">  & { wait: true; };

export interface GetWebhookMessageOptions {
    messageID: string;
    threadID?: string;
}

export type EditWebhookMessageOptions = Pick<ExecuteWebhookOptions, "content" | "embeds" | "allowedMentions" | "components" | "attachments" | "threadID" | "files">;

export interface DeleteWebhookMessageOptions {
    /** The id of the thread the message is in. */
    threadID?: string;
}
