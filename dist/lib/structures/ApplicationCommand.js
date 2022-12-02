"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ApplicationCommand */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const Permission_js_1 = tslib_1.__importDefault(require("./Permission.js"));
const Constants_js_1 = require("../Constants.js");
/** Represents an application command. */
class ApplicationCommand extends Base_js_1.default {
    _cachedGuild;
    /** The application this command is for. */
    application;
    /** The ID of application this command is for. */
    applicationID;
    /** The default permissions for this command. */
    defaultMemberPermissions;
    /** The description of this command. Empty string for non `CHAT_INPUT` commands. */
    description;
    /** A dictionary of [locales](https://discord.com/developers/docs/reference#locales) to localized descriptions. */
    descriptionLocalizations;
    /** The description of this application command in the requested locale. */
    descriptionLocalized;
    /** If this command can be used in direct messages (global commands only). */
    dmPermission;
    /** The id of the guild this command is in (guild commands only). */
    guildID;
    /** The name of this command. */
    name;
    /** A dictionary of [locales](https://discord.com/developers/docs/reference#locales) to localized names. */
    nameLocalizations;
    /** The description of this application command in the requested locale. */
    nameLocalized;
    /** Whether the command is age restricted. */
    nsfw;
    /** The options on this command. Only valid for `CHAT_INPUT`. */
    options;
    /** The [type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types) of this command. */
    type;
    /** Autoincrementing version identifier updated during substantial record changes. */
    version;
    constructor(data, client) {
        super(data.id, client);
        this.application = client["_application"] && client.application.id === data.application_id ? client.application : undefined;
        this.applicationID = data.application_id;
        this.defaultMemberPermissions = data.default_member_permissions ? new Permission_js_1.default(data.default_member_permissions) : null;
        this.description = data.description;
        this.descriptionLocalizations = data.description_localizations;
        this.descriptionLocalized = data.description_localized;
        this.dmPermission = data.dm_permission;
        this.guildID = data.guild_id ?? null;
        this.name = data.name;
        this.nameLocalizations = data.name_localizations;
        this.nameLocalized = data.name_localized;
        this.nsfw = data.nsfw;
        this.options = data.options?.map(o => client.util.optionToParsed(o));
        this.type = (data.type ?? Constants_js_1.ApplicationCommandTypes.CHAT_INPUT);
        this.version = data.version;
    }
    /** The guild this command is in (guild commands only). This will throw an error if the guild is not cached. */
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
     * Delete this command.
     */
    async delete() {
        return this.guildID ? this.client.rest.applicationCommands.deleteGuildCommand(this.applicationID, this.guildID, this.id) : this.client.rest.applicationCommands.deleteGlobalCommand(this.applicationID, this.id);
    }
    /**
     * Edit this command.
     * @param options The options for editing the command.
     */
    async edit(options) {
        return this.guildID ? this.client.rest.applicationCommands.editGuildCommand(this.applicationID, this.guildID, this.id, options) : this.client.rest.applicationCommands.editGlobalCommand(this.applicationID, this.id, options);
    }
    /**
     * Edit this command's permissions (guild commands only). This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param options The options for editing the permissions.
     */
    async editGuildCommandPermissions(options) {
        if (!this.guildID) {
            throw new Error("editGuildCommandPermissions cannot be used on global commands.");
        }
        return this.client.rest.applicationCommands.editGuildCommandPermissions(this.applicationID, this.guildID, this.id, options);
    }
    /**
     * Get this command's permissions (guild commands only).
     */
    async getGuildPermission() {
        if (!this.guildID) {
            throw new Error("getGuildPermission cannot be used on global commands.");
        }
        return this.client.rest.applicationCommands.getGuildPermission(this.applicationID, this.guildID, this.id);
    }
    /**
     * Get a mention for this command.
     * @param sub The subcommand group and/or subcommand to include (["subcommand"] or ["subcommand-group", "subcommand"]).
     */
    mention(sub) {
        let text = `${this.name}`;
        if (sub?.length) {
            text += ` ${sub.slice(0, 2).join(" ")}`;
        }
        return `<${text}:${this.id}>`;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            defaultMemberPermissions: this.defaultMemberPermissions?.toJSON(),
            description: this.description,
            descriptionLocalizations: this.descriptionLocalizations,
            dmPermission: this.dmPermission,
            guildID: this.guildID ?? undefined,
            name: this.name,
            nameLocalizations: this.nameLocalizations,
            nsfw: this.nsfw,
            options: this.options,
            type: this.type,
            version: this.version
        };
    }
}
exports.default = ApplicationCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25Db21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQXBwbGljYXRpb25Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyxnRUFBNkI7QUFDN0IsNEVBQXlDO0FBSXpDLGtEQUEwRDtBQVkxRCx5Q0FBeUM7QUFDekMsTUFBcUIsa0JBQWdGLFNBQVEsaUJBQUk7SUFDckcsWUFBWSxDQUFnQjtJQUNwQywyQ0FBMkM7SUFDM0MsV0FBVyxDQUFxQjtJQUNoQyxpREFBaUQ7SUFDakQsYUFBYSxDQUFTO0lBQ3RCLGdEQUFnRDtJQUNoRCx3QkFBd0IsQ0FBb0I7SUFDNUMsbUZBQW1GO0lBQ25GLFdBQVcsQ0FBNkQ7SUFDeEUsa0hBQWtIO0lBQ2xILHdCQUF3QixDQUFvQjtJQUM1QywyRUFBMkU7SUFDM0Usb0JBQW9CLENBQVU7SUFDOUIsNkVBQTZFO0lBQzdFLFlBQVksQ0FBVztJQUN2QixvRUFBb0U7SUFDcEUsT0FBTyxDQUFnQjtJQUN2QixnQ0FBZ0M7SUFDaEMsSUFBSSxDQUFTO0lBQ2IsMkdBQTJHO0lBQzNHLGlCQUFpQixDQUFvQjtJQUNyQywyRUFBMkU7SUFDM0UsYUFBYSxDQUFVO0lBQ3ZCLDZDQUE2QztJQUM3QyxJQUFJLENBQVc7SUFDZixnRUFBZ0U7SUFDaEUsT0FBTyxDQUFvQztJQUMzQyw4SkFBOEo7SUFDOUosSUFBSSxDQUFJO0lBQ1IscUZBQXFGO0lBQ3JGLE9BQU8sQ0FBUztJQUNoQixZQUFZLElBQTJCLEVBQUUsTUFBYztRQUNuRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENB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