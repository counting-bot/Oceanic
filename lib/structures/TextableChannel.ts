/** @module TextableChannel */
import GuildChannel from "./GuildChannel.js";
import type AnnouncementChannel from "./AnnouncementChannel";
import type TextChannel from "./TextChannel";
import PermissionOverwrite from "./PermissionOverwrite";
import Message from "./Message";
import type Member from "./Member";
import Permission from "./Permission";
import { AllPermissions, Permissions } from "../Constants";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type { RawMessage, RawAnnouncementChannel, RawOverwrite, RawTextChannel } from "../types/channels.js";
import type { JSONTextableChannel } from "../types/json.js";

/** Represents a guild textable channel. */
export default class TextableChannel<T extends TextChannel | AnnouncementChannel = TextChannel | AnnouncementChannel> extends GuildChannel {
    /** The last message sent in this channel. This will only be present if a message has been sent within the current session. */
    lastMessage?: Message<T> | null;
    /** The ID of last message sent in this channel. */
    lastMessageID: string | null;
    /** The cached messages in this channel. */
    messages: TypedCollection<string, RawMessage, Message<T>>;
    /** The permission overwrites of this channel. */
    permissionOverwrites: TypedCollection<string, RawOverwrite, PermissionOverwrite>;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser: number;
    declare type: T["type"];
    constructor(data: RawTextChannel | RawAnnouncementChannel, client: Client) {
        super(data, client);
        this.lastMessageID = data.last_message_id;
        this.messages = new TypedCollection(Message<T>, client, client.options.collectionLimits.messages);
        this.permissionOverwrites = new TypedCollection(PermissionOverwrite, client);
        this.rateLimitPerUser = data.rate_limit_per_user;
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
            lastMessageID:              this.lastMessageID,
            messages:                   this.messages.map(message => message.id),
            permissionOverwrites:       this.permissionOverwrites.map(overwrite => overwrite.toJSON()),
            rateLimitPerUser:           this.rateLimitPerUser,
            type:                       this.type
        };
    }
}
