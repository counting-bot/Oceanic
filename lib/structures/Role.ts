/** @module Role */
import Base from "./Base.js";
import Permission from "./Permission.js";
import type Guild from "./Guild.js";
import type Client from "../Client.js";
import type { RawRole } from "../types/guilds.js";
import type { JSONRole } from "../types/json.js";

/** Represents a role in a guild. */
export default class Role extends Base {
    private _cachedGuild?: Guild;
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
    constructor(data: RawRole, client: Client, guildID: string) {
        super(data.id, client);
        this.guildID = guildID;
        this.hoist = !!data.hoist;
        this.managed = !!data.managed;
        this.mentionable = !!data.mentionable;
        this.name = data.name;
        this.permissions = new Permission(data.permissions);
        this.position = data.position;
        this.update(data);
    }

    protected override update(data: Partial<RawRole>): void {
        if (data.hoist !== undefined) {
            this.hoist = data.hoist;
        }
        if (data.mentionable !== undefined) {
            this.mentionable = data.mentionable;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.permissions !== undefined) {
            this.permissions = new Permission(data.permissions);
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
    }

    /** The guild this role is in. This will throw an error if the guild is not cached. */
    get guild(): Guild {
        if (!this._cachedGuild) {
            this._cachedGuild = this.client.guilds.get(this.guildID);

            if (!this._cachedGuild) {
                throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
            }
        }

        return this._cachedGuild;
    }

    override toJSON(): JSONRole {
        return {
            ...super.toJSON(),
            guildID:      this.guildID,
            hoist:        this.hoist,
            managed:      this.managed,
            mentionable:  this.mentionable,
            name:         this.name,
            permissions:  this.permissions.toJSON(),
            position:     this.position,
        };
    }
}
