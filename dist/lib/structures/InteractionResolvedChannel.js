import Permission from "./Permission";
import Channel from "./Channel";
/** Represents a channel from an interaction option. This can be any guild channel, or a direct message. */
export default class InteractionResolvedChannel extends Channel {
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
        this.appPermissions = new Permission(data.permissions);
        this.name = data.name;
        this.parentID = data.parent_id ?? null;
        this.threadMetadata = data.thread_metadata ? {
            archiveTimestamp: new Date(data.thread_metadata.archive_timestamp),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25SZXNvbHZlZENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvblJlc29sdmVkQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBT2hDLDJHQUEyRztBQUMzRyxNQUFNLENBQUMsT0FBTyxPQUFPLDBCQUEyQixTQUFRLE9BQU87SUFDbkQsc0JBQXNCLENBQW9DO0lBQzFELGFBQWEsQ0FBMkQ7SUFDaEYsa0RBQWtEO0lBQ2xELGNBQWMsQ0FBYTtJQUMzQixnQ0FBZ0M7SUFDaEMsSUFBSSxDQUFnQjtJQUNwQix5RUFBeUU7SUFDekUsUUFBUSxDQUFnQjtJQUN4QiwrTEFBK0w7SUFDL0wsY0FBYyxDQUFnRDtJQUU5RCxZQUFZLElBQW1DLEVBQUUsTUFBYztRQUMzRCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDekMsZ0JBQWdCLEVBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztZQUNyRSxRQUFRLEVBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUTtZQUNwRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQjtZQUMvRCxlQUFlLEVBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7WUFDcEgsTUFBTSxFQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU07WUFDbEQsU0FBUyxFQUFZLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUztTQUN0RCxDQUFDLENBQUMsQ0FBRSxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsMkVBQTJFO0lBQzNFLElBQUksZUFBZTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxRTtRQUVELE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO0lBQ3ZDLENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsSUFBSSxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRTtZQUN2RCxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFtRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUMvSTtRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMxRixDQUFDO0NBQ0oifQ==