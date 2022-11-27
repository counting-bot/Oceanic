"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module PingInteraction */
const Interaction_1 = tslib_1.__importDefault(require("./Interaction"));
const Constants_1 = require("../Constants");
/** Represents a PING interaction. This will not be received over a gateway connection. */
class PingInteraction extends Interaction_1.default {
    constructor(data, client) {
        super(data, client);
    }
    /**
     * Responds to the interaction with a `PONG`.
     */
    async pong() {
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.PONG });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            type: this.type
        };
    }
}
exports.default = PingInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGluZ0ludGVyYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvUGluZ0ludGVyYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhCQUE4QjtBQUM5Qix3RUFBd0M7QUFFeEMsNENBQXdEO0FBS3hELDBGQUEwRjtBQUMxRixNQUFxQixlQUFnQixTQUFRLHFCQUFXO0lBRXBELFlBQVksSUFBd0IsRUFBRSxNQUFjO1FBQ2hELEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsb0NBQXdCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqSSxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2xCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFuQkQsa0NBbUJDIn0=