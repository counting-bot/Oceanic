/** @module RequestHandler */
import SequentialBucket from "./SequentialBucket.js";
import DiscordRESTError from "./DiscordRESTError.js";
import DiscordHTTPError from "./DiscordHTTPError.js";
import { API_URL, RESTMethods, USER_AGENT } from "../Constants.js";
import Base from "../structures/Base.js";
/**
 * Latency & ratelimit related things lovingly borrowed from eris
 * https://github.com/abalabahaha/eris/blob/dev/lib/rest/RequestHandler.js (eb403730855714eafa36c541dbe2cb84c9979158)
 */
/** The primary means of communicating with Discord via rest. */
export default class RequestHandler {
    globalBlock = false;
    latencyRef;
    #manager;
    options;
    ratelimits = {};
    readyQueue = [];
    constructor(manager, options = {}) {
        if (options && options.baseURL && options.baseURL.endsWith("/")) {
            options.baseURL = options.baseURL.slice(0, -1);
        }
        this.#manager = manager;
        this.options = {
            agent: options.agent,
            baseURL: options.baseURL ?? API_URL,
            disableLatencyCompensation: !!options.disableLatencyCompensation,
            followRedirects: !!options.followRedirects,
            host: options.host ?? (options.baseURL ? new URL(options.baseURL).host : new URL(API_URL).host),
            latencyThreshold: options.latencyThreshold ?? 30000,
            ratelimiterOffset: options.ratelimiterOffset ?? 0,
            requestTimeout: options.requestTimeout ?? 15000,
            superProperties: options.superProperties ?? null,
            userAgent: options.userAgent ?? USER_AGENT
        };
        this.latencyRef = {
            lastTimeOffsetCheck: 0,
            latency: options.ratelimiterOffset ?? 0,
            raw: Array.from({ length: 10 }).fill(options.ratelimiterOffset ?? 0),
            timeOffsets: Array.from({ length: 10 }).fill(0),
            timeoffset: 0
        };
    }
    getRoute(path, method) {
        let route = path.replaceAll(/\/([a-z-]+)\/\d{15,21}/g, function (match, p) {
            return p === "channels" || p === "guilds" || p === "webhooks" ? match : `/${p}/:id`;
        }).replaceAll(/\/reactions\/[^/]+/g, "/reactions/:id").replaceAll(/\/reactions\/:id\/[^/]+/g, "/reactions/:id/:userID").replace(/^\/webhooks\/(\d+)\/[\w-]{64,}/, "/webhooks/$1/:token");
        if (method === "DELETE" && route.endsWith("/messages/:id")) {
            const messageID = path.slice(path.lastIndexOf("/") + 1);
            const createdAt = Base.getCreatedAt(messageID).getTime();
            if (Date.now() - this.latencyRef.latency - createdAt >= 1000 * 60 * 60 * 24 * 14) {
                method += "_OLD";
            }
            else if (Date.now() - this.latencyRef.latency - createdAt <= 1000 * 10) {
                method += "_NEW";
            }
            route = method + route;
        }
        else if (method === "GET" && /\/guilds\/\d+\/channels$/.test(route)) {
            route = "/guilds/:id/channels";
        }
        if (method === "PUT" || method === "DELETE") {
            const index = route.indexOf("/reactions");
            if (index !== -1) {
                route = "MODIFY" + route.slice(0, index + 10);
            }
        }
        return route;
    }
    globalUnblock() {
        this.globalBlock = false;
        while (this.readyQueue.length !== 0) {
            this.readyQueue.shift()();
        }
    }
    /** same as `request`, but with `auth` always set to `true`. */
    async authRequest(options) {
        return this.request({
            ...options,
            auth: true
        });
    }
    /**
     * Make a request. `null` will be returned if the request results in a `204 NO CONTENT`.
     * @param options The options for the request.
     */
    async request(options) {
        options.method = options.method.toUpperCase();
        if (!RESTMethods.includes(options.method)) {
            throw new TypeError(`Invalid method "${options.method}.`);
        }
        const _stackHolder = {};
        Error.captureStackTrace(_stackHolder);
        if (!options.path.startsWith("/")) {
            options.path = `/${options.path}`;
        }
        const route = options.route ?? this.getRoute(options.path, options.method);
        if (!this.ratelimits[route]) {
            this.ratelimits[route] = new SequentialBucket(1, this.latencyRef);
        }
        let attempts = 0;
        return new Promise((resolve, reject) => {
            async function attempt(cb) {
                const headers = options.headers ?? {};
                try {
                    if (typeof options.auth === "string") {
                        headers.Authorization = options.auth;
                    }
                    else if (options.auth && this.#manager.client.options.auth) {
                        headers.Authorization = this.#manager.client.options.auth;
                    }
                    if (options.reason) {
                        headers["X-Audit-Log-Reason"] = encodeURIComponent(options.reason);
                    }
                    let reqBody;
                    if (options.method !== "GET") {
                        let stringBody;
                        if (options.json) {
                            stringBody = JSON.stringify(options.json, (k, v) => typeof v === "bigint" ? v.toString() : v);
                        }
                        if (options.form || (options.files && options.files.length !== 0)) {
                            const data = options.form ?? new FormData();
                            if (stringBody) {
                                data.set("payload_json", stringBody);
                            }
                            reqBody = data;
                        }
                        else if (options.json) {
                            reqBody = stringBody;
                            headers["Content-Type"] = "application/json";
                        }
                    }
                    if (this.options.host) {
                        headers.Host = this.options.host;
                    }
                    if (this.options.superProperties) {
                        headers["X-Super-Properties"] = typeof this.options.superProperties === "object" ? JSON.stringify(this.options.superProperties) : this.options.superProperties;
                    }
                    const url = `${this.options.baseURL}${options.path}${options.query && Array.from(options.query.keys()).length !== 0 ? `?${options.query.toString()}` : ""}`;
                    let latency = Date.now();
                    const controller = new AbortController();
                    let timeout;
                    if (this.options.requestTimeout > 0 && this.options.requestTimeout !== Infinity) {
                        timeout = setTimeout(() => controller.abort(), this.options.requestTimeout);
                    }
                    const res = await fetch(url, {
                        method: options.method,
                        headers,
                        body: reqBody,
                        // dispatcher: this.options.agent || undefined,
                        signal: controller.signal,
                        redirect: this.options.followRedirects ? "follow" : "manual"
                    });
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    latency = Date.now() - latency;
                    if (!this.options.disableLatencyCompensation) {
                        this.latencyRef.raw.push(latency);
                        this.latencyRef.latency = this.latencyRef.latency - Math.trunc((this.latencyRef.raw.shift() ?? 0) / 10) + Math.trunc(latency / 10);
                    }
                    let resBody;
                    if (res.status === 204) {
                        resBody = null;
                    }
                    else {
                        if (res.headers.get("content-type") === "application/json") {
                            const b = await res.text();
                            try {
                                resBody = JSON.parse(b);
                            }
                            catch (err) {
                                this.#manager.client.emit("error", err);
                                resBody = b;
                            }
                        }
                        else {
                            resBody = Buffer.from(await res.arrayBuffer());
                        }
                    }
                    this.#manager.client.emit("request", {
                        method: options.method,
                        path: options.path,
                        route,
                        withAuth: !!options.auth,
                        requestBody: reqBody,
                        responseBody: resBody
                    });
                    const headerNow = Date.parse(res.headers.get("date"));
                    const now = Date.now();
                    if (this.latencyRef.lastTimeOffsetCheck < (Date.now() - 5000)) {
                        const timeOffset = headerNow + 500 - (this.latencyRef.lastTimeOffsetCheck = Date.now());
                        if (this.latencyRef.timeoffset - this.latencyRef.latency >= this.options.latencyThreshold && timeOffset - this.latencyRef.latency >= this.options.latencyThreshold) {
                            this.#manager.client.emit("warn", `Your clock is ${this.latencyRef.timeoffset}ms behind Discord's server clock. Please check your connection and system time.`);
                        }
                        this.latencyRef.timeoffset = this.latencyRef.timeoffset - Math.trunc(this.latencyRef.timeOffsets.shift() / 10) + Math.trunc(timeOffset / 10);
                        this.latencyRef.timeOffsets.push(timeOffset);
                    }
                    if (res.headers.has("x-ratelimit-limit")) {
                        this.ratelimits[route].limit = Number(res.headers.get("x-ratelimit-limit"));
                    }
                    if (options.method !== "GET" && (!res.headers.has("x-ratelimit-remaining") || !res.headers.has("x-ratelimit-limit")) && this.ratelimits[route].limit !== 1) {
                        this.#manager.client.emit("debug", [`Missing ratelimit headers for SequentialBucket(${this.ratelimits[route].remaining}/${this.ratelimits[route].limit}) with non-default limit\n`,
                            `${res.status} ${res.headers.get("content-type") ?? "null"}: ${options.method} ${route} | ${res.headers.get("cf-ray") ?? "null"}\n`,
                            `content-type = ${res.headers.get("content-type") ?? "null"}\n`,
                            `x-ratelimit-remaining = ${res.headers.get("x-ratelimit-remaining") ?? "null"}\n`,
                            `x-ratelimit-limit = ${res.headers.get("x-ratelimit-limit") ?? "null"}\n`,
                            `x-ratelimit-reset = ${res.headers.get("x-ratelimit-reset") ?? "null"}\n`,
                            `x-ratelimit-global = ${res.headers.get("x-ratelimit-global") ?? "null"}`].join("\n"));
                    }
                    this.ratelimits[route].remaining = res.headers.has("x-ratelimit-remaining") ? Number(res.headers.get("x-ratelimit-remaining")) ?? 0 : 1;
                    const retryAfter = Number(res.headers.get("x-ratelimit-reset-after") ?? res.headers.get("retry-after") ?? 0) * 1000;
                    if (retryAfter >= 0) {
                        if (res.headers.has("x-ratelimit-global")) {
                            this.globalBlock = true;
                            setTimeout(this.globalUnblock.bind(this), retryAfter ?? 1);
                        }
                        else {
                            this.ratelimits[route].reset = (retryAfter ?? 1) + now;
                        }
                    }
                    else if (res.headers.has("x-ratelimit-reset")) {
                        let resetTime = Number(res.headers.get("x-ratelimit-reset")) * 1000;
                        if (route.endsWith("/reactions/:id") && (resetTime - headerNow) === 1000) {
                            resetTime = now + 250;
                        }
                        this.ratelimits[route].reset = Math.max(resetTime - this.latencyRef.latency, now);
                    }
                    else {
                        this.ratelimits[route].reset = now;
                    }
                    if (res.status !== 429) {
                        this.#manager.client.emit("debug", `${now} ${route} ${res.status}: ${latency}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[route].remaining}/${this.ratelimits[route].limit} left | Reset ${this.ratelimits[route].reset} (${this.ratelimits[route].reset - now}ms left)`);
                    }
                    if (res.status > 300) {
                        if (res.status === 429) {
                            let delay = retryAfter;
                            if (res.headers.get("x-ratelimit-scope") === "shared") {
                                try {
                                    delay = resBody.retry_after * 1000;
                                }
                                catch (err) {
                                    reject(err);
                                }
                            }
                            this.#manager.client.emit("debug", `${res.headers.has("x-ratelimit-global") ? "Global" : "Unexpected"} RateLimit: ${JSON.stringify(resBody)}\n${now} ${route} ${res.status}: ${latency}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[route].remaining}/${this.ratelimits[route].limit} left | Reset ${delay} (${this.ratelimits[route].reset - now}ms left) | Scope ${res.headers.get("x-ratelimit-scope")}`);
                            if (delay) {
                                setTimeout(() => {
                                    cb();
                                    // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, prefer-spread
                                    this.request(options).then(resolve).catch(reject);
                                }, delay);
                                return;
                            }
                            else {
                                cb();
                                this.request(options).then(resolve).catch(reject);
                                return;
                            }
                        }
                        else if (res.status === 502 && ++attempts < 4) {
                            this.#manager.client.emit("debug", `Unexpected 502 on ${options.method} ${route}`);
                            setTimeout(() => {
                                this.request(options).then(resolve).catch(reject);
                            }, Math.floor(Math.random() * 1900 + 100));
                            return cb();
                        }
                        cb();
                        let { stack } = _stackHolder;
                        if (stack.startsWith("Error\n")) {
                            stack = stack.slice(6);
                        }
                        const err = resBody && typeof resBody === "object" && "code" in resBody ? new DiscordRESTError(res, resBody, options.method, stack) : new DiscordHTTPError(res, resBody, options.method, stack);
                        reject(err);
                        return;
                    }
                    cb();
                    resolve(resBody);
                }
                catch (err) {
                    cb();
                    if (err instanceof Error && err.constructor.name === "DOMException" && err.name === "AbortError") {
                        reject(new Error(`Request Timed Out (>${this.options.requestTimeout}ms) on ${options.method} ${options.path}`));
                    }
                    this.#manager.client.emit("error", err);
                }
            }
            if (this.globalBlock && options.auth) {
                (options.priority ? this.readyQueue.unshift.bind(this.readyQueue) : this.readyQueue.push.bind(this.readyQueue))(() => {
                    this.ratelimits[route].queue(attempt.bind(this), options.priority);
                });
            }
            else {
                this.ratelimits[route].queue(attempt.bind(this), options.priority);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9SZXF1ZXN0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBNkI7QUFDN0IsT0FBTyxnQkFBZ0IsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLGdCQUFnQixNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sZ0JBQWdCLE1BQU0sdUJBQXVCLENBQUM7QUFFckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFtQixNQUFNLGlCQUFpQixDQUFDO0FBQ3BGLE9BQU8sSUFBSSxNQUFNLHVCQUF1QixDQUFDO0FBSXpDOzs7R0FHRztBQUVILGdFQUFnRTtBQUNoRSxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWM7SUFDL0IsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUNwQixVQUFVLENBQWE7SUFDdkIsUUFBUSxDQUFjO0lBQ3RCLE9BQU8sQ0FBZ0M7SUFDdkMsVUFBVSxHQUFxQyxFQUFFLENBQUM7SUFDbEQsVUFBVSxHQUFzQixFQUFFLENBQUM7SUFDbkMsWUFBWSxPQUFvQixFQUFFLFVBQXVCLEVBQUU7UUFDdkQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzlELE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxLQUFLLEVBQXVCLE9BQU8sQ0FBQyxLQUFLO1lBQ3pDLE9BQU8sRUFBcUIsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPO1lBQ3RELDBCQUEwQixFQUFF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