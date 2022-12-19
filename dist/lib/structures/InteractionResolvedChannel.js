"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Permission_js_1 = tslib_1.__importDefault(require("./Permission.js"));
const Channel_js_1 = tslib_1.__importDefault(require("./Channel.js"));
/** Represents a channel from an interaction option. This can be any guild channel, or a direct message. */
class InteractionResolvedChannel extends Channel_js_1.default {
    _cachedCompleteChannel;
    _cachedParent;
    /** The permissions the bot has in the channel. */
    appPermissions;
    /** The name of this channel. */
    name;
    /** The ID of the parent of this channel, if this represents a thread. */
    parentID;
    /** The [thread metadata](https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure) associated with this channel, if this represents a thread. */
    threadMetadata;
    constructor(data, client) {
        super(data, client);
        this.appPermissions = new Permission_js_1.default(data.permissions);
        this.name = data.name;
        this.parentID = data.parent_id ?? null;
        this.threadMetadata = data.thread_metadata ? {
            archived: !!data.thread_metadata.archived,
            autoArchiveDuration: data.thread_metadata.auto_archive_duration,
            createTimestamp: !data.thread_metadata.create_timestamp ? null : new Date(data.thread_metadata.create_timestamp),
            locked: !!data.thread_metadata.locked,
            invitable: data.thread_metadata.invitable
        } : null;
    }
    /** The complete channel this channel option represents, if it's cached. */
    get completeChannel() {
        if (!this._cachedCompleteChannel) {
            return (this._cachedCompleteChannel = this.client.getChannel(this.id));
        }
        return this._cachedCompleteChannel;
    }
    /** The parent of this channel, if this represents a thread. */
    get parent() {
        if (this.parentID !== null && this._cachedParent !== null) {
            return this._cachedParent ?? (this._cachedParent = this.client.getChannel(this.parentID));
        }
        return this._cachedParent === null ? this._cachedParent : (this._cachedParent = null);
    }
}
exports.default = InteractionResolvedChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25SZXNvbHZlZENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvblJlc29sdmVkQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSw0RUFBeUM7QUFDekMsc0VBQW1DO0FBT25DLDJHQUEyRztBQUMzRyxNQUFxQiwwQkFBMkIsU0FBUSxvQkFBTztJQUNuRCxzQkFBc0IsQ0FBb0M7SUFDMUQsYUFBYSxDQUEyRDtJQUNoRixrREFBa0Q7SUFDbEQsY0FBYyxDQUFhO0lBQzNCLGdDQUFnQztJQUNoQyxJQUFJLENBQWdCO0lBQ3BCLHlFQUF5RTtJQUN6RSxRQUFRLENBQWdCO0lBQ3hCLCtMQUErTDtJQUMvTCxjQUFjLENBQWdEO0lBRTlELFlBQVksSUFBbUMsRUFBRSxNQUFjO1FBQzNELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDekMsUUFBUSxFQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7WUFDcEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUI7WUFDL0QsZUFBZSxFQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1lBQ3BILE1BQU0sRUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNO1lBQ2xELFNBQVMsRUFBWSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7U0FDdEQsQ0FBQyxDQUFDLENBQUUsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDJFQUEyRTtJQUMzRSxJQUFJLGVBQWU7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUU7UUFFRCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztJQUN2QyxDQUFDO0lBRUQsK0RBQStEO0lBQy9ELElBQUksTUFBTTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7WUFDdkQsT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBbUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDL0k7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDMUYsQ0FBQztDQUNKO0FBM0NELDZDQTJDQyJ9