"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module AnnouncementThreadChannel */
const ThreadChannel_js_1 = tslib_1.__importDefault(require("./ThreadChannel.js"));
/** Represents a public thread channel in an announcement channel. */
class AnnouncementThreadChannel extends ThreadChannel_js_1.default {
    constructor(data, client) {
        super(data, client);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            threadMetadata: this.threadMetadata,
            type: this.type
        };
    }
}
exports.default = AnnouncementThreadChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3VuY2VtZW50VGhyZWFkQ2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0Fubm91bmNlbWVudFRocmVhZENoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQXdDO0FBQ3hDLGtGQUErQztBQU0vQyxxRUFBcUU7QUFDckUsTUFBcUIseUJBQTBCLFNBQVEsMEJBQXdDO0lBRzNGLFlBQVksSUFBa0MsRUFBRSxNQUFjO1FBQzFELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxJQUFJLEVBQVksSUFBSSxDQUFDLElBQUk7U0FDNUIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWRELDRDQWNDIn0=