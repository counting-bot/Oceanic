/** @module InteractionResolvedChannel */
import type AnnouncementChannel from "./AnnouncementChannel.js";
import type TextChannel from "./TextChannel.js";
import Permission from "./Permission.js";
import Channel from "./Channel.js";
import type PrivateChannel from "./PrivateChannel.js";
import type ForumChannel from "./ForumChannel.js";
import type { ChannelTypes, GuildChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { RawInteractionResolvedChannel, ThreadMetadata, PrivateThreadMetadata, AnyGuildChannel } from "../types/channels.js";
/** Represents a channel from an interaction option. This can be any guild channel, or a direct message. */
export default class InteractionResolvedChannel extends Channel {
    private _cachedCompleteChannel?;
    private _cachedParent?;
    /** The permissions the bot has in the channel. */
    appPermissions: Permission;
    /** The name of this channel. */
    name: string | null;
    /** The ID of the parent of this channel, if this represents a thread. */
    parentID: string | null;
    /** The [thread metadata](https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure) associated with this channel, if this represents a thread. */
    threadMetadata: ThreadMetadata | PrivateThreadMetadata | null;
    type: GuildChannelTypes | ChannelTypes.DM;
    constructor(data: RawInteractionResolvedChannel, client: Client);
    /** The complete channel this channel option represents, if it's cached. */
    get completeChannel(): AnyGuildChannel | PrivateChannel | undefined;
    /** The parent of this channel, if this represents a thread. */
    get parent(): TextChannel | AnnouncementChannel | ForumChannel | null | undefined;
}
