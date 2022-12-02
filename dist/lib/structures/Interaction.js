"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Interaction */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const Constants_js_1 = require("../Constants.js");
// import AutocompleteInteraction from "./AutocompleteInteraction.js";
// import PingInteraction from "./PingInteraction.js";
// import CommandInteraction from "./CommandInteraction.js";
// import ComponentInteraction from "./ComponentInteraction.js";
// import ModalSubmitInteraction from "./ModalSubmitInteraction.js";
/** Represents an interaction. */
class Interaction extends Base_js_1.default {
    /** If this interaction has been acknowledged. */
    acknowledged;
    /** The application this interaction is for. */
    application;
    /** The ID of the application this interaction is for. */
    applicationID;
    /** The token of this interaction. */
    token;
    /** The [type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type) of this interaction. */
    type;
    /** Read-only property, always `1` */
    version;
    constructor(data, client) {
        super(data.id, client);
        this.acknowledged = false;
        this.application = client["_application"] && client.application.id === data.application_id ? client.application : undefined;
        this.applicationID = data.application_id;
        this.token = data.token;
        this.type = data.type;
        this.version = data.version;
    }
    static from(data, client) {
        switch (data.type) {
            case Constants_js_1.InteractionTypes.PING: {
                return new PingInteraction(data, client);
            }
            case Constants_js_1.InteractionTypes.APPLICATION_COMMAND: {
                return new CommandInteraction(data, client);
            }
            case Constants_js_1.InteractionTypes.MESSAGE_COMPONENT: {
                return new ComponentInteraction(data, client);
            }
            case Constants_js_1.InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE: {
                return new AutocompleteInteraction(data, client);
            }
            case Constants_js_1.InteractionTypes.MODAL_SUBMIT: {
                return new ModalSubmitInteraction(data, client);
            }
            default: {
                return new Interaction(data, client);
            }
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            token: this.token,
            type: this.type,
            version: this.version
        };
    }
}
exports.default = Interaction;
// Yes this sucks, but it works. That's the important part. Circular imports are hell.
/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const AutocompleteInteraction = require("./AutocompleteInteraction.js").default;
const CommandInteraction = require("./CommandInteraction.js").default;
const ComponentInteraction = require("./ComponentInteraction.js").default;
const ModalSubmitInteraction = require("./ModalSubmitInteraction.js").default;
const PingInteraction = require("./PingInteraction.js").default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsZ0VBQTZCO0FBWTdCLGtEQUFtRDtBQUduRCxzRUFBc0U7QUFDdEUsc0RBQXNEO0FBQ3RELDREQUE0RDtBQUM1RCxnRUFBZ0U7QUFDaEUsb0VBQW9FO0FBRXBFLGlDQUFpQztBQUNqQyxNQUFxQixXQUFZLFNBQVEsaUJBQUk7SUFDekMsaURBQWlEO0lBQ2pELFlBQVksQ0FBVTtJQUN0QiwrQ0FBK0M7SUFDL0MsV0FBVyxDQUFxQjtJQUNoQyx5REFBeUQ7SUFDekQsYUFBYSxDQUFTO0lBQ3RCLHFDQUFxQztJQUNyQyxLQUFLLENBQVM7SUFDZCxxSkFBcUo7SUFDckosSUFBSSxDQUFtQjtJQUN2QixxQ0FBcUM7SUFDckMsT0FBTyxDQUFJO0lBQ1gsWUFBWSxJQUF1QixFQUFFLE1BQWM7UUFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzVILElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBR0QsTUFBTSxDQUFDLElBQUksQ0FBNEMsSUFBb0IsRUFBRSxNQUFjO1FBQ3ZGLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNmLEtBQUssK0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQ2pEO1lBQ0QsS0FBSywrQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBd0MsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUN4RjtZQUNELEtBQUssK0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDckMsT0FBTyxJQUFJLG9CQUFvQixDQUFDLElBQXNDLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDeEY7WUFDRCxLQUFLLCtCQUFnQixDQUFDLGdDQUFnQyxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxJQUFrQyxFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQ3ZGO1lBQ0QsS0FBSywrQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDaEMsT0FBTyxJQUFJLHNCQUFzQixDQUFDLElBQWlDLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDckY7WUFDRCxPQUFPLENBQUMsQ0FBQztnQkFDTCxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLENBQVUsQ0FBQzthQUNqRDtTQUNKO0lBQ0wsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxLQUFLLEVBQVUsSUFBSSxDQUFDLEtBQUs7WUFDekIsSUFBSSxFQUFXLElBQUksQ0FBQyxJQUFJO1lBQ3hCLE9BQU8sRUFBUSxJQUFJLENBQUMsT0FBTztTQUM5QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBeERELDhCQXdEQztBQUdELHNGQUFzRjtBQUN0Riw4RUFBOEU7QUFDOUUsTUFBTSx1QkFBdUIsR0FBSSxPQUFPLENBQUMsOEJBQThCLENBQW1ELENBQUMsT0FBTyxDQUFDO0FBQ25JLE1BQU0sa0JBQWtCLEdBQUksT0FBTyxDQUFDLHlCQUF5QixDQUE4QyxDQUFDLE9BQU8sQ0FBQztBQUNwSCxNQUFNLG9CQUFvQixHQUFJLE9BQU8sQ0FBQywyQkFBMkIsQ0FBZ0QsQ0FBQyxPQUFPLENBQUM7QUFDMUgsTUFBTSxzQkFBc0IsR0FBSSxPQUFPLENBQUMsNkJBQTZCLENBQWtELENBQUMsT0FBTyxDQUFDO0FBQ2hJLE1BQU0sZUFBZSxHQUFJLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBMkMsQ0FBQyxPQUFPLENBQUM7QUFDM0csNkVBQTZFIn0=