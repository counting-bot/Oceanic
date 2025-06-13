/** @module Errors */

/** An error that is thrown when we encounter an error, and no `error` listeners are present. */
export class UncaughtError extends Error {
    override name = "UncaughtError";
    constructor(error: Error | string) {
        super("Uncaught 'error' event", { cause: error });
    }
}

/** A gateway error. */
export class GatewayError extends Error {
    code: number;
    override name = "GatewayError";
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

export class FrozenModificationError extends Error {
    override name = "FrozenModificationError";
    property: string | symbol;
    constructor(detail: string | undefined, prop: string | symbol) {
        let message = "An attempt was made to modify a frozen object";
        if (detail) {
            message += `: ${detail}`;
        }
        super(message);
        this.property = prop;
    }
}
