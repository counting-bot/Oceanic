/** @module PermissionOverwrite */
import Base from "./Base.js";
import Permission from "./Permission.js";
import type { OverwriteTypes, PermissionName as PermissionNames, Permissions } from "../Constants.js";
import type Client from "../Client.js";
import type { RawOverwrite } from "../types/channels.js";
import type { JSONPermissionOverwrite } from "../types/json.js";

/** Represents a permission overwrite. */
export default class PermissionOverwrite extends Base {
    /** The permissions of this overwrite. */
    permission: Permission;
    /** The type of this overwrite. `0` for role, `1` for user. */
    type: OverwriteTypes;
    constructor(data: RawOverwrite, client: Client) {
        super(data.id, client);
        this.permission = new Permission(data.allow, data.deny);
        this.type = data.type;
    }

    get allow(): bigint {
        return this.permission.allow;
    }
    get deny(): bigint {
        return this.permission.deny;
    }

    /** A key-value map of permission to if it's been allowed or denied (not present if neither) */
    get json(): Record<keyof typeof Permissions, boolean> {
        return this.permission.json;
    }

    /**
     *Check if this permissions instance has the given permissions allowed
     * @param permissions The permissions to check for.
     */
    has(...permissions: Array<PermissionNames | bigint>): boolean {
        return this.permission.has(...permissions);
    }

    override toJSON(): JSONPermissionOverwrite {
        return {
            ...super.toJSON(),
            permission: this.permission.toJSON(),
            type:       this.type
        };
    }
}
