/** @module UncaughtError */
/** An error that is thrown when we encounter an error, and no `error` listeners are present. */
export default class UncaughtError extends Error {
    name = "UncaughtError";
    constructor(error) {
        super("Uncaught 'error' event", { cause: error });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5jYXVnaHRFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1VuY2F1Z2h0RXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNEJBQTRCO0FBRTVCLGdHQUFnRztBQUNoRyxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxLQUFLO0lBQ25DLElBQUksR0FBRyxlQUFlLENBQUM7SUFDaEMsWUFBWSxLQUFxQjtRQUM3QixLQUFLLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0oifQ==