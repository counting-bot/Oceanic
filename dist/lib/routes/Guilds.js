import * as Routes from "../util/Routes.js";
import QueryBuilder from "../util/QueryBuilder.js";
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
        options = this.#manager.client.util._freeze(options);
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
        options = this.#manager.client.util._freeze(options);
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
        const query = new QueryBuilder();
        query.setIfPresent("with_counts", withCounts);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9HdWlsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQztBQUc1QyxPQUFPLFlBQVksTUFBTSxzQkFBc0IsQ0FBQztBQUVoRCxtREFBbUQ7QUFDbkQsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFNO0lBQ3ZCLFFBQVEsQ0FBYztJQUN0QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlLEVBQUUsTUFBYyxFQUFFLE9BQXlCO1FBQ3RFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQVM7WUFDckMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQzVDLElBQUksRUFBSTtnQkFDSixZQUFZLEVBQUUsT0FBTyxDQUFDLFdBQVc7Z0JBQ2pDLElBQUksRUFBVSxPQUFPLENBQUMsSUFBSTtnQkFDMUIsSUFBSSxFQUFVLE9BQU8sQ0FBQyxJQUFJO2dCQUMxQixJQUFJLEVBQVUsT0FBTyxDQUFDLElBQUk7Z0JBQzFCLEtBQUssRUFBUyxPQUFPLENBQUMsS0FBSzthQUM5QjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQWUsRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxNQUFlO1FBQ2xGLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFD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