/** @module UncaughtError */
/** An error that is thrown when we encounter an error, and no `error` listeners are present. */
export default class UncaughtError extends Error {
    name: string;
    constructor(error: Error | string);
}
