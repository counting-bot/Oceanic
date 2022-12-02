"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module TypedEmitter */
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */
const UncaughtError_js_1 = tslib_1.__importDefault(require("./UncaughtError.js"));
const node_events_1 = tslib_1.__importDefault(require("node:events"));
class TypedEmitter extends node_events_1.default {
    emit(eventName, ...args) {
        if (this.listenerCount(eventName) === 0) {
            if (eventName === "error") {
                throw new UncaughtError_js_1.default(args[0]);
            }
            return false;
        }
        return super.emit(eventName, ...args);
    }
}
exports.default = TypedEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZWRFbWl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWwvVHlwZWRFbWl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiw0SEFBNEg7QUFDNUgsa0ZBQStDO0FBQy9DLHNFQUF1QztBQWtCdkMsTUFBTSxZQUEwRCxTQUFRLHFCQUFZO0lBQ3ZFLElBQUksQ0FBeUIsU0FBWSxFQUFFLEdBQUcsSUFBZTtRQUNsRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtnQkFDdkIsTUFBTSxJQUFJLDBCQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEM7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFtQixFQUFFLEdBQUcsSUFBa0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDSjtBQUVELGtCQUFlLFlBQVksQ0FBQyJ9