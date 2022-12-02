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
const Invite_js_1 = tslib_1.__importDefault(require("../structures/Invite.js"));
const Message_js_1 = tslib_1.__importDefault(require("../structures/Message.js"));
const StageInstance_js_1 = tslib_1.__importDefault(require("../structures/StageInstance.js"));
const Interaction_js_1 = tslib_1.__importDefault(require("../structures/Interaction.js"));
const Util_js_1 = require("../util/Util.js");
const Guild_js_1 = tslib_1.__importDefault(require("../structures/Guild.js"));
const Role_js_1 = tslib_1.__importDefault(require("../structures/Role.js"));
const Integration_js_1 = tslib_1.__importDefault(require("../structures/Integration.js"));
const ws_1 = tslib_1.__importDefault(require("ws"));
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
    #sharedZLib;
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
                if (!packet.d.unavailable) {
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
                        this.client.unavailableGuilds.delete(guild.id);
                        void this.restartGuildCreateTimeout();
                    }
                }
                else {
                    this.client.guilds.delete(packet.d.id);
                    this.client.emit("unavailableGuildCreate", this.client.unavailableGuilds.update(packet.d));
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
            case "GUILD_EMOJIS_UPDATE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const oldEmojis = guild?.emojis ? [...guild.emojis] : null;
                // eslint-disable-next-line @typescript-eslint/dot-notation
                guild?.["update"]({ emojis: packet.d.emojis });
                this.client.emit("guildEmojisUpdate", guild ?? { id: packet.d.guild_id }, guild?.emojis ?? packet.d.emojis.map(emoji => ({
                    animated: emoji.animated,
                    available: emoji.available,
                    id: emoji.id,
                    managed: emoji.managed,
                    name: emoji.name,
                    requireColons: emoji.require_colons,
                    roles: emoji.roles,
                    user: emoji.user === undefined ? undefined : this.client.users.update(emoji.user)
                })), oldEmojis);
                break;
            }
            case "GUILD_INTEGRATIONS_UPDATE": {
                this.client.emit("guildIntegrationsUpdate", this.client.guilds.get(packet.d.guild_id) ?? { id: packet.d.guild_id });
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
                if (packet.d.presences)
                    for (const presence of packet.d.presences) {
                        const member = members.find(m => m.id === presence.user.id);
                        member.presence = {
                            clientStatus: presence.client_status,
                            guildID: presence.guild_id,
                            status: presence.status,
                            activities: presence.activities?.map(activity => ({
                                createdAt: activity.created_at,
                                name: activity.name,
                                type: activity.type,
                                applicationID: activity.application_id,
                                assets: activity.assets ? {
                                    largeImage: activity.assets.large_image,
                                    largeText: activity.assets.large_text,
                                    smallImage: activity.assets.small_image,
                                    smallText: activity.assets.small_text
                                } : undefined,
                                buttons: activity.buttons,
                                details: activity.details,
                                emoji: activity.emoji,
                                flags: activity.flags,
                                instance: activity.instance,
                                party: activity.party,
                                secrets: activity.secrets,
                                state: activity.state,
                                timestamps: activity.timestamps,
                                url: activity.url
                            }))
                        };
                    }
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
                const member = this.client.util.updateMember(packet.d.guild_id, packet.d.user.id, { deaf: oldMember?.deaf ?? false, mute: oldMember?.mute ?? false, ...packet.d });
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
            case "GUILD_STICKERS_UPDATE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const oldStickers = guild?.stickers ? [...guild.stickers] : null;
                // eslint-disable-next-line @typescript-eslint/dot-notation
                guild?.["update"]({ stickers: packet.d.stickers });
                this.client.emit("guildStickersUpdate", guild ?? { id: packet.d.guild_id }, guild?.stickers ?? packet.d.stickers.map(sticker => this.client.util.convertSticker(sticker)), oldStickers);
                break;
            }
            case "GUILD_UPDATE": {
                const guild = this.client.guilds.get(packet.d.id);
                const oldGuild = guild?.toJSON() ?? null;
                this.client.emit("guildUpdate", this.client.guilds.update(packet.d), oldGuild);
                break;
            }
            case "INTEGRATION_CREATE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const integration = guild?.integrations.update(packet.d, packet.d.guild_id) ?? new Integration_js_1.default(packet.d, this.client, packet.d.guild_id);
                this.client.emit("integrationCreate", guild ?? { id: packet.d.guild_id }, integration);
                break;
            }
            case "INTEGRATION_DELETE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const integration = guild?.integrations.get(packet.d.id);
                guild?.integrations.delete(packet.d.id);
                this.client.emit("integrationDelete", guild ?? { id: packet.d.guild_id }, integration ?? { applicationID: packet.d.application_id, id: packet.d.id });
                break;
            }
            case "INTEGRATION_UPDATE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const oldIntegration = guild?.integrations.get(packet.d.id)?.toJSON() ?? null;
                const integration = guild?.integrations.update(packet.d, packet.d.guild_id) ?? new Integration_js_1.default(packet.d, this.client, packet.d.guild_id);
                this.client.emit("integrationUpdate", guild ?? { id: packet.d.guild_id }, integration, oldIntegration);
                break;
            }
            case "INTERACTION_CREATE": {
                this.client.emit("interactionCreate", Interaction_js_1.default.from(packet.d, this.client));
                break;
            }
            case "INVITE_CREATE": {
                const invite = new Invite_js_1.default(packet.d, this.client);
                if (packet.d.guild_id) {
                    const guild = this.client.guilds.get(packet.d.guild_id);
                    guild?.invites.set(invite.code, invite);
                }
                this.client.emit("inviteCreate", new Invite_js_1.default(packet.d, this.client));
                break;
            }
            case "INVITE_DELETE": {
                const channel = this.client.getChannel(packet.d.channel_id) ?? { id: packet.d.channel_id };
                const guild = packet.d.guild_id ? this.client.guilds.get(packet.d.guild_id) ?? { id: packet.d.guild_id } : undefined;
                let invite = {
                    code: packet.d.code,
                    channel,
                    guild
                };
                if (guild instanceof Guild_js_1.default && guild.invites.has(packet.d.code)) {
                    invite = guild.invites.get(packet.d.code);
                    guild.invites.delete(packet.d.code);
                }
                this.client.emit("inviteDelete", invite);
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
            case "MESSAGE_REACTION_ADD": {
                const channel = this.client.getChannel(packet.d.channel_id);
                const message = channel?.messages?.get(packet.d.message_id);
                const reactor = packet.d.member
                    ? (packet.d.guild_id ? this.client.util.updateMember(packet.d.guild_id, packet.d.user_id, packet.d.member) : this.client.users.get(packet.d.user_id) ?? { id: packet.d.user_id })
                    : this.client.users.get(packet.d.user_id) ?? { id: packet.d.user_id };
                if (message) {
                    const name = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
                    if (message.reactions[name]) {
                        message.reactions[name].count++;
                        if (packet.d.user_id === this.client.user.id) {
                            message.reactions[name].me = true;
                        }
                    }
                    else {
                        message.reactions[name] = {
                            count: 1,
                            me: packet.d.user_id === this.client.user.id
                        };
                    }
                }
                this.client.emit("messageReactionAdd", message ?? {
                    channel: channel ?? { id: packet.d.channel_id },
                    channelID: packet.d.channel_id,
                    guild: packet.d.guild_id ? this.client.guilds.get(packet.d.guild_id) : undefined,
                    guildID: packet.d.guild_id,
                    id: packet.d.message_id
                }, reactor, packet.d.emoji);
                break;
            }
            case "MESSAGE_REACTION_REMOVE": {
                const channel = this.client.getChannel(packet.d.channel_id);
                const message = channel?.messages?.get(packet.d.message_id);
                const reactor = this.client.users.get(packet.d.user_id) ?? { id: packet.d.user_id };
                if (message) {
                    const name = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
                    if (message.reactions[name]) {
                        message.reactions[name].count--;
                        if (packet.d.user_id === this.client.user.id) {
                            message.reactions[name].me = false;
                        }
                        if (message.reactions[name].count === 0) {
                            delete message.reactions[name];
                        }
                    }
                }
                this.client.emit("messageReactionRemove", message ?? {
                    channel: channel ?? { id: packet.d.channel_id },
                    channelID: packet.d.channel_id,
                    guild: packet.d.guild_id ? this.client.guilds.get(packet.d.guild_id) : undefined,
                    guildID: packet.d.guild_id,
                    id: packet.d.message_id
                }, reactor, packet.d.emoji);
                break;
            }
            case "MESSAGE_REACTION_REMOVE_ALL": {
                const channel = this.client.getChannel(packet.d.channel_id);
                const message = channel?.messages?.get(packet.d.message_id);
                if (message) {
                    message.reactions = {};
                }
                this.client.emit("messageReactionRemoveAll", message ?? {
                    channel: channel ?? { id: packet.d.channel_id },
                    channelID: packet.d.channel_id,
                    guild: packet.d.guild_id ? this.client.guilds.get(packet.d.guild_id) : undefined,
                    guildID: packet.d.guild_id,
                    id: packet.d.message_id
                });
                break;
            }
            case "MESSAGE_REACTION_REMOVE_EMOJI": {
                const channel = this.client.getChannel(packet.d.channel_id);
                const message = channel?.messages?.get(packet.d.message_id);
                if (message) {
                    const name = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
                    if (message.reactions[name]) {
                        delete message.reactions[name];
                    }
                }
                this.client.emit("messageReactionRemoveEmoji", message ?? {
                    channel: channel ?? { id: packet.d.channel_id },
                    channelID: packet.d.channel_id,
                    guild: packet.d.guild_id ? this.client.guilds.get(packet.d.guild_id) : undefined,
                    guildID: packet.d.guild_id,
                    id: packet.d.message_id
                }, packet.d.emoji);
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
            case "PRESENCE_UPDATE": {
                const user = this.client.users.get(packet.d.user.id);
                if (user) {
                    const oldUser = user.toJSON();
                    user["update"](packet.d.user);
                    if (JSON.stringify(oldUser) !== JSON.stringify(user.toJSON())) {
                        this.client.emit("userUpdate", user, oldUser);
                    }
                }
                const guild = this.client.guilds.get(packet.d.guild_id);
                const member = guild?.members.get(packet.d.user.id);
                const oldPresence = member?.presence ?? null;
                const presence = {
                    clientStatus: packet.d.client_status,
                    guildID: packet.d.guild_id,
                    status: packet.d.status,
                    activities: packet.d.activities?.map(activity => ({
                        createdAt: activity.created_at,
                        name: activity.name,
                        type: activity.type,
                        applicationID: activity.application_id,
                        assets: activity.assets ? {
                            largeImage: activity.assets.large_image,
                            largeText: activity.assets.large_text,
                            smallImage: activity.assets.small_image,
                            smallText: activity.assets.small_text
                        } : undefined,
                        buttons: activity.buttons,
                        details: activity.details,
                        emoji: activity.emoji,
                        flags: activity.flags,
                        instance: activity.instance,
                        party: activity.party,
                        secrets: activity.secrets,
                        state: activity.state,
                        timestamps: activity.timestamps,
                        url: activity.url
                    }))
                };
                const userID = packet.d.user.id;
                delete packet.d.user;
                if (member) {
                    member.presence = presence;
                }
                this.client.emit("presenceUpdate", guild ?? { id: packet.d.guild_id }, member ?? { id: userID }, presence, oldPresence);
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
                if (!this.client["_user"]) {
                    this.client["_user"] = this.client.users.add(new ExtendedUser_js_1.default(packet.d.user, this.client));
                }
                else {
                    this.client.users.update(packet.d.user);
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
                this.emit("resume");
                break;
            }
            case "STAGE_INSTANCE_CREATE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const stateInstance = guild?.stageInstances.update(packet.d) ?? new StageInstance_js_1.default(packet.d, this.client);
                this.client.emit("stageInstanceCreate", stateInstance);
                break;
            }
            case "STAGE_INSTANCE_DELETE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const stateInstance = guild?.stageInstances.update(packet.d) ?? new StageInstance_js_1.default(packet.d, this.client);
                guild?.stageInstances.delete(packet.d.id);
                this.client.emit("stageInstanceDelete", stateInstance);
                break;
            }
            case "STAGE_INSTANCE_UPDATE": {
                const guild = this.client.guilds.get(packet.d.guild_id);
                const oldStageInstance = guild?.stageInstances.get(packet.d.id)?.toJSON() ?? null;
                const stateInstance = guild?.stageInstances.update(packet.d) ?? new StageInstance_js_1.default(packet.d, this.client);
                this.client.emit("stageInstanceUpdate", stateInstance, oldStageInstance);
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
            case "TYPING_START": {
                const channel = this.client.getChannel(packet.d.channel_id) ?? { id: packet.d.channel_id };
                const startTimestamp = new Date(packet.d.timestamp);
                if (packet.d.member) {
                    const member = this.client.util.updateMember(packet.d.guild_id, packet.d.user_id, packet.d.member);
                    this.client.emit("typingStart", channel, member, startTimestamp);
                    break;
                }
                const user = this.client.users.get(packet.d.user_id);
                this.client.emit("typingStart", channel, user ?? { id: packet.d.user_id }, startTimestamp);
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
                    if (this.ws.readyState !== ws_1.default.OPEN) {
                        this.ws.close(4999, "Reconnect");
                    }
                    else {
                        this.client.emit("debug", `Closing websocket (state: ${this.ws.readyState})`, this.id);
                        this.ws.terminate();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvZ2F0ZXdheS9TaGFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQkFBb0I7QUFDcEIsZ0ZBQTZDO0FBRTdDLHNGQUFtRDtBQUNuRCwwRUFBdUM7QUFDdkMsa0RBTXlCO0FBVXpCLDRFQUF5QztBQUV6QyxzR0FBbUU7QUFHbkUsNEZBQXlEO0FBZXpELGdGQUE2QztBQUM3QyxrRkFBK0M7QUFDL0MsOEZBQTJEO0FBRTNELDBGQUF1RDtBQUN2RCw2Q0FBcUM7QUFDckMsOEVBQTJDO0FBRzNDLDRFQUF5QztBQUN6QywwRkFBdUQ7QUFFdkQsb0RBQTJCO0FBSzNCLDZDQUEwQztBQUMxQyx5Q0FBb0M7QUFDcEMsc0VBQWlDO0FBRWpDLHNIQUFzSDtBQUN0SCxNQUFxQixLQUFNLFNBQVEseUJBQXlCO0lBQ3hELE1BQU0sQ0FBVTtJQUNoQixlQUFlLENBQVM7SUFDeEIsZUFBZSxDQUF3QjtJQUN2QyxVQUFVLENBQVU7SUFDcEIsaUJBQWlCLENBQXVCO0lBQ3hDLGlCQUFpQixDQUFnQjtJQUNqQyxZQUFZLENBQVU7SUFDdEIsbUJBQW1CLENBQXdCO0lBQzNDLGtCQUFrQixDQUF3QjtJQUMxQyxFQUFFLENBQVM7SUFDWCxnQkFBZ0IsQ0FBVTtJQUMxQixxQkFBcUIsQ0FBUztJQUM5QixpQkFBaUIsQ0FBUztJQUMxQixPQUFPLENBQVM7SUFDaEIsUUFBUSxDQUFVO0lBQ2xCLFFBQVEsQ0FBbUM7SUFDM0Msb0JBQW9CLENBQVU7SUFDOUIsS0FBSyxDQUFVO0lBQ2YsaUJBQWlCLENBQVM7SUFDMUIsc0JBQXNCLENBQXdKO0lBQzlLLFNBQVMsQ0FBZ0I7SUFDekIsUUFBUSxDQUFTO0lBQ2pCLFNBQVMsQ0FBZ0I7SUFDekIsV0FBVyxDQUEwQjtJQUNyQyxNQUFNLENBQWM7SUFDcEIsRUFBRSxDQUFvQjtJQUN0QixZQUFZLEVBQVUsRUFBRSxNQUFjO1FBQ2xDLEtBQUss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