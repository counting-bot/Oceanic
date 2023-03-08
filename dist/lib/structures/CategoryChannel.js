"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module CategoryChannel */
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
/** Represents a guild category channel. */
class CategoryChannel extends GuildChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.update(data);
    }
    update(data) {
        super.update(data);
    }
}
exports.default = CategoryChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQ2F0ZWdvcnlDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhCQUE4QjtBQUM5QiwwRUFBMEM7QUFJMUMsMkNBQTJDO0FBQzNDLE1BQXFCLGVBQWdCLFNBQVEsc0JBQVk7SUFDckQsWUFBWSxJQUF3QixFQUFFLE1BQWM7UUFDaEQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQWlDO1FBQ3ZELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNKO0FBVEQsa0NBU0MifQ==