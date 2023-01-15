/** @module Member */
import Base from "./Base";
import type User from "./User";
import type Guild from "./Guild";
import type Permission from "./Permission";
import type Client from "../Client";
import type { RawMember, RESTMember } from "../types/guilds";
import type { JSONMember } from "../types/json";

/** Represents a member of a guild. */
export default class Member extends Base {
    private _cachedGuild?: Guild;
    /** The id of the guild this member is for. */
    guildID: string;
    /** The roles this member has. */
    roles: Array<string>;
    /** The user associated with this member. */
    user: User;
    constructor(data: (RawMember | RESTMember) & { id?: string; }, client: Client, guildID: string) {
        let user: User | undefined;
        let id: string | undefined;
        if (!data.user && data.id) {
            user = client.users.get(id = data.id);
        } else if (data.user) {
            id = (user = client.users.update(data.user)).id;
        }
        if (!user) {
            throw new Error(`Member received without a user${id === undefined ? " or id." : `: ${id}`}`);
        }
        super(user.id, client);
        this.guildID = guildID;
        this.roles = [];
        this.user = user;
        this.update(data);
    }

    protected override update(data: Partial<RawMember | RESTMember>): void {
        if (data.roles !== undefined) {
            this.roles = data.roles;
        }
        if (data.user !== undefined) {
            this.user = this.client.users.update(data.user);
        }
    }

    /** If the member associated with the user is a bot. */
    get bot(): boolean {
        return this.user.bot;
    }
    /** The 4 digits after the username of the user associated with this member. */
    get discriminator(): string {
        return this.user.discriminator;
    }
    /** The guild this member is for. This will throw an error if the guild is not cached. */
    get guild(): Guild {
        if (!this._cachedGuild) {
            this._cachedGuild = this.client.guilds.get(this.guildID);

            if (!this._cachedGuild) {
                throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
            }
        }

        return this._cachedGuild;
    }
    /** The permissions of this member. */
    get permissions(): Permission {
        return this.guild.permissionsOf(this);
    }
    /** If this user associated with this member is an official discord system user. */
    get system(): boolean {
        return this.user.system;
    }
    /** A combination of the user associated with this member's username and discriminator. */
    get tag(): string {
        return this.user.tag;
    }
    /** The username associated with this member's user. */
    get username(): string {
        return this.user.username;
    }

    override toJSON(): JSONMember {
        return {
            ...super.toJSON(),
            guildID: this.guildID,
            roles:   this.roles,
            user:    this.user.toJSON()
        };
    }
}
