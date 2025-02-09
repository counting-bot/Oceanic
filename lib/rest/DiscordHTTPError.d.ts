/** @module DiscordHTTPError */
import type { RESTMethod } from "../Constants.js";
import type { JSONDiscordHTTPError } from "../types/json.js";
/** An HTTP error received from Discord. */
export default class DiscordHTTPError extends Error {
    method: RESTMethod;
    name: string;
    resBody: Record<string, unknown> | null;
    response: Response;
    constructor(res: Response, resBody: unknown | null, method: RESTMethod, stack?: string);
    static flattenErrors(errors: Record<string, unknown>, keyPrefix?: string): Array<string>;
    get headers(): Headers;
    get path(): string;
    get status(): number;
    get statusText(): string;
    toJSON(): JSONDiscordHTTPError;
}
