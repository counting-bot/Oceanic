import Base from "./Base.js";
import Permission from "./Permission.js";
import type { GuildFeature, ImageFormat } from "../Constants.js";
import type { RawOAuthGuild } from "../types/guilds.js";
import type Client from "../Client.js";
/** Represents a guild retrieved via oauth. */
export default class OAuthGuild extends Base {
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount?: number;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount?: number;
    /** The [features](https://discord.com/developers/docs/resources/guild#guild-object-guild-features) this guild has. */
    features: Array<GuildFeature>;
    /** The icon hash of this guild. */
    icon: string | null;
    /** The name of this guild. */
    name: string;
    /** If the user is the owner of this guild. */
    owner: boolean;
    /** The permissions of the user in this guild. */
    permissions: Permission;
    constructor(data: RawOAuthGuild, client: Client);
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format?: ImageFormat, size?: number): string | null;
}
