/** @module AutocompleteInteraction */
import Interaction from "./Interaction.js";
import type Member from "./Member.js";
import type User from "./User.js";
import type Guild from "./Guild.js";
import Permission from "./Permission.js";
import type PrivateChannel from "./PrivateChannel.js";
import type { InteractionTypes } from "../Constants.js";
import type { AutocompleteChoice, AutocompleteInteractionData, RawAutocompleteInteraction } from "../types/interactions.js";
import type Client from "../Client.js";
import type { AnyGuildTextChannel, AnyTextChannelWithoutGroup } from "../types/channels.js";
import type { JSONAutocompleteInteraction } from "../types/json.js";
import type { Uncached } from "../types/shared.js";
/** Represents an autocomplete interaction. */
export default class AutocompleteInteraction<T extends AnyTextChannelWithoutGroup | Uncached = AnyTextChannelWithoutGroup | Uncached> extends Interaction {
    private _cachedChannel;
    private _cachedGuild?;
    /** The permissions the bot has in the channel this interaction was sent from, if this interaction is sent from a guild. */
    appPermissions: T extends AnyGuildTextChannel ? Permission : Permission | undefined;
    /** The ID of the channel this interaction was sent from. */
    channelID: string;
    /** The data associated with the interaction. */
    data: AutocompleteInteractionData;
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
    type: InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE;
    /** The user that invoked this interaction. */
    user: User;
    constructor(data: RawAutocompleteInteraction, client: Client);
    /** The channel this interaction was sent from. */
    get channel(): T extends AnyTextChannelWithoutGroup ? T : undefined;
    /** The guild this interaction was sent from, if applicable. This will throw an error if the guild is not cached. */
    get guild(): T extends AnyGuildTextChannel ? Guild : Guild | null;
    /** Whether this interaction belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel(): this is AutocompleteInteraction<AnyGuildTextChannel>;
    /** Whether this interaction belongs to a private channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inPrivateChannel(): this is AutocompleteInteraction<PrivateChannel | Uncached>;
    /**
     * Acknowledge this interaction with a set of choices. This is an initial response, and more than one initial response cannot be used.
     * @param choices The choices to send.
     */
    result(choices: Array<AutocompleteChoice>): Promise<void>;
    toJSON(): JSONAutocompleteInteraction;
}
