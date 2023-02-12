/** @module Role */
import Base from "./Base.js";
import Permission from "./Permission.js";
import type Guild from "./Guild.js";
import type Client from "../Client.js";
import type { RawRole } from "../types/guilds.js";
import type { JSONRole } from "../types/json.js";
/** Represents a role in a guild. */
export default class Role extends Base {
    private _cachedGuild?;
    /** The id of the guild this role is in. */
    guildID: string;
    /** If this role is hoisted. */
    hoist: boolean;
    /** If this role is managed by an integration. */
    managed: boolean;
    /** If this role can be mentioned by anybody. */
    mentionable: boolean;
    /** The name of this role. */
    name: string;
    /** The permissions of this role. */
    permissions: Permission;
    /** The position of this role. */
    position: number;
    constructor(data: RawRole, client: Client, guildID: string);
    protected update(data: Partial<RawRole>): void;
    /** The guild this role is in. This will throw an error if the guild is not cached. */
    get guild(): Guild;
    toJSON(): JSONRole;
}
