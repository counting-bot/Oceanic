/** @module ApplicationCommand */
import Base from "./Base.js";
import Permission from "./Permission.js";
import { ApplicationCommandTypes } from "../Constants.js";
/** Represents an application command. */
export default class ApplicationCommand extends Base {
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
        this.defaultMemberPermissions = data.default_member_permissions ? new Permission(data.default_member_permissions) : null;
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
        this.type = (data.type ?? ApplicationCommandTypes.CHAT_INPUT);
        this.version = data.version;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25Db21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQXBwbGljYXRpb25Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlDQUFpQztBQUNqQyxPQUFPLElBQUksTUFBTSxXQUFXLENBQUM7QUFDN0IsT0FBTyxVQUFVLE1BQU0saUJBQWlCLENBQUM7QUFJekMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFZMUQseUNBQXlDO0FBQ3pDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQWdGLFNBQVEsSUFBSTtJQUNyRyxZQUFZLENBQWdCO0lBQ3BDLDJDQUEyQztJQUMzQyxXQUFXLENBQXFCO0lBQ2hDLGlEQUFpRDtJQUNqRCxhQUFhLENBQVM7SUFDdEIsZ0RBQWdEO0lBQ2hELHdCQUF3QixDQUFvQjtJQUM1QyxtRkFBbUY7SUFDbkYsV0FBVyxDQUE2RDtJQUN4RSxrSEFBa0g7SUFDbEgsd0JBQXdCLENBQW9CO0lBQzVDLDJFQUEyRTtJQUMzRSxvQkFBb0IsQ0FBVTtJQUM5Qiw2RUFBNkU7SUFDN0UsWUFBWSxDQUFXO0lBQ3ZCLG9FQUFvRTtJQUNwRSxPQUFPLENBQWdCO0lBQ3ZCLGdDQUFnQztJQUNoQyxJQUFJLENBQVM7SUFDYiwyR0FBMkc7SUFDM0csaUJBQWlCLENBQW9CO0lBQ3JDLDJFQUEyRTtJQUMzRSxhQUFhLENBQVU7SUFDdkIsNkNBQTZDO0lBQzdDLElBQUksQ0FBVztJQUNmLGdFQUFnRTtJQUNoRSxPQUFPLENBQW9DO0lBQzNDLDhKQUE4SjtJQUM5SixJQUFJLENBQUk7SUFDUixxRkFBcUY7SUFDckYsT0FBTyxDQUFTO0lBQ2hCLFlBQVksSUFBMkIsRUFBRSxNQUFjO1FBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLGNB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