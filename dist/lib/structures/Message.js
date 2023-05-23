/** @module Message */
import Base from "./Base.js";
import PartialApplication from "./PartialApplication.js";
/** Represents a message. */
export default class Message extends Base {
    /** The [activity](https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure) associated with this message. */
    activity;
    /**
     * The application associated with this message. This can be present in two scenarios:
     * * If the message was from an interaction or application owned webhook ({@link ClientApplication} if any shard has reached READY, {@link PartialApplication} otherwise).
     * * If the message has a rich presence embed ({@link PartialApplication})
     */
    application;
    /**
     * The ID of the application associated with this message. This can be present in two scenarios:
     * * If the message was from an interaction or application owned webhook ({@link ClientApplication} if any shard has reached READY, {@link PartialApplication} otherwise).
     * * If the message has a rich presence embed ({@link PartialApplication})
     */
    applicationID;
    /** The ID of the channel this message was created in. */
    channelID;
    /** The content of this message. */
    content;
    /** The embeds on this message. */
    embeds;
    /** The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) on this message. */
    flags;
    /** The ID of the guild this message is in. */
    guildID;
    /** The interaction info, if this message was the result of an interaction. */
    interaction;
    /** Channels mentioned in a `CROSSPOSTED` channel follower message. See [Discord's docs](https://discord.com/developers/docs/resources/channel#channel-mention-object) for more information. */
    mentionChannels;
    /** If this message is a `REPLY` or `THREAD_STARTER_MESSAGE`, some info about the referenced message. */
    messageReference;
    /** A nonce for ensuring a message was sent. */
    nonce;
    /** This message's relative position, if in a thread. */
    position;
    /** The reactions on this message. */
    reactions;
    /** If this message is a `REPLY` or `THREAD_STARTER_MESSAGE`, this will be the message that's referenced. */
    referencedMessage;
    // stickers exists, but is deprecated
    /** The sticker items on this message. */
    stickerItems;
    /** The thread associated with this message, if any. */
    thread;
    /** The timestamp at which this message was sent. */
    timestamp;
    /** The [type](https://discord.com/developers/docs/resources/channel#message-object-message-types) of this message. */
    type;
    /** The webhook associated with this message, if sent via a webhook. This only has an `id` property. */
    webhookID;
    constructor(data, client) {
        super(data.id, client);
        this.channelID = data.channel_id;
        this.content = data.content;
        this.embeds = [];
        this.flags = 0;
        this.guildID = (data.guild_id === undefined ? null : data.guild_id);
        this.reactions = {};
        this.timestamp = new Date(data.timestamp);
        this.type = data.type;
        this.webhookID = data.webhook_id;
        this.update(data);
        if (data.application_id === undefined) {
            this.applicationID = null;
        }
        else {
            if (client["_application"] && client.application.id === data.application_id) {
                if (data.application) {
                    client.application["update"](data.application);
                }
                this.application = client.application;
            }
            else {
                this.application = data.application ? new PartialApplication(data.application, client) : undefined;
            }
            this.applicationID = data.application_id;
        }
    }
    update(data) {
        if (data.activity !== undefined) {
            this.activity = data.activity;
        }
        if (data.content !== undefined) {
            this.content = data.content;
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.message_reference) {
            this.messageReference = {
                channelID: data.message_reference.channel_id,
                failIfNotExists: data.message_reference.fail_if_not_exists,
                guildID: data.message_reference.guild_id,
                messageID: data.message_reference.message_id
            };
        }
        if (data.nonce !== undefined) {
            this.nonce = data.nonce;
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.sticker_items !== undefined) {
            this.stickerItems = data.sticker_items;
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            activity: this.activity,
            applicationID: this.applicationID ?? undefined,
            channelID: this.channelID,
            content: this.content,
            embeds: this.embeds,
            flags: this.flags,
            guildID: this.guildID ?? undefined,
            mentionChannels: this.mentionChannels,
            messageReference: this.messageReference,
            nonce: this.nonce,
            position: this.position,
            reactions: this.reactions,
            referencedMessage: this.referencedMessage?.toJSON(),
            stickerItems: this.stickerItems,
            thread: this.thread?.toJSON(),
            timestamp: this.timestamp.getTime(),
            type: this.type,
            webhook: this.webhookID
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0JBQXNCO0FBQ3RCLE9BQU8sSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUM3QixPQUFPLGtCQUFrQixNQUFNLHlCQUF5QixDQUFDO0FBb0J6RCw0QkFBNEI7QUFDNUIsTUFBTSxDQUFDLE9BQU8sT0FBTyxPQUFpRyxTQUFRLElBQUk7SUFDOUgsb0pBQW9KO0lBQ3BKLFFBQVEsQ0FBbUI7SUFDM0I7Ozs7T0FJRztJQUNILFdBQVcsQ0FBMEM7SUFDckQ7Ozs7T0FJRztJQUNILGFBQWEsQ0FBZ0I7SUFDN0IseURBQXlEO0lBQ3pELFNBQVMsQ0FBUztJQUNsQixtQ0FBbUM7SUFDbkMsT0FBTyxDQUFTO0lBQ2hCLGtDQUFrQztJQUNsQyxNQUFNLENBQWU7SUFDckIsdUhBQXVIO0lBQ3ZILEtBQUssQ0FBUztJQUNkLDhDQUE4QztJQUM5QyxPQUFPLENBQXlEO0lBQ2hFLDhFQUE4RTtJQUM5RSxXQUFXLENBQXNCO0lBQ2pDLCtMQUErTDtJQUMvTCxlQUFlLENBQXlCO0lBQ3hDLHdHQUF3RztJQUN4RyxnQkFBZ0IsQ0FBb0I7SUFDcEMsK0NBQStDO0lBQy9DLEtBQUssQ0FBbUI7SUFDeEIsd0RBQXdEO0lBQ3hELFFBQVEsQ0FBVTtJQUNsQixxQ0FBcUM7SUFDckMsU0FBUyxDQUFrQztJQUMzQyw0R0FBNEc7SUFDNUcsaUJBQWlCLENBQWtCO0lBQ25DLHFDQUFxQztJQUNyQyx5Q0FBeUM7SUFDekMsWUFBWSxDQUFzQjtJQUNsQyx1REFBdUQ7SUFDdkQsTUFBTSxDQUFvQjtJQUMxQixvREFBb0Q7SUFDcEQsU0FBUyxDQUFPO0lBQ2hCLHNIQUFzSDtJQUN0SCxJQUFJLENBQWU7SUFDbkIsdUdBQXVHO0lBQ3ZHLFNBQVMsQ0FBVTtJQUNuQixZQUFZLElBQWdCLEVBQUUsTUFBYztRQUN4QyxLQUFL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