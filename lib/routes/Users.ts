/** @module Routes/Users */
import type Channels from "./Channels.js";
import type { RawUser } from "../types/users.js";
import * as Routes from "../util/Routes.js";
import type ExtendedUser from "../structures/ExtendedUser.js";
import type RESTManager from "../rest/RESTManager.js";
import type User from "../structures/User.js";

/** Various methods for interacting with users. */
export default class Users {
    #manager: RESTManager;
    constructor(manager: RESTManager) {
        this.#manager = manager;
    }

    /** Alias for {@link Routes/Channels~Channels#createDM | Channels#createDM}. */
    get createDM(): typeof Channels.prototype.createDM {
        return this.#manager.channels.createDM.bind(this.#manager.channels);
    }

    /**
     * Get a user.
     * @param userID the ID of the user
     */
    async get(userID: string): Promise<User> {
        return this.#manager.authRequest<RawUser>({
            method: "GET",
            path:   Routes.USER(userID)
        }).then(data => this.#manager.client.users.update(data));
    }

    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     * @deprecated Moved to {@link Routes/OAuth~OAuth#getCurrentUser | OAuth#getCurrentUser}. This will be removed in `1.5.0`.
     */
    async getCurrentUser(): Promise<ExtendedUser> {
        return this.#manager.oauth.getCurrentUser();
    }

    /**
     * Leave a guild.
     * @param guildID The ID of the guild to leave.
     */
    async leaveGuild(guildID: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.OAUTH_GUILD(guildID)
        });
    }
}
