"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Team_js_1 = tslib_1.__importDefault(require("./Team.js"));
const ClientApplication_js_1 = tslib_1.__importDefault(require("./ClientApplication.js"));
const Routes = tslib_1.__importStar(require("../util/Routes.js"));
/** Represents an oauth application. */
class Application extends ClientApplication_js_1.default {
    _cachedGuild;
    /** When false, only the application's owners can invite the bot to guilds. */
    botPublic;
    /** When true, the applications bot will only join upon the completion of the full oauth2 code grant flow. */
    botRequireCodeGrant;
    /** This application's rich presence invite cover image hash, if any. */
    coverImage;
    /** This application's default custom authorization link, if any. */
    customInstallURL;
    /** The description of the application. */
    description;
    /** If this application is a game sold on Discord, the ID of the guild to which it has been linked. */
    guildID;
    /** The icon hash of the application. */
    icon;
    /** Settings for this application's in-app authorization link, if enabled. */
    installParams;
    /** The name of the application. */
    name;
    /** The owner of this application. */
    owner;
    /** The ID of the owner of this application. */
    ownerID;
    /** If this application is a game sold on Discord, the id of the Game's SKU. */
    primarySKUID;
    /** A URL to this application's privacy policy. */
    privacyPolicyURL;
    /** A list of rpc origin urls, if rpc is enabled. */
    rpcOrigins;
    /** If this application is a game sold on Discord, the slug that links to its store page. */
    slug;
    /** The tags for this application. */
    tags;
    /** The team that owns this application, if any. */
    team;
    /** A URL to this application's terms of service. */
    termsOfServiceURL;
    /** The bot's hex encoded public key. */
    verifyKey;
    constructor(data, client) {
        super(data, client);
        this.botPublic = !!data.bot_public;
        this.botRequireCodeGrant = !!data.bot_require_code_grant;
        this.coverImage = null;
        this.description = data.description;
        this.guildID = data.guild_id ?? null;
        this.icon = null;
        this.name = data.name;
        this.owner = client.users.update(data.owner);
        this.ownerID = data.owner.id;
        this.rpcOrigins = [];
        this.team = null;
        this.verifyKey = data.verify_key;
        this.update(data);
    }
    update(data) {
        super.update(data);
        if (data.bot_public !== undefined) {
            this.botPublic = data.bot_public;
        }
        if (data.bot_require_code_grant !== undefined) {
            this.botRequireCodeGrant = data.bot_require_code_grant;
        }
        if (data.cover_image !== undefined) {
            this.coverImage = data.cover_image;
        }
        if (data.custom_install_url !== undefined) {
            this.customInstallURL = data.custom_install_url;
        }
        if (data.description !== undefined) {
            this.description = data.description;
        }
        this.guildID = data.guild_id === undefined ? null : data.guild_id;
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.install_params !== undefined) {
            this.installParams = data.install_params;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.owner !== undefined) {
            this.owner = this.client.users.update(data.owner);
            this.ownerID = data.owner.id;
        }
        if (data.primary_sku_id !== undefined) {
            this.primarySKUID = data.primary_sku_id;
        }
        if (data.privacy_policy_url !== undefined) {
            this.privacyPolicyURL = data.privacy_policy_url;
        }
        if (data.rpc_origins !== undefined) {
            this.rpcOrigins = data.rpc_origins;
        }
        if (data.slug !== undefined) {
            this.slug = data.slug;
        }
        if (data.tags !== undefined) {
            this.tags = data.tags;
        }
        if (data.team !== undefined) {
            this.team = data.team ? new Team_js_1.default(data.team, this.client) : null;
        }
        if (data.terms_of_service_url !== undefined) {
            this.termsOfServiceURL = data.terms_of_service_url;
        }
        if (data.verify_key !== undefined) {
            this.verifyKey = data.verify_key;
        }
    }
    /** If this application is a game sold on Discord, the guild to which it has been linked. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            if (!this._cachedGuild) {
                this._cachedGuild = this.client.guilds.get(this.guildID);
                if (!this._cachedGuild) {
                    throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
                }
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    /**
     * The url of this application's cover image.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    coverImageURL(format, size) {
        return this.coverImage === null ? null : this.client.util.formatImage(Routes.APPLICATION_COVER(this.id, this.coverImage), format, size);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            botPublic: this.botPublic,
            botRequireCodeGrant: this.botRequireCodeGrant,
            coverImage: this.coverImage,
            customInstallURL: this.customInstallURL,
            description: this.description,
            guildID: this.guildID ?? undefined,
            icon: this.icon,
            installParams: this.installParams,
            name: this.name,
            ownerID: this.ownerID,
            primarySKUID: this.primarySKUID,
            privacyPolicyURL: this.privacyPolicyURL,
            rpcOrigins: this.rpcOrigins,
            slug: this.slug,
            tags: this.tags,
            team: this.team?.toJSON() ?? null,
            termsOfServiceURL: this.termsOfServiceURL,
            verifyKey: this.verifyKey
        };
    }
}
exports.default = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9BcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxnRUFBNkI7QUFDN0IsMEZBQXVEO0FBS3ZELGtFQUE0QztBQUc1Qyx1Q0FBdUM7QUFDdkMsTUFBcUIsV0FBWSxTQUFRLDhCQUFpQjtJQUM5QyxZQUFZLENBQWdCO0lBQ3BDLDhFQUE4RTtJQUM5RSxTQUFTLENBQVU7SUFDbkIsNkdBQTZHO0lBQzdHLG1CQUFtQixDQUFVO0lBQzdCLHdFQUF3RTtJQUN4RSxVQUFVLENBQWdCO0lBQzFCLG9FQUFvRTtJQUNwRSxnQkFBZ0IsQ0FBVTtJQUMxQiwwQ0FBMEM7SUFDMUMsV0FBVyxDQUFTO0lBQ3BCLHNHQUFzRztJQUN0RyxPQUFPLENBQWdCO0lBQ3ZCLHdDQUF3QztJQUN4QyxJQUFJLENBQWdCO0lBQ3BCLDZFQUE2RTtJQUM3RSxhQUFhLENBQWlCO0lBQzlCLG1DQUFtQztJQUNuQyxJQUFJLENBQVM7SUFDYixxQ0FBcUM7SUFDckMsS0FBSyxDQUFPO0lBQ1osK0NBQStDO0lBQy9DLE9BQU8sQ0FBUztJQUNoQiwrRUFBK0U7SUFDL0UsWUFBWSxDQUFVO0lBQ3RCLGtEQUFrRDtJQUNsRCxnQkFBZ0IsQ0FBVTtJQUMxQixvREFBb0Q7SUFDcEQsVUFBVSxDQUFnQjtJQUMxQiw0RkFBNEY7SUFDNUYsSUFBSSxDQUFVO0lBQ2QscUNBQXFDO0lBQ3JDLElBQUksQ0FBaUI7SUFDckIsbURBQW1EO0lBQ25ELElBQUksQ0FBYztJQUNsQixvREFBb0Q7SUFDcEQsaUJBQWlCLENBQVU7SUFDM0Isd0NBQXdDO0lBQ3hDLFNBQVMsQ0FBUztJQUNsQixZQUFZLElBQXFCLEVBQUUsTUFBYztRQUM3QyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUks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