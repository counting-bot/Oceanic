/** @module Routes/Users */
import type Channels from "./Channels.js";
import type ExtendedUser from "../structures/ExtendedUser.js";
import type RESTManager from "../rest/RESTManager.js";
import type User from "../structures/User.js";
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
    get(userID: string): Promise<User>;
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     * @deprecated Moved to {@link Routes/OAuth~OAuth#getCurrentUser | OAuth#getCurrentUser}. This will be removed in `1.5.0`.
     */
    getCurrentUser(): Promise<ExtendedUser>;
    /**
     * Leave a guild.
     * @param guildID The ID of the guild to leave.
     */
    leaveGuild(guildID: string): Promise<void>;
}
