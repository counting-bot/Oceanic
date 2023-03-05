"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Shard */
const GatewayError_js_1 = tslib_1.__importDefault(require("./GatewayError.js"));
const TypedEmitter_js_1 = tslib_1.__importDefault(require("../util/TypedEmitter.js"));
const Bucket_js_1 = tslib_1.__importDefault(require("../rest/Bucket.js"));
const Constants_js_1 = require("../Constants.js");
const Base_js_1 = tslib_1.__importDefault(require("../structures/Base.js"));
const ClientApplication_js_1 = tslib_1.__importDefault(require("../structures/ClientApplication.js"));
const ExtendedUser_js_1 = tslib_1.__importDefault(require("../structures/ExtendedUser.js"));
const Util_js_1 = require("../util/Util.js");
const ws_1 = tslib_1.__importDefault(require("ws"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
const node_assert_1 = tslib_1.__importDefault(require("node:assert"));
/** Represents a gateway connection to Discord. See {@link Events~ShardEvents | Shard Events} for a list of events. */
class Shard extends TypedEmitter_js_1.default {
    client;
    connectAttempts;
    #connectTimeout;
    connecting;
    #getAllUsersCount;
    #getAllUsersQueue;
    globalBucket;
    #guildCreateTimeout;
    #heartbeatInterval;
    id;
    lastHeartbeatAck;
    lastHeartbeatReceived;
    lastHeartbeatSent;
    latency;
    preReady;
    presence;
    presenceUpdateBucket;
    ready;
    reconnectInterval;
    #requestMembersPromise;
    resumeURL;
    sequence;
    sessionID;
    status;
    ws;
    constructor(id, client) {
        super();
        Object.defineProperties(this, {
            client: {
                value: client,
                enumerable: false,
                writable: false,
                configurable: false
            },
            ws: {
                value: null,
                enumerable: false,
                writable: true,
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
        this.#getAllUsersCount = {};
        this.#getAllUsersQueue = [];
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
        this.hardReset();
    }
    async checkReady() {
        if (!this.ready) {
            if (this.#getAllUsersQueue.length !== 0) {
                const id = this.#getAllUsersQueue.shift();
                await this.requestGuildMembers(id);
                this.#getAllUsersQueue.splice(this.#getAllUsersQueue.indexOf(id), 1);
                return;
            }
            if (Object.keys(this.#getAllUsersCount).length === 0) {
                this.ready = true;
                this.emit("ready");
            }
        }
    }
    createGuild(data) {
        this.client.guildShardMap[data.id] = this.id;
        const guild = this.client.guilds.update(data);
        if (this.client.shards.options.getAllUsers && guild.members.size < guild.memberCount) {
            void this.requestGuildMembers(guild.id, { presences: (this.client.shards.options.intents & Constants_js_1.Intents.GUILD_PRESENCES) === Constants_js_1.Intents.GUILD_PRESENCES });
        }
        return guild;
    }
    initialize() {
        if (!this._token) {
            return this.disconnect(false, new Error("Invalid Token."));
        }
        this.status = "connecting";
        if (this.sessionID) {
            if (this.resumeURL === null) {
                this.client.emit("warn", "Resume url is not currently present. Discord may disconnect you quicker.", this.id);
            }
            this.ws = new ws_1.default(this.resumeURL ?? this.client.gatewayURL, this.client.shards.options.ws);
        }
        else {
            this.ws = new ws_1.default(this.client.gatewayURL, this.client.shards.options.ws);
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
    async onDispatch(packet) {
        this.client.emit("packet", packet, this.id);
        switch (packet.t) {
            case "CHANNEL_CREATE": {
                const channel = this.client.util.updateChannel(packet.d);
                this.client.emit("channelCreate", channel);
                break;
            }
            case "CHANNEL_DELETE": {
                if (packet.d.type === Constants_js_1.ChannelTypes.DM) {
                    const channel = this.client.privateChannels.get(packet.d.id);
                    this.client.privateChannels.delete(packet.d.id);
                    this.client.emit("channelDelete", channel ?? {
                        id: packet.d.id,
                        flags: packet.d.flags,
                        lastMessageID: packet.d.last_message_id,
                        type: packet.d.type
                    });
                    break;
                }
                const guild = this.client.guilds.get(packet.d.guild_id);
                const channel = this.client.util.updateChannel(packet.d);
                guild?.channels.delete(packet.d.id);
                this.client.emit("channelDelete", channel);
                break;
            }
            case "CHANNEL_UPDATE": {
                const oldChannel = this.client.getChannel(packet.d.id)?.toJSON() ?? null;
                const channel = this.client.util.updateChannel(packet.d);
                this.client.emit("channelUpdate", channel, oldChannel);
                break;
            }
            case "GUILD_BAN_ADD": {
                this.client.emit("guildBanAdd", this.client.guilds.get(packet.d.guild_id) ?? { id: packet.d.guild_id }, this.client.users.update(packet.d.user));
                break;
            }
            case "GUILD_BAN_REMOVE": {
                this.client.emit("guildBanRemove", this.client.guilds.get(packet.d.guild_id) ?? { id: packet.d.guild_id }, this.client.users.update(packet.d.user));
                break;
            }
            case "GUILD_CREATE": {
                if (packet.d.unavailable) {
                    this.client.guilds.delete(packet.d.id);
                    this.client.emit("unavailableGuildCreate", this.client.unavailableGuilds.update(packet.d));
                }
                else {
                    const guild = this.createGuild(packet.d);
                    if (this.ready) {
                        if (this.client.unavailableGuilds.delete(guild.id)) {
                            this.client.emit("guildAvailable", guild);
                        }
                        else {
                            this.client.emit("guildCreate", guild);
                        }
                    }
                    else {
                        if (this.client.unavailableGuilds.delete(guild.id)) {
                            void this.restartGuildCreateTimeout();
                        }
                        else {
                            this.client.emit("guildCreate", guild);
                        }
                    }
                }
                break;
            }
            case "GUILD_DELETE": {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                delete this.client.guildShardMap[packet.d.id];
                const guild = this.client.guilds.get(packet.d.id);
                if (guild?.channels) {
                    for (const [, channel] of guild.channels)
                        delete this.client.channelGuildMap[channel.id];
                }
                this.client.guilds.delete(packet.d.id);
                if (packet.d.unavailable) {
                    this.client.emit("guildUnavailable", this.client.unavailableGuilds.update(packet.d));
                }
                else {
                    this.client.emit("guildDelete", guild ?? { id: packet.d.id });
                }
                break;
            }
            case "GUILD_MEMBER_ADD": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                if (guild) {
                    guild.memberCount++;
                }
                const member = this.client.util.updateMember(packet.d.guild_id, packet.d.user.id, packet.d);
                this.client.emit("guildMemberAdd", member);
                break;
            }
            case "GUILD_MEMBERS_CHUNK": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                // eslint-disable-next-line @typescript-eslint/dot-notation
                guild?.["updateMemberLimit"](packet.d.members.length);
                const members = packet.d.members.map(member => this.client.util.updateMember(packet.d.guild_id, member.user.id, member));
                if (!packet.d.nonce) {
                    this.client.emit("warn", "Received GUILD_MEMBERS_CHUNK without a nonce.");
                    break;
                }
                if (this.#requestMembersPromise[packet.d.nonce]) {
                    this.#requestMembersPromise[packet.d.nonce].members.push(...members);
                }
                if (packet.d.chunk_index >= packet.d.chunk_count - 1) {
                    if (this.#requestMembersPromise[packet.d.nonce]) {
                        clearTimeout(this.#requestMembersPromise[packet.d.nonce].timeout);
                        this.#requestMembersPromise[packet.d.nonce].resolve(this.#requestMembersPromise[packet.d.nonce].members);
                        delete this.#requestMembersPromise[packet.d.nonce];
                    }
                    if (this.#getAllUsersCount[packet.d.guild_id]) {
                        delete this.#getAllUsersCount[packet.d.guild_id];
                        void this.checkReady();
                    }
                }
                this.client.emit("guildMemberChunk", members);
                this.lastHeartbeatAck = true;
                break;
            }
            case "GUILD_MEMBER_REMOVE": {
                if (packet.d.user.id === this.client.user.id) {
                    break;
                }
                const guild = this.client.guilds.get(packet.d.guild_id);
                // eslint-disable-next-line @typescript-eslint/dot-notation
                const member = guild?.members.get(packet.d.user.id)?.["update"]({ user: packet.d.user }) ?? this.client.users.update(packet.d.user);
                if (guild) {
                    guild.memberCount--;
                    guild.members.delete(packet.d.user.id);
                }
                this.client.emit("guildMemberRemove", member, guild ?? { id: packet.d.guild_id });
                break;
            }
            case "GUILD_MEMBER_UPDATE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const oldMember = guild?.members.get(packet.d.user.id)?.toJSON() ?? null;
                const member = this.client.util.updateMember(packet.d.guild_id, packet.d.user.id, { ...packet.d });
                this.client.emit("guildMemberUpdate", member, oldMember);
                break;
            }
            case "GUILD_UPDATE": {
                const guild = this.client.guilds.get(packet.d.id);
                const oldGuild = guild?.toJSON() ?? null;
                this.client.emit("guildUpdate", this.client.guilds.update(packet.d), oldGuild);
                break;
            }
            case "READY": {
                this.connectAttempts = 0;
                this.reconnectInterval = 1000;
                this.connecting = false;
                if (this.#connectTimeout) {
                    clearInterval(this.#connectTimeout);
                }
                this.status = "ready";
                this.client.shards["_ready"](this.id);
                this.client["_application"] = new ClientApplication_js_1.default(packet.d.application, this.client);
                if (this.client["_user"]) {
                    this.client.users.update(packet.d.user);
                }
                else {
                    this.client["_user"] = this.client.users.add(new ExtendedUser_js_1.default(packet.d.user, this.client));
                }
                let url = packet.d.resume_gateway_url;
                if (url.includes("?")) {
                    url = url.slice(0, url.indexOf("?"));
                }
                if (!url.endsWith("/")) {
                    url += "/";
                }
                this.resumeURL = `${url}?v=${Constants_js_1.GATEWAY_VERSION}&encoding=json`;
                this.sessionID = packet.d.session_id;
                for (const guild of packet.d.guilds) {
                    this.client.guilds.delete(guild.id);
                    this.client.unavailableGuilds.update(guild);
                }
                this.preReady = true;
                this.emit("preReady");
                if (this.client.unavailableGuilds.size !== 0 && packet.d.guilds.length !== 0) {
                    void this.restartGuildCreateTimeout();
                }
                else {
                    void this.checkReady();
                }
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
    onPacket(packet) {
        if ("s" in packet && packet.s) {
            if (packet.s > this.sequence + 1 && this.ws && this.status !== "resuming") {
                this.client.emit("warn", `Non-consecutive sequence (${this.sequence} -> ${packet.s})`, this.id);
            }
            this.sequence = packet.s;
        }
        switch (packet.op) {
            case Constants_js_1.GatewayOPCodes.DISPATCH: {
                void this.onDispatch(packet);
                break;
            }
            case Constants_js_1.GatewayOPCodes.HEARTBEAT: {
                this.heartbeat(true);
                break;
            }
            case Constants_js_1.GatewayOPCodes.INVALID_SESSION: {
                if (packet.d) {
                    this.client.emit("warn", "Session Invalidated. Session may be resumable, attempting to resume..", this.id);
                    this.resume();
                }
                else {
                    this.sequence = 0;
                    this.sessionID = null;
                    this.client.emit("warn", "Session Invalidated. Session is not resumable, requesting a new session..", this.id);
                    this.identify();
                }
                break;
            }
            case Constants_js_1.GatewayOPCodes.RECONNECT: {
                this.client.emit("debug", "Reconnect requested by Discord.", this.id);
                this.disconnect(true);
                break;
            }
            case Constants_js_1.GatewayOPCodes.HELLO: {
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
                }
                else {
                    this.identify();
                    this.heartbeat();
                }
                this.client.emit("hello", packet.d.heartbeat_interval, this.id);
                break;
            }
            case Constants_js_1.GatewayOPCodes.HEARTBEAT_ACK: {
                this.lastHeartbeatAck = true;
                this.lastHeartbeatReceived = Date.now();
                this.latency = this.lastHeartbeatReceived - this.lastHeartbeatSent;
                if (isNaN(this.latency)) {
                    this.latency = Infinity;
                }
                break;
            }
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            default: {
                this.client.emit("warn", `Unrecognized gateway packet: ${packet}`, this.id);
            }
        }
    }
    onWSClose(code, r) {
        const reason = r.toString();
        let err;
        let reconnect;
        if (code) {
            this.client.emit("debug", `${code === 1000 ? "Clean" : "Unclean"} WS close: ${code}: ${reason}`, this.id);
            switch (code) {
                case 1001: {
                    err = new GatewayError_js_1.default("CloudFlare WebSocket proxy restarting.", code);
                    break;
                }
                case 1006: {
                    err = new GatewayError_js_1.default("Connection reset by peer. This is a network issue. If you are concerned, talk to your ISP or host.", code);
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.UNKNOWN_OPCODE: {
                    err = new GatewayError_js_1.default("Gateway received an unknown opcode.", code);
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.DECODE_ERROR: {
                    err = new GatewayError_js_1.default("Gateway received an improperly encoded packet.", code);
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.NOT_AUTHENTICATED: {
                    err = new GatewayError_js_1.default("Gateway received a packet before authentication.", code);
                    this.sessionID = null;
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.AUTHENTICATION_FAILED: {
                    err = new GatewayError_js_1.default("Authentication failed.", code);
                    this.sessionID = null;
                    reconnect = false;
                    this.client.emit("error", new Error(`Invalid Token: ${this._token}`));
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.ALREADY_AUTHENTICATED: {
                    err = new GatewayError_js_1.default("Gateway received an authentication attempt while already authenticated.", code);
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.INVALID_SEQUENCE: {
                    err = new GatewayError_js_1.default("Gateway received an invalid sequence.", code);
                    this.sequence = 0;
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.RATE_LIMITED: {
                    err = new GatewayError_js_1.default("Gateway connection was ratelimited.", code);
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.INVALID_SHARD: {
                    err = new GatewayError_js_1.default("Invalid sharding specified.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.SHARDING_REQUIRED: {
                    err = new GatewayError_js_1.default("Shard would handle too many guilds (>2500 each).", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.INVALID_API_VERSION: {
                    err = new GatewayError_js_1.default("Invalid API version.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.INVALID_INTENTS: {
                    err = new GatewayError_js_1.default("Invalid intents specified.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                case Constants_js_1.GatewayCloseCodes.DISALLOWED_INTENTS: {
                    err = new GatewayError_js_1.default("Disallowed intents specified. Make sure any privileged intents you're trying to access have been enabled in the developer portal.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                default: {
                    err = new GatewayError_js_1.default(`Unknown close: ${code}: ${reason}`, code);
                    break;
                }
            }
            this.disconnect(reconnect, err);
        }
    }
    onWSError(err) {
        this.client.emit("error", err, this.id);
    }
    onWSMessage(data) {
        if (typeof data === "string") {
            data = Buffer.from(data);
        }
        try {
            if (Array.isArray(data)) {
                data = Buffer.concat(data);
            }
            (0, node_assert_1.default)((0, Util_js_1.is)(data));
            return this.onPacket(JSON.parse(data.toString()));
        }
        catch (err) {
            this.client.emit("error", err, this.id);
        }
    }
    onWSOpen() {
        this.status = "handshaking";
        this.client.emit("connect", this.id);
        this.lastHeartbeatAck = true;
    }
    async restartGuildCreateTimeout() {
        if (this.#guildCreateTimeout) {
            clearTimeout(this.#guildCreateTimeout);
            this.#guildCreateTimeout = null;
        }
        if (!this.ready) {
            if (this.client.unavailableGuilds.size === 0) {
                return this.checkReady();
            }
            this.#guildCreateTimeout = setTimeout(this.checkReady.bind(this), this.client.shards.options.guildCreateTimeout);
        }
    }
    sendPresenceUpdate() {
        this.send(Constants_js_1.GatewayOPCodes.PRESENCE_UPDATE, {
            activities: this.presence.activities,
            afk: !!this.presence.afk,
            since: this.presence.status === "idle" ? Date.now() : null,
            status: this.presence.status
        });
    }
    get _token() {
        return this.client.options.auth;
    }
    /** Connect this shard. */
    connect() {
        if (this.ws && this.ws.readyState !== ws_1.default.CLOSED) {
            this.client.emit("error", new Error("Shard#connect called while existing connection is established."), this.id);
            return;
        }
        ++this.connectAttempts;
        this.connecting = true;
        this.initialize();
    }
    disconnect(reconnect = this.client.shards.options.autoReconnect, error) {
        if (!this.ws) {
            return;
        }
        if (this.#heartbeatInterval) {
            clearInterval(this.#heartbeatInterval);
            this.#heartbeatInterval = null;
        }
        if (this.ws.readyState !== ws_1.default.CLOSED) {
            this.ws.removeAllListeners();
            try {
                if (reconnect && this.sessionID) {
                    if (this.ws.readyState === ws_1.default.OPEN) {
                        this.client.emit("debug", `Closing websocket (state: ${this.ws.readyState})`, this.id);
                        this.ws.terminate();
                    }
                    else {
                        this.ws.close(4999, "Reconnect");
                    }
                }
                else {
                    this.ws.close(1000, "Normal Close");
                }
            }
            catch (err) {
                this.client.emit("error", err, this.id);
            }
        }
        this.ws = null;
        this.reset();
        if (error) {
            if (error instanceof GatewayError_js_1.default && [1001, 1006].includes(error.code)) {
                this.client.emit("debug", error.message, this.id);
            }
            else {
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
            }
            else {
                this.client.emit("debug", `Queueing reconnect in ${this.reconnectInterval}ms | Attempt ${this.connectAttempts}`, this.id);
                setTimeout(() => {
                    this.client.shards.connect(this);
                }, this.reconnectInterval);
                this.reconnectInterval = Math.min(Math.round(this.reconnectInterval * (Math.random() * 2 + 1)), 30000);
            }
        }
        else {
            this.hardReset();
        }
    }
    /**
     * Edit this shard's status.
     * @param status The status.
     * @param activities An array of activities.
     */
    async editStatus(status, activities = []) {
        this.presence.status = status;
        this.presence.activities = activities;
        return this.sendPresenceUpdate();
    }
    hardReset() {
        this.reset();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        this.sequence = 0;
        this.sessionID = null;
        this.reconnectInterval = 1000;
        this.connectAttempts = 0;
        this.ws = null;
        this.#heartbeatInterval = null;
        this.#guildCreateTimeout = null;
        this.globalBucket = new Bucket_js_1.default(120, 60000, { reservedTokens: 5 });
        this.presence = JSON.parse(JSON.stringify(this.client.shards.options.presence));
        this.presenceUpdateBucket = new Bucket_js_1.default(5, 20000);
        this.resumeURL = null;
    }
    heartbeat(requested = false) {
        // discord/discord-api-docs#1619
        if (this.status === "resuming" || this.status === "identifying") {
            return;
        }
        if (!requested) {
            if (!this.lastHeartbeatAck) {
                this.client.emit("debug", "Heartbeat timeout; " + JSON.stringify({
                    lastReceived: this.lastHeartbeatReceived,
                    lastSent: this.lastHeartbeatSent,
                    interval: this.#heartbeatInterval,
                    status: this.status,
                    timestamp: Date.now()
                }));
                return this.disconnect(undefined, new Error("Server didn't acknowledge previous heartbeat, possible lost connection."));
            }
            this.lastHeartbeatAck = false;
        }
        this.lastHeartbeatSent = Date.now();
        this.send(Constants_js_1.GatewayOPCodes.HEARTBEAT, this.sequence, true);
    }
    identify() {
        const data = {
            token: this._token,
            properties: this.client.shards.options.connectionProperties,
            compress: false,
            large_threshold: this.client.shards.options.largeThreshold,
            shard: [this.id, this.client.shards.options.maxShards],
            presence: this.presence,
            intents: this.client.shards.options.intents
        };
        this.send(Constants_js_1.GatewayOPCodes.IDENTIFY, data);
    }
    [node_util_1.inspect.custom]() {
        return Base_js_1.default.prototype[node_util_1.inspect.custom].call(this);
    }
    /**
     * Request the members of a guild.
     * @param guildID The ID of the guild to request the members of.
     * @param options The options for requesting the members.
     */
    async requestGuildMembers(guildID, options) {
        const opts = {
            guild_id: guildID,
            limit: options?.limit ?? 0,
            user_ids: options?.userIDs,
            query: options?.query,
            nonce: (0, node_crypto_1.randomBytes)(16).toString("hex"),
            presences: options?.presences ?? false
        };
        if (!opts.user_ids && !opts.query) {
            opts.query = "";
        }
        if (!opts.query && !opts.user_ids) {
            if (!(this.client.shards.options.intents & Constants_js_1.Intents.GUILD_MEMBERS)) {
                throw new Error("Cannot request all members without the GUILD_MEMBERS intent.");
            }
            const guild = this.client.guilds.get(guildID);
            if (guild) {
                guild["updateMemberLimit"](true);
            }
        }
        if (opts.presences && (!(this.client.shards.options.intents & Constants_js_1.Intents.GUILD_PRESENCES))) {
            throw new Error("Cannot request presences without the GUILD_PRESENCES intent.");
        }
        if (opts.user_ids && opts.user_ids.length > 100) {
            throw new Error("Cannot request more than 100 users at once.");
        }
        this.send(Constants_js_1.GatewayOPCodes.REQUEST_GUILD_MEMBERS, opts);
        return new Promise((resolve, reject) => this.#requestMembersPromise[opts.nonce] = {
            members: [],
            received: 0,
            timeout: setTimeout(() => {
                resolve(this.#requestMembersPromise[opts.nonce].members);
                delete this.#requestMembersPromise[opts.nonce];
            }, options?.timeout ?? this.client.rest.options.requestTimeout),
            resolve,
            reject
        });
    }
    reset() {
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
        this.#getAllUsersCount = {};
        this.#getAllUsersQueue = [];
        this.latency = Infinity;
        this.lastHeartbeatAck = true;
        this.lastHeartbeatReceived = 0;
        this.lastHeartbeatSent = 0;
        this.status = "disconnected";
        if (this.#connectTimeout) {
            clearTimeout(this.#connectTimeout);
        }
        this.#connectTimeout = null;
    }
    resume() {
        this.status = "resuming";
        this.send(Constants_js_1.GatewayOPCodes.RESUME, {
            token: this._token,
            session_id: this.sessionID,
            seq: this.sequence
        });
    }
    send(op, data, priority = false) {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            let i = 0, waitFor = 1;
            const func = () => {
                if (++i >= waitFor && this.ws && this.ws.readyState === ws_1.default.OPEN) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const d = JSON.stringify({ op, d: data });
                    this.ws.send(d);
                    if (typeof data === "object" && data && "token" in data) {
                        data.token = "[REMOVED]";
                    }
                    this.client.emit("debug", JSON.stringify({ op, d: data }), this.id);
                }
            };
            if (op === Constants_js_1.GatewayOPCodes.PRESENCE_UPDATE) {
                ++waitFor;
                this.presenceUpdateBucket.queue(func, priority);
            }
            this.globalBucket.queue(func, priority);
        }
    }
    toString() {
        return Base_js_1.default.prototype.toString.call(this);
    }
}
exports.default = Shard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvZ2F0ZXdheS9TaGFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQkFBb0I7QUFDcEIsZ0ZBQTZDO0FBRTdDLHNGQUFtRDtBQUNuRCwwRUFBdUM7QUFDdkMsa0RBTXlCO0FBU3pCLDRFQUF5QztBQUV6QyxzR0FBbUU7QUFHbkUsNEZBQXlEO0FBR3pELDZDQUFxQztBQUdyQyxvREFBMEM7QUFDMUMsNkRBQTZEO0FBQzdELGFBQWE7QUFDYiw2Q0FBMEM7QUFDMUMseUNBQW9DO0FBQ3BDLHNFQUFpQztBQUVqQyxzSEFBc0g7QUFDdEgsTUFBcUIsS0FBTSxTQUFRLHlCQUF5QjtJQUN4RCxNQUFNLENBQVU7SUFDaEIsZUFBZSxDQUFTO0lBQ3hCLGVBQWUsQ0FBd0I7SUFDdkMsVUFBVSxDQUFVO0lBQ3BCLGlCQUFpQixDQUF1QjtJQUN4QyxpQkFBaUIsQ0FBZ0I7SUFDakMsWUFBWSxDQUFVO0lBQ3RCLG1CQUFtQixDQUF3QjtJQUMzQyxrQkFBa0IsQ0FBd0I7SUFDMUMsRUFBRSxDQUFTO0lBQ1gsZ0JBQWdCLENBQVU7SUFDMUIscUJBQXFCLENBQVM7SUFDOUIsaUJBQWlCLENBQVM7SUFDMUIsT0FBTyxDQUFTO0lBQ2hCLFFBQVEsQ0FBVTtJQUNsQixRQUFRLENBQW1DO0lBQzNDLG9CQUFvQixDQUFVO0lBQzlCLEtBQUssQ0FBVTtJQUNmLGlCQUFpQixDQUFTO0lBQzFCLHNCQUFzQixDQUF3SjtJQUM5SyxTQUFTLENBQWdCO0lBQ3pCLFFBQVEsQ0FBUztJQUNqQixTQUFTLENBQWdCO0lBQ3pCLE1BQU0sQ0FBYztJQUNwQixFQUFFLENBQW9CO0lBQ3RCLFlBQVksRUFBVSxFQUFFLE1BQWM7UUFDbEMsS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO1lBQzFCLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQVMsTUFBTTtn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