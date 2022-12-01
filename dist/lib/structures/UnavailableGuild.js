/** @module UnavailableGuild */
import Base from "./Base";
/** Represents a guild that is unavailable. */
export default class UnavailableGuild extends Base {
    unavailable;
    constructor(data, client) {
        super(data.id, client);
        this.unavailable = data.unavailable;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            unavailable: this.unavailable
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5hdmFpbGFibGVHdWlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1VuYXZhaWxhYmxlR3VpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLE9BQU8sSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUsxQiw4Q0FBOEM7QUFDOUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFBaUIsU0FBUSxJQUFJO0lBQzlDLFdBQVcsQ0FBTztJQUNsQixZQUFZLElBQXlCLEVBQUUsTUFBYztRQUNqRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztTQUNoQyxDQUFDO0lBQ04sQ0FBQztDQUNKIn0=