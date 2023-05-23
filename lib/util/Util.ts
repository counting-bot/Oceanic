/** @module Util */
import type Client from "../Client";
import type { AllowedMentions, RawAllowedMentions } from "../types/channels.js";
import type { ApplicationCommandOptions, CombinedApplicationCommandOption, RawApplicationCommandOption } from "../types/application-commands.js";

/** A general set of utilities. These are intentionally poorly documented, as they serve almost no usefulness to outside developers. */
export default class Util {
    #client: Client;

    constructor(client: Client) {
        this.#client = client;
    }

    formatAllowedMentions(allowed?: AllowedMentions): RawAllowedMentions {
        const result: RawAllowedMentions = { parse: [] };

        if (!allowed) {
            return this.formatAllowedMentions(this.#client.options.allowedMentions);
        }

        if (allowed.everyone === true) {
            result.parse.push("everyone");
        }

        if (allowed.roles === true) {
            result.parse.push("roles");
        } else if (Array.isArray(allowed.roles)) {
            result.roles = allowed.roles;
        }

        if (allowed.users === true) {
            result.parse.push("users");
        } else if (Array.isArray(allowed.users)) {
            result.users = allowed.users;
        }

        if (allowed.repliedUser === true) {
            result.replied_user = true;
        }

        return result;
    }

    optionToParsed(option: RawApplicationCommandOption): ApplicationCommandOptions {
        return {
            autocomplete:             option.autocomplete,
            channelTypes:             option.channel_types,
            choices:                  option.choices,
            description:              option.description,
            descriptionLocalizations: option.description_localizations,
            descriptionLocalized:     option.description_localized,
            max_length:               option.max_length,
            max_value:                option.max_value,
            min_length:               option.min_length,
            min_value:                option.min_value,
            name:                     option.name,
            nameLocalizations:        option.name_localizations,
            nameLocalized:            option.name_localized,
            options:                  option.options?.map(o => this.optionToParsed(o)),
            required:                 option.required,
            type:                     option.type
        } as ApplicationCommandOptions;
    }

    optionToRaw(option: ApplicationCommandOptions): RawApplicationCommandOption {
        const opt = option as CombinedApplicationCommandOption;
        return {
            autocomplete:              opt.autocomplete,
            channel_types:             opt.channelTypes,
            choices:                   opt.choices,
            description:               opt.description,
            description_localizations: opt.descriptionLocalizations,
            max_length:                opt.maxLength,
            max_value:                 opt.maxValue,
            min_length:                opt.minLength,
            min_value:                 opt.minValue,
            name:                      opt.name,
            name_localizations:        opt.nameLocalizations,
            options:                   opt.options?.map(o => this.optionToRaw(o as ApplicationCommandOptions)),
            required:                  opt.required,
            type:                      opt.type
        } as RawApplicationCommandOption;
    }
}

export function is<T>(input: unknown): input is T {
    return true;
}
