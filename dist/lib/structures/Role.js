/** @module Role */
import Base from "./Base.js";
import Permission from "./Permission.js";
/** Represents a role in a guild. */
export default class Role extends Base {
    _cachedGuild;
    /** The id of the guild this role is in. */
    guildID;
    /** If this role is hoisted. */
    hoist;
    /** If this role is managed by an integration. */
    managed;
    /** If this role can be mentioned by anybody. */
    mentionable;
    /** The name of this role. */
    name;
    /** The permissions of this role. */
    permissions;
    /** The position of this role. */
    position;
    constructor(data, client, guildID) {
        super(data.id, client);
        this.guildID = guildID;
        this.hoist = !!data.hoist;
        this.managed = !!data.managed;
        this.mentionable = !!data.mentionable;
        this.name = data.name;
        this.permissions = new Permission(data.permissions);
        this.position = data.position;
        this.update(data);
    }
    update(data) {
        if (data.hoist !== undefined) {
            this.hoist = data.hoist;
        }
        if (data.mentionable !== undefined) {
            this.mentionable = data.mentionable;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.permissions !== undefined) {
            this.permissions = new Permission(data.permissions);
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            guildID: this.guildID,
            hoist: this.hoist,
            managed: this.managed,
            mentionable: this.mentionable,
            name: this.name,
            permissions: this.permissions.toJSON(),
            position: this.position
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1JvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUJBQW1CO0FBQ25CLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUM3QixPQUFPLFVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQU16QyxvQ0FBb0M7QUFDcEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxJQUFLLFNBQVEsSUFBSTtJQUMxQixZQUFZLENBQVM7SUFDN0IsMkNBQTJDO0lBQzNDLE9BQU8sQ0FBUztJQUNoQiwrQkFBK0I7SUFDL0IsS0FBSyxDQUFVO0lBQ2YsaURBQWlEO0lBQ2pELE9BQU8sQ0FBVTtJQUNqQixnREFBZ0Q7SUFDaEQsV0FBVyxDQUFVO0lBQ3JCLDZCQUE2QjtJQUM3QixJQUFJLENBQVM7SUFDYixvQ0FBb0M7SUFDcEMsV0FBVyxDQUFhO0lBQ3hCLGlDQUFpQztJQUNqQyxRQUFRLENBQVM7SUFDakIsWUFBWSxJQUFhLEVBQUUsTUFBYyxFQUFFLE9BQWU7UUFDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQXNCO1FBQzVDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDdkM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN6QjtRQUNELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdkQ7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixPQUFPLEVBQU0sSUFBSSxDQUFDLE9BQU87WUFDekIsS0FBSyxFQUFRLElBQUksQ0FBQyxLQUFLO1lBQ3ZCLE9BQU8sRUFBTSxJQUFJLENBQUMsT0FBTztZQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsSUFBSSxFQUFTLElBQUksQ0FBQyxJQUFJO1lBQ3RCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxRQUFRLEVBQUssSUFBSSxDQUFDLFFBQVE7U0FDN0IsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9