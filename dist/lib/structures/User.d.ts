/** @module User */
import Base from "./Base.js";
import type Client from "../Client.js";
import type { RawUser } from "../types/users.js";
import type { JSONUser } from "../types/json.js";
/** Represents a user. */
export default class User extends Base {
    /** The user's banner color. If this member was received via the gateway, this will never be present. */
    accentColor?: number | null;
    /** The user's avatar hash. */
    avatar: string | null;
    /** The hash of this user's avatar decoration. This will always resolve to a png. */
    avatarDecoration?: string | null;
    /** The user's banner hash. If this member was received via the gateway, this will never be present. */
    banner?: string | null;
    /** If this user is a bot. */
    bot: boolean;
    /** The 4 digits after the user's username. */
    discriminator: string;
    /** If this user is an official discord system user. */
    system: boolean;
    /** The user's username. */
    username: string;
    constructor(data: RawUser, client: Client);
    protected update(data: Partial<RawUser>): void;
    toJSON(): JSONUser;
}
