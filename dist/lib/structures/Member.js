"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Member */
const Base_1 = tslib_1.__importDefault(require("./Base"));
/** Represents a member of a guild. */
class Member extends Base_1.default {
    _cachedGuild;
    /** The id of the guild this member is for. */
    guildID;
    /** The roles this member has. */
    roles;
    /** The user associated with this member. */
    user;
    constructor(data, client, guildID) {
        let user;
        let id;
        if (!data.user && data.id) {
            user = client.users.get(id = data.id);
        }
        else if (data.user) {
            id = (user = client.users.update(data.user)).id;
        }
        if (!user) {
            throw new Error(`Member received without a user${id === undefined ? " or id." : `: ${id}`}`);
        }
        super(user.id, client);
        this.guildID = guildID;
        this.roles = [];
        this.user = user;
        this.update(data);
    }
    update(data) {
        if (data.roles !== undefined) {
            this.roles = data.roles;
        }
        if (data.user !== undefined) {
            this.user = this.client.users.update(data.user);
        }
    }
    /** If the member associated with the user is a bot. */
    get bot() {
        return this.user.bot;
    }
    /** The 4 digits after the username of the user associated with this member. */
    get discriminator() {
        return this.user.discriminator;
    }
    /** The guild this member is for. This will throw an error if the guild is not cached. */
    get guild() {
        if (!this._cachedGuild) {
            this._cachedGuild = this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
            }
        }
        return this._cachedGuild;
    }
    /** The permissions of this member. */
    get permissions() {
        return this.guild.permissionsOf(this);
    }
    /** If this user associated with this member is an official discord system user. */
    get system() {
        return this.user.system;
    }
    /** A combination of the user associated with this member's username and discriminator. */
    get tag() {
        return this.user.tag;
    }
    /** The username associated with this member's user. */
    get username() {
        return this.user.username;
    }
    /**
     * Add a role to this member.
     * @param roleID The ID of the role to add.
     */
    async addRole(roleID, reason) {
        await this.client.rest.guilds.addMemberRole(this.guildID, this.id, roleID, reason);
    }
    /**
     * Create a ban for this member.
     * @param options The options for the ban.
     */
    async ban(options) {
        await this.client.rest.guilds.createBan(this.guildID, this.id, options);
    }
    /**
     * Edit this member. Use \<Guild\>.editCurrentMember if you wish to update the nick of this client using the CHANGE_NICKNAME permission.
     * @param options The options for editing the member.
     */
    async edit(options) {
        return this.client.rest.guilds.editMember(this.guildID, this.id, options);
    }
    /**
     * Remove a member from the guild.
     * @param reason The reason for the kick.
     */
    async kick(reason) {
        await this.client.rest.guilds.removeMember(this.guildID, this.id, reason);
    }
    /**
     * remove a role from this member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    async removeRole(roleID, reason) {
        await this.client.rest.guilds.removeMemberRole(this.guildID, this.id, roleID, reason);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            guildID: this.guildID,
            roles: this.roles,
            user: this.user.toJSON()
        };
    }
}
exports.default = Member;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvTWVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFCQUFxQjtBQUNyQiwwREFBMEI7QUFRMUIsc0NBQXNDO0FBQ3RDLE1BQXFCLE1BQU8sU0FBUSxjQUFJO0lBQzVCLFlBQVksQ0FBUztJQUM3Qiw4Q0FBOEM7SUFDOUMsT0FBTyxDQUFTO0lBQ2hCLGlDQUFpQztJQUNqQyxLQUFLLENBQWdCO0lBQ3JCLDRDQUE0QztJQUM1QyxJQUFJLENBQU87SUFDWCxZQUFZLElBQWlELEVBQUUsTUFBYyxFQUFFLE9BQWU7UUFDMUYsSUFBSSxJQUFzQixDQUFDO1FBQzNCLElBQUksRUFBc0IsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoRztRQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFL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