/** @module Routes/Users */
import type Channels from "./Channels.js";
import type { RawUser } from "../types/users.js";
import * as Routes from "../util/Routes.js";
import type RESTManager from "../rest/RESTManager.js";

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
    async get(userID: string): Promise<object> {
        return this.#manager.authRequest<RawUser>({
            method: "GET",
            path:   Routes.USER(userID)
        });
    }
}
