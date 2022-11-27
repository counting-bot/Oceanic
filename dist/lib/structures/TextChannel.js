"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module TextChannel */
const TextableChannel_1 = tslib_1.__importDefault(require("./TextableChannel"));
const ThreadChannel_1 = tslib_1.__importDefault(require("./ThreadChannel"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
/** Represents a guild text channel. */
class TextChannel extends TextableChannel_1.default {
    /** The threads in this channel. */
    threads;
    constructor(data, client) {
        super(data, client);
        this.threads = new TypedCollection_1.default(ThreadChannel_1.default, client);
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
exports.default = TextChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9UZXh0Q2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsZ0ZBQWdEO0FBSWhELDRFQUE0QztBQWE1QyxzRkFBc0Q7QUFFdEQsdUNBQXVDO0FBQ3ZDLE1BQXFCLFdBQVksU0FBUSx5QkFBNEI7SUFDakUsbUNBQW1DO0lBQ25DLE9BQU8sQ0FBd0g7SUFFL0gsWUFBWSxJQUFvQixFQUFFLE1BQWM7UUFDNUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUkseUJBQWUsQ0FBQyx1QkFBYSxFQUFFLE1BQU0sQ0FBMEgsQ0FBQztJQUN2TCxDQUFDO0lBRUQ7O09BRUc7SUFDTSxLQUFLLENBQUMsT0FBTztRQUNsQixPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQWtDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7T0FHRztJQUNNLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBK0I7UUFDL0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBd0I7UUFDN0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsK0JBQStCLENBQUMsT0FBbUM7UUFDckUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHlCQUF5QixDQUFDLE9BQW1DO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDOUMsSUFBSSxFQUFLLElBQUksQ0FBQyxJQUFJO1NBQ3JCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF2REQsOEJBdURDIn0=