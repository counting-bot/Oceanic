/** @module CategoryChannel */
import PermissionOverwrite from "./PermissionOverwrite";
import GuildChannel from "./GuildChannel";
import type Member from "./Member";
import Permission from "./Permission";
import type Client from "../Client";
import { type ChannelTypes } from "../Constants";
import TypedCollection from "../util/TypedCollection";
import type { RawCategoryChannel, RawGuildChannel, RawOverwrite } from "../types/channels";
import type { JSONCategoryChannel } from "../types/json";
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
