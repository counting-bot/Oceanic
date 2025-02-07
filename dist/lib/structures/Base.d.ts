/** @module Base */
import type Client from "../Client.js";
import type { JSONBase } from "../types/json.js";
import { inspect } from "node:util";
/** A base class which most other classes extend. */
export default abstract class Base {
    client: Client;
    id: string;
    constructor(id: string, client: Client);
    static getCreatedAt(id: string): Date;
    static getDiscordEpoch(id: string): number;
    protected update(data: unknown): void;
    get createdAt(): Date;
    /** @hidden */
    [inspect.custom](): this;
    toJSON(): JSONBase;
    toString(): string;
}
