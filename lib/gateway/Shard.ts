/** @module Shard */
import GatewayError from "./GatewayError.js";
import type Client from "../Client.js";
import TypedEmitter from "../util/TypedEmitter.js";
import Bucket from "../rest/Bucket.js";
import { GatewayCloseCodes, GatewayOPCodes, GATEWAY_VERSION } from "../Constants.js";
import type { UpdatePresenceOptions, SendStatuses, BotActivity, ShardStatus } from "../types/gateway.js";
import Base from "../structures/Base.js";
import type { AnyDispatchPacket, AnyReceivePacket } from "../types/gateway-raw.js";
import { is } from "../util/Util.js";
import type { ShardEvents } from "../types/events.js";
import WebSocket, { type Data } from "ws";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { inspect } from "node:util";
import assert from "node:assert";

/** Represents a gateway connection to Discord. See {@link Events~ShardEvents | Shard Events} for a list of events. */
export default class Shard extends TypedEmitter<ShardEvents> {
    client!: Client;
    connectAttempts: number;
    #connectTimeout: NodeJS.Timeout | null;
    connecting: boolean;
    globalBucket!: Bucket;
    #guildCreateTimeout: NodeJS.Timeout | null;
    #heartbeatInterval: NodeJS.Timeout | null;
    id: number;
    lastHeartbeatAck: boolean;
    lastHeartbeatReceived: number;
    lastHeartbeatSent: number;
    latency: number;
    preReady: boolean;
    presence!: Required<UpdatePresenceOptions>;
    presenceUpdateBucket!: Bucket;
    ready: boolean;
    reconnectInterval: number;
    #requestMembersPromise: Record<string, { members: Array<object>; received: number; timeout: NodeJS.Timeout; reject(reason?: unknown): void; resolve(value: unknown): void; }>;
    resumeURL: string | null;
    sequence: number;
    sessionID: string | null;
    status: ShardStatus;
    ws!: WebSocket | null;
    guilds: number
    constructor(id: number, client: Client) {
        super();
        Object.defineProperties(this, {
            client: {
                value:        client,
                enumerable:   false,
                writable:     false,
                configurable: false
            },
            ws: {
                value:        null,
                enumerable:   false,
                writable:     true,
                configurable: false
            }
        });

        this.onDispatch = this.onDispatch.bind(this);
        this.onPacket = this.onPacket.bind(this);
        this.onWSClose = this.onWSClose.bind(this);
        this.onWSError = this.onWSError.bind(this);
        this.onWSMessage = this.onWSMessage.bind(this);
        this.onWSOpen = this.onWSOpen.bind(this);
        this.connectAttempts = 0;
        this.#connectTimeout = null;
        this.connecting = false;
        this.#guildCreateTimeout = null;
        this.#heartbeatInterval = null;
        this.id = id;
        this.lastHeartbeatAck = true;
        this.lastHeartbeatReceived = 0;
        this.lastHeartbeatSent = 0;
        this.latency = Infinity;
        this.preReady = false;
        this.ready = false;
        this.reconnectInterval = 1000;
        this.#requestMembersPromise = {};
        this.resumeURL = null;
        this.sequence = 0;
        this.sessionID = null;
        this.status = "disconnected";
        this.guilds = 0;
        this.hardReset();
    }

    private async checkReady(): Promise<void> {
    //     if (!this.ready) {
    //         if (this.#getAllUsersQueue.length !== 0) {
    //             const id = this.#getAllUsersQueue.shift()!;
    //             await this.requestGuildMembers(id);
    //             this.#getAllUsersQueue.splice(this.#getAllUsersQueue.indexOf(id), 1);
    //             return;
    //         }
    //         if (Object.keys(this.#getAllUsersCount).length === 0) {
        this.ready = true;
        this.emit("ready");
    //         }
    //     }
    }

