/** @module PartialApplication */
import Base from "./Base.js";
import type Client from "../Client.js";
import type { RawPartialApplication } from "../types/oauth.js";
import type { JSONPartialApplication } from "../types/json.js";
/** Represents a partial application. */
export default class PartialApplication extends Base {
    /** When false, only the application's owners can invite the bot to guilds. */
    botPublic?: boolean;
    /** When true, the applications bot will only join upon the completion of the full oauth2 code grant flow. */
    botRequireCodeGrant?: boolean;
    /** The description of the application. */
    description: string;
    /** The icon hash of the application. */
    icon: string | null;
    /** The name of the application. */
    name: string;
    /** The bot's hex encoded public key. */
    verifyKey?: string;
    constructor(data: RawPartialApplication, client: Client);
    protected update(data: RawPartialApplication): void;
    toJSON(): JSONPartialApplication;
}
