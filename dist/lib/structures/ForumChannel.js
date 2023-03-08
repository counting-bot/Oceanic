"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ForumChannel */
const GuildChannel_js_1 = tslib_1.__importDefault(require("./GuildChannel.js"));
const PublicThreadChannel_js_1 = tslib_1.__importDefault(require("./PublicThreadChannel.js"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
/** Represents a forum channel. */
class ForumChannel extends GuildChannel_js_1.default {
    /** The most recently created thread. */
    lastThread;
    /** The threads in this channel. */
    threads;
    constructor(data, client) {
        super(data, client);
        this.threads = new TypedCollection_1.default(PublicThreadChannel_js_1.default, client);
        this.update(data);
    }
    update(data) {
        super.update(data);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            threads: this.threads.map(thread => thread.id)
        };
    }
}
exports.default = ForumChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ydW1DaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvRm9ydW1DaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixnRkFBNkM7QUFDN0MsOEZBQTJEO0FBSTNELHNGQUFzRDtBQUd0RCxrQ0FBa0M7QUFDbEMsTUFBcUIsWUFBYSxTQUFRLHlCQUFZO0lBRWxELHdDQUF3QztJQUN4QyxVQUFVLENBQThCO0lBQ3hDLG1DQUFtQztJQUNuQyxPQUFPLENBQXVFO0lBRTlFLFlBQVksSUFBcUIsRUFBRSxNQUFjO1FBQzdDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHlCQUFlLENBQXNELGdDQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBOEI7UUFDcEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUNqRCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBdkJELCtCQXVCQyJ9