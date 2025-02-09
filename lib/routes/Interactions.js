import * as Routes from "../util/Routes.js";
import { InteractionResponseTypes } from "../Constants.js";
/** Various methods for interacting with interactions. */
export default class Interactions {
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
            case InteractionResponseTypes.PONG: {
                break;
            }
            case InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE:
            case InteractionResponseTypes.UPDATE_MESSAGE: {
                data = {
                    allowed_mentions: this.#manager.client.util.formatAllowedMentions(options.data.allowedMentions),
                    attachments: options.data.attachments,
                    content: options.data.content,
                    components: options.data.components ? options.data.components : undefined,
                    embeds: options.data.embeds,
                    flags: options.data.flags
                };
                break;
            }
            case InteractionResponseTypes.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: {
                data = {
                    choices: options.data.choices.map(d => ({
                        name: d.name,
                        name_localizations: d.nameLocalizations,
                        value: d.value
                    }))
                };
                break;
            }
            // case InteractionResponseTypes.MODAL: {
            //     data = {
            //         custom_id:  options.data.customID,
            //         components: this.#manager.client.util.componentsToRaw(options.data.components),
            //         title:      options.data.title
            //     };
            //     break;
            // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9JbnRlcmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUszRCx5REFBeUQ7QUFDekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFZO0lBQzdCLFFBQVEsQ0FBYztJQUN0QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxxQkFBcUIsQ0FBa0QsYUFBcUIsRUFBRSxnQkFBd0IsRUFBRSxPQUEyQjtRQUNySixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBSSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsT0FBb0MsQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxhQUFxQixFQUFFLGdCQUF3QixFQUFFLE9BQTRCO1FBQ3pHLElBQUksSUFBeUIsQ0FBQztRQUM5QixRQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixLQUFLLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDVixDQUFDO1lBQ0QsS0FBSyx3QkFBd0IsQ0FBQywyQkFBMkIsQ0FBQztZQUMxRCxLQUFLLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksR0FBRztvQkFDSCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7b0JBQy9GLFdB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