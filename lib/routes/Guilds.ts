/** @module Routes/Guilds */
import type {
    RawGuild,
    AddMemberOptions,
    CreateBanOptions,
    GetVanityURLResponse,
    RESTMember
} from "../types/guilds.js";
import * as Routes from "../util/Routes.js";
import type { RawGuildChannel, RawThreadChannel, RawThreadMember } from "../types/channels.js";
import type RESTManager from "../rest/RESTManager.js";

/** Various methods for interacting with guilds. */
export default class Guilds {
    #manager: RESTManager;
    constructor(manager: RESTManager) {
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
    async addMember(guildID: string, userID: string, options: AddMemberOptions): Promise<object> {
        return this.#manager.authRequest<object>({
            method: "PUT",
            path:   Routes.GUILD_MEMBER(guildID, userID),
            json:   {
                access_token: options.accessToken,
                deaf:         options.deaf,
                mute:         options.mute,
                nick:         options.nick,
                roles:        options.roles
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
    async addMemberRole(guildID: string, memberID: string, roleID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "PUT",
            path:   Routes.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
            reason
        });
    }

    /**
     * Create a bon for a user.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to ban.
     * @param options The options for creating the bon.
     */
    async createBan(guildID: string, userID: string, options?: CreateBanOptions): Promise<void> {
        const reason = options?.reason;
        if (options?.reason) {
            delete options.reason;
        }
        if (options?.deleteMessageDays !== undefined && !Object.hasOwn(options, "deleteMessageSeconds")) {
            options.deleteMessageSeconds = options.deleteMessageDays * 86400;
        }
        await this.#manager.authRequest<null>({
            method: "PUT",
            path:   Routes.GUILD_BAN(guildID, userID),
            json:   { delete_message_seconds: options?.deleteMessageSeconds },
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
    async get(guildID: string, withCounts?: boolean): Promise<object> {
        const query = new URLSearchParams();
        if (withCounts !== undefined) {
            query.set("with_counts", withCounts.toString());
        }
        return this.#manager.authRequest<RawGuild>({
            method: "GET",
            path:   Routes.GUILD(guildID),
            query
        });
    }

    /**
     * Get the active threads in a guild.
     * @param guildID The ID of the guild.
     */
    async getActiveThreads(guildID: string): Promise<object> {
        return this.#manager.authRequest<{ members: Array<RawThreadMember>; threads: Array<RawThreadChannel>; }>({
            method: "GET",
            path:   Routes.GUILD_ACTIVE_THREADS(guildID)
        });
    }

    /**
     * Get the channels in a guild. Does not include threads.
     * @param guildID The ID of the guild.
     */
    async getChannels(guildID: string): Promise<Array<object>> {
        return this.#manager.authRequest<Array<RawGuildChannel>>({
            method: "GET",
            path:   Routes.GUILD_CHANNELS(guildID)
        });
    }

    /**
     * Get a guild member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     */
    async getMember(guildID: string, memberID: string): Promise<object> {
        return this.#manager.authRequest<RESTMember>({
            method: "GET",
            path:   Routes.GUILD_MEMBER(guildID, memberID)
        });
    }

    /**
     * Get the vanity url of a guild.
     * @param guildID The ID of the guild.
     */
    async getVanityURL(guildID: string): Promise<GetVanityURLResponse> {
        return this.#manager.authRequest<GetVanityURLResponse>({
            method: "GET",
            path:   Routes.GUILD_VANITY_URL(guildID)
        });
    }

    /**
     * Remove a member from a guild.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     */
    async removeMember(guildID: string, memberID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.GUILD_MEMBER(guildID, memberID),
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
    async removeMemberRole(guildID: string, memberID: string, roleID: string, reason?: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.GUILD_MEMBER_ROLE(guildID, memberID, roleID),
            reason
        });
    }
}
