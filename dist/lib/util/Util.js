/** A general set of utilities. These are intentionally poorly documented, as they serve almost no usefulness to outside developers. */
export default class Util {
    #client;
    constructor(client) {
        this.#client = client;
    }
    formatAllowedMentions(allowed) {
        const result = { parse: [] };
        if (!allowed) {
            return this.formatAllowedMentions(this.#client.options.allowedMentions);
        }
        if (allowed.everyone === true) {
            result.parse.push("everyone");
        }
        if (allowed.roles === true) {
            result.parse.push("roles");
        }
        else if (Array.isArray(allowed.roles)) {
            result.roles = allowed.roles;
        }
        if (allowed.users === true) {
            result.parse.push("users");
        }
        else if (Array.isArray(allowed.users)) {
            result.users = allowed.users;
        }
        if (allowed.repliedUser === true) {
            result.replied_user = true;
        }
        return result;
    }
    optionToParsed(option) {
        return {
            autocomplete: option.autocomplete,
            channelTypes: option.channel_types,
            choices: option.choices,
            description: option.description,
            descriptionLocalizations: option.description_localizations,
            descriptionLocalized: option.description_localized,
            max_length: option.max_length,
            max_value: option.max_value,
            min_length: option.min_length,
            min_value: option.min_value,
            name: option.name,
            nameLocalizations: option.name_localizations,
            nameLocalized: option.name_localized,
            options: option.options?.map(o => this.optionToParsed(o)),
            required: option.required,
            type: option.type
        };
    }
    optionToRaw(option) {
        const opt = option;
        return {
            autocomplete: opt.autocomplete,
            channel_types: opt.channelTypes,
            choices: opt.choices,
            description: opt.description,
            description_localizations: opt.descriptionLocalizations,
            max_length: opt.maxLength,
            max_value: opt.maxValue,
            min_length: opt.minLength,
            min_value: opt.minValue,
            name: opt.name,
            name_localizations: opt.nameLocalizations,
            options: opt.options?.map(o => this.optionToRaw(o)),
            required: opt.required,
            type: opt.type
        };
    }
}
export function is(input) {
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsdUlBQXVJO0FBQ3ZJLE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSTtJQUNyQixPQUFPLENBQVM7SUFFaEIsWUFBWSxNQUFjO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxPQUF5QjtRQUMzQyxNQUFNLE1BQU0sR0FBdUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFFakQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ1gsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVELElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLENBQUM7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDdEMsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsQ0FBQzthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENB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