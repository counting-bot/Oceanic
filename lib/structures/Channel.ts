/** @module Channel */
import Base from "./Base.js";
import { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type {
    AnyChannel,
    RawChannel,
    RawForumChannel,
    RawPrivateChannel,
    RawPrivateThreadChannel,
    RawPublicThreadChannel,
    RawTextChannel,
    RawCategoryChannel,
    RawAnnouncementChannel,
    RawAnnouncementThreadChannel
} from "../types/channels.js";
import type { JSONChannel } from "../types/json.js";

/** Represents a channel. */
export default class Channel extends Base {
    /** The [type](https://discord.com/developers/docs/resources/channel#channel-object-channel-types) of this channel. */
    type: ChannelTypes;
    constructor(data: RawChannel, client: Client) {
        super(data.id, client);
        this.type = data.type;
    }

    static from<T extends AnyChannel = AnyChannel>(data: RawChannel, client: Client): T {
        switch (data.type) {
            case ChannelTypes.GUILD_TEXT: {
                return new TextChannel(data as RawTextChannel, client) as T;
            }
            case ChannelTypes.DM: {
                return new PrivateChannel(data as RawPrivateChannel, client) as T;
            }
            case ChannelTypes.GUILD_CATEGORY: {
                return new CategoryChannel(data as RawCategoryChannel, client) as T;
            }
            case ChannelTypes.GUILD_ANNOUNCEMENT: {
                return new AnnouncementChannel(data as RawAnnouncementChannel, client) as T;
            }
            case ChannelTypes.ANNOUNCEMENT_THREAD: {
                return new AnnouncementThreadChannel(data as RawAnnouncementThreadChannel, client) as T;
            }
            case ChannelTypes.PUBLIC_THREAD: {
                return new PublicThreadChannel(data as RawPublicThreadChannel, client) as T;
            }
            case ChannelTypes.PRIVATE_THREAD: {
                return new PrivateThreadChannel(data as RawPrivateThreadChannel, client) as T;
            }
            case ChannelTypes.GUILD_FORUM: {
                return new ForumChannel(data as RawForumChannel, client) as T;
            }
            default: {
                return new Channel(data, client) as T;
            }
        }
    }

    override toJSON(): JSONChannel {
        return {
            ...super.toJSON(),
            type: this.type
        };
    }
}

// Yes this sucks, but it works. That's the important part. Circular imports are hell.
/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const TextChannel = (require("./TextChannel.js") as typeof import("./TextChannel.js")).default;
const PrivateChannel = (require("./PrivateChannel.js") as typeof import("./PrivateChannel.js")).default;
const PublicThreadChannel = (require("./PublicThreadChannel.js") as typeof import("./PublicThreadChannel.js")).default;
const PrivateThreadChannel = (require("./PrivateThreadChannel.js") as typeof import("./PrivateThreadChannel.js")).default;
const ForumChannel = (require("./ForumChannel.js") as typeof import("./ForumChannel.js")).default;
const CategoryChannel = (require("./CategoryChannel.js") as typeof import("./CategoryChannel.js")).default;
const AnnouncementChannel = (require("./AnnouncementChannel.js") as typeof import("./AnnouncementChannel.js")).default;
const AnnouncementThreadChannel = (require("./AnnouncementThreadChannel.js") as typeof import("./AnnouncementThreadChannel.js")).default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
