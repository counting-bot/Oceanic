/** @module PublicThreadChannel */
import ThreadChannel from "./ThreadChannel";
import type { ChannelTypes } from "../Constants";
import type Client from "../Client";
import type { EditPublicThreadChannelOptions, RawPublicThreadChannel, ThreadMetadata } from "../types/channels";
import type { JSONPublicThreadChannel } from "../types/json";
/** Represents a public thread channel. */
export default class PublicThreadChannel extends ThreadChannel<PublicThreadChannel> {
    /** the IDs of the set of tags that have been applied to this thread. Forum channel threads only.  */
    appliedTags: Array<string>;
    threadMetadata: ThreadMetadata;
    type: ChannelTypes.PUBLIC_THREAD;
    constructor(data: RawPublicThreadChannel, client: Client);
    protected update(data: Partial<RawPublicThreadChannel>): void;
    /**
     * Edit this channel.
     * @param options The options to edit the channel with.
     */
    edit(options: EditPublicThreadChannelOptions): Promise<this>;
    toJSON(): JSONPublicThreadChannel;
}
