"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Interaction */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
const Constants_js_1 = require("../Constants.js");
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
const PingInteraction = require("./PingInteraction.js").default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsZ0VBQTZCO0FBVzdCLGtEQUFtRDtBQUduRCxpQ0FBaUM7QUFDakMsTUFBcUIsV0FBWSxTQUFRLGlCQUFJO0lBQ3pDLGlEQUFpRDtJQUNqRCxZQUFZLENBQVU7SUFDdEIsK0NBQStDO0lBQy9DLFdBQVcsQ0FBcUI7SUFDaEMseURBQXlEO0lBQ3pELGFBQWEsQ0FBUztJQUN0QixxQ0FBcUM7SUFDckMsS0FBSyxDQUFTO0lBQ2QscUpBQXFKO0lBQ3JKLElBQUksQ0FBbUI7SUFDdkIscUNBQXFDO0lBQ3JDLE9BQU8sQ0FBSTtJQUNYLFlBQVksSUFBdUIsRUFBRSxNQUFjO1FBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM1SCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDaEMsQ0FBQztJQUdELE1BQU0sQ0FBQyxJQUFJLENBQTRDLElBQW9CLEVBQUUsTUFBYztRQUN2RixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZixLQUFLLCtCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixPQUFPLElBQUksZUFBZSxDQUFDLElBQUksRUFBRSxNQUFNLENBQU0sQ0FBQzthQUNqRDtZQUNELEtBQUssK0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxJQUFJLGtCQUFrQixDQUFDLElBQXdDLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDeEY7WUFDRCxLQUFLLCtCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3JDLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxJQUFzQyxFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQ3hGO1lBQ0QsS0FBSywrQkFBZ0IsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLElBQUksdUJBQXVCLENBQUMsSUFBa0MsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUN2RjtZQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNMLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBVSxDQUFDO2FBQ2pEO1NBQ0o7SUFDTCxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLEtBQUssRUFBVSxJQUFJLENBQUMsS0FBSztZQUN6QixJQUFJLEVBQVcsSUFBSSxDQUFDLElBQUk7WUFDeEIsT0FBTyxFQUFRLElBQUksQ0FBQyxPQUFPO1NBQzlCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFyREQsOEJBcURDO0FBR0Qsc0ZBQXNGO0FBQ3RGLDhFQUE4RTtBQUM5RSxNQUFNLHVCQUF1QixHQUFJLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBbUQsQ0FBQyxPQUFPLENBQUM7QUFDbkksTUFBTSxrQkFBa0IsR0FBSSxPQUFPLENBQUMseUJBQXlCLENBQThDLENBQUMsT0FBTyxDQUFDO0FBQ3BILE1BQU0sb0JBQW9CLEdBQUksT0FBTyxDQUFDLDJCQUEyQixDQUFnRCxDQUFDLE9BQU8sQ0FBQztBQUMxSCxNQUFNLGVBQWUsR0FBSSxPQUFPLENBQUMsc0JBQXNCLENBQTJDLENBQUMsT0FBTyxDQUFDO0FBQzNHLDZFQUE2RSJ9