"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module PublicThreadChannel */
const ThreadChannel_js_1 = tslib_1.__importDefault(require("./ThreadChannel.js"));
/** Represents a public thread channel. */
class PublicThreadChannel extends ThreadChannel_js_1.default {
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
    toJSON() {
        return {
            ...super.toJSON(),
            appliedTags: this.appliedTags,
            threadMetadata: this.threadMetadata,
            type: this.type
        };
    }
}
exports.default = PublicThreadChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVibGljVGhyZWFkQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1B1YmxpY1RocmVhZENoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQWtDO0FBQ2xDLGtGQUErQztBQU0vQywwQ0FBMEM7QUFDMUMsTUFBcUIsbUJBQW9CLFNBQVEsMEJBQWtDO0lBQy9FLHFHQUFxRztJQUNyRyxXQUFXLENBQWdCO0lBRzNCLFlBQVksSUFBNEIsRUFBRSxNQUFjO1FBQ3BELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBcUM7UUFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixXQUFXLEVBQUssSUFBSSxDQUFDLFdBQVc7WUFDaEMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLElBQUksRUFBWSxJQUFJLENBQUMsSUFBSTtTQUM1QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekJELHNDQXlCQyJ9