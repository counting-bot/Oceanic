"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module PartialApplication */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
/** Represents a partial application. */
class PartialApplication extends Base_js_1.default {
    /** When false, only the application's owners can invite the bot to guilds. */
    botPublic;
    /** When true, the applications bot will only join upon the completion of the full oauth2 code grant flow. */
    botRequireCodeGrant;
    /** The description of the application. */
    description;
    /** The icon hash of the application. */
    icon;
    /** The name of the application. */
    name;
    /** The bot's hex encoded public key. */
    verifyKey;
    constructor(data, client) {
        super(data.id, client);
        this.description = data.description;
        this.icon = null;
        this.name = data.name;
        this.verifyKey = data.verify_key;
        this.update(data);
    }
    update(data) {
        if (data.bot_public !== undefined) {
            this.botPublic = data.bot_public;
        }
        if (data.bot_require_code_grant !== undefined) {
            this.botRequireCodeGrant = data.bot_require_code_grant;
        }
        if (data.description !== undefined) {
            this.description = data.description;
        }
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            botPublic: this.botPublic,
            botRequireCodeGrant: this.botRequireCodeGrant,
            description: this.description,
            icon: this.icon,
            name: this.name,
            verifyKey: this.verifyKey
        };
    }
}
exports.default = PartialApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydGlhbEFwcGxpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvUGFydGlhbEFwcGxpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyxnRUFBNkI7QUFLN0Isd0NBQXdDO0FBQ3hDLE1BQXFCLGtCQUFtQixTQUFRLGlCQUFJO0lBQ2hELDhFQUE4RTtJQUM5RSxTQUFTLENBQVc7SUFDcEIsNkdBQTZHO0lBQzdHLG1CQUFtQixDQUFXO0lBQzlCLDBDQUEwQztJQUMxQyxXQUFXLENBQVM7SUFDcEIsd0NBQXdDO0lBQ3hDLElBQUksQ0FBZ0I7SUFDcEIsbUNBQW1DO0lBQ25DLElBQUksQ0FBUztJQUNiLHdDQUF3QztJQUN4QyxTQUFTLENBQVU7SUFDbkIsWUFBWSxJQUEyQixFQUFFLE1BQWM7UUFDbkQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRWtCLE1BQU0sQ0FBQyxJQUEyQjtRQUNqRCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUNwQztRQUNELElBQUksSUFBSSxDQUFDLHNCQUFzQixLQUFLLFNBQVMsRUFBRTtZQUMzQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1NBQzFEO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDdkM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN6QjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLFNBQVMsRUFBWSxJQUFJLENBQUMsU0FBUztZQUNuQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQzdDLFdBQVcsRUFBVSxJQUFJLENBQUMsV0FBVztZQUNyQyxJQUFJLEVBQWlCLElBQUksQ0FBQyxJQUFJO1lBQzlCLElBQUksRUFBaUIsSUFBSSxDQUFDLElBQUk7WUFDOUIsU0FBUyxFQUFZLElBQUksQ0FBQyxTQUFTO1NBQ3RDLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFuREQscUNBbURDIn0=