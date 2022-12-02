"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routes = tslib_1.__importStar(require("../util/Routes.js"));
const Constants_js_1 = require("../Constants.js");
/** Various methods for interacting with interactions. */
class Interactions {
    #manager;
    constructor(manager) {
        this.#manager = manager;
    }
    /**
     * Create a followup message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param options The options for creating the followup message.
     */
    async createFollowupMessage(applicationID, interactionToken, options) {
        return this.#manager.webhooks.execute(applicationID, interactionToken, options);
    }
    /**
     * Create an initial interaction response.
     * @param interactionID The ID of the interaction.
     * @param interactionToken The token of the interaction.
     * @param options The options for creating the interaction response.
     */
    async createInteractionResponse(interactionID, interactionToken, options) {
        let data;
        switch (options.type) {
            case Constants_js_1.InteractionResponseTypes.PONG: {
                break;
            }
            case Constants_js_1.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE:
            case Constants_js_1.InteractionResponseTypes.UPDATE_MESSAGE: {
                data = {
                    allowed_mentions: this.#manager.client.util.formatAllowedMentions(options.data.allowedMentions),
                    attachments: options.data.attachments,
                    content: options.data.content,
                    components: options.data.components ? this.#manager.client.util.componentsToRaw(options.data.components) : undefined,
                    embeds: options.data.embeds ? this.#manager.client.util.embedsToRaw(options.data.embeds) : undefined,
                    flags: options.data.flags
                };
                break;
            }
            case Constants_js_1.InteractionResponseTypes.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: {
                data = {
                    choices: options.data.choices.map(d => ({
                        name: d.name,
                        name_localizations: d.nameLocalizations,
                        value: d.value
                    }))
                };
                break;
            }
            case Constants_js_1.InteractionResponseTypes.MODAL: {
                data = {
                    custom_id: options.data.customID,
                    components: this.#manager.client.util.componentsToRaw(options.data.components),
                    title: options.data.title
                };
                break;
            }
            default: {
                data = options.data;
                break;
            }
        }
        await this.#manager.authRequest({
            method: "POST",
            path: Routes.INTERACTION_CALLBACK(interactionID, interactionToken),
            route: "/interactions/:id/:token/callback",
            json: {
                data,
                type: options.type
            }
        });
    }
    /**
     * Delete a follow-up message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param messageID The ID of the message.
     */
    async deleteFollowupMessage(applicationID, interactionToken, messageID) {
        await this.#manager.webhooks.deleteMessage(applicationID, interactionToken, messageID);
    }
    /**
     * Delete the original interaction response.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     */
    async deleteOriginalMessage(applicationID, interactionToken) {
        await this.deleteFollowupMessage(applicationID, interactionToken, "@original");
    }
    /**
     * Edit a followup message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param messageID The ID of the message.
     * @param options The options for editing the followup message.
     */
    async editFollowupMessage(applicationID, interactionToken, messageID, options) {
        return this.#manager.webhooks.editMessage(applicationID, interactionToken, messageID, options);
    }
    /**
     * Edit an original interaction response.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param options The options for editing the original message.
     */
    async editOriginalMessage(applicationID, interactionToken, options) {
        return this.editFollowupMessage(applicationID, interactionToken, "@original", options);
    }
    /**
     * Get a followup message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param messageID The ID of the message.
     */
    async getFollowupMessage(applicationID, interactionToken, messageID) {
        return this.#manager.webhooks.getMessage(applicationID, interactionToken, messageID);
    }
    /**
     * Get an original interaction response.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     */
    async getOriginalMessage(applicationID, interactionToken) {
        return this.getFollowupMessage(applicationID, interactionToken, "@original");
    }
}
exports.default = Interactions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9JbnRlcmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0Esa0VBQTRDO0FBQzVDLGtEQUEyRDtBQU0zRCx5REFBeUQ7QUFDekQsTUFBcUIsWUFBWTtJQUM3QixRQUFRLENBQWM7SUFDdEIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMscUJBQXFCLENBQWtELGFBQXFCLEVBQUUsZ0JBQXdCLEVBQUUsT0FBMkI7UUFDckosT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUksYUFBYSxFQUFFLGdCQUFnQixFQUFFLE9BQW9DLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMseUJBQXlCLENBQUMsYUFBcUIsRUFBRSxnQkFBd0IsRUFBRSxPQUE0QjtRQUN6RyxJQUFJLElBQXlCLENBQUM7UUFDOUIsUUFBUSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssdUNBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLE1BQU07YUFDVDtZQUNELEtBQUssdUNBQXdCLENBQUMsMkJBQTJCLENBQUM7WUFDMUQsS0FBSyx1Q0FBd0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxHQUFHO29CQUNILGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztvQkFDL0YsV0FBVyxFQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVztvQkFDMUMsT0FBTyxFQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTztvQkFDdEMsVUFBVSxF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