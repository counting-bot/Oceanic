/** @module Types/SessionStore */

/** The resumable state of a single gateway shard. */
export interface StoredSession {
    /** The resume gateway url Discord gave us (if any). */
    resumeURL: string | null;
    /** The last sequence number we processed. */
    sequence: number;
    /** The gateway session id. */
    sessionID: string;
}

/** A session being written to a {@link SessionStore | SessionStore}. */
export interface SessionStoreEntry extends StoredSession {
    /** The total shard count the session was created under. */
    maxShards: number;
    /** The shard this session belongs to. */
    shardID: number;
}

/**
 * Persistent storage for gateway sessions, letting a restarted process RESUME instead of IDENTIFY.
 * Oceanic ships no implementation; pass one via {@link Types/Gateway~GatewayOptions#sessionStore | GatewayOptions#sessionStore}.
 * If none is provided, sessions are not persisted and nothing is restored.
 *
 * All methods except `init` MUST be synchronous: `load` runs while shards are being spawned.
 */
export interface SessionStore {
    /** Release any resources (called by {@link ShardManager#closeSessions}). */
    close?(): void;
    /** Remove a shard's session. */
    delete(shardID: number): void;
    /** Prepare the store (open files, etc). Called once, before shards are spawned. */
    init?(): Promise<void> | void;
    /**
     * Load a resumable session, or `null`. Implementations should return `null` for sessions that are
     * too old, or whose `maxShards` differs from what is passed in.
     */
    load(shardID: number, maxShards: number): StoredSession | null;
    /** Upsert several sessions (should be atomic). Each call receives only entries that changed. */
    save(entries: Array<SessionStoreEntry>): void;
}
