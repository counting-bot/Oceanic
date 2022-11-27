/** @module StageChannel */
import GuildChannel from "./GuildChannel";
import PermissionOverwrite from "./PermissionOverwrite";
import type Member from "./Member";
import type CategoryChannel from "./CategoryChannel";
import Permission from "./Permission";
import type Invite from "./Invite";
import type { ChannelTypes } from "../Constants";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type { CreateInviteOptions, EditPermissionOptions, EditStageChannelOptions, InviteInfoTypes, RawOverwrite, RawStageChannel } from "../types/channels";
import type { JSONStageChannel } from "../types/json";
/** Represents a guild stage channel. */
export default class StageChannel extends GuildChannel {
    /** The bitrate of the stage channel. */
    bitrate: number;
    /** The permission overwrites of this channel. */
    permissionOverwrites: TypedCollection<string, RawOverwrite, PermissionOverwrite>;
    /** The position of this channel on the sidebar. */
    position: number;
    /** The id of the voice region of the channel, `null` is automatic. */
    rtcRegion: string | null;
    /** The topic of the channel. */
    topic: string | null;
    type: ChannelTypes.GUILD_STAGE_VOICE;
    constructor(data: RawStageChannel, client: Client);
    protected update(data: Partial<RawStageChannel>): void;
    get parent(): CategoryChannel | null | undefined;
    /**
     * Create an invite for this channel.
     * @param options The options to create an invite with.
     */
    createInvite(options: CreateInviteOptions): Promise<Invite<InviteInfoTypes, this>>;
    /**
     * Delete a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    deletePermission(overwriteID: string, reason?: string): Promise<void>;
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    edit(options: EditStageChannelOptions): Promise<this>;
    /**
     * Edit a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    editPermission(overwriteID: string, options: EditPermissionOptions): Promise<void>;
    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission;
    toJSON(): JSONStageChannel;
}
