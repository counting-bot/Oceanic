"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Guild */
const Role_1 = tslib_1.__importDefault(require("./Role"));
const Base_1 = tslib_1.__importDefault(require("./Base"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Member_1 = tslib_1.__importDefault(require("./Member"));
const ThreadChannel_1 = tslib_1.__importDefault(require("./ThreadChannel"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const Constants_1 = require("../Constants");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
/** Represents a Discord server. */
class Guild extends Base_1.default {
    _clientMember;
    _shard;
    /** The application that created this guild, if applicable. */
    application;
    /** The ID of the application that created this guild, if applicable. */
    applicationID;
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount;
    /** The channels in this guild. */
    channels;
    /** The icon hash of this guild. */
    icon;
    /** If this guild is considered large. */
    large;
    /** The maximum amount of members this guild can have. */
    maxMembers;
    /** The maximum amount of people that can be present at a time in this guild. Only present for very large guilds. */
    maxPresences;
    /** The number of members in this guild. */
    memberCount;
    /** The cached members in this guild. */
    members;
    /** The name of this guild. */
    name;
    /** The owner of this guild. */
    owner;
    /** The ID of the owner of this guild. */
    ownerID;
    /** The [preferred locale](https://discord.com/developers/docs/reference#locales) of this guild. */
    preferredLocale;
    /** @deprecated The region of this guild.*/
    region;
    /** The roles in this guild. */
    roles;
    /** The channel where rules/guidelines are displayed. Only present in guilds with the `COMMUNITY` feature. */
    rulesChannel;
    /** The channel where welcome messages and boosts notices are posted. */
    systemChannel;
    /** The threads in this guild. */
    threads;
    /** If this guild is unavailable. */
    unavailable;
    /** The vanity url of this guild. Only present in guilds with the `VANITY_URL` feature. */
    vanityURLCode;
    /** If the widget is enabled. */
    widgetEnabled;
    constructor(data, client) {
        super(data.id, client);
        this.applicationID = data.application_id;
        this.channels = new TypedCollection_1.default(GuildChannel_1.default, client);
        this.icon = null;
        this.large = (data.member_count ?? data.approximate_member_count ?? 0) >= client.shards.options.largeThreshold;
        this.memberCount = data.member_count ?? data.approximate_member_count ?? 0;
        this.members = new TypedCollection_1.default(Member_1.default, client, typeof client.options.collectionLimits.members === "number" ? client.options.collectionLimits.members : client.options.collectionLimits.members[data.id] ?? client.options.collectionLimits.members.unknown ?? Infinity);
        this.name = data.name;
        this.ownerID = data.owner_id;
        this.preferredLocale = data.preferred_locale;
        this.roles = new TypedCollection_1.default(Role_1.default, client);
        this.threads = new TypedCollection_1.default(ThreadChannel_1.default, client);
        this.unavailable = !!data.unavailable;
        this.vanityURLCode = data.vanity_url_code;
        for (const role of data.roles) {
            this.roles.update(role, data.id);
        }
        this.update(data);
        if (data.channels) {
            for (const channelData of data.channels) {
                channelData.guild_id = this.id;
                client.channelGuildMap[channelData.id] = this.id;
                this.channels.add(Channel_1.default.from(channelData, client));
            }
        }
        if (data.threads) {
            for (const threadData of data.threads) {
                threadData.guild_id = this.id;
                client.threadGuildMap[threadData.id] = this.id;
                const thread = Channel_1.default.from(threadData, client);
                this.threads.add(thread);
                const channel = this.channels.get(thread.parentID);
                if (channel && "threads" in channel) {
                    channel.threads.update(thread);
                }
            }
        }
        if (data.members) {
            for (const rawMember of data.members) {
                const member = this.members.update({ ...rawMember, id: rawMember.user?.id }, this.id);
                if (this.client["_user"] && member.id === this.client.user.id) {
                    this._clientMember = member;
                }
            }
        }
    }
    updateMemberLimit(toAdd) {
        if (this.members.limit === Infinity || this.client.options.disableMemberLimitScaling) {
            return;
        }
        const original = this.members.limit;
        const num = toAdd === true ? this.memberCount : this.members.limit + toAdd;
        const round = 10 ** (Math.floor(Math.log10(num)) - 1);
        if (toAdd === true) {
            const limit = Math.round(num / round) * round + round;
            if (this.members.limit >= limit) {
                return;
            }
            this.members.limit = limit;
        }
        else {
            const limit = Math.round((this.members.size + toAdd) / round) * round + round;
            if (this.members.limit >= limit) {
                return;
            }
            this.members.limit = limit;
        }
        this.client.emit("debug", `The limit of the members collection of guild ${this.id} has been updated from ${original} to ${this.members.limit} to accommodate at least ${toAdd === true ? this.memberCount : this.members.size + toAdd} members.`);
    }
    update(data) {
        if (data.application_id !== undefined) {
            this.application = this.client["_application"] && data.application_id === null ? null : (this.client.application.id === data.application_id ? this.client.application : undefined);
            this.applicationID = data.application_id;
        }
        if (data.approximate_member_count !== undefined) {
            this.approximateMemberCount = data.approximate_member_count;
        }
        if (data.approximate_presence_count !== undefined) {
            this.approximatePresenceCount = data.approximate_presence_count;
        }
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.max_members !== undefined) {
            this.maxMembers = data.max_members;
        }
        if (data.max_presences !== undefined) {
            this.maxPresences = data.max_presences;
        }
        if (data.member_count !== undefined) {
            this.memberCount = data.member_count;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.owner_id !== undefined) {
            this.ownerID = data.owner_id;
            this.owner = this.client.users.get(data.owner_id);
        }
        if (data.preferred_locale !== undefined) {
            this.preferredLocale = data.preferred_locale;
        }
    }
    /** The client's member for this guild. This will throw an error if the guild was obtained via rest and the member is not cached.*/
    get clientMember() {
        if (!this._clientMember) {
            throw new Error(`${this.constructor.name}#clientMember is not present if the guild was obtained via rest and the member is not cached.`);
        }
        return this._clientMember;
    }
    /** The shard this guild is on. Gateway only. */
    get shard() {
        if (!this._shard) {
            throw new Error(`${this.constructor.name}#shard is not present if the guild was received via REST, or you do not have the GUILDS intent.`);
        }
        return this._shard;
    }
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.GUILD_ICON(this.id, this.icon), format, size);
    }
    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member) {
        if (typeof member === "string") {
            member = this.members.get(member);
        }
        if (!member) {
            throw new Error("Member not found");
        }
        if (member.id === this.ownerID) {
            return new Permission_1.default(Constants_1.AllPermissions);
        }
        else {
            let permissions = this.roles.get(this.id).permissions.allow;
            if (permissions & Constants_1.Permissions.ADMINISTRATOR) {
                return new Permission_1.default(Constants_1.AllPermissions);
            }
            for (const id of member.roles) {
                const role = this.roles.get(id);
                if (!role) {
                    continue;
                }
                if (role.permissions.allow & Constants_1.Permissions.ADMINISTRATOR) {
                    permissions = Constants_1.AllPermissions;
                    break;
                }
                else {
                    permissions |= role.permissions.allow;
                }
            }
            return new Permission_1.default(permissions);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            application: this.applicationID ?? undefined,
            approximateMemberCount: this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            channels: this.channels.map(channel => channel.id),
            icon: this.icon,
            large: this.large,
            maxMembers: this.maxMembers,
            maxPresences: this.maxPresences,
            memberCount: this.memberCount,
            members: this.members.map(member => member.id),
            name: this.name,
            ownerID: this.ownerID,
            preferredLocale: this.preferredLocale,
            region: this.region,
            roles: this.roles.map(role => role.toJSON()),
            threads: this.threads.map(thread => thread.id),
            unavailable: this.unavailable,
            vanityURLCode: this.vanityURLCode
        };
    }
}
exports.default = Guild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9HdWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQkFBb0I7QUFDcEIsMERBQTBCO0FBQzFCLDBEQUEwQjtBQUMxQiwwRUFBMEM7QUFDMUMsOERBQThCO0FBQzlCLDRFQUE0QztBQUk1QyxzRUFBc0M7QUFDdEMsZ0VBQWdDO0FBQ2hDLDRDQUE2RTtBQUM3RSwrREFBeUM7QUFFekMsc0ZBQXNEO0FBTXRELG1DQUFtQztBQUNuQyxNQUFxQixLQUFNLFNBQVEsY0FBSTtJQUMzQixhQUFhLENBQVU7SUFDdkIsTUFBTSxDQUFTO0lBQ3ZCLDhEQUE4RDtJQUM5RCxXQUFXLENBQTRCO0lBQ3ZDLHdFQUF3RTtJQUN4RSxhQUFhLENBQWdCO0lBQzdCLGtGQUFrRjtJQUNsRixzQkFBc0IsQ0FBVTtJQUNoQyw4RkFBOEY7SUFDOUYsd0JBQXdCLENBQVU7SUFDbEMsa0NBQWtDO0lBQ2xDLFFBQVEsQ0FBMEU7SUFDbEYsbUNBQW1DO0lBQ25DLElBQUksQ0FBZ0I7SUFDcEIseUNBQXlDO0lBQ3pDLEtBQUssQ0FBVTtJQUNmLHlEQUF5RDtJQUN6RCxVQUFVLENBQVU7SUFDcEIsb0hBQW9IO0lBQ3BILFlBQVksQ0FBVTtJQUN0QiwyQ0FBMkM7SUFDM0MsV0FBVyxDQUFTO0lBQ3BCLHdDQUF3QztJQUN4QyxPQUFPLENBQTZFO0lBQ3BGLDhCQUE4QjtJQUM5QixJQUFJLENBQVM7SUFDYiwrQkFBK0I7SUFDL0IsS0FBSyxDQUFRO0lBQ2IseUNBQXlDO0lBQ3pDLE9BQU8sQ0FBUztJQUNoQixtR0FBbUc7SUFDbkcsZUFBZSxDQUFTO0lBQ3hCLDJDQUEyQztJQUMzQyxNQUFNLENBQWlCO0lBQ3ZCLCtCQUErQjtJQUMvQixLQUFLLENBQTREO0lBQ2pFLDZHQUE2RztJQUM3RyxZQUFZLENBQXNCO0lBQ2xDLHdFQUF3RTtJQUN4RSxhQUFhLENBQXNCO0lBQ25D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