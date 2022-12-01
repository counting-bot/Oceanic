/** @module TextChannel */
import TextableChannel from "./TextableChannel";
import ThreadChannel from "./ThreadChannel";
import TypedCollection from "../util/TypedCollection";
/** Represents a guild text channel. */
export default class TextChannel extends TextableChannel {
    /** The threads in this channel. */
    threads;
    constructor(data, client) {
        super(data, client);
        this.threads = new TypedCollection(ThreadChannel, client);
    }
    /**
     * Convert this text channel to a announcement channel.
     */
    async convert() {
        return super.convert();
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel
     */
    async edit(options) {
        return this.client.rest.channels.edit(this.id, options);
    }
    /**
     * Follow an announcement channel to this channel.
     * @param webhookChannelID The ID of the channel to follow the announcement channel to.
     */
    async followAnnouncement(webhookChannelID) {
        return this.client.rest.channels.followAnnouncement(this.id, webhookChannelID);
    }
    /**
     * Get the private archived threads the current user has joined in this channel.
     * @param options The options for getting the joined private archived threads.
     */
    async getJoinedPrivateArchivedThreads(options) {
        return this.client.rest.channels.getJoinedPrivateArchivedThreads(this.id, options);
    }
    /**
     * Get the private archived threads in this channel.
     * @param options The options for getting the private archived threads.
     */
    async getPrivateArchivedThreads(options) {
        return this.client.rest.channels.getPrivateArchivedThreads(this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            threads: this.threads.map(thread => thread.id),
            type: this.type
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9UZXh0Q2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFJaEQsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFhNUMsT0FBTyxlQUFlLE1BQU0seUJBQXlCLENBQUM7QUFFdEQsdUNBQXVDO0FBQ3ZDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLGVBQTRCO0lBQ2pFLG1DQUFtQztJQUNuQyxPQUFPLENBQXdIO0lBRS9ILFlBQVksSUFBb0IsRUFBRSxNQUFjO1FBQzVDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUEwSCxDQUFDO0lBQ3ZMLENBQUM7SUFFRDs7T0FFRztJQUNNLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBa0MsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ00sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUErQjtRQUMvQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDLGdCQUF3QjtRQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxPQUFtQztRQUNyRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMseUJBQXlCLENBQUMsT0FBbUM7UUFDL0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5QyxJQUFJLEVBQUssSUFBSSxDQUFDLElBQUk7U0FDckIsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9