"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Role */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const Permission_js_1 = tslib_1.__importDefault(require("./Permission.js"));
/** Represents a role in a guild. */
class Role extends Base_js_1.default {
    _cachedGuild;
    /** The color of this role. */
    color;
    /** The id of the guild this role is in. */
    guildID;
    /** If this role is hoisted. */
    hoist;
    /** The icon has of this role. */
    icon;
    /** If this role is managed by an integration. */
    managed;
    /** If this role can be mentioned by anybody. */
    mentionable;
    /** The name of this role. */
    name;
    /** The permissions of this role. */
    permissions;
    /** The position of this role. */
    position;
    /** The unicode emoji of this role. */
    unicodeEmoji;
    constructor(data, client, guildID) {
        super(data.id, client);
        this.color = data.color;
        this.guildID = guildID;
        this.hoist = !!data.hoist;
        this.icon = null;
        this.managed = !!data.managed;
        this.mentionable = !!data.mentionable;
        this.name = data.name;
        this.permissions = new Permission_js_1.default(data.permissions);
        this.position = data.position;
        this.unicodeEmoji = null;
        this.update(data);
    }
    update(data) {
        if (data.hoist !== undefined) {
            this.hoist = data.hoist;
        }
        if (data.mentionable !== undefined) {
            this.mentionable = data.mentionable;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.permissions !== undefined) {
            this.permissions = new Permission_js_1.default(data.permissions);
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.unicode_emoji !== undefined) {
            this.unicodeEmoji = data.unicode_emoji ?? null;
        }
    }
    /** The guild this role is in. This will throw an error if the guild is not cached. */
    get guild() {
        if (!this._cachedGuild) {
            this._cachedGuild = this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
            }
        }
        return this._cachedGuild;
    }
    /**
     * Edit this role.
     * @param options The options for editing the role.
     */
    async edit(options) {
        return this.client.rest.guilds.editRole(this.guildID, this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            color: this.color,
            guildID: this.guildID,
            hoist: this.hoist,
            icon: this.icon,
            managed: this.managed,
            mentionable: this.mentionable,
            name: this.name,
            permissions: this.permissions.toJSON(),
            position: this.position,
            unicodeEmoji: this.unicodeEmoji
        };
    }
}
exports.default = Role;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1JvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLGdFQUE2QjtBQUM3Qiw0RUFBeUM7QUFNekMsb0NBQW9DO0FBQ3BDLE1BQXFCLElBQUssU0FBUSxpQkFBSTtJQUMxQixZQUFZLENBQVM7SUFDN0IsOEJBQThCO0lBQzlCLEtBQUssQ0FBUztJQUNkLDJDQUEyQztJQUMzQyxPQUFPLENBQVM7SUFDaEIsK0JBQStCO0lBQy9CLEtBQUssQ0FBVTtJQUNmLGlDQUFpQztJQUNqQyxJQUFJLENBQWdCO0lBQ3BCLGlEQUFpRDtJQUNqRCxPQUFPLENBQVU7SUFDakIsZ0RBQWdEO0lBQ2hELFdBQVcsQ0FBVTtJQUNyQiw2QkFBNkI7SUFDN0IsSUFBSSxDQUFTO0lBQ2Isb0NBQW9DO0lBQ3BDLFdBQVcsQ0FBYTtJQUN4QixpQ0FBaUM7SUFDakMsUUFBUSxDQUFTO0lBQ2pCLHNDQUFzQztJQUN0QyxZQUFZLENBQWdCO0lBQzVCLFlBQVksSUFBYSxFQUFFLE1BQWMsRUFBRSxPQUFlO1FBQ3RELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFH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