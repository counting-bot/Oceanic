"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Channel */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const Constants_js_1 = require("../Constants.js");
// import TextChannel from "./TextChannel.js";
// import PrivateChannel from "./PrivateChannel.js";
// import VoiceChannel from "./VoiceChannel.js";
// import GroupChannel from "./GroupChannel.js";
// import CategoryChannel from "./CategoryChannel.js";
// import AnnouncementChannel from "./AnnouncementChannel.js";
// import AnnouncementThreadChannel from "./AnnouncementThreadChannel.js";
// import PublicThreadChannel from "./PublicThreadChannel.js";
// import PrivateThreadChannel from "./PrivateThreadChannel.js";
// import StageChannel from "./StageChannel.js";
// import ForumChannel from "./ForumChannel.js";
/** Represents a channel. */
class Channel extends Base_js_1.default {
    /** The [type](https://discord.com/developers/docs/resources/channel#channel-object-channel-types) of this channel. */
    type;
    constructor(data, client) {
        super(data.id, client);
        this.type = data.type;
    }
    static from(data, client) {
        switch (data.type) {
            case Constants_js_1.ChannelTypes.GUILD_TEXT: {
                return new TextChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.DM: {
                return new PrivateChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.GUILD_VOICE: {
                return new VoiceChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.GROUP_DM: {
                return new GroupChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.GUILD_CATEGORY: {
                return new CategoryChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.GUILD_ANNOUNCEMENT: {
                return new AnnouncementChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.ANNOUNCEMENT_THREAD: {
                return new AnnouncementThreadChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.PUBLIC_THREAD: {
                return new PublicThreadChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.PRIVATE_THREAD: {
                return new PrivateThreadChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.GUILD_STAGE_VOICE: {
                return new StageChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.GUILD_FORUM: {
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
const TextChannel = require("./TextChannel.js").default;
const PrivateChannel = require("./PrivateChannel.js").default;
const VoiceChannel = require("./VoiceChannel.js").default;
const CategoryChannel = require("./CategoryChannel.js").default;
const GroupChannel = require("./GroupChannel").default;
const AnnouncementChannel = require("./AnnouncementChannel.js").default;
const PublicThreadChannel = require("./PublicThreadChannel.js").default;
const PrivateThreadChannel = require("./PrivateThreadChannel.js").default;
const AnnouncementThreadChannel = require("./AnnouncementThreadChannel.js").default;
const StageChannel = require("./StageChannel.js").default;
const ForumChannel = require("./ForumChannel.js").default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLGdFQUE2QjtBQUM3QixrREFBK0M7QUFtQi9DLDhDQUE4QztBQUM5QyxvREFBb0Q7QUFDcEQsZ0RBQWdEO0FBQ2hELGdEQUFnRDtBQUNoRCxzREFBc0Q7QUFDdEQsOERBQThEO0FBQzlELDBFQUEwRTtBQUMxRSw4REFBOEQ7QUFDOUQsZ0VBQWdFO0FBQ2hFLGdEQUFnRDtBQUNoRCxnREFBZ0Q7QUFFaEQsNEJBQTRCO0FBQzVCLE1BQXFCLE9BQVEsU0FBUSxpQkFBSTtJQUNyQyxzSEFBc0g7SUFDdEgsSUFBSSxDQUFlO0lBQ25CLFlBQVksSUFBZ0IsRUFBRSxNQUFjO1FBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBb0MsSUFBZ0IsRUFBRSxNQUFjO1FBQzNFLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssMkJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFzQixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQy9EO1lBQ0QsS0FBSywyQkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLElBQUksY0FBYyxDQUFDLElBQXlCLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDckU7WUFDRCxLQUFLLDJCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBdUIsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUNqRTtZQUNELEtBQUssMkJBQVksQ0FBQyxRQUFRLENBQUMs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