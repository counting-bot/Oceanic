/** @module Interaction */
import Base from "./Base";
import { InteractionTypes } from "../Constants";
/** Represents an interaction. */
export default class Interaction extends Base {
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
            case InteractionTypes.PING: {
                return new PingInteraction(data, client);
            }
            case InteractionTypes.APPLICATION_COMMAND: {
                return new CommandInteraction(data, client);
            }
            case InteractionTypes.MESSAGE_COMPONENT: {
                return new ComponentInteraction(data, client);
            }
            case InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE: {
                return new AutocompleteInteraction(data, client);
            }
            case InteractionTypes.MODAL_SUBMIT: {
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
// Yes this sucks, but it works. That's the important part. Circular imports are hell.
/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const AutocompleteInteraction = require("./AutocompleteInteraction").default;
const CommandInteraction = require("./CommandInteraction").default;
const ComponentInteraction = require("./ComponentInteraction").default;
const ModalSubmitInteraction = require("./ModalSubmitInteraction").default;
const PingInteraction = require("./PingInteraction").default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBWTFCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUdoRCxpQ0FBaUM7QUFDakMsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFZLFNBQVEsSUFBSTtJQUN6QyxpREFBaUQ7SUFDakQsWUFBWSxDQUFVO0lBQ3RCLCtDQUErQztJQUMvQyxXQUFXLENBQXFCO0lBQ2hDLHlEQUF5RDtJQUN6RCxhQUFhLENBQVM7SUFDdEIscUNBQXFDO0lBQ3JDLEtBQUssQ0FBUztJQUNkLHFKQUFxSjtJQUNySixJQUFJLENBQW1CO0lBQ3ZCLHFDQUFxQztJQUNyQyxPQUFPLENBQUk7SUFDWCxZQUFZLElBQXVCLEVBQUUsTUFBYztRQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDNUgsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFHRCxNQUFNLENBQUMsSUFBSSxDQUE0QyxJQUFvQixFQUFFLE1BQWM7UUFDdkYsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2YsS0FBSyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEIsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDakQ7WUFDRCxLQUFLLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUF3QyxFQUFFLE1BQU0sQ0FBTSxDQUFDO2FBQ3hGO1lBQ0QsS0FBSyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLElBQUksb0JBQW9CLENBQUMsSUFBc0MsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUN4RjtZQUNELEtBQUssZ0JBQWdCLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxJQUFJLHVCQUF1QixDQUFDLElBQWtDLEVBQUUsTUFBTSxDQUFNLENBQUM7YUFDdkY7WUFDRCxLQUFLLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLElBQUksc0JBQXNCLENBQUMsSUFBaUMsRUFBRSxNQUFNLENBQU0sQ0FBQzthQUNyRjtZQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNMLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBVSxDQUFDO2FBQ2pEO1NBQ0o7SUFDTCxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLEtBQUssRUFBVSxJQUFJLENBQUMsS0FBSztZQUN6QixJQUFJLEVBQVcsSUFBSSxDQUFDLElBQUk7WUFDeEIsT0FBTyxFQUFRLElBQUksQ0FBQyxPQUFPO1NBQzlCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFHRCxzRkFBc0Y7QUFDdEYsOEVBQThFO0FBQzlFLE1BQU0sdUJBQXVCLEdBQUksT0FBTyxDQUFDLDJCQUEyQixDQUFnRCxDQUFDLE9BQU8sQ0FBQztBQUM3SCxNQUFNLGtCQUFrQixHQUFJLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBMkMsQ0FBQyxPQUFPLENBQUM7QUFDOUcsTUFBTSxvQkFBb0IsR0FBSSxPQUFPLENBQUMsd0JBQXdCLENBQTZDLENBQUMsT0FBTyxDQUFDO0FBQ3BILE1BQU0sc0JBQXNCLEdBQUksT0FBTyxDQUFDLDBCQUEwQixDQUErQyxDQUFDLE9BQU8sQ0FBQztBQUMxSCxNQUFNLGVBQWUsR0FBSSxPQUFPLENBQUMsbUJBQW1CLENBQXdDLENBQUMsT0FBTyxDQUFDO0FBQ3JHLDZFQUE2RSJ9