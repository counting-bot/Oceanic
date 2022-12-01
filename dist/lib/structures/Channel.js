/** @module Channel */
import Base from "./Base";
import { ChannelTypes } from "../Constants";
/** Represents a channel. */
export default class Channel extends Base {
    /** The [type](https://discord.com/developers/docs/resources/channel#channel-object-channel-types) of this channel. */
    type;
    constructor(data, client) {
        super(data.id, client);
        this.type = data.type;
    }
    static from(data, client) {
        switch (data.type) {
            case ChannelTypes.GUILD_TEXT: {
                return new TextChannel(data, client);
            }
            case ChannelTypes.DM: {
                return new PrivateChannel(data, client);
            }
            case ChannelTypes.GUILD_VOICE: {
                return new VoiceChannel(data, client);
            }
            case ChannelTypes.GROUP_DM: {
                return new GroupChannel(data, client);
            }
            case ChannelTypes.GUILD_CATEGORY: {
                return new CategoryChannel(data, client);
            }
            case ChannelTypes.GUILD_ANNOUNCEMENT: {
                return new AnnouncementChannel(data, client);
            }
            case ChannelTypes.ANNOUNCEMENT_THREAD: {
                return new AnnouncementThreadChannel(data, client);
            }
            case ChannelTypes.PUBLIC_THREAD: {
                return new PublicThreadChannel(data, client);
            }
            case ChannelTypes.PRIVATE_THREAD: {
                return new PrivateThreadChannel(data, client);
            }
            case ChannelTypes.GUILD_STAGE_VOICE: {
                return new StageChannel(data, client);
            }
            case ChannelTypes.GUILD_FORUM: {
                return new ForumChannel(data, client);
            }
            default: {
                return new Channel(data, client);
            }
        }
    }
    /** A string that will mention this channel. */
    get mention() {
        return `<#${this.id}>`;
    }
    /**
     * Close a direct message, leave a group channel, or delete a guild channel.
     */
    async delete() {
        await this.client.rest.channels.delete(this.id);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            type: this.type
        };
    }
}
// Yes this sucks, but it works. That's the important part. Circular imports are hell.
/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const TextChannel = require("./TextChannel").default;
const PrivateChannel = require("./PrivateChannel").default;
const VoiceChannel = require("./VoiceChannel").default;
const CategoryChannel = require("./CategoryChannel").default;
const GroupChannel = require("./GroupChannel").default;
const AnnouncementChannel = require("./AnnouncementChannel").default;
const PublicThreadChannel = require("./PublicThreadChannel").default;
const PrivateThreadChannel = require("./PrivateThreadChannel").default;
const AnnouncementThreadChannel = require("./AnnouncementThreadChannel").default;
const StageChannel = require("./StageChannel").default;
const ForumChannel = require("./ForumChannel").default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0JBQXNCO0FBQ3RCLE9BQU8sSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUMxQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBbUI1Qyw0QkFBNEI7QUFDNUIsTUFBTSxDQUFDLE9BQU8sT0FBTyxPQUFRLFNBQVEsSUFBSTtJQUNyQyxzSEFBc0g7SUFDdEgsSUFBSSxDQUFlO0lBQ25CLFlBQVksSUFBZ0IsRUFBRSxNQUFjO1FBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBb0MsSUFBZ0IsRUFBRSxNQUFjO1FBQzNFLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMxQixPQUFPLElBQUksV0FBVyxDQUFDLElBQXNCLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDL0Q7WUFDRCxLQUFLLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUF5QixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQ3JFO1lBQ0QsS0FBSyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBdUIsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUNqRTtZQUNELEtBQUssWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLElBQUksWUFBWSxDQUFDLElBQXVCLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDakU7WUFDRCxLQUFLLFlBQVksQ0FBQyxjQUFjLENB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