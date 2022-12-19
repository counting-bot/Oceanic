/** @module Member */
import Base from "./Base.js";
import type User from "./User.js";
import type Guild from "./Guild.js";
import type Permission from "./Permission.js";
import type Client from "../Client.js";
import type { RawMember, RESTMember } from "../types/guilds.js";
import type { JSONMember } from "../types/json.js";
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
    toJSON(): JSONMember;
}
