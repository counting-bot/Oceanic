/** @module Types/Interactions */
import type { ExecuteWebhookOptions } from "./webhooks.js";
import type { AnyGuildTextChannel, ModalActionRow, RawMessage } from "./channels.js";
import type { InteractionMember } from "./guilds.js";
import type { RawUser } from "./users.js";
import type { Uncached } from "./shared.js";
import type { LocaleMap } from "./application-commands.js";
import type {
    ApplicationCommandOptionTypes,
    ApplicationCommandTypes,
    ComponentTypes,
    InteractionResponseTypes,
    InteractionTypes,
    SelectMenuTypes
} from "../Constants";
import type Message from "../structures/Message";
import type User from "../structures/User";
import type PingInteraction from "../structures/PingInteraction";
import type CommandInteraction from "../structures/CommandInteraction";
import type ComponentInteraction from "../structures/ComponentInteraction";
import type AutocompleteInteraction from "../structures/AutocompleteInteraction";
import type ModalSubmitInteraction from "../structures/ModalSubmitInteraction";
import type InteractionOptionsWrapper from "../util/InteractionOptionsWrapper";
import type PrivateChannel from "../structures/PrivateChannel";
import type SelectMenuValuesWrapper from "../util/SelectMenuValuesWrapper";

export type InteractionContent = Pick<ExecuteWebhookOptions, "tts" | "content" | "embeds" | "allowedMentions" | "flags" | "components" | "attachments" | "files">;

export type InteractionResponse = PingInteractionResponse | MessageInteractionResponse | DeferredInteractionResponse | AutocompleteInteractionResponse | ModalInteractionResponse;
export interface PingInteractionResponse {
    type: InteractionResponseTypes.PONG;
}

export interface MessageInteractionResponse {
    /** The [response data](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-messages). Convert any `snake_case` keys to `camelCase`. */
    data: InteractionContent;
    type: InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE | InteractionResponseTypes.UPDATE_MESSAGE;
}

export interface DeferredInteractionResponse {
    /** The response data. Only [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) can be sent. */
    data?: { flags?: number; };
    type: InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE | InteractionResponseTypes.DEFERRED_UPDATE_MESSAGE;
}

export interface AutocompleteInteractionResponse {
    /** The [response data](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-autocomplete). */
    data: { choices: Array<AutocompleteChoice>; };
    type: InteractionResponseTypes.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT;
}

export interface ModalInteractionResponse {
    /** The [response data](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-modal). Convert any `snake_case` keys to `camelCase`. */
    data: ModalData;
    type: InteractionResponseTypes.MODAL;
}


export interface ModalData {
    components: Array<ModalActionRow>;
    /** The custom ID of the modal. */
    customID: string;
    /** The title of the modal. */
    title: string;
}

export interface RawInteraction {
    app_permissions?: string;
    application_id: string;
    channel_id?: string;
    data?: RawInteractionData;
    guild_id?: string;
    guild_locale?: string;
    id: string;
    locale?: string;
    member?: InteractionMember;
    message?: RawMessage;
    token: string;
    type: InteractionTypes;
    user?: RawUser;
    version: 1;
}

export type AnyRawInteraction = RawPingInteraction | AnyRawGatewayInteraction;
export type AnyRawGatewayInteraction = RawApplicationCommandInteraction | RawMessageComponentInteraction | RawAutocompleteInteraction | RawModalSubmitInteraction;
export type RawPingInteraction = Pick<RawInteraction, "application_id" | "id" | "token" | "type" | "version">;
export type RawApplicationCommandInteraction = Omit<RawInteraction, "data" | "message"> & { data: RawApplicationCommandInteractionData; };
export type RawMessageComponentInteraction = Omit<RawInteraction, "data" | "message"> & { data: RawMessageComponentInteractionData; message: RawMessage; };
export type RawAutocompleteInteraction = Omit<RawInteraction, "data" | "message"> & { data: RawAutocompleteInteractionData; };

