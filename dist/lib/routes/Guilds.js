import * as Routes from "../util/Routes.js";
/** Various methods for interacting with guilds. */
export default class Guilds {
    #manager;
    constructor(manager) {
        this.#manager = manager;
    }
    /**
     * Add a member to a guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     */
    async addMember(guildID, userID, options) {
        return this.#manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_MEMBER(guildID, userID),
            json: {
                access_token: options.accessToken,
                deaf: options.deaf,
                mute: options.mute,
                nick: options.nick,
                roles: options.roles
            }
        });
    }
    /**
     * Add a role to a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     */
    async addMemberRole(guildID, memberID, roleID, reason) {
        await this.#manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
            reason
        });
    }
    /**
     * Create a bon for a user.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to ban.
     * @param options The options for creating the bon.
     */
    async createBan(guildID, userID, options) {
        const reason = options?.reason;
        if (options?.reason) {
            delete options.reason;
        }
        if (options?.deleteMessageDays !== undefined && !Object.hasOwn(options, "deleteMessageSeconds")) {
            options.deleteMessageSeconds = options.deleteMessageDays * 86400;
        }
        await this.#manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_BAN(guildID, userID),
            json: { delete_message_seconds: options?.deleteMessageSeconds },
            reason
        });
    }
    /**
     * Get a guild.
     *
     * Note: If the guild is not already in the client's cache, this will not add it.
     * @param guildID The ID of the guild.
     * @param withCounts If the approximate number of members and online members should be included.
     */
    async get(guildID, withCounts) {
        const query = new URLSearchParams();
        if (withCounts !== undefined) {
            query.set("with_counts", withCounts.toString());
        }
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.GUILD(guildID),
            query
        });
    }
    /**
     * Get the active threads in a guild.
     * @param guildID The ID of the guild.
     */
    async getActiveThreads(guildID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.GUILD_ACTIVE_THREADS(guildID)
        });
    }
    /**
     * Get the channels in a guild. Does not include threads.
     * @param guildID The ID of the guild.
     */
    async getChannels(guildID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.GUILD_CHANNELS(guildID)
        });
    }
    /**
     * Get a guild member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     */
    async getMember(guildID, memberID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.GUILD_MEMBER(guildID, memberID)
        });
    }
    /**
     * Get the vanity url of a guild.
     * @param guildID The ID of the guild.
     */
    async getVanityURL(guildID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.GUILD_VANITY_URL(guildID)
        });
    }
    /**
     * Remove a member from a guild.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     */
    async removeMember(guildID, memberID, reason) {
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_MEMBER(guildID, memberID),
            reason
        });
    }
    /**
     * remove a role from a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    async removeMemberRole(guildID, memberID, roleID, reason) {
        await this.#manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
            reason
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9HdWlsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQztBQUk1QyxtREFBbUQ7QUFDbkQsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFNO0lBQ3ZCLFFBQVEsQ0FBYztJQUN0QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlLEVBQUUsTUFBYyxFQUFFLE9BQXlCO1FBQ3RFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQVM7WUFDckMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQzVDLElBQUksRUFBSTtnQkFDSixZQUFZLEVBQUUsT0FBTyxDQUFDLFdBQVc7Z0JBQ2pDLElBQUksRUFBVSxPQUFPLENBQUMsSUFBSTtnQkFDMUIsSUFBSSxFQUFVLE9BQU8sQ0FBQyxJQUFJO2dCQUMxQixJQUFJLEVBQVUsT0FBTyxDQUFDLElBQUk7Z0JBQzFCLEtBQUssRUFBUyxPQUFPLENBQUMsS0FBSzthQUM5QjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQWUsRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxNQUFlO1FBQ2xGLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQzNELE1BQU07U0FDVCxDQUFDLENBQUM7SUFD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