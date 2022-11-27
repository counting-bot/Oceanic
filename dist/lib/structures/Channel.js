"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Channel */
const Base_1 = tslib_1.__importDefault(require("./Base"));
const Constants_1 = require("../Constants");
/** Represents a channel. */
class Channel extends Base_1.default {
    /** The [type](https://discord.com/developers/docs/resources/channel#channel-object-channel-types) of this channel. */
    type;
    constructor(data, client) {
        super(data.id, client);
        this.type = data.type;
    }
    static from(data, client) {
        switch (data.type) {
            case Constants_1.ChannelTypes.GUILD_TEXT: {
                return new TextChannel(data, client);
            }
            case Constants_1.ChannelTypes.DM: {
                return new PrivateChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_VOICE: {
                return new VoiceChannel(data, client);
            }
            case Constants_1.ChannelTypes.GROUP_DM: {
                return new GroupChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_CATEGORY: {
                return new CategoryChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_ANNOUNCEMENT: {
                return new AnnouncementChannel(data, client);
            }
            case Constants_1.ChannelTypes.ANNOUNCEMENT_THREAD: {
                return new AnnouncementThreadChannel(data, client);
            }
            case Constants_1.ChannelTypes.PUBLIC_THREAD: {
                return new PublicThreadChannel(data, client);
            }
            case Constants_1.ChannelTypes.PRIVATE_THREAD: {
                return new PrivateThreadChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_STAGE_VOICE: {
                return new StageChannel(data, client);
            }
            case Constants_1.ChannelTypes.GUILD_FORUM: {
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
exports.default = Channel;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLDBEQUEwQjtBQUMxQiw0Q0FBNEM7QUFtQjVDLDRCQUE0QjtBQUM1QixNQUFxQixPQUFRLFNBQVEsY0FBSTtJQUNyQyxzSEFBc0g7SUFDdEgsSUFBSSxDQUFlO0lBQ25CLFlBQVksSUFBZ0IsRUFBRSxNQUFjO1FBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBb0MsSUFBZ0IsRUFBRSxNQUFjO1FBQzNFLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssd0JBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFzQixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQy9EO1lBQ0QsS0FBSyx3QkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLElBQUksY0FBYyxDQUFDLElBQXlCLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDckU7WUFDRCxLQUFLLHdCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBdUIsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUNqRTtZQUNELEtBQUssd0JBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEIsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUF1QixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQ2pFO1lBQ0QsS0FBSyx3QkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLElBQUksZUFBZSxDQUFDLElBQTBCLEVBQUUsTUFBTSxD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