export type RawInteractionData = RawApplicationCommandInteractionData | RawMessageComponentInteractionData | RawAutocompleteInteractionData | RawModalSubmitInteractionData;
export type InteractionData = ApplicationCommandInteractionData | MessageComponentInteractionData | AutocompleteInteractionData | ModalSubmitInteractionData;
export interface RawApplicationCommandInteractionData {
    guild_id?: string;
    id: string;
    name: string;
    options?: Array<InteractionOptions>;
    resolved?: RawApplicationCommandInteractionResolvedData;
    target_id?: string;
    type: ApplicationCommandTypes;
}
export interface ApplicationCommandInteractionData {
    guildID?: string;
    id: string;
    name: string;
    options: InteractionOptionsWrapper;
    resolved: ApplicationCommandInteractionResolvedData;
    target?: User | Message;
    targetID?: string;
    type: ApplicationCommandTypes;
}
export type RawAutocompleteInteractionData = Omit<RawApplicationCommandInteractionData, "resolved" | "target_id">;
export type AutocompleteInteractionData = Omit<ApplicationCommandInteractionData, "resolved" | "targetID">;

export type MessageComponentInteractionData = MessageComponentButtonInteractionData | MessageComponentSelectMenuInteractionData;
export interface MessageComponentButtonInteractionData {
    componentType: ComponentTypes.BUTTON;
    customID: string;
}

export interface MessageComponentSelectMenuInteractionData {
    componentType: SelectMenuTypes;
    customID: string;
    resolved: MessageComponentInteractionResolvedData;
    values: SelectMenuValuesWrapper;
}

export type InteractionOptions = InteractionOptionsWithOptions | InteractionOptionsWithValue;
export type InteractionOptionsWithOptions = InteractionOptionsSubCommand | InteractionOptionsSubCommandGroup;
export type InteractionOptionsWithValue = InteractionOptionsString | InteractionOptionsInteger | InteractionOptionsBoolean | InteractionOptionsUser | InteractionOptionsChannel | InteractionOptionsRole | InteractionOptionsMentionable | InteractionOptionsNumber | InteractionOptionsAttachment;
export interface InteractionOptionsBase {
    focused?: boolean;
    name: string;
    type: ApplicationCommandOptionTypes;
}

export interface InteractionOptionsSubCommand extends InteractionOptionsBase {
    options?: Array<InteractionOptionsWithValue>;
    type: ApplicationCommandOptionTypes.SUB_COMMAND;
}

export interface InteractionOptionsSubCommandGroup extends InteractionOptionsBase {
    options?: Array<InteractionOptionsSubCommand | InteractionOptionsWithValue>;
    type: ApplicationCommandOptionTypes.SUB_COMMAND_GROUP;
}

export interface InteractionOptionsStringValue<T extends InteractionOptionsStringTypes = InteractionOptionsStringTypes> extends InteractionOptionsBase {
    type: T;
    value: string;
}

export interface InteractionOptionsNumberValue<T extends InteractionOptionsNumberTypes = InteractionOptionsNumberTypes> extends InteractionOptionsBase {
    type: T;
    value: number;
}

export interface InteractionOptionsBooleanValue<T extends InteractionOptionsBooleanTypes = InteractionOptionsBooleanTypes> extends InteractionOptionsBase {
    type: T;
    value: boolean;
}

type InteractionOptionsStringTypes = ApplicationCommandOptionTypes.STRING | ApplicationCommandOptionTypes.USER | ApplicationCommandOptionTypes.CHANNEL | ApplicationCommandOptionTypes.ROLE | ApplicationCommandOptionTypes.MENTIONABLE | ApplicationCommandOptionTypes.ATTACHMENT;
type InteractionOptionsNumberTypes = ApplicationCommandOptionTypes.NUMBER | ApplicationCommandOptionTypes.INTEGER;
type InteractionOptionsBooleanTypes = ApplicationCommandOptionTypes.BOOLEAN;

