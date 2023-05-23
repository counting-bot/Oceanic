/** @module ExtendedUser */
import User from "./User.js";
/** Represents the currently authenticated user. */
export default class ExtendedUser extends User {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0ZW5kZWRVc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvRXh0ZW5kZWRVc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJCQUEyQjtBQUMzQixPQUFPLElBQUksTUFBTSxXQUFXLENBQUM7QUFLN0IsbURBQW1EO0FBQ25ELE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLElBQUk7SUFDMUMsK0NBQStDO0lBQy9DLEtBQUssQ0FBZ0I7SUFDckIsNkJBQTZCO0lBQzdCLEtBQUssQ0FBUztJQUNkLDZCQUE2QjtJQUM3QixNQUFNLENBQVU7SUFDaEIsbURBQW1EO0lBQ25ELFVBQVUsQ0FBVTtJQUNwQiwrREFBK0Q7SUFDL0QsUUFBUSxDQUFVO0lBQ2xCLFlBQVksSUFBa0IsRUFBRSxNQUFjO1FBQzFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRWtCLE1BQU0sQ0FBQyxJQUEyQjtRQUNqRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixLQUFLLEVBQU8sSUFBSSxDQUFDLEtBQUs7WUFDdEIsS0FBSyxFQUFPLElBQUksQ0FBQyxLQUFLO1lBQ3RCLE1BQU0sRUFBTSxJQUFJLENBQUMsTUFBTTtZQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsUUFBUSxFQUFJLElBQUksQ0FBQyxRQUFRO1NBQzVCLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==