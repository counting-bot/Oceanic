/** @module Util */
import type Client from "../Client";
import type { AllowedMentions, RawAllowedMentions } from "../types/channels.js";
import type { ApplicationCommandOptions, RawApplicationCommandOption } from "../types/application-commands.js";
/** A general set of utilities. These are intentionally poorly documented, as they serve almost no usefulness to outside developers. */
export default class Util {
    #private;
    constructor(client: Client);
    formatAllowedMentions(allowed?: AllowedMentions): RawAllowedMentions;
    optionToParsed(option: RawApplicationCommandOption): ApplicationCommandOptions;
    optionToRaw(option: ApplicationCommandOptions): RawApplicationCommandOption;
}
export declare function is<T>(input: unknown): input is T;
