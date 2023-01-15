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
    constructor(data: RawOAuthUser, client: Client) {
        super(data, client);
        this.email = data.email;
        this.flags = data.flags;
        this.verified = !!data.verified;
        this.mfaEnabled = !!data.mfa_enabled;
        this.update(data);
    }

    protected override update(data: Partial<RawOAuthUser>): void {
        super.update(data);
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.locale !== undefined) {
            this.locale = data.locale;
        }
    }

    override toJSON(): JSONExtendedUser {
        return {
            ...super.toJSON(),
            email:      this.email,
            flags:      this.flags,
            locale:     this.locale,
            mfaEnabled: this.mfaEnabled,
            verified:   this.verified
        };
    }
}
