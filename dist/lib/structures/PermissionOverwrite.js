/** @module PermissionOverwrite */
import Base from "./Base.js";
import Permission from "./Permission.js";
/** Represents a permission overwrite. */
export default class PermissionOverwrite extends Base {
    /** The permissions of this overwrite. */
    permission;
    /** The type of this overwrite. `0` for role, `1` for user. */
    type;
    constructor(data, client) {
        super(data.id, client);
        this.permission = new Permission(data.allow, data.deny);
        this.type = data.type;
    }
    update(data) {
        if (data.allow !== undefined || data.deny !== undefined) {
            this.permission = new Permission(data.allow ?? 0n, data.deny ?? 0n);
        }
    }
    get allow() {
        return this.permission.allow;
    }
    get deny() {
        return this.permission.deny;
    }
    /** A key-value map of permission to if it's been allowed or denied (not present if neither) */
    get json() {
        return this.permission.json;
    }
    /**
     *Check if this permissions instance has the given permissions allowed
     * @param permissions The permissions to check for.
     */
    has(...permissions) {
        return this.permission.has(...permissions);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            permission: this.permission.toJSON(),
            type: this.type
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbk92ZXJ3cml0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1Blcm1pc3Npb25PdmVyd3JpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUM3QixPQUFPLFVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQU16Qyx5Q0FBeUM7QUFDekMsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQkFBb0IsU0FBUSxJQUFJO0lBQ2pELHlDQUF5QztJQUN6QyxVQUFVLENBQWE7SUFDdkIsOERBQThEO0lBQzlELElBQUksQ0FBaUI7SUFDckIsWUFBWSxJQUFrQixFQUFFLE1BQWM7UUFDMUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBMkI7UUFDakQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdkU7SUFDTCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQsK0ZBQStGO0lBQy9GLElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEdBQUcsQ0FBQyxHQUFHLFdBQTRDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ3BDLElBQUksRUFBUSxJQUFJLENBQUMsSUFBSTtTQUN4QixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=