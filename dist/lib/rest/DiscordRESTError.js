/** A REST error received from Discord. */
export default class DiscordRESTError extends Error {
    code;
    method;
    name = "DiscordRESTError";
    resBody;
    response;
    constructor(res, resBody, method, stack) {
        super();
        this.code = Number(resBody.code);
        this.method = method;
        this.response = res;
        this.resBody = resBody;
        let message = "message" in resBody ? `${resBody.message} on ${this.method} ${this.path}` : `Unknown Error on ${this.method} ${this.path}`;
        if ("errors" in resBody) {
            message += `\n ${DiscordRESTError.flattenErrors(resBody.errors).join("\n ")}`;
        }
        else {
            const errors = DiscordRESTError.flattenErrors(resBody);
            if (errors.length !== 0) {
                message += `\n ${errors.join("\n ")}`;
            }
        }
        Object.defineProperty(this, "message", {
            enumerable: false,
            value: message
        });
        if (stack) {
            this.stack = `${this.name}: ${this.message}\n${stack}`;
        }
        else {
            Error.captureStackTrace(this, DiscordRESTError);
        }
    }
    static flattenErrors(errors, keyPrefix = "") {
        let messages = [];
        for (const fieldName in errors) {
            if (!Object.hasOwn(errors, fieldName) || fieldName === "message" || fieldName === "code") {
                continue;
            }
            if ("_errors" in errors[fieldName]) {
                messages = messages.concat(errors[fieldName]._errors.map((err) => `${`${keyPrefix}${fieldName}`}: ${err.message}`));
            }
            else if (Array.isArray(errors[fieldName])) {
                messages = messages.concat(errors[fieldName].map(str => `${`${keyPrefix}${fieldName}`}: ${str}`));
            }
            else if (typeof errors[fieldName] === "object") {
                messages = messages.concat(DiscordRESTError.flattenErrors(errors[fieldName], `${keyPrefix}${fieldName}.`));
            }
        }
        return messages;
    }
    get headers() {
        return this.response.headers;
    }
    get path() {
        return new URL(this.response.url).pathname;
    }
    get status() {
        return this.response.status;
    }
    get statusText() {
        return this.response.statusText;
    }
    toJSON() {
        return {
            message: this.message,
            method: this.method,
            name: this.name,
            resBody: this.resBody,
            stack: this.stack ?? ""
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY29yZFJFU1RFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yZXN0L0Rpc2NvcmRSRVNURXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsMENBQTBDO0FBQzFDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsS0FBSztJQUMvQyxJQUFJLENBQVM7SUFDYixNQUFNLENBQWE7SUFDVixJQUFJLEdBQUcsa0JBQWtCLENBQUM7SUFDbkMsT0FBTyxDQUFpQztJQUN4QyxRQUFRLENBQVc7SUFDbkIsWUFBWSxHQUFhLEVBQUUsT0FBZ0MsRUFBRSxNQUFrQixFQUFFLEtBQWM7UUFDM0YsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFzQyxDQUFDO1FBRXRELElBQUksT0FBTyxHQUFHLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUksT0FBK0IsQ0FBQyxPQUFPLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuSyxJQUFJLFFBQVEsSUFBSSxPQUFPLEVBQUU7WUFDckIsT0FBTyxJQUFJLE1BQU0sZ0JBQWdCLENBQUMsYUFBYSxDQUFFLE9BQStDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDMUg7YUFBTTtZQUNILE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZ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