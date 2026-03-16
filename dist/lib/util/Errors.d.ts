/** @module Errors */
/** An error that is thrown when we encounter an error, and no `error` listeners are present. */
export declare class UncaughtError extends Error {
    name: string;
    constructor(error: Error | string);
}
/** A gateway error. */
export declare class GatewayError extends Error {
    code: number;
    name: string;
    constructor(message: string, code: number);
}
export declare class FrozenModificationError extends Error {
    name: string;
    property: string | symbol;
    constructor(detail: string | undefined, prop: string | symbol);
}
