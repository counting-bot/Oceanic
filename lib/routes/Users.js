import * as Routes from "../util/Routes.js";
/** Various methods for interacting with users. */
export default class Users {
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
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL1VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sS0FBSyxNQUFNLE1BQU0sbUJBQW1CLENBQUM7QUFHNUMsa0RBQWtEO0FBQ2xELE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBSztJQUN0QixRQUFRLENBQWM7SUFDdEIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQsK0VBQStFO0lBQy9FLElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBVTtZQUN0QyxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM5QixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oifQ==