/** @module VoiceChannel */
import GuildChannel from "./GuildChannel.js";
import PermissionOverwrite from "./PermissionOverwrite.js";
import Message from "./Message.js";
import type CategoryChannel from "./CategoryChannel.js";
import type { ChannelTypes, VideoQualityModes } from "../Constants.js";
import type Client from "../Client.js";
import TypedCollection from "../util/TypedCollection.js";
import type {
    RawMessage,
    RawOverwrite,
    RawVoiceChannel,
} from "../types/channels.js";
import type { JSONVoiceChannel } from "../types/json.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

/** Represents a guild voice channel. */
export default class VoiceChannel extends GuildChannel {
    /** The bitrate of the voice channel. */
    bitrate: number;
    /** The last message sent in this channel. This will only be present if a message has been sent within the current session. */
    lastMessage?: Message<this> | null;
    /** The ID of last message sent in this channel. */
    lastMessageID: string | null;
    /** The cached messages in this channel. */
    messages: TypedCollection<string, RawMessage, Message<this>>;
    /** If this channel is age gated. */
    nsfw: boolean;
    /** The permission overwrites of this channel. */
    permissionOverwrites: TypedCollection<string, RawOverwrite, PermissionOverwrite>;
    /** The position of this channel on the sidebar. */
    position: number;
    /** The id of the voice region of the channel, `null` is automatic. */
    rtcRegion: string | null;
    /** The topic of the channel. */
    topic: string | null;
    declare type: ChannelTypes.GUILD_VOICE;
    /** The maximum number of members in this voice channel. `0` is unlimited. */
    userLimit: number;
    /** The [video quality mode](https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of this channel. */
    videoQualityMode: VideoQualityModes;
    constructor(data: RawVoiceChannel, client: Client) {
        super(data, client);
        this.bitrate = data.bitrate;
        this.lastMessageID = data.last_message_id;
        this.messages = new TypedCollection(Message<this>, client, client.options.collectionLimits.messages);
        this.nsfw = false;
        this.permissionOverwrites = new TypedCollection(PermissionOverwrite, client);
        this.position = data.position;
        this.rtcRegion = data.rtc_region;
        this.topic = data.topic;
        this.videoQualityMode = data.video_quality_mode;
        this.userLimit = data.user_limit;
        this.update(data);
    }

    protected override update(data: Partial<RawVoiceChannel>): void {
        super.update(data);
        if (data.last_message_id !== undefined) {
            this.lastMessage = data.last_message_id === null ? null : this.messages.get(data.last_message_id);
            this.lastMessageID = data.last_message_id;
        }
        if (data.permission_overwrites !== undefined) {
            data.permission_overwrites.map(overwrite => this.permissionOverwrites.update(overwrite));
        }
    }

    override get parent(): CategoryChannel | null | undefined {
        return super.parent as CategoryChannel | null | undefined;
    }

   
    override toJSON(): JSONVoiceChannel {
        return {
            ...super.toJSON(),
            bitrate:              this.bitrate,
            messages:             this.messages.map(message => message.id),
            nsfw:                 this.nsfw,
            permissionOverwrites: this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            position:             this.position,
            rtcRegion:            this.rtcRegion,
            topic:                this.topic,
            userLimit:            this.userLimit,
            type:                 this.type,
            videoQualityMode:     this.videoQualityMode
        };
    }
}
