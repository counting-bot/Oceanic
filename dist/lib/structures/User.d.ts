/** @module User */
import Base from "./Base.js";
import type PrivateChannel from "./PrivateChannel.js";
import type { ImageFormat } from "../Constants.js";
import type Client from "../Client.js";
import type { RawUser } from "../types/users.js";
import type { JSONUser } from "../types/json.js";
/** Represents a user. */
export default class User extends Base {
    /** The user's banner color. If this member was received via the gateway, this will never be present. */
    accentColor?: number | null;
    /** The user's avatar hash. */
    avatar: string | null;
    /** The hash of this user's avatar decoration. This will always resolve to a png. */
    avatarDecoration?: string | null;
    /** The user's banner hash. If this member was received via the gateway, this will never be present. */
    banner?: string | null;
    /** If this user is a bot. */
    bot: boolean;
    /** The 4 digits after the user's username. */
    discriminator: string;
    /** The user's public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags). */
    publicFlags: number;
    /** If this user is an official discord system user. */
    system: boolean;
    /** The user's username. */
    username: string;
    constructor(data: RawUser, client: Client);
    protected update(data: Partial<RawUser>): void;
    /** The default avatar value of this user (discriminator modulo 5). */
    get defaultAvatar(): number;
    /** A string that will mention this user. */
    get mention(): string;
    /** a combination of this user's username and discriminator. */
    get tag(): string;
    /**
     * The url of this user's avatar decoration. This will always be a png.
     * Discord does not combine the decoration and their current avatar for you. This is ONLY the decoration.
     * @note As of 12/8/2022 (Dec 8) `avatar_decoration` is only visible to bots if they set an `X-Super-Properties` header with a `client_build_number` ~162992. You can do this via the {@link Types/Client~RESTOptions#superProperties | rest.superProperties} option.
     * @param size The dimensions of the image.
     */
    avatarDecorationURL(size?: number): string | null;
    /**
     * The url of this user's avatar (or default avatar, if they have not set an avatar).
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    avatarURL(format?: ImageFormat, size?: number): string;
    /**
     * Create a direct message with this user.
     */
    createDM(): Promise<PrivateChannel>;
    /**
     * The url of this user's default avatar.
     */
    defaultAvatarURL(): string;
    toJSON(): JSONUser;
}
