/** @module Interaction */
import Base from "./Base.js";
import type ClientApplication from "./ClientApplication.js";
import type Client from "../Client.js";
import type {
    AnyInteraction,
    AnyRawInteraction,
    RawApplicationCommandInteraction,
    RawAutocompleteInteraction,
    RawInteraction,
    RawMessageComponentInteraction
} from "../types/interactions.js";
import { InteractionTypes } from "../Constants.js";
import type { JSONInteraction } from "../types/json.js";

/** Represents an interaction. */
export default class Interaction extends Base {
    /** If this interaction has been acknowledged. */
    acknowledged: boolean;
    /** The application this interaction is for. */
    application?: ClientApplication;
    /** The ID of the application this interaction is for. */
    applicationID: string;
    /** The token of this interaction. */
    token: string;
    /** The [type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type) of this interaction. */
    type: InteractionTypes;
    /** Read-only property, always `1` */
    version: 1;
    constructor(data: AnyRawInteraction, client: Client) {
        super(data.id, client);
        this.acknowledged = false;
        this.application = client["_application"] && client.application.id === data.application_id ? client.application : undefined;
        this.applicationID = data.application_id;
        this.token = data.token;
        this.type = data.type;
        this.version = data.version;
    }


    static from<T extends AnyInteraction = AnyInteraction>(data: RawInteraction, client: Client): T {
        switch (data.type) {
            case InteractionTypes.PING: {
                return new PingInteraction(data, client) as T;
            }
            case InteractionTypes.APPLICATION_COMMAND: {
                return new CommandInteraction(data as RawApplicationCommandInteraction, client) as T;
            }
            case InteractionTypes.MESSAGE_COMPONENT: {
                return new ComponentInteraction(data as RawMessageComponentInteraction, client) as T;
            }
            case InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE: {
                return new AutocompleteInteraction(data as RawAutocompleteInteraction, client) as T;
            }
            default: {
                return new Interaction(data, client) as never;
            }
        }
    }

    override toJSON(): JSONInteraction {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            token:         this.token,
            type:          this.type,
            version:       this.version
        };
    }
}


// Yes this sucks, but it works. That's the important part. Circular imports are hell.
/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const AutocompleteInteraction = (require("./AutocompleteInteraction.js") as typeof import("./AutocompleteInteraction.js")).default;
const CommandInteraction = (require("./CommandInteraction.js") as typeof import("./CommandInteraction.js")).default;
const ComponentInteraction = (require("./ComponentInteraction.js") as typeof import("./ComponentInteraction.js")).default;
const PingInteraction = (require("./PingInteraction.js") as typeof import("./PingInteraction.js")).default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
