/// <reference types="node" />
import type Client from "../Client";
import TypedEmitter from "../util/TypedEmitter";
import Bucket from "../rest/Bucket";
import { GatewayOPCodes } from "../Constants";
import type { UpdatePresenceOptions, RequestGuildMembersOptions, SendStatuses, BotActivity, ShardStatus } from "../types/gateway";
import type Member from "../structures/Member";
import type { ShardEvents } from "../types/events";
import WebSocket from "ws";
import { inspect } from "node:util";
/** Represents a gateway connection to Discord. See {@link Events~ShardEvents | Shard Events} for a list of events. */
export default class Shard extends TypedEmitter<ShardEvents> {
    #private;
    client: Client;
    connectAttempts: number;
    connecting: boolean;
    globalBucket: Bucket;
    id: number;
    lastHeartbeatAck: boolean;
    lastHeartbeatReceived: number;
    lastHeartbeatSent: number;
    latency: number;
    preReady: boolean;
    presence: Required<UpdatePresenceOptions>;
    presenceUpdateBucket: Bucket;
    ready: boolean;
    reconnectInterval: number;
    resumeURL: string | null;
    sequence: number;
    sessionID: string | null;
    status: ShardStatus;
    ws: WebSocket | null;
    constructor(id: number, client: Client);
    private checkReady;
    private createGuild;
    private initialize;
    private onDispatch;
    private onPacket;
    private onWSClose;
    private onWSError;
    private onWSMessage;
    private onWSOpen;
    private restartGuildCreateTimeout;
    private sendPresenceUpdate;
    private get _token();
    /** Connect this shard. */
    connect(): void;
    disconnect(reconnect?: boolean, error?: Error): void;
    /**
     * Edit this shard's status.
     * @param status The status.
     * @param activities An array of activities.
     */
    editStatus(status: SendStatuses, activities?: Array<BotActivity>): Promise<void>;
    hardReset(): void;
    heartbeat(requested?: boolean): void;
    identify(): void;
    [inspect.custom](): this;
    /**
     * Request the members of a guild.
     * @param guildID The ID of the guild to request the members of.
     * @param options The options for requesting the members.
     */
    requestGuildMembers(guildID: string, options?: RequestGuildMembersOptions): Promise<Array<Member>>;
    reset(): void;
    resume(): void;
    send(op: GatewayOPCodes, data: unknown, priority?: boolean): void;
    toString(): string;
}
