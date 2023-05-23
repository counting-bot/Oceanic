/** @module User */
import Base from "./Base.js";
/** Represents a user. */
export default class User extends Base {
    /** The user's banner color. If this member was received via the gateway, this will never be present. */
    accentColor;
    /** The user's avatar hash. */
    avatar;
    /** The hash of this user's avatar decoration. This will always resolve to a png. */
    avatarDecoration;
    /** The user's banner hash. If this member was received via the gateway, this will never be present. */
    banner;
    /** If this user is a bot. */
    bot;
    /** The 4 digits after the user's username. */
    discriminator;
    /** If this user is an official discord system user. */
    system;
    /** The user's username. */
    username;
    constructor(data, client) {
        super(data.id, client);
        this.avatar = null;
        this.bot = !!data.bot;
        this.discriminator = data.discriminator;
        this.system = !!data.system;
        this.username = data.username;
        this.update(data);
    }
    update(data) {
        if (data.avatar !== undefined) {
            this.avatar = data.avatar;
        }
        if (data.banner !== undefined) {
            this.banner = data.banner;
        }
        if (data.discriminator !== undefined) {
            this.discriminator = data.discriminator;
        }
        if (data.username !== undefined) {
            this.username = data.username;
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            accentColor: this.accentColor,
            avatar: this.avatar,
            banner: this.banner,
            bot: this.bot,
            discriminator: this.discriminator,
            system: this.system,
            username: this.username
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUJBQW1CO0FBQ25CLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUs3Qix5QkFBeUI7QUFDekIsTUFBTSxDQUFDLE9BQU8sT0FBTyxJQUFLLFNBQVEsSUFBSTtJQUNsQyx3R0FBd0c7SUFDeEcsV0FBVyxDQUFpQjtJQUM1Qiw4QkFBOEI7SUFDOUIsTUFBTSxDQUFnQjtJQUN0QixvRkFBb0Y7SUFDcEYsZ0JBQWdCLENBQWlCO0lBQ2pDLHVHQUF1RztJQUN2RyxNQUFNLENBQWlCO0lBQ3ZCLDZCQUE2QjtJQUM3QixHQUFHLENBQVU7SUFDYiw4Q0FBOEM7SUFDOUMsYUFBYSxDQUFTO0lBQ3RCLHVEQUF1RDtJQUN2RCxNQUFNLENBQVU7SUFDaEIsMkJBQTJCO0lBQzNCLFFBQVEsQ0FBUztJQUNqQixZQUFZLElBQWEsRUFBRSxNQUFjO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBc0I7UUFDNUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDN0I7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM3QjtRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsV0FBVyxFQUFJLElBQUksQ0FBQyxXQUFXO1lBQy9CLE1BQU0sRUFBUyxJQUFJLENBQUMsTUFBTTtZQUMxQixNQUFNLEVBQVMsSUFBSSxDQUFDLE1BQU07WUFDMUIsR0FBRyxFQUFZLElBQUksQ0FBQyxHQUFHO1lBQ3ZCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxNQUFNLEVBQVMsSUFBSSxDQUFDLE1BQU07WUFDMUIsUUFBUSxFQUFPLElBQUksQ0FBQyxRQUFRO1NBQy9CLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==