"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module AnnouncementChannel */
const TextableChannel_js_1 = tslib_1.__importDefault(require("./TextableChannel.js"));
const AnnouncementThreadChannel_js_1 = tslib_1.__importDefault(require("./AnnouncementThreadChannel.js"));
const TypedCollection_js_1 = tslib_1.__importDefault(require("../util/TypedCollection.js"));
/** Represents a guild announcement channel. */
class AnnouncementChannel extends TextableChannel_js_1.default {
    /** The threads in this channel. */
    threads;
    constructor(data, client) {
        super(data, client);
        this.threads = new TypedCollection_js_1.default(AnnouncementThreadChannel_js_1.default, client);
    }
    get parent() {
        return super.parent;
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
exports.default = AnnouncementChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3VuY2VtZW50Q2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0Fubm91bmNlbWVudENoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQWtDO0FBQ2xDLHNGQUFtRDtBQUVuRCwwR0FBdUU7QUFLdkUsNEZBQXlEO0FBRXpELCtDQUErQztBQUMvQyxNQUFxQixtQkFBb0IsU0FBUSw0QkFBb0M7SUFHakYsbUNBQW1DO0lBQ25DLE9BQU8sQ0FBbUY7SUFFMUYsWUFBWSxJQUE0QixFQUFFLE1BQWM7UUFDcEQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksNEJBQWUsQ0FBQyxzQ0FBeUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsSUFBYSxNQUFNO1FBQ2YsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixnQkFBZ0IsRUFBRSxDQUFDO1lBQ25CLE9BQU8sRUFBVyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDdkQsSUFBSSxFQUFjLElBQUksQ0FBQyxJQUFJO1NBQzlCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF2QkQsc0NBdUJDIn0=