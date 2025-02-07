import type Client from "../Client.js";
import TypedEmitter from "../util/TypedEmitter.js";
import Bucket from "../rest/Bucket.js";
import { GatewayOPCodes } from "../Constants.js";
import type { UpdatePresenceOptions, SendStatuses, BotActivity, ShardStatus } from "../types/gateway.js";
import type { ShardEvents } from "../types/events.js";
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
    private initialize;
    private onDispatch;
    private onPacket;
    private onWSClose;
    private onWSError;
    private onWSMessage;
    private onWSOpen;
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
    reset(): void;
    resume(): void;
    send(op: GatewayOPCodes, data: unknown, priority?: boolean): void;
    toString(): string;
}
