/** @module ExtendedUser */
import User from "./User.js";
import type Client from "../Client.js";
import type { RawOAuthUser } from "../types/users.js";
import type { JSONExtendedUser } from "../types/json.js";
/** Represents the currently authenticated user. */
export default class ExtendedUser extends User {
    /** The user's email. (always null for bots) */
    email: string | null;
    /** The flags of the user. */
    flags: number;
    /** The locale of the user */
    locale?: string;
    /** If the user has mfa enabled on their account */
    mfaEnabled: boolean;
    /** If this user's email is verified. (always true for bots) */
    verified: boolean;
    constructor(data: RawOAuthUser, client: Client);
    protected update(data: Partial<RawOAuthUser>): void;
    toJSON(): JSONExtendedUser;
}
