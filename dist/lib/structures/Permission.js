"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_js_1 = require("../Constants.js");
/** Represents a permission. */
class Permission {
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
        if (!this.#json) {
            const json = {};
            for (const perm of Object.keys(Constants_js_1.Permissions)) {
                if (this.allow & Constants_js_1.Permissions[perm]) {
                    json[perm] = true;
                }
                else if (this.deny & Constants_js_1.Permissions[perm]) {
                    json[perm] = false;
                }
            }
            return (this.#json = json);
        }
        else {
            return this.#json;
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
            else if (!(this.allow & Constants_js_1.Permissions[perm])) {
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
exports.default = Permission;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1Blcm1pc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrREFBOEM7QUFHOUMsK0JBQStCO0FBQy9CLE1BQXFCLFVBQVU7SUFDM0IsNERBQTREO0lBQzVELEtBQUssQ0FBUztJQUNkLDJEQUEyRDtJQUMzRCxJQUFJLENBQVM7SUFDYixLQUFLLENBQXdEO0lBQzdELFlBQVksS0FBc0IsRUFBRSxPQUF3QixFQUFFO1FBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNqQyxLQUFLLEVBQVMsU0FBUztZQUN2QixVQUFVLEVBQUksS0FBSztZQUNuQixRQUFRLEVBQU0sSUFBSTtZQUNsQixZQUFZLEVBQUUsS0FBSztTQUN0QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0ZBQStGO0lBQy9GLElBQUksSUFBSTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEdBQUcsRUFBK0MsQ0FBQztZQUM3RCxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQVcsQ0FBb0MsRUFBRTtnQkFDNUUsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLDBCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ3JCO3FCQUFNLElBQUksSUFBSSxDQUFDLElBQUksR0FBRywwQkFBVyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUN0QjthQUNKO1lBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxHQUFHLENBQUMsR0FBRyxXQUE0QztRQUMvQyxLQUFLLE1BQU0sSUFBSSxJQUFJLFdBQVcsRUFBRTtZQUM1QixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUM5QixPQUFPLEtBQUssQ0FBQztpQkFDaEI7YUFDSjtpQkFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLDBCQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDMUMsT0FBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUM1QixJQUFJLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDOUIsQ0FBQztJQUNOLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ3JFLENBQUM7Q0FDSjtBQS9ERCw2QkErREMifQ==