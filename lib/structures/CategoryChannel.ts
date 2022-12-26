/** @module CategoryChannel */
import PermissionOverwrite from "./PermissionOverwrite.js";
import GuildChannel from "./GuildChannel.js";
import type Member from "./Member.js";
import Permission from "./Permission.js";
import type Client from "../Client.js";
import type { ChannelTypes } from "../Constants.js";
import { AllPermissions, Permissions } from "../Constants.js";
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
    declare type: ChannelTypes.GUILD_CATEGORY;
    constructor(data: RawCategoryChannel, client: Client) {
        super(data, client);
        this.channels = new TypedCollection(GuildChannel, client);
        this.permissionOverwrites = new TypedCollection(PermissionOverwrite, client);
        this.position = data.position;
        this.update(data);
    }

    protected override update(data: Partial<RawCategoryChannel>): void {
        super.update(data);
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.permission_overwrites !== undefined) {
            for (const id of this.permissionOverwrites.keys()) {
                if (!data.permission_overwrites.some(overwrite => overwrite.id === id)) {
                    this.permissionOverwrites.delete(id);
                }
            }

            for (const overwrite of data.permission_overwrites) {
                this.permissionOverwrites.update(overwrite);
            }
        }
    }

    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission {
        if (typeof member === "string") {
            member = this.guild.members.get(member)!;
        }
        if (!member) {
            throw new Error(`Cannot use ${this.constructor.name}#permissionsOf with an ID without having the member cached.`);
        }
        let permission = this.guild.permissionsOf(member).allow;
        if (permission & Permissions.ADMINISTRATOR) {
            return new Permission(AllPermissions);
        }
        let overwrite = this.permissionOverwrites.get(this.guildID);
        if (overwrite) {
            permission = (permission & ~overwrite.deny) | overwrite.allow;
        }
        let deny = 0n;
        let allow = 0n;
        for (const id of member.roles) {
            if ((overwrite = this.permissionOverwrites.get(id))) {
                deny |= overwrite.deny;
                allow |= overwrite.allow;
            }
        }

        permission = (permission & ~deny) | allow;
        overwrite = this.permissionOverwrites.get(member.id);
        if (overwrite) {
            permission = (permission & ~overwrite.deny) | overwrite.allow;
        }
        return new Permission(permission);
    }

    override toJSON(): JSONCategoryChannel {
        return {
            ...super.toJSON(),
            channels:             this.channels.map(channel => channel.id),
            permissionOverwrites: this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            position:             this.position,
            type:                 this.type
        };
    }
}
