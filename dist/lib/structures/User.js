"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module User */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const Routes = tslib_1.__importStar(require("../util/Routes.js"));
/** Represents a user. */
class User extends Base_js_1.default {
    /** The user's banner color. If this member was received via the gateway, this will never be present. */
    accentColor;
    /** The user's avatar hash. */
    avatar;
    /** The hash of this user's avatar decoration. This will always resolve to a png. */
    avatarDecoration;
    /** The user's banner hash. If this member was received via the gateway, this will never be present. */
    banner;
    /** If this user is a bot. */
    bot;
    /** The 4 digits after the user's username. */
    discriminator;
    /** The user's public [flags](https://discord.com/developers/docs/resources/user#user-object-user-flags). */
    publicFlags;
    /** If this user is an official discord system user. */
    system;
    /** The user's username. */
    username;
    constructor(data, client) {
        super(data.id, client);
        this.avatar = null;
        this.bot = !!data.bot;
        this.discriminator = data.discriminator;
        this.publicFlags = 0;
        this.system = !!data.system;
        this.username = data.username;
        this.update(data);
    }
    update(data) {
        if (data.avatar !== undefined) {
            this.avatar = data.avatar;
        }
        if (data.banner !== undefined) {
            this.banner = data.banner;
        }
        if (data.discriminator !== undefined) {
            this.discriminator = data.discriminator;
        }
        if (data.username !== undefined) {
            this.username = data.username;
        }
    }
    /** The default avatar value of this user (discriminator modulo 5). */
    get defaultAvatar() {
        return Number(this.discriminator) % 5;
    }
    /** A string that will mention this user. */
    get mention() {
        return `<@${this.id}>`;
    }
    /** a combination of this user's username and discriminator. */
    get tag() {
        return `${this.username}#${this.discriminator}`;
    }
    /**
     * The url of this user's avatar decoration. This will always be a png.
     * Discord does not combine the decoration and their current avatar for you. This is ONLY the decoration.
     * @note As of 12/8/2022 (Dec 8) `avatar_decoration` is only visible to bots if they set an `X-Super-Properties` header with a `client_build_number` ~162992. You can do this via the {@link Types/Client~RESTOptions#superProperties | rest.superProperties} option.
     * @param size The dimensions of the image.
     */
    avatarDecorationURL(size) {
        return !this.avatarDecoration ? null : this.client.util.formatImage(Routes.USER_AVATAR_DECORATION(this.id, this.avatarDecoration), "png", size);
    }
    /**
     * The url of this user's avatar (or default avatar, if they have not set an avatar).
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    avatarURL(format, size) {
        return this.avatar === null ? this.defaultAvatarURL() : this.client.util.formatImage(Routes.USER_AVATAR(this.id, this.avatar), format, size);
    }
    /**
     * Create a direct message with this user.
     */
    async createDM() {
        return this.client.rest.channels.createDM(this.id);
    }
    /**
     * The url of this user's default avatar.
     */
    defaultAvatarURL() {
        return this.client.util.formatImage(Routes.EMBED_AVATAR(this.defaultAvatar), "png");
    }
    toJSON() {
        return {
            ...super.toJSON(),
            accentColor: this.accentColor,
            avatar: this.avatar,
            banner: this.banner,
            bot: this.bot,
            discriminator: this.discriminator,
            publicFlags: this.publicFlags,
            system: this.system,
            username: this.username
        };
    }
}
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLGdFQUE2QjtBQUc3QixrRUFBNEM7QUFLNUMseUJBQXlCO0FBQ3pCLE1BQXFCLElBQUssU0FBUSxpQkFBSTtJQUNsQyx3R0FBd0c7SUFDeEcsV0FBVyxDQUFpQjtJQUM1Qiw4QkFBOEI7SUFDOUIsTUFBTSxDQUFnQjtJQUN0QixvRkFBb0Y7SUFDcEYsZ0JBQWdCLENBQWlCO0lBQ2pDLHVHQUF1RztJQUN2RyxNQUFNLENBQWlCO0lBQ3ZCLDZCQUE2QjtJQUM3QixHQUFHLENBQVU7SUFDYiw4Q0FBOEM7SUFDOUMsYUFBYSxDQUFTO0lBQ3RCLDRHQUE0RztJQUM1RyxXQUFXLENBQVM7SUFDcEIsdURBQXVEO0lBQ3ZELE1BQU0sQ0FBVTtJQUNoQiwyQkFBMkI7SUFDM0IsUUFBUSxDQUFTO0lBQ2pCLFlBQVksSUFBYSxFQUFFLE1BQWM7UUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRWtCLE1BQU0sQ0FBQyxJQUFzQjtRQUM1QyxJQUFJ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