import Base from "./Base.js";
import Permission from "./Permission.js";
/** Represents a guild retrieved via oauth. */
export default class OAuthGuild extends Base {
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount;
    /** The icon hash of this guild. */
    icon;
    /** The name of this guild. */
    name;
    /** If the user is the owner of this guild. */
    owner;
    /** The permissions of the user in this guild. */
    permissions;
    constructor(data, client) {
        super(data.id, client);
        this.approximateMemberCount = data.approximate_member_count;
        this.approximatePresenceCount = data.approximate_presence_count;
        this.name = data.name;
        this.icon = data.icon;
        this.owner = data.owner;
        this.permissions = new Permission(data.permissions);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGhHdWlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL09BdXRoR3VpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sV0FBVyxDQUFDO0FBQzdCLE9BQU8sVUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBSXpDLDhDQUE4QztBQUM5QyxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxJQUFJO0lBQ3hDLGtGQUFrRjtJQUNsRixzQkFBc0IsQ0FBVTtJQUNoQyw4RkFBOEY7SUFDOUYsd0JBQXdCLENBQVU7SUFDbEMsbUNBQW1DO0lBQ25DLElBQUksQ0FBZ0I7SUFDcEIsOEJBQThCO0lBQzlCLElBQUksQ0FBUztJQUNiLDhDQUE4QztJQUM5QyxLQUFLLENBQVU7SUFDZixpREFBaUQ7SUFDakQsV0FBVyxDQUFhO0lBQ3hCLFlBQVksSUFBbUIsRUFBRSxNQUFjO1FBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUM7UUFDNUQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQztRQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0oifQ==