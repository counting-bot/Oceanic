import Guild from "./Guild.js";
import type User from "./User.js";
import PartialApplication from "./PartialApplication.js";
import type { InviteChannel, InviteInfoTypes, InviteStageInstance, PartialInviteChannel, RawInvite, RawInviteWithMetadata } from "../types/channels.js";
import type Client from "../Client.js";
import type { InviteTargetTypes } from "../Constants.js";
import type { JSONInvite } from "../types/json.js";
import type { Uncached } from "../types/shared.js";
/** Represents an invite. */
export default class Invite<T extends InviteInfoTypes = "withMetadata", CH extends InviteChannel | Uncached = InviteChannel | Uncached> {
    private _cachedChannel;
    /** The approximate number of total members in the guild this invite leads to. */
    approximateMemberCount?: number;
    /** The approximate number of online members in the guild this invite leads to. */
    approximatePresenceCount?: number;
    /** The ID of the channel this invite leads to. */
    channelID: string | null;
    client: Client;
    /** The code of this invite. */
    code: string;
    /** When this invite was created. */
    createdAt: T extends "withMetadata" ? Date : undefined;
    /** The date at which this invite expires. */
    expiresAt?: T extends "withMetadata" | "withoutExpiration" ? never : Date;
    /** The guild this invite leads to or `null` if this invite leads to a Group DM. */
    guild: Guild | null;
    /** The ID of the guild this invite leads to or `null` if this invite leads to a Group DM. */
    guildID: string | null;
    /** The user that created this invite. */
    inviter?: User;
    /** The time after which this invite expires. */
    maxAge: T extends "withMetadata" ? number : never;
    /** The maximum number of times this invite can be used, */
    maxUses: T extends "withMetadata" ? number : never;
    /** @deprecated The stage instance in the invite this channel is for (deprecated). */
    stageInstance?: InviteStageInstance;
    /** The embedded application this invite will open. */
    targetApplication?: PartialApplication;
    /** The [target type](https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types) of this invite. */
    targetType?: InviteTargetTypes;
    /** The user whose stream to display for this voice channel stream invite. */
    targetUser?: User;
    /** If this invite only grants temporary membership. */
    temporary: T extends "withMetadata" ? boolean : never;
    /** The number of times this invite has been used. */
    uses: T extends "withMetadata" ? number : never;
    constructor(data: RawInvite | RawInviteWithMetadata, client: Client);
    protected update(data: Partial<RawInvite> | Partial<RawInviteWithMetadata>): void;
    /** The channel this invite leads to. If the channel is not cached, this will be a partial with only `id`, `name, and `type`. */
    get channel(): (CH extends InviteChannel ? CH : PartialInviteChannel) | null;
    /**
     * Delete this invite.
     * @param reason The reason for deleting this invite.
     */
    deleteInvite(reason?: string): Promise<Invite<"withMetadata", CH>>;
    /** Whether this invite belongs to a cached channel. The only difference on using this method over a simple if statement is to easily update all the invite properties typing definitions based on the channel it belongs to. */
    inCachedChannel(): this is Invite<T, InviteChannel>;
    toJSON(): JSONInvite;
}
