/** @module Member */
import Base from "./Base.js";
import type User from "./User.js";
import type Guild from "./Guild.js";
import type Permission from "./Permission.js";
import type { ImageFormat } from "../Constants.js";
import type Client from "../Client.js";
import type { CreateBanOptions, EditMemberOptions, RawMember, RESTMember, Presence } from "../types/guilds.js";
import type { JSONMember } from "../types/json.js";
/** Represents a member of a guild. */
export default class Member extends Base {
    private _cachedGuild?;
    /** The member's avatar hash, if they have set a guild avatar. */
    avatar: string | null;
    /** When the member's [timeout](https://support.discord.com/hc/en-us/articles/4413305239191-Time-Out-FAQ) will expire, if active. */
    communicationDisabledUntil: Date | null;
    /** If this member is server deafened. */
    deaf: boolean;
    /** Undocumented. */
    flags?: number;
    /** The id of the guild this member is for. */
    guildID: string;
    /** Undocumented. */
    isPending?: boolean;
    /** The date at which this member joined the guild. */
    joinedAt: Date | null;
    /** If this member is server muted. */
    mute: boolean;
    /** This member's nickname, if any. */
    nick: string | null;
    /** If this member has not passed the guild's [membership screening](https://discord.com/developers/docs/resources/guild#membership-screening-object) requirements. */
    pending: boolean;
    /** The date at which this member started boosting the guild, if applicable. */
    premiumSince: Date | null;
    /** The presence of this member. */
    presence?: Presence;
    /** The roles this member has. */
    roles: Array<string>;
    /** The user associated with this member. */
    user: User;
    constructor(data: (RawMember | RESTMember) & {
        id?: string;
    }, client: Client, guildID: string);
    protected update(data: Partial<RawMember | RESTMember>): void;
    /** If the member associated with the user is a bot. */
    get bot(): boolean;
    /** The 4 digits after the username of the user associated with this member. */
    get discriminator(): string;
    /** The nick of this member if set, or the username of this member's user. */
    get displayName(): string;
    /** The guild this member is for. This will throw an error if the guild is not cached. */
    get guild(): Guild;
    /** A string that will mention this member. */
    get mention(): string;
    /** The permissions of this member. */
    get permissions(): Permission;
    /** The user associated with this member's public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags). */
    get publicFlags(): number;
    /** If this user associated with this member is an official discord system user. */
    get system(): boolean;
    /** A combination of the user associated with this member's username and discriminator. */
    get tag(): string;
    /** The username associated with this member's user. */
    get username(): string;
    /**
     * Add a role to this member.
     * @param roleID The ID of the role to add.
     */
    addRole(roleID: string, reason?: string): Promise<void>;
    /**
     * The url of this user's guild avatar (or their user avatar if no guild avatar is set, or their default avatar if none apply).
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    avatarURL(format?: ImageFormat, size?: number): string;
    /**
     * Create a ban for this member.
     * @param options The options for the ban.
     */
    ban(options?: CreateBanOptions): Promise<void>;
    /**
     * Edit this member. Use \<Guild\>.editCurrentMember if you wish to update the nick of this client using the CHANGE_NICKNAME permission.
     * @param options The options for editing the member.
     */
    edit(options: EditMemberOptions): Promise<Member>;
    /**
     * Remove a member from the guild.
     * @param reason The reason for the kick.
     */
    kick(reason?: string): Promise<void>;
    /**
     * remove a role from this member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    removeRole(roleID: string, reason?: string): Promise<void>;
    toJSON(): JSONMember;
}
