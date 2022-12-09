"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Channel */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const Constants_js_1 = require("../Constants.js");
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
            case Constants_js_1.ChannelTypes.PUBLIC_THREAD: {
                return new PublicThreadChannel(data, client);
            }
            case Constants_js_1.ChannelTypes.PRIVATE_THREAD: {
                return new PrivateThreadChannel(data, client);
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
const PublicThreadChannel = require("./PublicThreadChannel.js").default;
const PrivateThreadChannel = require("./PrivateThreadChannel.js").default;
const ForumChannel = require("./ForumChannel.js").default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLGdFQUE2QjtBQUM3QixrREFBK0M7QUFhL0MsNEJBQTRCO0FBQzVCLE1BQXFCLE9BQVEsU0FBUSxpQkFBSTtJQUNyQyxzSEFBc0g7SUFDdEgsSUFBSSxDQUFlO0lBQ25CLFlBQVksSUFBZ0IsRUFBRSxNQUFjO1FBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBb0MsSUFBZ0IsRUFBRSxNQUFjO1FBQzNFLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssMkJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFzQixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQy9EO1lBQ0QsS0FBSywyQkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLElBQUksY0FBYyxDQUFDLElBQXlCLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDckU7WUFDRCxLQUFLLDJCQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUE4QixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQy9FO1lBQ0QsS0FBSywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLElBQUksb0JBQW9CLENBQUMsSUFBK0IsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUNqRjtZQUNELEtBQUssMkJBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUF1QixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQ2pFO1lBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ0wsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDekM7U0FDSjtJQUNMLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsSUFBSSxPQUFPO1FBQ1AsT0FBTyxLQUFLLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsTUFBTTtRQUNSLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNsQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBakRELDBCQWlEQztBQUVELHNGQUFzRjtBQUN0Riw4RUFBOEU7QUFDOUUsTUFBTSxXQUFXLEdBQUksT0FBTyxDQUFDLGtCQUFrQixDQUF1QyxDQUFDLE9BQU8sQ0FBQztBQUMvRixNQUFNLGNBQWMsR0FBSSxPQUFPLENBQUMscUJBQXFCLENBQTBDLENBQUMsT0FBTyxDQUFDO0FBQ3hHLE1BQU0sbUJBQW1CLEdBQUksT0FBTyxDQUFDLDBCQUEwQixDQUErQyxDQUFDLE9BQU8sQ0FBQztBQUN2SCxNQUFNLG9CQUFvQixHQUFJLE9BQU8sQ0FBQywyQkFBMkIsQ0FBZ0QsQ0FBQyxPQUFPLENBQUM7QUFDMUgsTUFBTSxZQUFZLEdBQUksT0FBTyxDQUFDLG1CQUFtQixDQUF3QyxDQUFDLE9BQU8sQ0FBQztBQUNsRyw2RUFBNkUifQ==