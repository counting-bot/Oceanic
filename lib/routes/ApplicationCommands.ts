/** @module Routes/ApplicationCommands */
import * as Routes from "../util/Routes.js";
import type {
    AnyApplicationCommand,
    ApplicationCommandOptionConversion,
    CreateApplicationCommandOptions,
    CreateChatInputApplicationCommandOptions,
    EditApplicationCommandOptions,
    EditApplicationCommandPermissionsOptions,
    EditChatInputApplicationCommandOptions,
    RESTGuildApplicationCommandPermissions,
    RawApplicationCommand,
    RawGuildApplicationCommandPermissions,
    CreateGuildApplicationCommandOptions,
    EditGuildApplicationCommandOptions,
    GetApplicationCommandOptions
} from "../types/application-commands.js";
import type { RequestOptions } from "../types/request-handler.js";
import type RESTManager from "../rest/RESTManager.js";

/** Various methods for interacting with application commands. */
export default class ApplicationCommands {
    #manager: RESTManager;
    constructor(manager: RESTManager) {
        this.#manager = manager;
    }

    /**
     * Overwrite all existing global application commands.
     * @param applicationID The ID of the application.
     * @param options The commands.
     */
    async bulkEditGlobalCommands(applicationID: string, options: Array<CreateApplicationCommandOptions>): Promise<Array<object>> {
        const opts = options as Array<CreateChatInputApplicationCommandOptions>;
        return this.#manager.authRequest<Array<object>>({
            method: "PUT",
            path:   Routes.APPLICATION_COMMANDS(applicationID),
            json:   opts.map(opt => ({
                default_member_permissions: opt.defaultMemberPermissions,
                description:                opt.description,
                description_localizations:  opt.descriptionLocalizations,
                dm_permission:              opt.dmPermission,
                name:                       opt.name,
                name_localizations:         opt.nameLocalizations,
                nsfw:                       opt.nsfw,
                options:                    opt.options?.map(o => this.#manager.client.util.optionToRaw(o)),
                type:                       opt.type
            }))
        });
    }

    /**
     * Overwrite all existing application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The commands.
     */
    async bulkEditGuildCommands(applicationID: string, guildID: string, options: Array<CreateGuildApplicationCommandOptions>): Promise<Array<object>> {
        const opts = options as Array<CreateChatInputApplicationCommandOptions>;
        return this.#manager.authRequest<Array<RawApplicationCommand>>({
            method: "PUT",
            path:   Routes.GUILD_APPLICATION_COMMANDS(applicationID, guildID),
            json:   opts.map(opt => ({
                id:                         opt.id,
                default_member_permissions: opt.defaultMemberPermissions,
                description:                opt.description,
                description_localizations:  opt.descriptionLocalizations,
                dm_permission:              opt.dmPermission,
                name:                       opt.name,
                name_localizations:         opt.nameLocalizations,
                nsfw:                       opt.nsfw,
                options:                    opt.options?.map(o => this.#manager.client.util.optionToRaw(o)),
                type:                       opt.type
            }))
        });
    }

    /**
     * Create a global application command.
     * @param applicationID The ID of the application.
     * @param options The options for the command.
     */
    async createGlobalCommand<T extends CreateApplicationCommandOptions = CreateApplicationCommandOptions>(applicationID: string, options: T): Promise<ApplicationCommandOptionConversion<T>> {
        const opt = options as CreateChatInputApplicationCommandOptions;
        return this.#manager.authRequest({
            method: "POST",
            path:   Routes.APPLICATION_COMMANDS(applicationID),
            json:   {
                default_member_permissions: opt.defaultMemberPermissions,
                description:                opt.description,
                description_localizations:  opt.descriptionLocalizations,
                dm_permission:              opt.dmPermission,
                name:                       opt.name,
                name_localizations:         opt.nameLocalizations,
                nsfw:                       opt.nsfw,
                options:                    opt.options?.map(o => this.#manager.client.util.optionToRaw(o)),
                type:                       opt.type
            }
        });
    }

    /**
     * Create a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for the command.
     */
    async createGuildCommand<T extends CreateGuildApplicationCommandOptions = CreateGuildApplicationCommandOptions>(applicationID: string, guildID: string, options: T): Promise<ApplicationCommandOptionConversion<T>> {
        const opt = options as CreateChatInputApplicationCommandOptions;
        return this.#manager.authRequest({
            method: "POST",
            path:   Routes.GUILD_APPLICATION_COMMANDS(applicationID, guildID),
            json:   {
                default_member_permissions: opt.defaultMemberPermissions,
                description:                opt.description,
                description_localizations:  opt.descriptionLocalizations,
                dm_permission:              opt.dmPermission,
                name:                       opt.name,
                name_localizations:         opt.nameLocalizations,
                nsfw:                       opt.nsfw,
                options:                    opt.options?.map(o => this.#manager.client.util.optionToRaw(o)),
                type:                       opt.type
            }
        });
    }

    /**
     * Delete a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID the command to delete.
     */
    async deleteGlobalCommand(applicationID: string, commandID: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.APPLICATION_COMMAND(applicationID, commandID)
        });
    }

    /**
     * Delete a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to delete.
     */
    async deleteGuildCommand(applicationID: string, guildID: string, commandID: string): Promise<void> {
        await this.#manager.authRequest<null>({
            method: "DELETE",
            path:   Routes.GUILD_APPLICATION_COMMAND(applicationID, guildID, commandID)
        });
    }

    /**
     * Edit a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     */
    async editGlobalCommand<T extends EditApplicationCommandOptions = EditApplicationCommandOptions>(applicationID: string, commandID: string, options: T): Promise<ApplicationCommandOptionConversion<T>> {
        const opt = options as EditChatInputApplicationCommandOptions;
        return this.#manager.authRequest({
            method: "PATCH",
            path:   Routes.APPLICATION_COMMAND(applicationID, commandID),
            json:   {
                default_member_permissions: opt.defaultMemberPermissions,
                description:                opt.description,
                description_localizations:  opt.descriptionLocalizations,
                dm_permission:              opt.dmPermission,
                name:                       opt.name,
                name_localizations:         opt.nameLocalizations,
                nsfw:                       opt.nsfw,
                options:                    opt.options?.map(o => this.#manager.client.util.optionToRaw(o))
            }
        });
    }

    /**
     * Edit a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     */
    async editGuildCommand<T extends EditGuildApplicationCommandOptions = EditGuildApplicationCommandOptions>(applicationID: string, guildID: string, commandID: string, options: T): Promise<ApplicationCommandOptionConversion<T>> {
        const opt = options as EditChatInputApplicationCommandOptions;
        return this.#manager.authRequest({
            method: "PATCH",
            path:   Routes.GUILD_APPLICATION_COMMAND(applicationID, guildID, commandID),
            json:   {
                default_member_permissions: opt.defaultMemberPermissions,
                description:                opt.description,
                description_localizations:  opt.descriptionLocalizations,
                dm_permission:              opt.dmPermission,
                name:                       opt.name,
                name_localizations:         opt.nameLocalizations,
                nsfw:                       opt.nsfw,
                options:                    opt.options?.map(o => this.#manager.client.util.optionToRaw(o))
            }
        });
    }

    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     */
    async editGuildCommandPermissions(applicationID: string, guildID: string, commandID: string, options: EditApplicationCommandPermissionsOptions): Promise<RESTGuildApplicationCommandPermissions> {
        return (options.accessToken ? this.#manager.request.bind(this.#manager) : this.#manager.authRequest.bind(this.#manager))({
            method: "PATCH",
            path:   Routes.GUILD_APPLICATION_COMMAND_PERMISSION(applicationID, guildID, commandID),
            json:   { permissions: options.permissions },
            auth:   options.accessToken
        } as Omit<RequestOptions, "auth">).then(data => {
            const d = data as RawGuildApplicationCommandPermissions;
            return {
                applicationID: d.application_id,
                guildID:       d.guild_id,
                id:            d.id,
                permissions:   d.permissions
            };
        });
    }

    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    async getGlobalCommand<T extends AnyApplicationCommand = AnyApplicationCommand>(applicationID: string, commandID: string, options?: GetApplicationCommandOptions): Promise<T> {
        const query = new URLSearchParams();
        if (options?.withLocalizations !== undefined) {
            query.set("with_localizations", options.withLocalizations.toString());
        }
        return this.#manager.authRequest({
            method:  "GET",
            path:    Routes.APPLICATION_COMMAND(applicationID, commandID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale }
        });
    }

    /**
     * Get an application's global commands.
     * @param applicationID The ID of the application.
     * @param options The options for getting the command.
     */
    async getGlobalCommands(applicationID: string, options?: GetApplicationCommandOptions): Promise<Array<object>> {
        const query = new URLSearchParams();
        if (options?.withLocalizations !== undefined) {
            query.set("with_localizations", options.withLocalizations.toString());
        }
        return this.#manager.authRequest<Array<RawApplicationCommand>>({
            method:  "GET",
            path:    Routes.APPLICATION_COMMANDS(applicationID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale }
        });
    }

    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    async getGuildCommand<T extends AnyApplicationCommand = AnyApplicationCommand>(applicationID: string, guildID: string, commandID: string, options?: GetApplicationCommandOptions): Promise<T> {
        const query = new URLSearchParams();
        if (options?.withLocalizations !== undefined) {
            query.set("with_localizations", options.withLocalizations.toString());
        }
        return this.#manager.authRequest({
            method:  "GET",
            path:    Routes.GUILD_APPLICATION_COMMAND(applicationID, commandID, guildID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale }
        });
    }

    /**
     * Get an application's application commands in a specific guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     */
    async getGuildCommands(applicationID: string, guildID: string, options?: GetApplicationCommandOptions): Promise<Array<object>> {
        const query = new URLSearchParams();
        if (options?.withLocalizations !== undefined) {
            query.set("with_localizations", options.withLocalizations.toString());
        }
        return this.#manager.authRequest<Array<RawApplicationCommand>>({
            method:  "GET",
            path:    Routes.GUILD_APPLICATION_COMMANDS(applicationID, guildID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale }
        });
    }

    /**
     * Get an application command's permissions in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    async getGuildPermission(applicationID: string, guildID: string, commandID: string): Promise<RESTGuildApplicationCommandPermissions> {
        return this.#manager.authRequest<RawGuildApplicationCommandPermissions>({
            method: "GET",
            path:   Routes.GUILD_APPLICATION_COMMAND_PERMISSION(applicationID, guildID, commandID)
        }).then(data => ({
            applicationID: data.application_id,
            guildID:       data.guild_id,
            id:            data.id,
            permissions:   data.permissions
        }));
    }

    /**
     * Get the permissions for all application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     */
    async getGuildPermissions(applicationID: string, guildID: string): Promise<Array<RESTGuildApplicationCommandPermissions>> {
        return this.#manager.authRequest<Array<RawGuildApplicationCommandPermissions>>({
            method: "GET",
            path:   Routes.GUILD_APPLICATION_COMMAND_PERMISSIONS(applicationID, guildID)
        }).then(data => data.map(d => ({
            applicationID: d.application_id,
            guildID:       d.guild_id,
            id:            d.id,
            permissions:   d.permissions
        })));
    }
}
