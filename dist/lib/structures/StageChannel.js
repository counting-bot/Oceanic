"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module StageChannel */
const GuildChannel_js_1 = tslib_1.__importDefault(require("./GuildChannel.js"));
const PermissionOverwrite_js_1 = tslib_1.__importDefault(require("./PermissionOverwrite.js"));
const Permission_js_1 = tslib_1.__importDefault(require("./Permission.js"));
const Constants_js_1 = require("../Constants.js");
const TypedCollection_js_1 = tslib_1.__importDefault(require("../util/TypedCollection.js"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/** Represents a guild stage channel. */
class StageChannel extends GuildChannel_js_1.default {
    /** The bitrate of the stage channel. */
    bitrate;
    /** The permission overwrites of this channel. */
    permissionOverwrites;
    /** The position of this channel on the sidebar. */
    position;
    /** The id of the voice region of the channel, `null` is automatic. */
    rtcRegion;
    /** The topic of the channel. */
    topic;
    constructor(data, client) {
        super(data, client);
        this.bitrate = data.bitrate;
        this.permissionOverwrites = new TypedCollection_js_1.default(PermissionOverwrite_js_1.default, client);
        this.position = data.position;
        this.rtcRegion = data.rtc_region;
        this.topic = data.topic;
        this.update(data);
    }
    update(data) {
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
    get parent() {
        return super.parent;
    }
    /**
     * Create an invite for this channel.
     * @param options The options to create an invite with.
     */
    async createInvite(options) {
        return this.client.rest.channels.createInvite(this.id, options);
    }
    /**
     * Delete a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     */
    async deletePermission(overwriteID, reason) {
        return this.client.rest.channels.deletePermission(this.id, overwriteID, reason);
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    async edit(options) {
        return this.client.rest.channels.edit(this.id, options);
    }
    /**
     * Edit a permission overwrite on this channel.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     */
    async editPermission(overwriteID, options) {
        return this.client.rest.channels.editPermission(this.id, overwriteID, options);
    }
    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member) {
        if (typeof member === "string") {
            member = this.guild.members.get(member);
        }
        if (!member) {
            throw new Error(`Cannot use ${this.constructor.name}#permissionsOf with an ID without having the member cached.`);
        }
        let permission = this.guild.permissionsOf(member).allow;
        if (permission & Constants_js_1.Permissions.ADMINISTRATOR) {
            return new Permission_js_1.default(Constants_js_1.AllPermissions);
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
        return new Permission_js_1.default(permission);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            bitrate: this.bitrate,
            permissionOverwrites: this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            position: this.position,
            rtcRegion: this.rtcRegion,
            topic: this.topic,
            type: this.type
        };
    }
}
exports.default = StageChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhZ2VDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvU3RhZ2VDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixnRkFBNkM7QUFDN0MsOEZBQTJEO0FBRzNELDRFQUF5QztBQUd6QyxrREFBOEQ7QUFFOUQsNEZBQXlEO0FBVXpELDZEQUE2RDtBQUM3RCxhQUFhO0FBRWIsd0NBQXdDO0FBQ3hDLE1BQXFCLFlBQWEsU0FBUSx5QkFBWTtJQUNsRCx3Q0FBd0M7SUFDeEMsT0FBTyxDQUFTO0lBQ2hCLGlEQUFpRDtJQUNqRCxvQkFBb0IsQ0FBNkQ7SUFDakYsbURBQW1EO0lBQ25ELFFBQVEsQ0FBUztJQUNqQixzRUFBc0U7SUFDdEUsU0FBUyxDQUFnQjtJQUN6QixnQ0FBZ0M7SUFDaEMsS0FBSyxDQUFnQjtJQUVyQixZQUFZLElBQXFCLEVBQUUsTUFBYztRQUM3QyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSw0QkFBZSxDQUFDLGdDQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBOEI7UUFDcEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxF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