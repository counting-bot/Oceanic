/** @module Routes/Users */
import type Channels from "./Channels.js";
import type RESTManager from "../rest/RESTManager.js";
/** Various methods for interacting with users. */
export default class Users {
    #private;
    constructor(manager: RESTManager);
    /** Alias for {@link Routes/Channels~Channels#createDM | Channels#createDM}. */
    get createDM(): typeof Channels.prototype.createDM;
    /**
     * Get a user.
     * @param userID the ID of the user
     */
    get(userID: string): Promise<object>;
}
