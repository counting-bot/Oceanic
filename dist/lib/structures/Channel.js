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
            case Constants_js_1.ChannelTypes.GUILD_FORUM: {
                return new ForumChannel(data, client);
            }
            default: {
                return new Channel(data, client);
            }
        }
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
const CategoryChannel = require("./CategoryChannel.js").default;
const AnnouncementChannel = require("./AnnouncementChannel.js").default;
const AnnouncementThreadChannel = require("./AnnouncementThreadChannel.js").default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0NoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0JBQXNCO0FBQ3RCLGdFQUE2QjtBQUM3QixrREFBK0M7QUFnQi9DLDRCQUE0QjtBQUM1QixNQUFxQixPQUFRLFNBQVEsaUJBQUk7SUFDckMsc0hBQXNIO0lBQ3RILElBQUksQ0FBZTtJQUNuQixZQUFZLElBQWdCLEVBQUUsTUFBYztRQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQW9DLElBQWdCLEVBQUUsTUFBYztRQUMzRSxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZixLQUFLLDJCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBc0IsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUMvRDtZQUNELEtBQUssMkJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUF5QixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQ3JFO1lBQ0QsS0FBSywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLElBQUksZUFBZSxDQUFDLElBQTBCLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDdkU7WUFDRCxLQUFLLDJCQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQThCLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDL0U7WUFDRCxLQUFLLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxJQUFJLHlCQUF5QixDQUFDLElBQW9DLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDM0Y7WUFDRCxLQUFLLDJCQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUE4QixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQy9FO1lBQ0QsS0FBSywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLElBQUksb0JBQW9CLENBQUMsSUFBK0IsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUNqRjtZQUNELEtBQUssMkJBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUF1QixFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQ2pFO1lBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ0wsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDekM7U0FDSjtJQUNMLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTlDRCwwQkE4Q0M7QUFFRCxzRkFBc0Y7QUFDdEYsOEVBQThFO0FBQzlFLE1BQU0sV0FBVyxHQUFJLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBdUMsQ0FBQyxPQUFPLENBQUM7QUFDL0YsTUFBTSxjQUFjLEdBQUksT0FBTyxDQUFDLHFCQUFxQixDQUEwQyxDQUFDLE9BQU8sQ0FBQztBQUN4RyxNQUFNLG1CQUFtQixHQUFJLE9BQU8sQ0FBQywwQkFBMEIsQ0FBK0MsQ0FBQyxPQUFPLENBQUM7QUFDdkgsTUFBTSxvQkFBb0IsR0FBSSxPQUFPLENBQUMsMkJBQTJCLENBQWdELENBQUMsT0FBTyxDQUFDO0FBQzFILE1BQU0sWUFBWSxHQUFJLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBd0MsQ0FBQyxPQUFPLENBQUM7QUFDbEcsTUFBTSxlQUFlLEdBQUksT0FBTyxDQUFDLHNCQUFzQixDQUEyQyxDQUFDLE9BQU8sQ0FBQztBQUMzRyxNQUFNLG1CQUFtQixHQUFJLE9BQU8sQ0FBQywwQkFBMEIsQ0FBK0MsQ0FBQyxPQUFPLENBQUM7QUFDdkgsTUFBTSx5QkFBeUIsR0FBSSxPQUFPLENBQUMsZ0NBQWdDLENBQXFELENBQUMsT0FBTyxDQUFDO0FBQ3pJLDZFQUE2RSJ9