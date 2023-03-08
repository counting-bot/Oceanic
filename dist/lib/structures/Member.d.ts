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
    constructor(data: (RawMember | RESTMember) & {
        id?: string;
    }, client: Client, guildID: string);
    protected update(data: Partial<RawMember | RESTMember>): void;
    toJSON(): JSONMember;
}