    private initialize(): void {
        if (!this._token) {
            return this.disconnect(false, new Error("Invalid Token."));
        }
        this.status = "connecting";
        if (this.sessionID) {
            if (this.resumeURL === null) {
                this.client.emit("warn", "Resume url is not currently present. Discord may disconnect you quicker.", this.id);
            }

            this.ws = new WebSocket(this.resumeURL ?? this.client.gatewayURL, this.client.shards.options.ws);
        } else {
            this.ws = new WebSocket(this.client.gatewayURL, this.client.shards.options.ws);
        }


        /* eslint-disable @typescript-eslint/unbound-method */
        this.ws.on("close", this.onWSClose);
        this.ws.on("error", this.onWSError);
        this.ws.on("message", this.onWSMessage);
        this.ws.on("open", this.onWSOpen);
        /* eslint-enable @typescript-eslint/unbound-method */

        this.#connectTimeout = setTimeout(() => {
            if (this.connecting) {
                this.disconnect(undefined, new Error("Connection timeout."));
            }

        }, this.client.shards.options.connectionTimeout);
    }

    private async onDispatch(packet: AnyDispatchPacket): Promise<void> {
        this.client.emit("packet", packet, this.id);
        switch (packet.t) {
            case "READY": {
                this.connectAttempts = 0;
                this.reconnectInterval = 1000;
                this.connecting = false;
                if (this.#connectTimeout) {
                    clearInterval(this.#connectTimeout);
                }
                this.status = "ready";
                this.client.shards["_ready"](this.id);

                let url = packet.d.resume_gateway_url;
                if (url.includes("?")) {
                    url = url.slice(0, url.indexOf("?"));
                }
                if (!url.endsWith("/")) {
                    url += "/";
                }
                this.resumeURL = `${url}?v=${GATEWAY_VERSION}&encoding=json`;
                this.sessionID = packet.d.session_id;

                // for (const guild of packet.d.guilds) {
                //     this.client.guilds.delete(guild.id);
                //     this.client.unavailableGuilds.update(guild);
                // }

                this.preReady = true;
                this.emit("preReady");


                // if (this.client.unavailableGuilds.size !== 0 && packet.d.guilds.length !== 0) {
                // void this.restartGuildCreateTimeout();
                // } else {
                void this.checkReady();
                // }
                break;
            }

            case "RESUMED": {
                this.connectAttempts = 0;
                this.reconnectInterval = 1000;
                this.connecting = false;
                if (this.#connectTimeout) {
                    clearInterval(this.#connectTimeout);
                }
                this.status = "ready";
                this.client.shards["_ready"](this.id);
                void this.checkReady();
                this.emit("resume");
                break;
            }
        }
    }

    private onPacket(packet: AnyReceivePacket): void {
        if ("s" in packet && packet.s) {
            if (packet.s > this.sequence + 1 && this.ws && this.status !== "resuming") {
                this.client.emit("warn", `Non-consecutive sequence (${this.sequence} -> ${packet.s})`, this.id);
            }

            this.sequence = packet.s;
        }

        switch (packet.op) {
            case GatewayOPCodes.DISPATCH: { void this.onDispatch(packet); break;
            }
            case GatewayOPCodes.HEARTBEAT: { this.heartbeat(true); break;
            }
            case GatewayOPCodes.INVALID_SESSION: {
                if (packet.d) {
                    this.client.emit("warn", "Session Invalidated. Session may be resumable, attempting to resume..", this.id);
                    this.resume();
                } else {
                    this.sequence = 0;
                    this.sessionID = null;
                    this.client.emit("warn", "Session Invalidated. Session is not resumable, requesting a new session..", this.id);
                    this.identify();
                }
                break;
            }

            case GatewayOPCodes.RECONNECT: {
                this.client.emit("debug", "Reconnect requested by Discord.", this.id);
                this.disconnect(true);
                break;
            }

            case GatewayOPCodes.HELLO: {
                if (this.#heartbeatInterval) {
                    clearInterval(this.#heartbeatInterval);
                }
                this.#heartbeatInterval = setInterval(() => this.heartbeat(false), packet.d.heartbeat_interval);

                this.connecting = false;
                if (this.#connectTimeout) {
                    clearTimeout(this.#connectTimeout);
                }
                this.#connectTimeout = null;
                if (this.sessionID) {
                    this.resume();
                } else {
                    this.identify();
                    this.heartbeat();
                }

                this.client.emit("hello", packet.d.heartbeat_interval, this.id);
                break;
            }

            case GatewayOPCodes.HEARTBEAT_ACK: {
                this.lastHeartbeatAck = true;
                this.lastHeartbeatReceived = Date.now();
                this.latency = this.lastHeartbeatReceived - this.lastHeartbeatSent;
                this.client.emit("heartbeatAck", {
                    latency: this.latency,
                    shardID: this.id
                });
                if (isNaN(this.latency)) {
                    this.latency = Infinity;
                }
                break;
            }

            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            default: { this.client.emit("warn", `Unrecognized gateway packet: ${packet}`, this.id);
            }
        }
    }

    private onWSClose(code: number, r: Buffer): void {
        const reason = r.toString();
        let err: Error | undefined;
        let reconnect: boolean | undefined;
        if (code) {
            this.client.emit("debug", `${code === 1000 ? "Clean" : "Unclean"} WS close: ${code}: ${reason}`, this.id);
            switch (code) {
                case 1001: {
                    err = new GatewayError("CloudFlare WebSocket proxy restarting.", code);
                    break;
                }
                case 1006: {
                    err = new GatewayError("Connection reset by peer. This is a network issue. If you are concerned, talk to your ISP or host.", code);
                    break;
                }
                case GatewayCloseCodes.UNKNOWN_OPCODE: {
                    err = new GatewayError("Gateway received an unknown opcode.", code);
                    break;
                }

                case GatewayCloseCodes.DECODE_ERROR: {
                    err = new GatewayError("Gateway received an improperly encoded packet.", code);
                    break;
                }

                case GatewayCloseCodes.NOT_AUTHENTICATED: {
                    err = new GatewayError("Gateway received a packet before authentication.", code);
                    this.sessionID = null;
                    break;
                }

                case GatewayCloseCodes.AUTHENTICATION_FAILED: {
                    err = new GatewayError("Authentication failed.", code);
                    this.sessionID = null;
                    reconnect = false;
                    this.client.emit("error", new Error(`Invalid Token: ${this._token}`));
                    break;
                }

                case GatewayCloseCodes.ALREADY_AUTHENTICATED: {
                    err = new GatewayError("Gateway received an authentication attempt while already authenticated.", code);
                    break;
                }

                case GatewayCloseCodes.INVALID_SEQUENCE: {
                    err = new GatewayError("Gateway received an invalid sequence.", code);
                    this.sequence = 0;
                    break;
                }

                case GatewayCloseCodes.RATE_LIMITED: {
                    err = new GatewayError("Gateway connection was ratelimited.", code);
                    break;
                }

                case GatewayCloseCodes.INVALID_SHARD: {
                    err = new GatewayError("Invalid sharding specified.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }

                case GatewayCloseCodes.SHARDING_REQUIRED: {
                    err = new GatewayError("Shard would handle too many guilds (>2500 each).", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }

                case GatewayCloseCodes.INVALID_API_VERSION: {
                    err = new GatewayError("Invalid API version.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }

                case GatewayCloseCodes.INVALID_INTENTS: {
                    err = new GatewayError("Invalid intents specified.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }

                case GatewayCloseCodes.DISALLOWED_INTENTS: {
                    err = new GatewayError("Disallowed intents specified. Make sure any privileged intents you're trying to access have been enabled in the developer portal.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }

                default: {
                    err = new GatewayError(`Unknown close: ${code}: ${reason}`, code);
                    break;
                }
            }

            this.disconnect(reconnect, err);
        }
    }

    private onWSError(err: Error): void {
        this.client.emit("error", err, this.id);
    }

    private onWSMessage(data: Data): void {
        if (typeof data === "string") {
            data = Buffer.from(data);
        }
        try {
            if (Array.isArray(data)) {
                data = Buffer.concat(data);
            }

            assert(is<Buffer>(data));
            return this.onPacket(JSON.parse(data.toString()) as AnyReceivePacket);


        } catch (err) {
            this.client.emit("error", err as Error, this.id);
        }
    }

    private onWSOpen(): void {
        this.status = "handshaking";
        this.client.emit("connect", this.id);
        this.lastHeartbeatAck = true;
    }

    // private async restartGuildCreateTimeout(): Promise<void> {
    //     if (this.#guildCreateTimeout) {
    //         clearTimeout(this.#guildCreateTimeout);
    //         this.#guildCreateTimeout = null;
    //     }
    //     if (!this.ready) {
    //         if (this.client.unavailableGuilds.size === 0) {
    //             return this.checkReady();
    //         }

    //         this.#guildCreateTimeout = setTimeout(this.checkReady.bind(this), this.client.shards.options.guildCreateTimeout);
    //     }
    // }

    private sendPresenceUpdate(): void {
        this.send(GatewayOPCodes.PRESENCE_UPDATE, {
            activities: this.presence.activities,
            afk:        !!this.presence.afk,
            since:      this.presence.status === "idle" ? Date.now() : null,
            status:     this.presence.status
        });
    }

    private get _token(): string {
        return this.client.options.auth!;
    }

    /** Connect this shard. */
    connect(): void {
        if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
            this.client.emit("error", new Error("Shard#connect called while existing connection is established."), this.id);
            return;
        }
        ++this.connectAttempts;
        this.connecting = true;
        this.initialize();
    }

    disconnect(reconnect = this.client.shards.options.autoReconnect, error?: Error): void {
        if (!this.ws) {
            return;
        }

        if (this.#heartbeatInterval) {
            clearInterval(this.#heartbeatInterval);
            this.#heartbeatInterval = null;
        }

        if (this.ws.readyState !== WebSocket.CLOSED) {
            this.ws.removeAllListeners();
            try {
                if (reconnect && this.sessionID) {
                    if (this.ws.readyState === WebSocket.OPEN) {
                        this.client.emit("debug", `Closing websocket (state: ${this.ws.readyState})`, this.id);
                        this.ws.terminate();
                    } else {
                        this.ws.close(4999, "Reconnect");
                    }
                } else {
                    this.ws.close(1000, "Normal Close");
                }

            } catch (err) {
                this.client.emit("error", err as Error, this.id);
            }
        }

        this.ws = null;
        this.reset();

        if (error) {
            if (error instanceof GatewayError && [1001, 1006].includes(error.code)) {
                this.client.emit("debug", error.message, this.id);
            } else {
                this.client.emit("error", error, this.id);
            }
        }


        this.emit("disconnect", error);

        if (this.sessionID && this.connectAttempts >= this.client.shards.options.maxReconnectAttempts) {
            this.client.emit("debug", `Automatically invalidating session due to excessive resume attempts | Attempt ${this.connectAttempts}`, this.id);
            this.sessionID = null;
        }

        if (reconnect) {
            if (this.sessionID) {
                this.client.emit("debug", `Immediately reconnecting for potential resume | Attempt ${this.connectAttempts}`, this.id);
                this.client.shards.connect(this);
            } else {
                this.client.emit("debug", `Queueing reconnect in ${this.reconnectInterval}ms | Attempt ${this.connectAttempts}`, this.id);
                setTimeout(() => {
                    this.client.shards.connect(this);
                }, this.reconnectInterval);
                this.reconnectInterval = Math.min(Math.round(this.reconnectInterval * (Math.random() * 2 + 1)), 30000);
            }
        } else {
            this.hardReset();
        }
    }

    /**
     * Edit this shard's status.
     * @param status The status.
     * @param activities An array of activities.
     */
    async editStatus(status: SendStatuses, activities: Array<BotActivity> = []): Promise<void> {
        this.presence.status = status;
        this.presence.activities = activities;
        return this.sendPresenceUpdate();
    }

    hardReset(): void {
        this.reset();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        this.sequence = 0;
        this.sessionID = null;
        this.reconnectInterval = 1000;
        this.connectAttempts = 0;
        this.ws = null;
        this.#heartbeatInterval = null;
        this.#guildCreateTimeout = null;
        this.globalBucket = new Bucket(120, 60000, { reservedTokens: 5 });
        this.presence = JSON.parse(JSON.stringify(this.client.shards.options.presence)) as Shard["presence"];
        this.presenceUpdateBucket = new Bucket(5, 20000);
        this.resumeURL = null;
        this.guilds=0;
    }

    heartbeat(requested = false): void {
        // discord/discord-api-docs#1619
        if (this.status === "resuming" || this.status === "identifying") {
            return;
        }
        if (!requested) {
            if (!this.lastHeartbeatAck) {
                this.client.emit("debug", "Heartbeat timeout; " + JSON.stringify({
                    lastReceived: this.lastHeartbeatReceived,
                    lastSent:     this.lastHeartbeatSent,
                    interval:     this.#heartbeatInterval,
                    status:       this.status,
                    timestamp:    Date.now()
                }));
                return this.disconnect(undefined, new Error("Server didn't acknowledge previous heartbeat, possible lost connection."));
            }
            this.lastHeartbeatAck = false;
        }
        this.lastHeartbeatSent = Date.now();
        this.send(GatewayOPCodes.HEARTBEAT, this.sequence, true);
    }

    identify(): void {
        const data = {
            token:           this._token,
            properties:      this.client.shards.options.connectionProperties,
            compress:        false,
            large_threshold: this.client.shards.options.largeThreshold,
            shard:           [this.id, this.client.shards.options.maxShards],
            presence:        this.presence,
            intents:         this.client.shards.options.intents
        };
        this.send(GatewayOPCodes.IDENTIFY, data);
    }

    [inspect.custom](): this {
        return Base.prototype[inspect.custom].call(this) as never;
    }

    reset(): void {
        this.connecting = false;
        this.ready = false;
        this.preReady = false;
        if (this.#requestMembersPromise !== undefined) {
            for (const guildID in this.#requestMembersPromise) {
                if (!this.#requestMembersPromise[guildID]) {
                    continue;
                }

                clearTimeout(this.#requestMembersPromise[guildID].timeout);
                this.#requestMembersPromise[guildID].resolve(this.#requestMembersPromise[guildID].received);
            }
        }

        this.#requestMembersPromise = {};
        this.latency = Infinity;
        this.lastHeartbeatAck = true;
        this.lastHeartbeatReceived = 0;
        this.lastHeartbeatSent = 0;
        this.guilds=0;
        this.status = "disconnected";
        if (this.#connectTimeout) {
            clearTimeout(this.#connectTimeout);
        }
        this.#connectTimeout = null;
    }

    resume(): void {
        this.status = "resuming";
        this.send(GatewayOPCodes.RESUME, {
            token:      this._token,
            session_id: this.sessionID,
            seq:        this.sequence
        });
    }

    send(op: GatewayOPCodes, data: unknown, priority = false): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            let i = 0, waitFor = 1;
            const func = (): void => {
                if (++i >= waitFor && this.ws && this.ws.readyState === WebSocket.OPEN) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const d = JSON.stringify({ op, d: data });
                    this.ws.send(d);
                    if (typeof data === "object" && data && "token" in data) {
                        (data as { token: string; }).token = "[REMOVED]";
                    }
                    this.client.emit("debug", JSON.stringify({ op, d: data }), this.id);
                }
            };
            if (op === GatewayOPCodes.PRESENCE_UPDATE) {
                ++waitFor;
                this.presenceUpdateBucket.queue(func, priority);
            }
            this.globalBucket.queue(func, priority);
        }
    }

    override toString(): string {
        return Base.prototype.toString.call(this);
    }
}
