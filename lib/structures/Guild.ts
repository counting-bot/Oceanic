/** @module Guild */
import Base from "./Base.js";
import type User from "./User";
import type ClientApplication from "./ClientApplication";
import type Client from "../Client";
import type { RawGuild } from "../types/guilds.js";
import type { JSONGuild } from "../types/json.js";
import type Shard from "../gateway/Shard.js";

/** Represents a Discord server. */
export default class Guild extends Base {
    // private _clientMember?: Member;
    private _shard?: Shard;
    /** The application that created this guild, if applicable. */
    application?: ClientApplication | null;
    /** The ID of the application that created this guild, if applicable. */
    applicationID: string | null;
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount?: number;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount?: number;
    /** The icon hash of this guild. */
    icon: string | null;
    /** If this guild is considered large. */
    large: boolean;
    /** The maximum amount of members this guild can have. */
    maxMembers?: number;
    /** The maximum amount of people that can be present at a time in this guild. Only present for very large guilds. */
    maxPresences?: number;
    /** The number of members in this guild. */
    memberCount: number;
    /** The name of this guild. */
    name: string;
    /** The owner of this guild. */
    owner?: User;
    /** The ID of the owner of this guild. */
    ownerID: string;
    /** The [preferred locale](https://discord.com/developers/docs/reference#locales) of this guild. */
    preferredLocale: string;
    /** @deprecated The region of this guild.*/
    region?: string | null;
    /** If this guild is unavailable. */
    unavailable: boolean;
    /** If the widget is enabled. */
    widgetEnabled?: boolean;
    constructor(data: RawGuild, client: Client) {
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

    protected override update(data: Partial<RawGuild>): void {
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

    override toJSON(): JSONGuild {
        return {
            ...super.toJSON(),
            application:              this.applicationID ?? undefined,
            approximateMemberCount:   this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            icon:                     this.icon,
            large:                    this.large,
            maxMembers:               this.maxMembers,
            maxPresences:             this.maxPresences,
            memberCount:              this.memberCount,
            name:                     this.name,
            ownerID:                  this.ownerID,
            preferredLocale:          this.preferredLocale,
            region:                   this.region,
            unavailable:              this.unavailable
        };
    }
}
