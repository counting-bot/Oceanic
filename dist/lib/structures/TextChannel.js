"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module TextChannel */
const TextableChannel_js_1 = tslib_1.__importDefault(require("./TextableChannel.js"));
const ThreadChannel_js_1 = tslib_1.__importDefault(require("./ThreadChannel.js"));
const TypedCollection_js_1 = tslib_1.__importDefault(require("../util/TypedCollection.js"));
/** Represents a guild text channel. */
class TextChannel extends TextableChannel_js_1.default {
    /** The threads in this channel. */
    threads;
    constructor(data, client) {
        super(data, client);
        this.threads = new TypedCollection_js_1.default(ThreadChannel_js_1.default, client);
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel
     */
    async edit(options) {
        return this.client.rest.channels.edit(this.id, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9UZXh0Q2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsc0ZBQW1EO0FBR25ELGtGQUErQztBQVkvQyw0RkFBeUQ7QUFFekQsdUNBQXVDO0FBQ3ZDLE1BQXFCLFdBQVksU0FBUSw0QkFBNEI7SUFDakUsbUNBQW1DO0lBQ25DLE9BQU8sQ0FBd0g7SUFFL0gsWUFBWSxJQUFvQixFQUFFLE1BQWM7UUFDNUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksNEJBQWUsQ0FBQywwQkFBYSxFQUFFLE1BQU0sQ0FBMEgsQ0FBQztJQUN2TCxDQUFDO0lBR0Q7OztPQUdHO0lBQ00sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUErQjtRQUMvQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLCtCQUErQixDQUFDLE9BQW1DO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxPQUFtQztRQUMvRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzlDLElBQUksRUFBSyxJQUFJLENBQUMsSUFBSTtTQUNyQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekNELDhCQXlDQyJ9