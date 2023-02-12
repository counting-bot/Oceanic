"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routes = tslib_1.__importStar(require("../util/Routes.js"));
/** Various methods for interacting with users. */
class Users {
    #manager;
    constructor(manager) {
        this.#manager = manager;
    }
    /** Alias for {@link Routes/Channels~Channels#createDM | Channels#createDM}. */
    get createDM() {
        return this.#manager.channels.createDM.bind(this.#manager.channels);
    }
    /**
     * Get a user.
     * @param userID the ID of the user
     */
    async get(userID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.USER(userID)
        }).then(data => this.#manager.client.users.update(data));
    }
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     * @deprecated Moved to {@link Routes/OAuth~OAuth#getCurrentUser | OAuth#getCurrentUser}. This will be removed in `1.5.0`.
     */
    async getCurrentUser() {
        return this.#manager.oauth.getCurrentUser();
    }
    /**
     * Leave a guild.
     * @param guildID The ID of the guild to leave.
     */
    async leaveGuild(guildID) {
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.OAUTH_GUILD(guildID)
        });
    }
}
exports.default = Users;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL1VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLGtFQUE0QztBQUs1QyxrREFBa0Q7QUFDbEQsTUFBcUIsS0FBSztJQUN0QixRQUFRLENBQWM7SUFDdEIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQsK0VBQStFO0lBQy9FLElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBVTtZQUN0QyxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZTtRQUM1QixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFPO1lBQ2xDLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztTQUN0QyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUExQ0Qsd0JBMENDIn0=