/** @module AnnouncementChannel */
import TextableChannel from "./TextableChannel";
import AnnouncementThreadChannel from "./AnnouncementThreadChannel";
import TypedCollection from "../util/TypedCollection";
/** Represents a guild announcement channel. */
export default class AnnouncementChannel extends TextableChannel {
    /** The threads in this channel. */
    threads;
    constructor(data, client) {
        super(data, client);
        this.threads = new TypedCollection(AnnouncementThreadChannel, client);
    }
    get parent() {
        return super.parent;
    }
    /**
     * Convert this announcement channel to a text channel.
     */
    async convert() {
        return super.convert();
    }
    /**
     * Crosspost a message in this channel.
     * @param messageID The ID of the message to crosspost.
     */
    async crosspostMessage(messageID) {
        return this.client.rest.channels.crosspostMessage(this.id, messageID);
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    async edit(options) {
        return this.client.rest.channels.edit(this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            rateLimitPerUser: 0,
            threads: this.threads.map(thread => thread.id),
            type: this.type
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3VuY2VtZW50Q2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0Fubm91bmNlbWVudENoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBR2hELE9BQU8seUJBQXlCLE1BQU0sNkJBQTZCLENBQUM7QUFNcEUsT0FBTyxlQUFlLE1BQU0seUJBQXlCLENBQUM7QUFFdEQsK0NBQStDO0FBQy9DLE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUJBQW9CLFNBQVEsZUFBb0M7SUFHakYsbUNBQW1DO0lBQ25DLE9BQU8sQ0FBbUY7SUFFMUYsWUFBWSxJQUE0QixFQUFFLE1BQWM7UUFDcEQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxJQUFhLE1BQU07UUFDZixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ00sS0FBSyxDQUFDLE9BQU87UUFDbEIsT0FBTyxLQUFLLENBQUMsT0FBTyxFQUEwQixDQUFDO0lBQ25ELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBaUI7UUFDcEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7OztPQUdHO0lBQ00sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFnQztRQUNoRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixPQUFPLEVBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ3ZELElBQUksRUFBYyxJQUFJLENBQUMsSUFBSTtTQUM5QixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=