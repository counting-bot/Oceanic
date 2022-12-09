/** @module CategoryChannel */
import PermissionOverwrite from "./PermissionOverwrite.js";
import GuildChannel from "./GuildChannel.js";
import type Member from "./Member.js";
import Permission from "./Permission.js";
import type Client from "../Client.js";
import type { ChannelTypes } from "../Constants.js";
import TypedCollection from "../util/TypedCollection.js";
import type { RawCategoryChannel, RawGuildChannel, RawOverwrite } from "../types/channels.js";
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
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission;
    toJSON(): JSONCategoryChannel;
}
