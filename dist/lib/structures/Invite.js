"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Represents an invite. */
class Invite {
    client;
    /** The code of this invite. */
    code;
    constructor(data, client) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false
        });
        this.code = data.code;
    }
    toJSON() {
        return {
            code: this.code
        };
    }
}
exports.default = Invite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvSW52aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsNEJBQTRCO0FBQzVCLE1BQXFCLE1BQU07SUFDdkIsTUFBTSxDQUFVO0lBQ2hCLCtCQUErQjtJQUMvQixJQUFJLENBQVM7SUFDYixZQUFZLElBQXVDLEVBQUUsTUFBYztRQUMvRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxFQUFTLE1BQU07WUFDcEIsVUFBVSxFQUFJLEtBQUs7WUFDbkIsUUFBUSxFQUFNLEtBQUs7WUFDbkIsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTztZQUNILElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNsQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbkJELHlCQW1CQyJ9