/** @module Guild */
import Base from "./Base";
import Member from "./Member";
import type User from "./User";
import type ClientApplication from "./ClientApplication";
import type TextChannel from "./TextChannel";
import type { ImageFormat } from "../Constants";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type { AnyGuildChannelWithoutThreads, AnyThreadChannel, RawGuildChannel, RawThreadChannel } from "../types/channels.js";
import type { RawGuild, RawMember, RESTMember } from "../types/guilds.js";
import type { JSONGuild } from "../types/json.js";
/** Represents a Discord server. */
export default class Guild extends Base {
    private _clientMember?;
    private _shard?;
    /** The application that created this guild, if applicable. */
    application?: ClientApplication | null;
    /** The ID of the application that created this guild, if applicable. */
    applicationID: string | null;
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount?: number;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount?: number;
    /** The channels in this guild. */
    channels: TypedCollection<string, RawGuildChannel, AnyGuildChannelWithoutThreads>;
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
    /** The cached members in this guild. */
    members: TypedCollection<string, RawMember | RESTMember, Member, [guildID: string]>;
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
    /** The channel where rules/guidelines are displayed. Only present in guilds with the `COMMUNITY` feature. */
    rulesChannel?: TextChannel | null;
    /** The channel where welcome messages and boosts notices are posted. */
    systemChannel?: TextChannel | null;
    /** The threads in this guild. */
    threads: TypedCollection<string, RawThreadChannel, AnyThreadChannel>;
    /** If this guild is unavailable. */
    unavailable: boolean;
    /** If the widget is enabled. */
    widgetEnabled?: boolean;
    constructor(data: RawGuild, client: Client);
    private updateMemberLimit;
    protected update(data: Partial<RawGuild>): void;
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format?: ImageFormat, size?: number): string | null;
    toJSON(): JSONGuild;
}
