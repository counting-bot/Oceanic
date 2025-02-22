/** @module Types/Client */
import type { AllowedMentions } from "./channels.js";
import type { GatewayOptions } from "./gateway.js";
import type { ImageFormat } from "../Constants.js";
import type { Agent } from "undici-types";

export interface ClientOptions {
    /**
     * The default allowed mentions object.
     * @defaultValue { everyone: false, repliedUser: false, roles: true, users: true }
     */
    allowedMentions?: AllowedMentions;
    /** Fully qualified authorization string (e.x. Bot [TOKEN]) - you MUST prefix it yourself */
    auth?: string | null;
    /** The maximum number of items that can be present in various collections. */
    collectionLimits?: CollectionLimitsOptions;
    /**
     * The default image format to use.
     * @defaultValue png
     */
    defaultImageFormat?: ImageFormat;
    /**
     * The default image size to use.
     * @defaultValue 4096
     */
    defaultImageSize?: number;
    /**
     * When member limits are set on guilds, the limit is automatically raised if needed when requesting members from the gateway. This can be buggy and may not function correctly.
     * @defaultValue false
     */
    disableMemberLimitScaling?: boolean;
    /** The gateway options. */
    gateway?: GatewayOptions;
    /** The options for the request handler. */
    rest?: RESTOptions;
}
type ClientInstanceOptions = Required<Omit<ClientOptions, "rest" | "gateway" | "collectionLimits">> & { collectionLimits: Required<CollectionLimitsOptions>; };

export interface RESTOptions {
    /**
     * The agent to use for requests.
     * @defaultValue null
     */
    agent?: Agent | null;
    /**
     * The base URL to use for requests - must be a fully qualified url.
     * @defaultValue https://discordapp.com/api/v\{REST_VERSION\}
     */
    baseURL?: string;
    /**
     * If the built-in latency compensator should be disabled.
     * @defaultValue false
     */
    disableLatencyCompensation?: boolean;
    /**
     * If redirects should be followed.
     * @defaultValue false
     */
    followRedirects?: boolean;
    /**
     * The `Host` header to use for requests.
     * @defaultValue Parsed from `baseURL`
     */
    host?: string;
    /**
     * In milliseconds, the average request latency at which to start emitting latency errors.
     * @defaultValue 30000
     */
    latencyThreshold?: number;
    /**
     * In milliseconds, the time to offset ratelimit calculations by.
     * @defaultValue 0
     */
    ratelimiterOffset?: number;
    /**
     * In milliseconds, how long to wait until a request is timed out.
     * @defaultValue 15000
     */
    requestTimeout?: number;
    /**
     * A value for the `X-Super-Properties` header, sent with all requests if present. This can be used to reveal some properties only visible to >= client builds. Provide either an object, or a base64 encoded string.
     * @example eyJjbGllbnRfYnVpbGRfbnVtYmVyIjoxNjI5OTJ9
     * @example { client_build_number: 162992 }
     * @defaultValue null
     */
    superProperties?: string | Record<string, unknown> | null;
    /**
     * The `User-Agent` header to use for requests.
     * @defaultValue Oceanic/\{VERSION\} (https://github.com/OceanicJS/Oceanic)
     */
    userAgent?: string;
}

export interface CollectionLimitsOptions {
    /**
     * The maximum number of members to cache. A number to apply to all guilds individually, or a dictionary of guild IDs to member limits. The key `unknown` can be used to set the limit for all guilds not specified.
     *
     * Note: If you request members from the gateway, this will be increased (on the specific guild) as needed to accommodate those members.
     * @defaultValue Infinity
     */
    members?: number | Record<string, number>;
    /**
     * The maximum number of messages to cache.
     * @defaultValue 100
     */
    messages?: number;
}
