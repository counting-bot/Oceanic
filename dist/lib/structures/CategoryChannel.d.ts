/** @module CategoryChannel */
import PermissionOverwrite from "./PermissionOverwrite.js";
import GuildChannel from "./GuildChannel.js";
import type Member from "./Member.js";
import Permission from "./Permission.js";
import type Client from "../Client.js";
import type { ChannelTypes } from "../Constants.js";
import TypedCollection from "../util/TypedCollection.js";
import type { EditAnyGuildChannelOptions, EditPermissionOptions, RawCategoryChannel, RawGuildChannel, RawOverwrite } from "../types/channels.js";
import type { JSONCategoryChannel } from "../types/json.js";
/** Represents a guild category channel. */
export default class CategoryChannel extends GuildChannel {
    /** The channels in this category. */
    channels: TypedCollection<string, RawGuildChannel, GuildChannel>;
    /** The permission overwrites of this channel. */
    permissionOverwrites: TypedCollection<string, RawOverwrite, PermissionOverwrite>;
    /** The position of this channel on the sidebar. */
    position: number;
    type: ChannelTypes.GUILD_CATEGORY;
    constructor(data: RawCategoryChannel, client: Client);
    protected update(data: Partial<RawCategoryChannel>): void;
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
    edit(options: EditAnyGuildChannelOptions): Promise<this>;
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
    toJSON(): JSONCategoryChannel;
}
