/** @module Invite */
import type { InviteChannel, InviteInfoTypes, RawInvite, RawInviteWithMetadata } from "../types/channels.js";
import type Client from "../Client.js";
import type { JSONInvite } from "../types/json.js";
import type { Uncached } from "../types/shared.js";

/** Represents an invite. */
export default class Invite<T extends InviteInfoTypes = "withMetadata", CH extends InviteChannel | Uncached = InviteChannel | Uncached> {
    client!: Client;
    /** The code of this invite. */
    code: string;
    constructor(data: RawInvite | RawInviteWithMetadata, client: Client) {
        Object.defineProperty(this, "client", {
            value:        client,
            enumerable:   false,
            writable:     false,
            configurable: false
        });
        this.code = data.code;
    }

    toJSON(): JSONInvite {
        return {
            code: this.code
        };
    }
}
