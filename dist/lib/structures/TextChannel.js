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
    toJSON() {
        return {
            ...super.toJSON(),
            threads: this.threads.map(thread => thread.id),
            type: this.type
        };
    }
}
exports.default = TextChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9UZXh0Q2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsc0ZBQW1EO0FBR25ELGtGQUErQztBQUsvQyw0RkFBeUQ7QUFFekQsdUNBQXVDO0FBQ3ZDLE1BQXFCLFdBQVksU0FBUSw0QkFBNEI7SUFDakUsbUNBQW1DO0lBQ25DLE9BQU8sQ0FBd0g7SUFFL0gsWUFBWSxJQUFvQixFQUFFLE1BQWM7UUFDNUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksNEJBQWUsQ0FBQywwQkFBYSxFQUFFLE1BQU0sQ0FBMEgsQ0FBQztJQUN2TCxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUM5QyxJQUFJLEVBQUssSUFBSSxDQUFDLElBQUk7U0FDckIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWhCRCw4QkFnQkMifQ==