export type InteractionOptionsString = InteractionOptionsStringValue<ApplicationCommandOptionTypes.STRING>;
export type InteractionOptionsInteger = InteractionOptionsNumberValue<ApplicationCommandOptionTypes.INTEGER>;
export type InteractionOptionsBoolean = InteractionOptionsBooleanValue<ApplicationCommandOptionTypes.BOOLEAN>;
export type InteractionOptionsUser = InteractionOptionsStringValue<ApplicationCommandOptionTypes.USER>;
export type InteractionOptionsChannel = InteractionOptionsStringValue<ApplicationCommandOptionTypes.CHANNEL>;
export type InteractionOptionsRole = InteractionOptionsStringValue<ApplicationCommandOptionTypes.ROLE>;
export type InteractionOptionsMentionable = InteractionOptionsStringValue<ApplicationCommandOptionTypes.MENTIONABLE>;
export type InteractionOptionsNumber = InteractionOptionsNumberValue<ApplicationCommandOptionTypes.NUMBER>;
export type InteractionOptionsAttachment = InteractionOptionsStringValue<ApplicationCommandOptionTypes.ATTACHMENT>;

export type AnyInteraction = PingInteraction | AnyInteractionGateway;
export type AnyInteractionGateway = AutocompleteInteraction | CommandInteraction | ComponentInteraction | ModalSubmitInteraction;


export interface AutocompleteChoice {
    /** The name of the choice. */
    name: string;
    /** A dictionary of [locales](https://discord.com/developers/docs/reference#locales) to localized names. */
    nameLocalizations?: LocaleMap;
    /** The value of the choice. */
    value: string;
}


export type GuildAutocompleteInteraction = AutocompleteInteraction<AnyGuildTextChannel>;
export type PrivateAutocompleteInteraction = Omit<AutocompleteInteraction<PrivateChannel | Uncached>, | "appPermissions" | "guild" | "guildID" | "guildLocale" | "member" | "memberPermissions">;
export type AnyAutocompleteInteraction = GuildAutocompleteInteraction | PrivateAutocompleteInteraction;

export type GuildCommandInteraction = CommandInteraction<AnyGuildTextChannel>;
export type PrivateCommandInteraction = Omit<CommandInteraction<PrivateChannel | Uncached>, "appPermissions" | "guild" | "guildID" | "guildLocale" | "member" | "memberPermissions">;
export type AnyCommandInteraction = GuildCommandInteraction | PrivateCommandInteraction;

export type GuildComponentButtonInteraction = Omit<ComponentInteraction<ComponentTypes.BUTTON, AnyGuildTextChannel>, "data"> & { data: MessageComponentButtonInteractionData; };
export type GuildComponentSelectMenuInteraction = Omit<ComponentInteraction<SelectMenuTypes, AnyGuildTextChannel>, "data"> & { data: MessageComponentSelectMenuInteractionData; };
export type GuildComponentInteraction = GuildComponentButtonInteraction | GuildComponentSelectMenuInteraction;
export type PrivateComponentButtonInteraction = Omit<ComponentInteraction<ComponentTypes.BUTTON, PrivateChannel | Uncached>, "appPermissions" | "guild" | "guildID" | "guildLocale" | "member" | "memberPermissions" | "data"> & { data: MessageComponentButtonInteractionData; };
export type PrivateComponentSelectMenuInteraction = Omit<ComponentInteraction<SelectMenuTypes, PrivateChannel | Uncached>, "appPermissions" | "guild" | "guildID" | "guildLocale" | "member" | "memberPermissions" | "data"> & { data: MessageComponentSelectMenuInteractionData; };
export type PrivateComponentInteraction = PrivateComponentButtonInteraction | PrivateComponentSelectMenuInteraction;
export type AnyComponentInteraction = GuildComponentInteraction | PrivateComponentInteraction;

export type SubCommandArray = [subcommand: string] | [subcommandGroup: string, subcommand: string];
