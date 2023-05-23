export * from "./types/index.js";
// Channel and Interaction MUST be at the top due to circular imports
export { default as Base } from "./structures/Base.js";
export { default as Bucket } from "./rest/Bucket.js";
export { default as Client } from "./Client.js";
export * from "./Constants.js";
export * as Constants from "./Constants.js";
export { default as Collection } from "./util/Collection.js";
export { default as DiscordHTTPError } from "./rest/DiscordHTTPError.js";
export { default as DiscordRESTError } from "./rest/DiscordRESTError.js";
export { default as GatewayError } from "./gateway/GatewayError.js";
/** @depecated Use {@link OAuthHelper~OAuthHelper.constructURL} for the `constructURL` function. {@link Routes/OAuth~OAuth.constructURL}, along with this export will be removed in `1.5.0`. */
export { default as OAuth } from "./routes/OAuth.js";
export { default as OAuthHelper } from "./rest/OAuthHelper.js";
export { default as RESTManager } from "./rest/RESTManager.js";
export * as Routes from "./util/Routes.js";
export { default as SequentialBucket } from "./rest/SequentialBucket.js";
export { default as Shard } from "./gateway/Shard.js";
export { default as ShardManager } from "./gateway/ShardManager.js";

export { default as TypedEmitter } from "./util/TypedEmitter.js";
export { default as UncaughtError } from "./util/UncaughtError.js";
export { default as Util } from "./util/Util.js";

// export types
export type { ClientOptions } from "./types/client";
export type { RequestOptions } from "./types/request-handler";
export type { BotActivity } from "./types/gateway";
