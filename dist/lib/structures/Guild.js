/** @module Guild */
import Base from "./Base.js";
/** Represents a Discord server. */
export default class Guild extends Base {
    // private _clientMember?: Member;
    _shard;
    /** The application that created this guild, if applicable. */
    application;
    /** The ID of the application that created this guild, if applicable. */
    applicationID;
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount;
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
    /** If this guild is unavailable. */
    unavailable;
    /** If the widget is enabled. */
    widgetEnabled;
    constructor(data, client) {
        super(data.id, client);
        this.applicationID = data.application_id;
        this.icon = null;
        this.large = (data.member_count ?? data.approximate_member_count ?? 0) >= client.shards.options.largeThreshold;
        this.memberCount = data.member_count ?? data.approximate_member_count ?? 0;
        this.name = data.name;
        this.ownerID = data.owner_id;
        this.preferredLocale = data.preferred_locale;
        this.unavailable = !!data.unavailable;
        this.update(data);
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
        if (data.preferred_locale !== undefined) {
            this.preferredLocale = data.preferred_locale;
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            application: this.applicationID ?? undefined,
            approximateMemberCount: this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            icon: this.icon,
            large: this.large,
            maxMembers: this.maxMembers,
            maxPresences: this.maxPresences,
            memberCount: this.memberCount,
            name: this.name,
            ownerID: this.ownerID,
            preferredLocale: this.preferredLocale,
            region: this.region,
            unavailable: this.unavailable
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9HdWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxJQUFJLE1BQU0sV0FBVyxDQUFDO0FBUTdCLG1DQUFtQztBQUNuQyxNQUFNLENBQUMsT0FBTyxPQUFPLEtBQU0sU0FBUSxJQUFJO0lBQ25DLGtDQUFrQztJQUMxQixNQUFNLENBQVM7SUFDdkIsOERBQThEO0lBQzlELFdBQVcsQ0FBNEI7SUFDdkMsd0VBQXdFO0lBQ3hFLGFBQWEsQ0FBZ0I7SUFDN0Isa0ZBQWtGO0lBQ2xGLHNCQUFzQixDQUFVO0lBQ2hDLDhGQUE4RjtJQUM5Rix3QkFBd0IsQ0FBVTtJQUNsQyxtQ0FBbUM7SUFDbkMsSUFBSSxDQUFnQjtJQUNwQix5Q0FBeUM7SUFDekMsS0FBSyxDQUFVO0lBQ2YseURBQXlEO0lBQ3pELFVBQVUsQ0FBVTtJQUNwQixvSEFBb0g7SUFDcEgsWUFBWSxDQUFVO0lBQ3RCLDJDQUEyQztJQUMzQyxXQUFXLENBQVM7SUFDcEIsOEJBQThCO0lBQzlCLElBQUksQ0FBUztJQUNiLCtCQUErQjtJQUMvQixLQUFLLENBQVE7SUFDYix5Q0FBeUM7SUFDekMsT0FBTyxDQUFTO0lBQ2hCLG1HQUFtRztJQUNuRyxlQUFlLENBQVM7SUFDeEIsMkNBQTJDO0lBQzNDLE1BQU0sQ0FBaUI7SUFDdkIsb0NBQW9DO0lBQ3BDLFdBQVcsQ0FBVTtJQUNyQixnQ0FBZ0M7SUFDaEMsYUFBYSxDQUFXO0lBQ3hCLFlBQVksSUFBYyxFQUFFLE1BQWM7UUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FB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