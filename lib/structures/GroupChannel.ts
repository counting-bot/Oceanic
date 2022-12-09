/** @module GroupChannel */
import Channel from "./Channel.js";
import User from "./User.js";
import type ClientApplication from "./ClientApplication.js";
import type { ChannelTypes } from "../Constants.js";
import type Client from "../Client.js";
import type { RawGroupChannel } from "../types/channels.js";
import type { RawUser } from "../types/users.js";
import TypedCollection from "../util/TypedCollection.js";
import type { JSONGroupChannel } from "../types/json.js";

/** Represents a group direct message. */
export default class GroupChannel extends Channel {
    /** The application that made this group channel. */
    application?: ClientApplication;
    /** The ID of the application that made this group channel. */
    applicationID: string;
    /** The icon hash of this group, if any. */
    icon: string | null;
    /** The ID of last message sent in this channel. */
    lastMessageID: string | null;
    /** If this group channel is managed by an application. */
    managed: boolean;
    /** The name of this group channel. */
    name: string | null;
    /** The nicknames used when creating this group channel. */
    nicks: Array<Record<"id" | "nick", string>>;
    /** The owner of this group channel. */
    owner?: User;
    /** The ID of the owner of this group channel. */
    ownerID: string;
    /** The other recipients in this group channel. */
    recipients: TypedCollection<string, RawUser, User>;
    declare type: ChannelTypes.GROUP_DM;
    constructor(data: RawGroupChannel, client: Client) {
        super(data, client);
        this.applicationID = data.application_id;
        this.icon = null;
        this.lastMessageID = data.last_message_id;
        this.managed = false;
        this.name = data.name;
        this.nicks = [];
        this.owner = this.client.users.get(data.owner_id);
        this.ownerID = data.owner_id;
        this.recipients = new TypedCollection(User, client);
        for (const r of data.recipients) this.recipients.add(client.users.update(r));
        this.update(data);
    }

    protected override update(data: Partial<RawGroupChannel>): void {
        super.update(data);
    }

    override toJSON(): JSONGroupChannel {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            icon:          this.icon,
            managed:       this.managed,
            name:          this.name,
            nicks:         this.nicks,
            ownerID:       this.ownerID,
            recipients:    this.recipients.map(user => user.toJSON()),
            type:          this.type
        };
    }
}
