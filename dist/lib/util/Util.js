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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsdUlBQXVJO0FBQ3ZJLE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSTtJQUNyQixPQUFPLENBQVM7SUFFaEIsWUFBWSxNQUFjO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxPQUF5QjtRQUMzQyxNQUFNLE1BQU0sR0FBdUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFFakQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzNFO1FBRUQsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNoQztRQUVELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNoQztRQUVELElBQUksT0FBTyxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDOUIsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQW1DO1FBQzlDLE9BQU87WUFDSCxZQUFZLEVBQWMsTUFBTSxDQUFDLFlBQVk7WUFDN0MsWUFBWSxFQUFjLE1BQU0sQ0FBQyxhQUFhO1lBQzlDLE9BQU8sRUFBbUIsTUFBTSxDQUFDLE9BQU87WUFDeEMsV0FBVyxFQUFlLE1BQU0sQ0FBQyxXQUFXO1lBQzVDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyx5QkFBeUI7WUFDMUQsb0JBQW9CLEVBQU0sTUFBTSxDQUFDLHFCQUFxQjtZQUN0RCxVQUFVLEVBQWdCLE1BQU0sQ0FBQyxVQUFVO1lBQzNDLFNBQVMsRUFBaUIsTUFBTSxDQUFDLFNBQVM7WUFDMUMsVUFBVSxFQUFnQixNQUFNLENBQUMsVUFBVTtZQUMzQyxTQUFTLEVBQWlCLE1BQU0sQ0FBQyxTQUFTO1lBQzFDLElBQUksRUFBc0IsTUFBTSxDQUFDLElBQUk7WUFDckMsaUJBQWlCLEVBQVMsTUFBTSxDQUFDLGtCQUFrQjtZQUNuRCxhQUFhLEVBQWEsTUFBTSxDQUFDLGNBQWM7WUFDL0MsT0FBTyxFQUFtQixNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUUsUUFBUSxFQUFrQixNQUFNLENBQUMsUUFBUTtZQUN6QyxJQUFJLEVBQXNCLE1BQU0sQ0FBQyxJQUFJO1NBQ1gsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQWlDO1FBQ3pDLE1BQU0sR0FBRyxHQUFHLE1BQTBDLENBQUM7UUFDdkQsT0FBTztZQUNILFlBQVksRUFBZSxHQUFHLENBQUMsWUFBWTtZQUMzQyxhQUFhLEVBQWMsR0FBRyxDQUFDLFlBQVk7WUFDM0MsT0FBTyxFQUFvQixHQUFHLENBQUMsT0FBTztZQUN0QyxXQUFXLEVBQWdCLEdBQUcsQ0FBQyxXQUFXO1lBQzFDLHlCQUF5QixFQUFFLEdBQUcsQ0FBQyx3QkFBd0I7WUFDdkQsVUFBVSxFQUFpQixHQUFHLENBQUMsU0FBUztZQUN4QyxTQUFTLEVBQWtCLEdBQUcsQ0FBQyxRQUFRO1lBQ3ZDLFVBQVUsRUFBaUIsR0FBRyxDQUFDLFNBQVM7WUFDeEMsU0FBUyxFQUFrQixHQUFHLENBQUMsUUFBUTtZQUN2QyxJQUFJLEVBQXVCLEdBQUcsQ0FBQyxJQUFJO1lBQ25DLGtCQUFrQixFQUFTLEdBQUcsQ0FBQyxpQkFBaUI7WUFDaEQsT0FBTyxFQUFvQixHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBOEIsQ0FBQyxDQUFDO1lBQ2xHLFFBQVEsRUFBbUIsR0FBRyxDQUFDLFFBQVE7WUFDdkMsSUFBSSxFQUF1QixHQUFHLENBQUMsSUFBSTtTQUNQLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLEVBQUUsQ0FBSSxLQUFjO0lBQ2hDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==