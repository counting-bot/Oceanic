/** @module StageChannel */
import GuildChannel from "./GuildChannel";
import PermissionOverwrite from "./PermissionOverwrite";
import type Member from "./Member";
import type CategoryChannel from "./CategoryChannel";
import Permission from "./Permission";
import type Invite from "./Invite";
import type { ChannelTypes } from "../Constants";
import { AllPermissions, Permissions } from "../Constants";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type {
    CreateInviteOptions,
    EditPermissionOptions,
    EditStageChannelOptions,
    InviteInfoTypes,
    RawOverwrite,
    RawStageChannel
} from "../types/channels";
import type { JSONStageChannel } from "../types/json";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

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
    declare type: ChannelTypes.GUILD_STAGE_VOICE;
    constructor(data: RawStageChannel, client: Client) {
        super(data, client);
        this.bitrate = data.bitrate;
        this.permissionOverwrites = new TypedCollection(PermissionOverwrite, client);
        this.position = data.position;
        this.rtcRegion = data.rtc_region;
        this.topic = data.topic;
        this.update(data);
    }

    protected override update(data: Partial<RawStageChannel>): void {
        super.update(data);
        if (data.bitrate !== undefined) {
            this.bitrate = data.bitrate;
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.rtc_region !== undefined) {
            this.rtcRegion = data.rtc_region;
        }
        if (data.topic !== undefined) {
            this.topic = data.topic;
        }
        if (data.permission_overwrites !== undefined) {
            data.permission_overwrites.map(overwrite => this.permissionOverwrites.update(overwrite));
        }
    }

    override get parent(): CategoryChannel | null | undefined {
        return super.parent as CategoryChannel | null | undefined;
    }

    /**
     * Create an invite for this channel.
     * @param options The options to create an invite with.
     */
    async createInvite(options: CreateInviteOptions): Promise<Invite<InviteInfoTypes, this>> {
        return this.client.rest.channels.createInvite(this.id, options);
    }

    /**
     * Delete a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    async deletePermission(overwriteID: string, reason?: string): Promise<void> {
        return this.client.rest.channels.deletePermission(this.id, overwriteID, reason);
    }

    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    override async edit(options: EditStageChannelOptions): Promise<this> {
        return this.client.rest.channels.edit<this>(this.id, options);
    }

    /**
     * Edit a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    async editPermission(overwriteID: string, options: EditPermissionOptions): Promise<void> {
        return this.client.rest.channels.editPermission(this.id, overwriteID, options);
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

    override toJSON(): JSONStageChannel {
        return {
            ...super.toJSON(),
            bitrate:              this.bitrate,
            permissionOverwrites: this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            position:             this.position,
            rtcRegion:            this.rtcRegion,
            topic:                this.topic,
            type:                 this.type
        };
    }
}
