import type { AnyApplicationCommand, ApplicationCommandOptionConversion, CreateApplicationCommandOptions, EditApplicationCommandOptions, EditApplicationCommandPermissionsOptions, RESTGuildApplicationCommandPermissions, CreateGuildApplicationCommandOptions, EditGuildApplicationCommandOptions, GetApplicationCommandOptions } from "../types/application-commands.js";
import type RESTManager from "../rest/RESTManager.js";
/** Various methods for interacting with application commands. */
export default class ApplicationCommands {
    #private;
    constructor(manager: RESTManager);
    /**
     * Overwrite all existing global application commands.
     * @param applicationID The ID of the application.
     * @param options The commands.
     */
    bulkEditGlobalCommands(applicationID: string, options: Array<CreateApplicationCommandOptions>): Promise<Array<object>>;
    /**
     * Overwrite all existing application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The commands.
     */
    bulkEditGuildCommands(applicationID: string, guildID: string, options: Array<CreateGuildApplicationCommandOptions>): Promise<Array<object>>;
    /**
     * Create a global application command.
     * @param applicationID The ID of the application.
     * @param options The options for the command.
     */
    createGlobalCommand<T extends CreateApplicationCommandOptions = CreateApplicationCommandOptions>(applicationID: string, options: T): Promise<ApplicationCommandOptionConversion<T>>;
    /**
     * Create a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for the command.
     */
    createGuildCommand<T extends CreateGuildApplicationCommandOptions = CreateGuildApplicationCommandOptions>(applicationID: string, guildID: string, options: T): Promise<ApplicationCommandOptionConversion<T>>;
    /**
     * Delete a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID the command to delete.
     */
    deleteGlobalCommand(applicationID: string, commandID: string): Promise<void>;
    /**
     * Delete a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to delete.
     */
    deleteGuildCommand(applicationID: string, guildID: string, commandID: string): Promise<void>;
    /**
     * Edit a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     */
    editGlobalCommand<T extends EditApplicationCommandOptions = EditApplicationCommandOptions>(applicationID: string, commandID: string, options: T): Promise<ApplicationCommandOptionConversion<T>>;
    /**
     * Edit a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     */
    editGuildCommand<T extends EditGuildApplicationCommandOptions = EditGuildApplicationCommandOptions>(applicationID: string, guildID: string, commandID: string, options: T): Promise<ApplicationCommandOptionConversion<T>>;
    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     */
    editGuildCommandPermissions(applicationID: string, guildID: string, commandID: string, options: EditApplicationCommandPermissionsOptions): Promise<RESTGuildApplicationCommandPermissions>;
    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    getGlobalCommand<T extends AnyApplicationCommand = AnyApplicationCommand>(applicationID: string, commandID: string, options?: GetApplicationCommandOptions): Promise<T>;
    /**
     * Get an application's global commands.
     * @param applicationID The ID of the application.
     * @param options The options for getting the command.
     */
    getGlobalCommands(applicationID: string, options?: GetApplicationCommandOptions): Promise<Array<object>>;
    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    getGuildCommand<T extends AnyApplicationCommand = AnyApplicationCommand>(applicationID: string, guildID: string, commandID: string, options?: GetApplicationCommandOptions): Promise<T>;
    /**
     * Get an application's application commands in a specific guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     */
    getGuildCommands(applicationID: string, guildID: string, options?: GetApplicationCommandOptions): Promise<Array<object>>;
    /**
     * Get an application command's permissions in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    getGuildPermission(applicationID: string, guildID: string, commandID: string): Promise<RESTGuildApplicationCommandPermissions>;
    /**
     * Get the permissions for all application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     */
    getGuildPermissions(applicationID: string, guildID: string): Promise<Array<RESTGuildApplicationCommandPermissions>>;
}
