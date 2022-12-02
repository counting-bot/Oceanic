/** @module CommandInteraction */
import Interaction from "./Interaction.js";
import Member from "./Member.js";
import Message from "./Message.js";
import User from "./User.js";
import type Guild from "./Guild.js";
import Permission from "./Permission.js";
import type PrivateChannel from "./PrivateChannel.js";
import type { InteractionTypes } from "../Constants.js";
import type { ApplicationCommandInteractionData, InteractionContent, ModalData, RawApplicationCommandInteraction } from "../types/interactions.js";
import type Client from "../Client.js";
import type { AnyGuildTextChannel, AnyTextChannelWithoutGroup } from "../types/channels.js";
import type { JSONCommandInteraction } from "../types/json.js";
import type { Uncached } from "../types/shared.js";
/** Represents a command interaction. */
export default class CommandInteraction<T extends AnyTextChannelWithoutGroup | Uncached = AnyTextChannelWithoutGroup | Uncached> extends Interaction {
    private _cachedChannel;
    private _cachedGuild?;
    /** The permissions the bot has in the channel this interaction was sent from, if this interaction is sent from a guild. */
    appPermissions: T extends AnyGuildTextChannel ? Permission : Permission | undefined;
    /** The ID of the channel this interaction was sent from. */
    channelID: string;
    /** The data associated with the interaction. */
    data: ApplicationCommandInteractionData;
    /** The id of the guild this interaction was sent from, if applicable. */
    guildID: T extends AnyGuildTextChannel ? string : string | null;
    /** The preferred [locale](https://discord.com/developers/docs/reference#locales) of the guild this interaction was sent from, if applicable. */
    guildLocale: T extends AnyGuildTextChannel ? string : string | undefined;
    /** The [locale](https://discord.com/developers/docs/reference#locales) of the invoking user. */
    locale: string;
    /** The member associated with the invoking user, if this interaction is sent from a guild. */
    member: T extends AnyGuildTextChannel ? Member : Member | undefined;
    /** The permissions of the member associated with the invoking user, if this interaction is sent from a guild. */
    memberPermissions: T extends AnyGuildTextChannel ? Permission : Permission | undefined;
    type: InteractionTypes.APPLICATION_COMMAND;
    /** The user that invoked this interaction. */
    user: User;
    constructor(data: RawApplicationCommandInteraction, client: Client);
    /** The channel this interaction was sent from. */
    get channel(): T extends AnyTextChannelWithoutGroup ? T : undefined;
    /** The guild this interaction was sent from, if applicable. This will throw an error if the guild is not cached. */
    get guild(): T extends AnyGuildTextChannel ? Guild : Guild | null;
    /**
     * Create a followup message.
     * @param options The options for creating the followup message.
     */
    createFollowup(options: InteractionContent): Promise<Message<T>>;
    /**
     * Create a message through this interaction. This is an initial response, and more than one initial response cannot be used. Use `createFollowup`.
     * @param options The options for the message.
     */
    createMessage(options: InteractionContent): Promise<void>;
    /**
     * Respond to this interaction with a modal. This is an initial response, and more than one initial response cannot be used.
     * @param options The options for the modal.
     */
    createModal(options: ModalData): Promise<void>;
    /**
     * Defer this interaction. This is an initial response, and more than one initial response cannot be used.
     * @param flags The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to respond with.
     */
    defer(flags?: number): Promise<void>;
    /**
     * Delete a follow-up message.
     * @param messageID The ID of the message.
     */
    deleteFollowup(messageID: string): Promise<void>;
    /**
     * Delete the original interaction response.
     */
    deleteOriginal(): Promise<void>;
    /**
     * Edit a followup message.
     * @param messageID The ID of the message.
     * @param options The options for editing the followup message.
     */
    editFollowup(messageID: string, options: InteractionContent): Promise<Message<T>>;
    /**
     * Edit the original interaction response.
     * @param options The options for editing the original message.
     */
    editOriginal(options: InteractionContent): Promise<Message<T>>;
    /**
     * Get a followup message.
     * @param messageID The ID of the message.
     */
    getFollowup(messageID: string): Promise<Message<T>>;
    /**
     * Get the original interaction response.
     */
    getOriginal(): Promise<Message<T>>;
    /** Whether this interaction belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel(): this is CommandInteraction<AnyGuildTextChannel>;
    /** Whether this interaction belongs to a private channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inPrivateChannel(): this is CommandInteraction<PrivateChannel | Uncached>;
    toJSON(): JSONCommandInteraction;
}
