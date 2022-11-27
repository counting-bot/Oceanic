/** @module Interaction */
import Base from "./Base";
import type ClientApplication from "./ClientApplication";
import type Client from "../Client";
import type { AnyInteraction, AnyRawInteraction, RawInteraction } from "../types/interactions";
import { InteractionTypes } from "../Constants";
import type { JSONInteraction } from "../types/json";
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
    constructor(data: AnyRawInteraction, client: Client);
    static from<T extends AnyInteraction = AnyInteraction>(data: RawInteraction, client: Client): T;
    toJSON(): JSONInteraction;
}
