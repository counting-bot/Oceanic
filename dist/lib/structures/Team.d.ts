/** @module Team */
import Base from "./Base.js";
import type User from "./User.js";
import type Client from "../Client.js";
import type { RawTeam, TeamMember } from "../types/oauth.js";
import type { JSONTeam } from "../types/json.js";
/** Represents an OAuth team. */
export default class Team extends Base {
    /** The icon hash of this team. */
    icon: string | null;
    /** The members of this team. */
    members: Array<TeamMember>;
    /** The name of this team. */
    name: string;
    /** The owner of this team. */
    owner?: User;
    /** The ID of the owner of this team. */
    ownerID: string;
    constructor(data: RawTeam, client: Client);
    protected update(data: Partial<RawTeam>): void;
    toJSON(): JSONTeam;
}
