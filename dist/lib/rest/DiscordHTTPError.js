/** An HTTP error received from Discord. */
export default class DiscordHTTPError extends Error {
    method;
    name = "DiscordHTTPError";
    resBody;
    response;
    constructor(res, resBody, method, stack) {
        super();
        this.method = method;
        this.response = res;
        this.resBody = resBody;
        let message = `${res.status} ${res.statusText} on ${this.method} ${this.path}`;
        const errors = DiscordHTTPError.flattenErrors(resBody);
        if (errors.length !== 0) {
            message += `\n  ${errors.join("\n  ")}`;
        }
        Object.defineProperty(this, "message", {
            enumerable: false,
            value: message
        });
        if (stack) {
            this.stack = this.name + ": " + this.message + "\n" + stack;
        }
        else {
            Error.captureStackTrace(this, DiscordHTTPError);
        }
    }
    static flattenErrors(errors, keyPrefix = "") {
        let messages = [];
        for (const fieldName in errors) {
            if (!Object.hasOwn(errors, fieldName) || fieldName === "message" || fieldName === "code") {
                continue;
            }
            if (Array.isArray(errors[fieldName])) {
                messages = messages.concat(errors[fieldName].map(str => `${`${keyPrefix}${fieldName}`}: ${str}`));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY29yZEhUVFBFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yZXN0L0Rpc2NvcmRIVFRQRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsMkNBQTJDO0FBQzNDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsS0FBSztJQUMvQyxNQUFNLENBQWE7SUFDVixJQUFJLEdBQUcsa0JBQWtCLENBQUM7SUFDbkMsT0FBTyxDQUFpQztJQUN4QyxRQUFRLENBQVc7SUFDbkIsWUFBWSxHQUFhLEVBQUUsT0FBdUIsRUFBRSxNQUFrQixFQUFFLEtBQWM7UUFDbEYsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQXNDLENBQUM7UUFFdEQsSUFBSSxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxVQUFVLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0UsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLE9BQWtDLENBQUMsQ0FBQztRQUNsRixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdEIsT0FBTyxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDbkMsVUFBVSxFQUFFLEtBQUs7WUFDakIsS0FBSyxFQUFPLE9BQU87U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2hFLENBQUM7YUFBTSxDQUFDO1lBQ0osS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BELENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUErQixFQUFFLFNBQVMsR0FBRyxFQUFFO1FBQ2hFLElBQUksUUFBUSxHQUFrQixFQUFFLENBQUM7UUFDakMsS0FBSyxNQUFNLFNBQVMsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksU0FBUyxLQUFLLFNBQVMsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQ3ZGLFNBQVM7WUFDYixDQUFDO1lBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ25DLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFFLE1BQU0sQ0FBQyxTQUFTLENBQW1CLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxTQUFTLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekgsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ0osT0FBTyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU87WUFDSCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFHLElBQUksQ0FBQyxNQUFNO1lBQ3BCLElBQUksRUFBSyxJQUFJLENBQUMsSUFBSTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsS0FBSyxFQUFJLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtTQUM1QixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=