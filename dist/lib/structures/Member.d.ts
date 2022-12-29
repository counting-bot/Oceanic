/** @module Member */
import Base from "./Base";
import type User from "./User";
import type Guild from "./Guild";
import type Permission from "./Permission";
import type Client from "../Client";
import type { CreateBanOptions, EditMemberOptions, RawMember, RESTMember } from "../types/guilds";
import type { JSONMember } from "../types/json";
/** Represents a member of a guild. */
export default class Member extends Base {
    private _cachedGuild?;
    /** The id of the guild this member is for. */
    guildID: string;
    /** The roles this member has. */
    roles: Array<string>;
    /** The user associated with this member. */
    user: User;
    constructor(data: (RawMember | RESTMember) & {
        id?: string;
    }, client: Client, guildID: string);
    protected update(data: Partial<RawMember | RESTMember>): void;
    /** If the member associated with the user is a bot. */
    get bot(): boolean;
    /** The 4 digits after the username of the user associated with this member. */
    get discriminator(): string;
    /** The guild this member is for. This will throw an error if the guild is not cached. */
    get guild(): Guild;
    /** The permissions of this member. */
    get permissions(): Permission;
    /** If this user associated with this member is an official discord system user. */
    get system(): boolean;
    /** A combination of the user associated with this member's username and discriminator. */
    get tag(): string;
    /** The username associated with this member's user. */
    get username(): string;
    /**
     * Add a role to this member.
     * @param roleID The ID of the role to add.
     */
    addRole(roleID: string, reason?: string): Promise<void>;
    /**
     * Create a ban for this member.
     * @param options The options for the ban.
     */
    ban(options?: CreateBanOptions): Promise<void>;
    /**
     * Edit this member. Use \<Guild\>.editCurrentMember if you wish to update the nick of this client using the CHANGE_NICKNAME permission.
     * @param options The options for editing the member.
     */
    edit(options: EditMemberOptions): Promise<Member>;
    /**
     * Remove a member from the guild.
     * @param reason The reason for the kick.
     */
    kick(reason?: string): Promise<void>;
    /**
     * remove a role from this member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    removeRole(roleID: string, reason?: string): Promise<void>;
    toJSON(): JSONMember;
}
