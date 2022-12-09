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
    type: ChannelTypes.GROUP_DM;
    constructor(data: RawGroupChannel, client: Client);
    protected update(data: Partial<RawGroupChannel>): void;
    toJSON(): JSONGroupChannel;
}
