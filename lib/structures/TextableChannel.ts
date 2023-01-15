/** @module TextableChannel */
import GuildChannel from "./GuildChannel.js";
import type AnnouncementChannel from "./AnnouncementChannel";
import type TextChannel from "./TextChannel";
import PermissionOverwrite from "./PermissionOverwrite";
import Message from "./Message";
import type CategoryChannel from "./CategoryChannel";
import type Member from "./Member";
import Permission from "./Permission";
import { AllPermissions, Permissions, type ThreadAutoArchiveDuration } from "../Constants";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type { RawMessage, RawAnnouncementChannel, RawOverwrite, RawTextChannel } from "../types/channels.js";
import type { JSONTextableChannel } from "../types/json.js";

/** Represents a guild textable channel. */
export default class TextableChannel<T extends TextChannel | AnnouncementChannel = TextChannel | AnnouncementChannel> extends GuildChannel {
    /** The default auto archive duration for threads created in this channel. */
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration;
    /** The last message sent in this channel. This will only be present if a message has been sent within the current session. */
    lastMessage?: Message<T> | null;
    /** The ID of last message sent in this channel. */
    lastMessageID: string | null;
    /** The cached messages in this channel. */
    messages: TypedCollection<string, RawMessage, Message<T>>;
    /** If this channel is age gated. */
    nsfw: boolean;
    /** The permission overwrites of this channel. */
    permissionOverwrites: TypedCollection<string, RawOverwrite, PermissionOverwrite>;
    /** The position of this channel on the sidebar. */
    position: number;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser: number;
    /** The topic of the channel. */
    topic: string | null;
    declare type: T["type"];
    constructor(data: RawTextChannel | RawAnnouncementChannel, client: Client) {
        super(data, client);
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
        this.lastMessageID = data.last_message_id;
        this.messages = new TypedCollection(Message<T>, client, client.options.collectionLimits.messages);
        this.nsfw = data.nsfw;
        this.permissionOverwrites = new TypedCollection(PermissionOverwrite, client);
        this.position = data.position;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.topic = data.topic;
        this.update(data);
    }

    protected override update(data: Partial<RawTextChannel> | Partial<RawAnnouncementChannel>): void {
        super.update(data);
        if (data.last_message_id !== undefined) {
            this.lastMessage = data.last_message_id === null ? null : this.messages.get(data.last_message_id);
            this.lastMessageID = data.last_message_id;
        }
        if (data.rate_limit_per_user !== undefined) {
            this.rateLimitPerUser = data.rate_limit_per_user;
        }
        if (data.permission_overwrites !== undefined) {
            data.permission_overwrites.map(overwrite => this.permissionOverwrites.update(overwrite));
        }
    }

    override get parent(): CategoryChannel | undefined | null {
        return super.parent as CategoryChannel | undefined | null;
    }

    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission {
        if (typeof member === "string") {
            member = this.guild.members.get(member)!;
        }
        if (!member) {
            throw new Error(`Cannot use ${this.constructor.name}#permissionsOf with an ID without having the member cached.`);
        }
        let permission = this.guild.permissionsOf(member).allow;
        if (permission & Permissions.ADMINISTRATOR) {
            return new Permission(AllPermissions);
        }
        let overwrite = this.permissionOverwrites.get(this.guildID);
        if (overwrite) {
            permission = (permission & ~overwrite.deny) | overwrite.allow;
        }
        let deny = 0n;
        let allow = 0n;
        for (const id of member.roles) {
            if ((overwrite = this.permissionOverwrites.get(id))) {
                deny |= overwrite.deny;
                allow |= overwrite.allow;
            }
        }

        permission = (permission & ~deny) | allow;
        overwrite = this.permissionOverwrites.get(member.id);
        if (overwrite) {
            permission = (permission & ~overwrite.deny) | overwrite.allow;
        }
        return new Permission(permission);
    }

    override toJSON(): JSONTextableChannel {
        return {
            ...super.toJSON(),
            defaultAutoArchiveDuration: this.defaultAutoArchiveDuration,
            lastMessageID:              this.lastMessageID,
            messages:                   this.messages.map(message => message.id),
            nsfw:                       this.nsfw,
            permissionOverwrites:       this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            position:                   this.position,
            rateLimitPerUser:           this.rateLimitPerUser,
            topic:                      this.topic,
            type:                       this.type
        };
    }
}
