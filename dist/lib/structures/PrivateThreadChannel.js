/** @module PrivateThreadChannel */
import ThreadChannel from "./ThreadChannel";
/** Represents a private thread channel.. */
export default class PrivateThreadChannel extends ThreadChannel {
    constructor(data, client) {
        super(data, client);
    }
    /**
     * Edit this channel.
     * @param options The options to edit the channel with.
     */
    async edit(options) {
        return this.client.rest.channels.edit(this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            threadMetadata: this.threadMetadata,
            type: this.type
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpdmF0ZVRocmVhZENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9Qcml2YXRlVGhyZWFkQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7QUFDbkMsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFNNUMsNENBQTRDO0FBQzVDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0JBQXFCLFNBQVEsYUFBbUM7SUFHakYsWUFBWSxJQUE2QixFQUFFLE1BQWM7UUFDckQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7OztPQUdHO0lBQ00sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUF3QztRQUN4RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLElBQUksRUFBWSxJQUFJLENBQUMsSUFBSTtTQUM1QixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=