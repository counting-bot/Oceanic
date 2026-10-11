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
        options = this.#manager.client.util._freeze(options);
        let files;
        if ("data" in options && options.data && "files" in options.data) {
            files = options.data.files;
            delete options.data.files;
        }
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
            },
            files
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9JbnRlcmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU8zRCx5REFBeUQ7QUFDekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFZO0lBQzdCLFFBQVEsQ0FBYztJQUN0QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxxQkFBcUIsQ0FBa0QsYUFBcUIsRUFBRSxnQkFBd0IsRUFBRSxPQUEyQjtRQUNySixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBSSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsT0FBb0MsQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxhQUFxQixFQUFFLGdCQUF3QixFQUFFLE9BQTRCO1FBQ3pHLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksS0FBOEIsQ0FBQztRQUNuQyxJQUFJLE1BQU0sSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9ELEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7UUFFRCxJQUFJLElBQXlCLENBQUM7UUFDOUIsUUFBUSxPQUFPLENB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