/** @module Errors */
/** An error that is thrown when we encounter an error, and no `error` listeners are present. */
export class UncaughtError extends Error {
    name = "UncaughtError";
    constructor(error) {
        super("Uncaught 'error' event", { cause: error });
    }
}
/** A gateway error. */
export class GatewayError extends Error {
    code;
    name = "GatewayError";
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
export class FrozenModificationError extends Error {
    name = "FrozenModificationError";
    property;
    constructor(detail, prop) {
        let message = "An attempt was made to modify a frozen object";
        if (detail) {
            message += `: ${detail}`;
        }
        super(message);
        this.property = prop;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWwvRXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFCQUFxQjtBQUVyQixnR0FBZ0c7QUFDaEcsTUFBTSxPQUFPLGFBQWMsU0FBUSxLQUFLO0lBQzNCLElBQUksR0FBRyxlQUFlLENBQUM7SUFDaEMsWUFBWSxLQUFxQjtRQUM3QixLQUFLLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0o7QUFFRCx1QkFBdUI7QUFDdkIsTUFBTSxPQUFPLFlBQWEsU0FBUSxLQUFLO0lBQ25DLElBQUksQ0FBUztJQUNKLElBQUksR0FBRyxjQUFjLENBQUM7SUFDL0IsWUFBWSxPQUFlLEVBQUUsSUFBWTtRQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUFFRCxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsS0FBSztJQUNyQyxJQUFJLEdBQUcseUJBQXlCLENBQUM7SUFDMUMsUUFBUSxDQUFrQjtJQUMxQixZQUFZLE1BQTBCLEVBQUUsSUFBcUI7UUFDekQsSUFBSSxPQUFPLEdBQUcsK0NBQStDLENBQUM7UUFDOUQsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sSUFBSSxLQUFLLE1BQU0sRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0NBQ0oifQ==