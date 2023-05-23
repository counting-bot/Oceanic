/** @module Guild */
import Base from "./Base.js";
import type User from "./User";
import type ClientApplication from "./ClientApplication";
import type Client from "../Client";
import type { RawGuild } from "../types/guilds.js";
import type { JSONGuild } from "../types/json.js";
/** Represents a Discord server. */
export default class Guild extends Base {
    private _shard?;
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
    constructor(data: RawGuild, client: Client);
    protected update(data: Partial<RawGuild>): void;
    toJSON(): JSONGuild;
}
