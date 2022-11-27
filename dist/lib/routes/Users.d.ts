/** @module Routes/Users */
import type Channels from "./Channels";
import type { EditSelfUserOptions } from "../types/users";
import ExtendedUser from "../structures/ExtendedUser";
import type RESTManager from "../rest/RESTManager";
import type User from "../structures/User";
/** Various methods for interacting with users. */
export default class Users {
    #private;
    constructor(manager: RESTManager);
    /** Alias for {@link Routes/Channels#createDM | Channels#createDM}. */
    get createDM(): typeof Channels.prototype.createDM;
    /**
     * Edit the currently authenticated user.
     *
     * Note: This does not touch the client's cache in any way.
     * @param options The options to edit with.
     */
    editSelf(options: EditSelfUserOptions): Promise<ExtendedUser>;
    /**
     * Get a user.
     * @param id the ID of the user
     */
    get(id: string): Promise<User>;
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     * @deprecated Moved to {@link Routes/OAuth#getCurrentUser}. This will be removed in `1.5.0`.
     */
    getCurrentUser(): Promise<ExtendedUser>;
    /**
     * Leave a guild.
     * @param id The ID of the guild to leave.
     */
    leaveGuild(id: string): Promise<void>;
}
