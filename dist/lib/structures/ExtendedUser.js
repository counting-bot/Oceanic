"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ExtendedUser */
const User_js_1 = tslib_1.__importDefault(require("./User.js"));
/** Represents the currently authenticated user. */
class ExtendedUser extends User_js_1.default {
    /** The user's email. (always null for bots) */
    email;
    /** The flags of the user. */
    flags;
    /** The locale of the user */
    locale;
    /** If the user has mfa enabled on their account */
    mfaEnabled;
    /** If this user's email is verified. (always true for bots) */
    verified;
    constructor(data, client) {
        super(data, client);
        this.email = data.email;
        this.flags = data.flags;
        this.verified = !!data.verified;
        this.mfaEnabled = !!data.mfa_enabled;
        this.update(data);
    }
    update(data) {
        super.update(data);
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.locale !== undefined) {
            this.locale = data.locale;
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            email: this.email,
            flags: this.flags,
            locale: this.locale,
            mfaEnabled: this.mfaEnabled,
            verified: this.verified
        };
    }
}
exports.default = ExtendedUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0ZW5kZWRVc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvRXh0ZW5kZWRVc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixnRUFBNkI7QUFLN0IsbURBQW1EO0FBQ25ELE1BQXFCLFlBQWEsU0FBUSxpQkFBSTtJQUMxQywrQ0FBK0M7SUFDL0MsS0FBSyxDQUFnQjtJQUNyQiw2QkFBNkI7SUFDN0IsS0FBSyxDQUFTO0lBQ2QsNkJBQTZCO0lBQzdCLE1BQU0sQ0FBVTtJQUNoQixtREFBbUQ7SUFDbkQsVUFBVSxDQUFVO0lBQ3BCLCtEQUErRDtJQUMvRCxRQUFRLENBQVU7SUFDbEIsWUFBWSxJQUFrQixFQUFFLE1BQWM7UUFDMUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQTJCO1FBQ2pELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLEtBQUssRUFBTyxJQUFJLENBQUMsS0FBSztZQUN0QixLQUFLLEVBQU8sSUFBSSxDQUFDLEtBQUs7WUFDdEIsTUFBTSxFQUFNLElBQUksQ0FBQyxNQUFNO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVBQUksSUFBSSxDQUFDLFFBQVE7U0FDNUIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTNDRCwrQkEyQ0MifQ==