/** @module ClientApplication */
import Base from "./Base.js";
import type ApplicationCommand from "./ApplicationCommand";
import type Client from "../Client";
import type { RawClientApplication } from "../types/oauth";
import type { AnyApplicationCommand, ApplicationCommandOptionConversion, CreateApplicationCommandOptions, CreateGuildApplicationCommandOptions, EditApplicationCommandOptions, EditApplicationCommandPermissionsOptions, EditGuildApplicationCommandOptions, GetApplicationCommandOptions, RESTGuildApplicationCommandPermissions } from "../types/application-commands.js";
import type { JSONClientApplication } from "../types/json.js";
import type { ApplicationCommandTypes } from "../Constants.js";
/** A representation of the authorized client's application (typically received via gateway). */
export default class ClientApplication extends Base {
    /** This application's [public flags](https://discord.com/developers/docs/resources/application#application-object-application-flags). */
    flags: number;
    constructor(data: RawClientApplication, client: Client);
    protected update(data: Partial<RawClientApplication>): void;
    /**
     * Overwrite all existing global application commands.
     * @param options The commands.
     */
    bulkEditGlobalCommands(options: Array<CreateApplicationCommandOptions>): Promise<Array<ApplicationCommand<ApplicationCommandTypes>>>;
    /**
     * Overwrite all existing application commands in a guild.
     * @param guildID The ID of the guild.
     * @param options The commands.
     */
    bulkEditGuildCommands(guildID: string, options: Array<CreateGuildApplicationCommandOptions>): Promise<Array<ApplicationCommand<ApplicationCommandTypes>>>;
    /**
     * Create a global application command.
     * @param options The options for creating the command.
     */
    createGlobalCommand<T extends CreateApplicationCommandOptions = CreateApplicationCommandOptions>(options: T): Promise<ApplicationCommandOptionConversion<T>>;
    /**
     * Create a guild application command.
     * @param guildID The ID of the guild.
     * @param options The options for creating the command.
     */
    createGuildCommand<T extends CreateGuildApplicationCommandOptions = CreateGuildApplicationCommandOptions>(guildID: string, options: T): Promise<ApplicationCommandOptionConversion<T>>;
    /**
     * Delete a global application command.
     * @param commandID The ID of the command.
     */
    deleteGlobalCommand(commandID: string): Promise<void>;
    /**
     * Delete a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    deleteGuildCommand(guildID: string, commandID: string): Promise<void>;
    /**
     * Edit a global application command.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    editGlobalCommand<T extends EditApplicationCommandOptions = EditApplicationCommandOptions>(commandID: string, options: T): Promise<ApplicationCommandOptionConversion<T>>;
    /**
     * Edit a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    editGuildCommand<T extends EditGuildApplicationCommandOptions = EditGuildApplicationCommandOptions>(guildID: string, commandID: string, options: T): Promise<ApplicationCommandOptionConversion<T>>;
    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     */
    editGuildCommandPermissions(guildID: string, commandID: string, options: EditApplicationCommandPermissionsOptions): Promise<RESTGuildApplicationCommandPermissions>;
    /**
     * Get a global application command.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    getGlobalCommand<T extends AnyApplicationCommand = AnyApplicationCommand>(commandID: string, options?: GetApplicationCommandOptions): Promise<T>;
    /**
     * Get this application's global commands.
     * @param options The options for getting the command.
     */
    getGlobalCommands(options?: GetApplicationCommandOptions): Promise<Array<AnyApplicationCommand>>;
    /**
     * Get a global application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    getGuildCommand<T extends AnyApplicationCommand = AnyApplicationCommand>(guildID: string, commandID: string, options?: GetApplicationCommandOptions): Promise<T>;
    /**
     * Get this application's commands in a specific guild.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     */
    getGuildCommands(guildID: string, options?: GetApplicationCommandOptions): Promise<Array<AnyApplicationCommand>>;
    /**
     * Get a command's permissions in a guild.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    getGuildPermission(guildID: string, commandID: string): Promise<RESTGuildApplicationCommandPermissions>;
    /**
     * Get the permissions for all commands in a guild.
     * @param guildID The ID of the guild.
     */
    getGuildPermissions(guildID: string): Promise<Array<RESTGuildApplicationCommandPermissions>>;
    toJSON(): JSONClientApplication;
}
