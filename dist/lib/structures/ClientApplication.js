"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module ClientApplication */
const Base_1 = tslib_1.__importDefault(require("./Base"));
/** A representation of the authorized client's application (typically received via gateway). */
class ClientApplication extends Base_1.default {
    /** This application's [public flags](https://discord.com/developers/docs/resources/application#application-object-application-flags). */
    flags;
    constructor(data, client) {
        super(data.id, client);
        this.flags = data.flags;
        this.update(data);
    }
    update(data) {
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
    }
    /**
     * Overwrite all existing global application commands.
     * @param options The commands.
     */
    async bulkEditGlobalCommands(options) {
        return this.client.rest.applicationCommands.bulkEditGlobalCommands(this.id, options);
    }
    /**
     * Overwrite all existing application commands in a guild.
     * @param guildID The ID of the guild.
     * @param options The commands.
     */
    async bulkEditGuildCommands(guildID, options) {
        return this.client.rest.applicationCommands.bulkEditGuildCommands(this.id, guildID, options);
    }
    /**
     * Create a global application command.
     * @param options The options for creating the command.
     */
    async createGlobalCommand(options) {
        return this.client.rest.applicationCommands.createGlobalCommand(this.id, options);
    }
    /**
     * Create a guild application command.
     * @param guildID The ID of the guild.
     * @param options The options for creating the command.
     */
    async createGuildCommand(guildID, options) {
        return this.client.rest.applicationCommands.createGuildCommand(this.id, guildID, options);
    }
    /**
     * Delete a global application command.
     * @param commandID The ID of the command.
     */
    async deleteGlobalCommand(commandID) {
        return this.client.rest.applicationCommands.deleteGlobalCommand(this.id, commandID);
    }
    /**
     * Delete a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    async deleteGuildCommand(guildID, commandID) {
        return this.client.rest.applicationCommands.deleteGuildCommand(this.id, guildID, commandID);
    }
    /**
     * Edit a global application command.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    async editGlobalCommand(commandID, options) {
        return this.client.rest.applicationCommands.editGlobalCommand(this.id, commandID, options);
    }
    /**
     * Edit a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    async editGuildCommand(guildID, commandID, options) {
        return this.client.rest.applicationCommands.editGuildCommand(this.id, guildID, commandID, options);
    }
    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     */
    async editGuildCommandPermissions(guildID, commandID, options) {
        return this.client.rest.applicationCommands.editGuildCommandPermissions(this.id, guildID, commandID, options);
    }
    /**
     * Get a global application command.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    async getGlobalCommand(commandID, options) {
        return this.client.rest.applicationCommands.getGlobalCommand(this.id, commandID, options);
    }
    /**
     * Get this application's global commands.
     * @param options The options for getting the command.
     */
    async getGlobalCommands(options) {
        return this.client.rest.applicationCommands.getGlobalCommands(this.id, options);
    }
    /**
     * Get a global application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    async getGuildCommand(guildID, commandID, options) {
        return this.client.rest.applicationCommands.getGuildCommand(this.id, guildID, commandID, options);
    }
    /**
     * Get this application's commands in a specific guild.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     */
    async getGuildCommands(guildID, options) {
        return this.client.rest.applicationCommands.getGuildCommands(this.id, guildID, options);
    }
    /**
     * Get a command's permissions in a guild.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    async getGuildPermission(guildID, commandID) {
        return this.client.rest.applicationCommands.getGuildPermission(this.id, guildID, commandID);
    }
    /**
     * Get the permissions for all commands in a guild.
     * @param guildID The ID of the guild.
     */
    async getGuildPermissions(guildID) {
        return this.client.rest.applicationCommands.getGuildPermissions(this.id, guildID);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            flags: this.flags
        };
    }
}
exports.default = ClientApplication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50QXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9DbGllbnRBcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnQ0FBZ0M7QUFDaEMsMERBQTBCO0FBa0IxQixnR0FBZ0c7QUFDaEcsTUFBcUIsaUJBQWtCLFNBQVEsY0FBSTtJQUMvQyx5SUFBeUk7SUFDekksS0FBSyxDQUFTO0lBQ2QsWUFBWSxJQUEwQixFQUFFLE1BQWM7UUFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVrQixNQUFNLENBQUMsSUFBbUM7UUFDekQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQStDO1FBQ3hFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxPQUFlLEVBQUUsT0FBb0Q7UUFDN0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFD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