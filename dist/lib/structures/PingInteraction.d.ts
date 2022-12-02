/** @module PingInteraction */
import Interaction from "./Interaction.js";
import type { InteractionTypes } from "../Constants.js";
import type { RawPingInteraction } from "../types/interactions.js";
import type Client from "../Client.js";
import type { JSONPingInteraction } from "../types/json.js";
/** Represents a PING interaction. This will not be received over a gateway connection. */
export default class PingInteraction extends Interaction {
    type: InteractionTypes.PING;
    constructor(data: RawPingInteraction, client: Client);
    /**
     * Responds to the interaction with a `PONG`.
     */
    pong(): Promise<void>;
    toJSON(): JSONPingInteraction;
}
