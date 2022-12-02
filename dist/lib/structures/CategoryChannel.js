"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module CategoryChannel */
const PermissionOverwrite_js_1 = tslib_1.__importDefault(require("./PermissionOverwrite.js"));
const GuildChannel_js_1 = tslib_1.__importDefault(require("./GuildChannel.js"));
const Permission_js_1 = tslib_1.__importDefault(require("./Permission.js"));
const Constants_js_1 = require("../Constants.js");
const TypedCollection_js_1 = tslib_1.__importDefault(require("../util/TypedCollection.js"));
/** Represents a guild category channel. */
class CategoryChannel extends GuildChannel_js_1.default {
    /** The channels in this category. */
    channels;
    /** The permission overwrites of this channel. */
    permissionOverwrites;
    /** The position of this channel on the sidebar. */
    position;
    constructor(data, client) {
        super(data, client);
        this.channels = new TypedCollection_js_1.default(GuildChannel_js_1.default, client);
        this.permissionOverwrites = new TypedCollection_js_1.default(PermissionOverwrite_js_1.default, client);
        this.position = data.position;
        this.update(data);
    }
    update(data) {
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
            channels: this.channels.map(channel => channel.id),
            permissionOverwrites: this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            position: this.position,
            type: this.type
        };
    }
}
exports.default = CategoryChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQ2F0ZWdvcnlDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhCQUE4QjtBQUM5Qiw4RkFBMkQ7QUFDM0QsZ0ZBQTZDO0FBRTdDLDRFQUF5QztBQUd6QyxrREFBOEQ7QUFDOUQsNEZBQXlEO0FBVXpELDJDQUEyQztBQUMzQyxNQUFxQixlQUFnQixTQUFRLHlCQUFZO0lBQ3JELHFDQUFxQztJQUNyQyxRQUFRLENBQXlEO0lBQ2pFLGlEQUFpRDtJQUNqRCxvQkFBb0IsQ0FBNkQ7SUFDakYsbURBQW1EO0lBQ25ELFFBQVEsQ0FBUztJQUVqQixZQUFZLElBQXdCLEVBQUUsTUFBYztRQUNoRCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSw0QkFBZSxDQUFDLHlCQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksNEJBQWUsQ0FBQyxnQ0FBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRWtCLE1BQU0sQ0FBQyxJQUFpQztRQUN2RCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLEtBQUssU0FBUyxFQUFFO1lBQzFDLEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFD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