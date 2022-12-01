import * as Routes from "../util/Routes";
import ExtendedUser from "../structures/ExtendedUser";
/** Various methods for interacting with users. */
export default class Users {
    #manager;
    constructor(manager) {
        this.#manager = manager;
    }
    /** Alias for {@link Routes/Channels#createDM | Channels#createDM}. */
    get createDM() {
        return this.#manager.channels.createDM.bind(this.#manager.channels);
    }
    /**
     * Edit the currently authenticated user.
     *
     * Note: This does not touch the client's cache in any way.
     * @param options The options to edit with.
     */
    async editSelf(options) {
        if (options.avatar) {
            options.avatar = this.#manager.client.util._convertImage(options.avatar, "avatar");
        }
        return this.#manager.authRequest({
            method: "PATCH",
            path: Routes.USER("@me"),
            json: options
        }).then(data => new ExtendedUser(data, this.#manager.client));
    }
    /**
     * Get a user.
     * @param id the ID of the user
     */
    async get(id) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.USER(id)
        }).then(data => this.#manager.client.users.update(data));
    }
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     * @deprecated Moved to {@link Routes/OAuth#getCurrentUser}. This will be removed in `1.5.0`.
     */
    async getCurrentUser() {
        return this.#manager.oauth.getCurrentUser();
    }
    /**
     * Leave a guild.
     * @param id The ID of the guild to leave.
     */
    async leaveGuild(id) {
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.OAUTH_GUILD(id)
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL1VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sS0FBSyxNQUFNLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxZQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFJdEQsa0RBQWtEO0FBQ2xELE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBSztJQUN0QixRQUFRLENBQWM7SUFDdEIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQsc0VBQXNFO0lBQ3RFLElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBNEI7UUFDdkMsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3RGO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBZTtZQUMzQyxNQUFNLEVBQUUsT0FBTztZQUNmLElBQUksRUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMxQixJQUFJLEVBQUksT0FBTztTQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFVO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQVU7WUFDdEMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQVU7UUFDdkIsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBTztZQUNsQyxNQUFNLEVBQUUsUUFBUTtZQUNoQixJQUFJLEVBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7U0FDakMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIn0=