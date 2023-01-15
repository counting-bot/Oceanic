/** @module Invite */
import type Guild from "./Guild.js";
import type User from "./User.js";
import type PartialApplication from "./PartialApplication.js";
import type {
    InviteChannel,
    InviteInfoTypes,
    PartialInviteChannel,
    RawInvite,
    RawInviteWithMetadata
} from "../types/channels.js";
import type Client from "../Client.js";
import type { InviteTargetTypes } from "../Constants.js";
import type { JSONInvite } from "../types/json.js";
import type { Uncached } from "../types/shared.js";

/** Represents an invite. */
export default class Invite<T extends InviteInfoTypes = "withMetadata", CH extends InviteChannel | Uncached = InviteChannel | Uncached> {
    private _cachedChannel!: (CH extends InviteChannel ? CH : PartialInviteChannel) | null;
    /** The approximate number of total members in the guild this invite leads to. */
    approximateMemberCount?: number;
    /** The approximate number of online members in the guild this invite leads to. */
    approximatePresenceCount?: number;
    /** The ID of the channel this invite leads to. */
    channelID: string | null;
    client!: Client;
    /** The code of this invite. */
    code: string;
    /** When this invite was created. */
    createdAt!: T extends "withMetadata" ? Date : undefined;
    /** The date at which this invite expires. */
    expiresAt?: T extends "withMetadata" | "withoutExpiration" ? never : Date;
    /** The guild this invite leads to or `null` if this invite leads to a Group DM. */
    guild: Guild | null;
    /** The ID of the guild this invite leads to or `null` if this invite leads to a Group DM. */
    guildID: string | null;
    /** The user that created this invite. */
    inviter?: User;
    /** The time after which this invite expires. */
    maxAge!: T extends "withMetadata" ? number : never;
    /** The maximum number of times this invite can be used, */
    maxUses!: T extends "withMetadata" ? number : never;
    /** The embedded application this invite will open. */
    targetApplication?: PartialApplication;
    /** The [target type](https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types) of this invite. */
    targetType?: InviteTargetTypes;
    /** The user whose stream to display for this voice channel stream invite. */
    targetUser?: User;
    /** If this invite only grants temporary membership. */
    temporary!: T extends "withMetadata" ? boolean : never;
    /** The number of times this invite has been used. */
    uses!: T extends "withMetadata" ? number : never;
    constructor(data: RawInvite | RawInviteWithMetadata, client: Client) {
        Object.defineProperty(this, "client", {
            value:        client,
            enumerable:   false,
            writable:     false,
            configurable: false
        });
        this.channelID = (data.channel_id ?? data.channel?.id) ?? null;
        this.code = data.code;
        this.guild = null;
        this.guildID = data.guild?.id ?? null;
        this.expiresAt = (data.expires_at ? new Date(data.expires_at) : undefined) as never;
        this.targetType = data.target_type;
    }

    toJSON(): JSONInvite {
        return {
            approximateMemberCount:   this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            channelID:                this.channelID ?? undefined,
            code:                     this.code,
            createdAt:                this.createdAt?.getTime(),
            expiresAt:                this.expiresAt?.getTime(),
            guildID:                  this.guildID ?? undefined,
            inviter:                  this.inviter?.id,
            maxAge:                   this.maxAge,
            maxUses:                  this.maxUses,
            targetApplication:        this.targetApplication?.toJSON(),
            targetType:               this.targetType,
            targetUser:               this.targetUser?.id,
            temporary:                this.temporary,
            uses:                     this.uses
        };
    }
}
