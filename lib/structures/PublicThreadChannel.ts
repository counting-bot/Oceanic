/** @module PublicThreadChannel */
import ThreadChannel from "./ThreadChannel.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { RawPublicThreadChannel, ThreadMetadata } from "../types/channels.js";
import type { JSONPublicThreadChannel } from "../types/json.js";

/** Represents a public thread channel. */
export default class PublicThreadChannel extends ThreadChannel<PublicThreadChannel> {
    /** the IDs of the set of tags that have been applied to this thread. Forum channel threads only.  */
    appliedTags: Array<string>;
    declare threadMetadata: ThreadMetadata;
    declare type: ChannelTypes.PUBLIC_THREAD;
    constructor(data: RawPublicThreadChannel, client: Client) {
        super(data, client);
        this.appliedTags = [];
    }

    protected override update(data: Partial<RawPublicThreadChannel>): void {
        super.update(data);
        if (data.applied_tags !== undefined) {
            this.appliedTags = data.applied_tags;
        }
    }

    override toJSON(): JSONPublicThreadChannel {
        return {
            ...super.toJSON(),
            appliedTags:    this.appliedTags,
            threadMetadata: this.threadMetadata,
            type:           this.type
        };
    }
}
