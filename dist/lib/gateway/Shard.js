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
const Message_js_1 = tslib_1.__importDefault(require("../structures/Message.js"));
const Interaction_js_1 = tslib_1.__importDefault(require("../structures/Interaction.js"));
const Util_js_1 = require("../util/Util.js");
const Role_js_1 = tslib_1.__importDefault(require("../structures/Role.js"));
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
            case "APPLICATION_COMMAND_PERMISSIONS_UPDATE": {
                this.client.emit("applicationCommandPermissionsUpdate", this.client.guilds.get(packet.d.guild_id) ?? { id: packet.d.guild_id }, {
                    application: packet.d.application_id === this.client.application.id ? this.client.application : undefined,
                    applicationID: packet.d.application_id,
                    id: packet.d.id,
                    permissions: packet.d.permissions
                });
                break;
            }
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
            case "CHANNEL_PINS_UPDATE": {
                const channel = this.client.getChannel(packet.d.channel_id);
                this.client.emit("channelPinsUpdate", channel ?? { id: packet.d.channel_id }, packet.d.last_pin_timestamp === undefined || packet.d.last_pin_timestamp === null ? null : new Date(packet.d.last_pin_timestamp));
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
            case "GUILD_ROLE_CREATE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const role = guild?.roles.update(packet.d.role, packet.d.guild_id) ?? new Role_js_1.default(packet.d.role, this.client, packet.d.guild_id);
                this.client.emit("guildRoleCreate", role);
                break;
            }
            case "GUILD_ROLE_DELETE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const role = guild?.roles.get(packet.d.role_id);
                guild?.roles.delete(packet.d.role_id);
                this.client.emit("guildRoleDelete", role ?? { id: packet.d.role_id }, guild ?? { id: packet.d.guild_id });
                break;
            }
            case "GUILD_ROLE_UPDATE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const oldRole = guild?.roles.get(packet.d.role.id)?.toJSON() ?? null;
                const role = guild?.roles.update(packet.d.role, packet.d.guild_id) ?? new Role_js_1.default(packet.d.role, this.client, packet.d.guild_id);
                this.client.emit("guildRoleUpdate", role, oldRole);
                break;
            }
            case "GUILD_UPDATE": {
                const guild = this.client.guilds.get(packet.d.id);
                const oldGuild = guild?.toJSON() ?? null;
                this.client.emit("guildUpdate", this.client.guilds.update(packet.d), oldGuild);
                break;
            }
            case "INTERACTION_CREATE": {
                this.client.emit("interactionCreate", Interaction_js_1.default.from(packet.d, this.client));
                break;
            }
            case "MESSAGE_CREATE": {
                const channel = this.client.getChannel(packet.d.channel_id);
                const message = channel?.messages?.update(packet.d) ?? new Message_js_1.default(packet.d, this.client);
                if (channel) {
                    channel.lastMessage = message;
                    channel.lastMessageID = message.id;
                }
                this.client.emit("messageCreate", message);
                break;
            }
            case "MESSAGE_DELETE": {
                const channel = this.client.getChannel(packet.d.channel_id);
                const message = channel?.messages?.get(packet.d.id);
                if (channel) {
                    channel.messages?.delete(packet.d.id);
                    if (channel.lastMessageID === packet.d.id) {
                        channel.lastMessageID = null;
                        channel.lastMessage = null;
                    }
                }
                this.client.emit("messageDelete", message ?? {
                    channel: channel ?? { id: packet.d.channel_id },
                    channelID: packet.d.channel_id,
                    guild: packet.d.guild_id ? this.client.guilds.get(packet.d.guild_id) : undefined,
                    guildID: packet.d.guild_id, id: packet.d.id
                });
                break;
            }
            case "MESSAGE_DELETE_BULK": {
                const channel = this.client.getChannel(packet.d.channel_id);
                const guild = packet.d.guild_id ? this.client.guilds.get(packet.d.guild_id) : undefined;
                this.client.emit("messageDeleteBulk", packet.d.ids.map(id => {
                    const message = channel?.messages?.get(id);
                    channel?.messages?.delete(id);
                    return message ?? {
                        channel: channel ?? { id: packet.d.channel_id },
                        channelID: packet.d.channel_id,
                        guild,
                        guildID: packet.d.guild_id,
                        id
                    };
                }));
                break;
            }
            case "MESSAGE_UPDATE": {
                const channel = this.client.getChannel(packet.d.channel_id);
                const oldMessage = channel?.messages?.get(packet.d.id)?.toJSON() ?? null;
                if (!oldMessage && !packet.d.author) {
                    this.client.emit("debug", `Got partial MESSAGE_UPDATE for uncached message ${packet.d.id} for channel ${packet.d.channel_id}, discarding..`);
                    break;
                }
                const message = channel?.messages?.update(packet.d) ?? new Message_js_1.default(packet.d, this.client);
                this.client.emit("messageUpdate", message, oldMessage);
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
            case "THREAD_CREATE": {
                const thread = this.client.util.updateThread(packet.d);
                const channel = this.client.getChannel(packet.d.parent_id);
                if (channel?.type === Constants_js_1.ChannelTypes.GUILD_FORUM) {
                    channel.lastThread = thread;
                    channel.lastThreadID = thread.id;
                }
                this.client.emit("threadCreate", thread);
                break;
            }
            case "THREAD_DELETE": {
                const channel = this.client.getChannel(packet.d.parent_id);
                const thread = this.client.getChannel(packet.d.id) ?? {
                    id: packet.d.id,
                    guild: this.client.guilds.get(packet.d.guild_id),
                    guildID: packet.d.guild_id,
                    parent: channel,
                    parentID: packet.d.parent_id,
                    type: packet.d.type
                };
                if (channel) {
                    channel.threads?.delete(packet.d.id);
                    if (channel.type === Constants_js_1.ChannelTypes.GUILD_FORUM && channel.lastThreadID === packet.d.id) {
                        channel.lastThread = null;
                        channel.lastThreadID = null;
                    }
                }
                this.client.emit("threadDelete", thread);
                break;
            }
            case "THREAD_LIST_SYNC": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                if (!guild) {
                    this.client.emit("debug", `Missing guild in THREAD_LIST_SYNC: ${packet.d.guild_id}`);
                    break;
                }
                for (const threadData of packet.d.threads) {
                    this.client.util.updateThread(threadData);
                }
                for (const member of packet.d.members) {
                    const thread = this.client.getChannel(member.id);
                    if (thread) {
                        const threadMember = {
                            id: member.id,
                            flags: member.flags,
                            joinTimestamp: new Date(member.join_timestamp),
                            userID: member.user_id
                        };
                        const index = thread.members.findIndex(m => m.userID === member.user_id);
                        if (index === -1) {
                            thread.members.push(threadMember);
                        }
                        else {
                            thread.members[index] = threadMember;
                        }
                    }
                }
                break;
            }
            case "THREAD_MEMBER_UPDATE": {
                const thread = this.client.getChannel(packet.d.id);
                const guild = this.client.guilds.get(packet.d.guild_id);
                const threadMember = {
                    id: packet.d.id,
                    flags: packet.d.flags,
                    joinTimestamp: new Date(packet.d.join_timestamp),
                    userID: packet.d.user_id
                };
                let oldThreadMember = null;
                if (thread) {
                    const index = thread.members.findIndex(m => m.userID === packet.d.user_id);
                    if (index === -1) {
                        thread.members.push(threadMember);
                    }
                    else {
                        oldThreadMember = { ...thread.members[index] };
                        thread.members[index] = threadMember;
                    }
                }
                this.client.emit("threadMemberUpdate", thread ?? {
                    id: packet.d.id,
                    guild,
                    guildID: packet.d.guild_id
                }, threadMember, oldThreadMember);
                break;
            }
            case "THREAD_MEMBERS_UPDATE": {
                const thread = this.client.getChannel(packet.d.id);
                const guild = this.client.guilds.get(packet.d.guild_id);
                const addedMembers = (packet.d.added_members ?? []).map(rawMember => ({
                    flags: rawMember.flags,
                    id: rawMember.id,
                    joinTimestamp: new Date(rawMember.join_timestamp),
                    userID: rawMember.user_id
                }));
                const removedMembers = (packet.d.removed_member_ids ?? []).map(id => ({ userID: id, id: packet.d.id }));
                if (thread) {
                    thread.memberCount = packet.d.member_count;
                    for (const rawMember of addedMembers) {
                        const index = thread.members.findIndex(m => m.userID === rawMember.id);
                        if (index === -1) {
                            thread.members.push(rawMember);
                        }
                        else {
                            thread.members[index] = rawMember;
                        }
                    }
                    for (const [index, { userID }] of removedMembers.entries()) {
                        const memberIndex = thread.members.findIndex(m => m.userID === userID);
                        if (memberIndex >= 0) {
                            removedMembers[index] = thread.members[memberIndex];
                            thread.members.splice(memberIndex, 1);
                        }
                    }
                }
                this.client.emit("threadMembersUpdate", thread ?? {
                    id: packet.d.id,
                    guild,
                    guildID: packet.d.guild_id
                }, addedMembers, removedMembers);
                break;
            }
            case "THREAD_UPDATE": {
                const oldThread = this.client.getChannel(packet.d.id)?.toJSON() ?? null;
                const thread = this.client.util.updateThread(packet.d);
                this.client.emit("threadUpdate", thread, oldThread);
                break;
            }
            case "USER_UPDATE": {
                const oldUser = this.client.users.get(packet.d.id)?.toJSON() ?? null;
                this.client.emit("userUpdate", this.client.users.update(packet.d), oldUser);
                break;
            }
            case "WEBHOOKS_UPDATE": {
                this.client.emit("webhooksUpdate", this.client.guilds.get(packet.d.guild_id) ?? { id: packet.d.guild_id }, this.client.getChannel(packet.d.channel_id) ?? { id: packet.d.channel_id });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvZ2F0ZXdheS9TaGFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQkFBb0I7QUFDcEIsZ0ZBQTZDO0FBRTdDLHNGQUFtRDtBQUNuRCwwRUFBdUM7QUFDdkMsa0RBTXlCO0FBU3pCLDRFQUF5QztBQUV6QyxzR0FBbUU7QUFHbkUsNEZBQXlEO0FBY3pELGtGQUErQztBQUMvQywwRkFBdUQ7QUFDdkQsNkNBQXFDO0FBR3JDLDRFQUF5QztBQUN6QyxvREFBMEM7QUFDMUMsNkRBQTZEO0FBQzdELGFBQWE7QUFDYiw2Q0FBMEM7QUFDMUMseUNBQW9DO0FBQ3BDLHNFQUFpQztBQUVqQyxzSEFBc0g7QUFDdEgsTUFBcUIsS0FBTSxTQUFRLHlCQUF5QjtJQUN4RCxNQUFNLENBQVU7SUFDaEIsZUFBZSxDQUFTO0lBQ3hCLGVBQWUsQ0FBd0I7SUFDdkMsVUFBVSxDQUFVO0lBQ3BCLGlCQUFpQixDQUF1QjtJQUN4QyxpQkFBaUIsQ0FBZ0I7SUFDakMsWUFBWSxDQUFVO0lBQ3RCLG1CQUFtQixDQUF3QjtJQUMzQyxrQkFBa0IsQ0FBd0I7SUFDMUMsRUFBRSxDQUFTO0lBQ1gsZ0JBQWdCLENBQVU7SUFDMUIscUJBQXFCLENBQVM7SUFDOUIsaUJBQWlCLENBQVM7SUFDMUIsT0FBTyxDQUFTO0lBQ2hCLFFBQVEsQ0FBVTtJQUNsQixRQUFRLENBQW1DO0lBQzNDLG9CQUFvQixDQUFVO0lBQzlCLEtBQUssQ0FBVTtJQUNmLGlCQUFpQixDQUFTO0lBQzFCLHNCQUFzQixDQUF3SjtJQUM5SyxTQUFTLENBQWdCO0lBQ3pCLFFBQVEsQ0FBUztJQUNqQixTQUFTLENBQWdCO0lBQ3pCLE1BQU0sQ0FBYztJQUNwQixFQUFFLENBQW9CO0lBQ3RCLFlBQVksRUFBVSxFQUFFLE1BQWM7UUFDbEMsS0FBSyxFQUFFLENBQUM7UUFDUixNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFF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