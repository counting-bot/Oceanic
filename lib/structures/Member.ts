/** @module Member */
import Base from "./Base";
import type User from "./User";
import type Client from "../Client";
import type { RawMember, RESTMember } from "../types/guilds";
import type { JSONMember } from "../types/json";

/** Represents a member of a guild. */
export default class Member extends Base {
    /** The id of the guild this member is for. */
    guildID: string;
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
        this.user = user;
        this.update(data);
    }

    protected override update(data: Partial<RawMember | RESTMember>): void {
        if (data.user !== undefined) {
            this.user = this.client.users.update(data.user);
        }
    }

    override toJSON(): JSONMember {
        return {
            ...super.toJSON(),
            guildID: this.guildID,
            user:    this.user.toJSON()
        };
    }
}
