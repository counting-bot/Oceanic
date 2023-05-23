/** @module Permission */
import { Permissions } from "../Constants.js";
/** Represents a permission. */
export default class Permission {
    /** The allowed permissions for this permission instance. */
    allow;
    /** The denied permissions for this permission instance. */
    deny;
    #json;
    constructor(allow, deny = 0n) {
        this.allow = BigInt(allow);
        this.deny = BigInt(deny);
        Object.defineProperty(this, "#json", {
            value: undefined,
            enumerable: false,
            writable: true,
            configurable: false
        });
    }
    /** A key-value map of permission to if it's been allowed or denied (not present if neither) */
    get json() {
        if (this.#json) {
            return this.#json;
        }
        else {
            const json = {};
            for (const perm of Object.keys(Permissions)) {
                if (this.allow & Permissions[perm]) {
                    json[perm] = true;
                }
                else if (this.deny & Permissions[perm]) {
                    json[perm] = false;
                }
            }
            return (this.#json = json);
        }
    }
    /**
     * Check if this permissions instance has the given permissions allowed
     * @param permissions The permissions to check for.
     */
    has(...permissions) {
        for (const perm of permissions) {
            if (typeof perm === "bigint") {
                if ((this.allow & perm) !== perm) {
                    return false;
                }
            }
            else if (!(this.allow & Permissions[perm])) {
                return false;
            }
        }
        return true;
    }
    toJSON() {
        return {
            allow: this.allow.toString(),
            deny: this.deny.toString()
        };
    }
    toString() {
        return `[${this.constructor.name} +${this.allow} -${this.deny}]`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1Blcm1pc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQTBDLE1BQU0saUJBQWlCLENBQUM7QUFHdEYsK0JBQStCO0FBQy9CLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVTtJQUMzQiw0REFBNEQ7SUFDNUQsS0FBSyxDQUFTO0lBQ2QsMkRBQTJEO0lBQzNELElBQUksQ0FBUztJQUNiLEtBQUssQ0FBd0Q7SUFDN0QsWUFBWSxLQUFzQixFQUFFLE9BQXdCLEVBQUU7UUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ2pDLEtBQUssRUFBUyxTQUFTO1lBQ3ZCLFVBQVUsRUFBSSxLQUFLO1lBQ25CLFFBQVEsRUFBTSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwrRkFBK0Y7SUFDL0YsSUFBSSxJQUFJO1FBQ0osSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3JCO2FBQU07WUFDSCxNQUFNLElBQUksR0FBRyxFQUErQyxDQUFDO1lBQzdELEtBQUssTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQW9DLEVBQUU7Z0JBQzVFLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ3JCO3FCQUFNLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQ3RCO2FBQ0o7WUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxHQUFHLENBQUMsR0FBRyxXQUE0QztRQUMvQyxLQUFLLE1BQU0sSUFBSSxJQUFJLFdBQVcsRUFBRTtZQUM1QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUM5QixPQUFPLEtBQUssQ0FBQztpQkFDaEI7YUFDSjtpQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUMxQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPO1lBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUksRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtTQUM5QixDQUFDO0lBQ04sQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7SUFDckUsQ0FBQztDQUNKIn0=