/** @module Invite */
import type { RawInvite, RawInviteWithMetadata } from "../types/channels.js";
import type Client from "../Client.js";
import type { JSONInvite } from "../types/json.js";

/** Represents an invite. */
export default class Invite {
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
