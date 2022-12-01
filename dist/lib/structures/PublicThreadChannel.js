/** @module PublicThreadChannel */
import ThreadChannel from "./ThreadChannel";
/** Represents a public thread channel. */
export default class PublicThreadChannel extends ThreadChannel {
    /** the IDs of the set of tags that have been applied to this thread. Forum channel threads only.  */
    appliedTags;
    constructor(data, client) {
        super(data, client);
        this.appliedTags = [];
    }
    update(data) {
        super.update(data);
        if (data.applied_tags !== undefined) {
            this.appliedTags = data.applied_tags;
        }
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
            appliedTags: this.appliedTags,
            threadMetadata: this.threadMetadata,
            type: this.type
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVibGljVGhyZWFkQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1B1YmxpY1RocmVhZENoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBTTVDLDBDQUEwQztBQUMxQyxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFvQixTQUFRLGFBQWtDO0lBQy9FLHFHQUFxRztJQUNyRyxXQUFXLENBQWdCO0lBRzNCLFlBQVksSUFBNEIsRUFBRSxNQUFjO1FBQ3BELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBcUM7UUFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDTSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQXVDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixXQUFXLEVBQUssSUFBSSxDQUFDLFdBQVc7WUFDaEMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLElBQUksRUFBWSxJQUFJLENBQUMsSUFBSTtTQUM1QixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=