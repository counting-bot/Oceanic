/** @module Routes/Interactions */
import type { InteractionContent, InteractionResponse } from "../types/interactions.js";
import type RESTManager from "../rest/RESTManager.js";
import type { AnyTextChannelWithoutGroup } from "../types/channels.js";
import type { Uncached } from "../types/shared.js";
/** Various methods for interacting with interactions. */
export default class Interactions {
    #private;
    constructor(manager: RESTManager);
    /**
     * Create a followup message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param options The options for creating the followup message.
     */
    createFollowupMessage<T extends AnyTextChannelWithoutGroup | Uncached>(applicationID: string, interactionToken: string, options: InteractionContent): Promise<object>;
    /**
     * Create an initial interaction response.
     * @param interactionID The ID of the interaction.
     * @param interactionToken The token of the interaction.
     * @param options The options for creating the interaction response.
     */
    createInteractionResponse(interactionID: string, interactionToken: string, options: InteractionResponse): Promise<void>;
    /**
     * Delete a follow-up message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param messageID The ID of the message.
     */
    deleteFollowupMessage(applicationID: string, interactionToken: string, messageID: string): Promise<void>;
    /**
     * Delete the original interaction response.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     */
    deleteOriginalMessage(applicationID: string, interactionToken: string): Promise<void>;
    /**
     * Edit a followup message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param messageID The ID of the message.
     * @param options The options for editing the followup message.
     */
    editFollowupMessage(applicationID: string, interactionToken: string, messageID: string, options: InteractionContent): Promise<object>;
    /**
     * Edit an original interaction response.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param options The options for editing the original message.
     */
    editOriginalMessage(applicationID: string, interactionToken: string, options: InteractionContent): Promise<object>;
    /**
     * Get a followup message.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     * @param messageID The ID of the message.
     */
    getFollowupMessage(applicationID: string, interactionToken: string, messageID: string): Promise<object>;
    /**
     * Get an original interaction response.
     * @param applicationID The ID of the application.
     * @param interactionToken The token of the interaction.
     */
    getOriginalMessage(applicationID: string, interactionToken: string): Promise<object>;
}
