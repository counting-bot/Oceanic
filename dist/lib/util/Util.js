"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = void 0;
const tslib_1 = require("tslib");
/** @module Util */
const Routes_1 = require("./Routes");
const Constants_js_1 = require("../Constants.js");
const Member_js_1 = tslib_1.__importDefault(require("../structures/Member.js"));
const Channel_js_1 = tslib_1.__importDefault(require("../structures/Channel.js"));
/** A general set of utilities. These are intentionally poorly documented, as they serve almost no usefulness to outside developers. */
class Util {
    static BASE64URL_REGEX = /^data:image\/(?:jpeg|png|gif);base64,(?:[\d+/A-Za-z]{4})*(?:[\d+/A-Za-z]{2}(==)?|[\d+/A-Za-z]{3}=?)?$/;
    #client;
    constructor(client) {
        this.#client = client;
    }
    /** @hidden intentionally not documented - this is an internal function */
    _convertImage(image, name) {
        try {
            return this.convertImage(image);
        }
        catch (err) {
            throw new Error(`Invalid ${name} provided. Ensure you are providing a valid, fully-qualified base64 url.`, { cause: err });
        }
    }
    componentToParsed(component) {
        switch (component.type) {
            case Constants_js_1.ComponentTypes.BUTTON: {
                return (component.style === Constants_js_1.ButtonStyles.LINK ? component : {
                    customID: component.custom_id,
                    disabled: component.disabled,
                    emoji: component.emoji,
                    label: component.label,
                    style: component.style,
                    type: component.type
                });
            }
            case Constants_js_1.ComponentTypes.TEXT_INPUT: {
                return {
                    customID: component.custom_id,
                    label: component.label,
                    maxLength: component.max_length,
                    minLength: component.min_length,
                    placeholder: component.placeholder,
                    required: component.required,
                    style: component.style,
                    type: component.type,
                    value: component.value
                };
            }
            case Constants_js_1.ComponentTypes.STRING_SELECT:
            case Constants_js_1.ComponentTypes.USER_SELECT:
            case Constants_js_1.ComponentTypes.ROLE_SELECT:
            case Constants_js_1.ComponentTypes.MENTIONABLE_SELECT:
            case Constants_js_1.ComponentTypes.CHANNEL_SELECT: {
                const parsedComponent = {
                    customID: component.custom_id,
                    disabled: component.disabled,
                    maxValues: component.max_values,
                    minValues: component.min_values,
                    placeholder: component.placeholder,
                    type: component.type
                };
                if (component.type === Constants_js_1.ComponentTypes.STRING_SELECT) {
                    return { ...parsedComponent, options: component.options };
                }
                else if (component.type === Constants_js_1.ComponentTypes.CHANNEL_SELECT) {
                    return { ...parsedComponent, channelTypes: component.channel_types };
                }
                else {
                    return parsedComponent;
                }
            }
            default: {
                return component;
            }
        }
    }
    componentToRaw(component) {
        switch (component.type) {
            case Constants_js_1.ComponentTypes.BUTTON: {
                return (component.style === Constants_js_1.ButtonStyles.LINK ? component : {
                    custom_id: component.customID,
                    disabled: component.disabled,
                    emoji: component.emoji,
                    label: component.label,
                    style: component.style,
                    type: component.type
                });
            }
            case Constants_js_1.ComponentTypes.TEXT_INPUT: {
                return {
                    custom_id: component.customID,
                    label: component.label,
                    max_length: component.maxLength,
                    min_length: component.minLength,
                    placeholder: component.placeholder,
                    required: component.required,
                    style: component.style,
                    type: component.type,
                    value: component.value
                };
            }
            case Constants_js_1.ComponentTypes.STRING_SELECT:
            case Constants_js_1.ComponentTypes.USER_SELECT:
            case Constants_js_1.ComponentTypes.ROLE_SELECT:
            case Constants_js_1.ComponentTypes.MENTIONABLE_SELECT:
            case Constants_js_1.ComponentTypes.CHANNEL_SELECT: {
                const rawComponent = {
                    custom_id: component.customID,
                    disabled: component.disabled,
                    max_values: component.maxValues,
                    min_values: component.minValues,
                    placeholder: component.placeholder,
                    type: component.type
                };
                if (component.type === Constants_js_1.ComponentTypes.STRING_SELECT) {
                    return { ...rawComponent, options: component.options };
                }
                else if (component.type === Constants_js_1.ComponentTypes.CHANNEL_SELECT) {
                    return { ...rawComponent, channel_types: component.channelTypes };
                }
                else {
                    return rawComponent;
                }
            }
            default: {
                return component;
            }
        }
    }
    componentsToParsed(components) {
        return components.map(row => ({
            type: row.type,
            components: row.components.map(component => this.componentToParsed(component))
        }));
    }
    componentsToRaw(components) {
        return components.map(row => ({
            type: row.type,
            components: row.components.map(component => this.componentToRaw(component))
        }));
    }
    convertImage(img) {
        if (Buffer.isBuffer(img)) {
            const b64 = img.toString("base64");
            let mime;
            const magicMap = [
                // 47 49 46 38
                ["image/gif", /^47494638/],
                // 89 50 4E 47
                ["image/png", /^89504E47/],
                // FF D8 FF
                ["image/jpeg", /^FFD8FF/],
                // 52 49 46 46 ?? ?? ?? ?? 57 45 42 50
                ["image/webp", /^52494646\d{8}57454250/],
                // 02 27 62 20 22 0 - lottie JSON (assuming all files will start with {"v":")
                ["application/json", /^02276220220/]
            ];
            for (const format of magicMap) {
                if (format[1].test(this.getMagic(img, 16))) {
                    mime = format[0];
                    break;
                }
            }
            if (!mime) {
                throw new Error(`Failed to determine image format. (magic: ${this.getMagic(img, 16)})`);
            }
            img = `data:${mime};base64,${b64}`;
        }
        if (!Util.BASE64URL_REGEX.test(img)) {
            throw new Error("Invalid image provided. Ensure you are providing a valid, fully-qualified base64 url.");
        }
        return img;
    }
    convertSticker(raw) {
        return {
            asset: raw.asset,
            available: raw.available,
            description: raw.description,
            formatType: raw.format_type,
            guildID: raw.guild_id,
            id: raw.id,
            name: raw.name,
            packID: raw.pack_id,
            sortValue: raw.sort_value,
            tags: raw.tags,
            type: raw.type,
            user: raw.user ? this.#client.users.update(raw.user) : undefined
        };
    }
    embedsToParsed(embeds) {
        return embeds.map(embed => ({
            author: embed.author === undefined ? undefined : {
                name: embed.author.name,
                iconURL: embed.author.icon_url,
                proxyIconURL: embed.author.proxy_icon_url
            },
            color: embed.color,
            description: embed.description,
            fields: embed.fields?.map(field => ({
                inline: field.inline,
                name: field.name,
                value: field.value
            })),
            footer: embed.footer === undefined ? undefined : {
                text: embed.footer.text,
                iconURL: embed.footer.icon_url,
                proxyIconURL: embed.footer.proxy_icon_url
            },
            timestamp: embed.timestamp,
            title: embed.title,
            image: embed.image === undefined ? undefined : {
                url: embed.image.url,
                height: embed.image.height,
                proxyURL: embed.image.proxy_url,
                width: embed.image.width
            },
            provider: embed.provider === undefined ? undefined : {
                name: embed.provider.name,
                url: embed.provider.url
            },
            thumbnail: embed.thumbnail === undefined ? undefined : {
                url: embed.thumbnail.url,
                height: embed.thumbnail.height,
                proxyURL: embed.thumbnail.proxy_url,
                width: embed.thumbnail.width
            },
            url: embed.url,
            type: embed.type,
            video: embed.video === undefined ? undefined : {
                height: embed.video.height,
                proxyURL: embed.video.proxy_url,
                url: embed.video.url,
                width: embed.video.width
            }
        }));
    }
    embedsToRaw(embeds) {
        return embeds.map(embed => ({
            author: embed.author === undefined ? undefined : {
                name: embed.author.name,
                icon_url: embed.author.iconURL,
                url: embed.author.url
            },
            color: embed.color,
            description: embed.description,
            fields: embed.fields?.map(field => ({
                inline: field.inline,
                name: field.name,
                value: field.value
            })),
            footer: embed.footer === undefined ? undefined : {
                text: embed.footer.text,
                icon_url: embed.footer.iconURL
            },
            timestamp: embed.timestamp,
            title: embed.title,
            image: embed.image === undefined ? undefined : { url: embed.image.url },
            thumbnail: embed.thumbnail === undefined ? undefined : { url: embed.thumbnail.url },
            url: embed.url
        }));
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
    formatImage(url, format, size) {
        if (!format || !Constants_js_1.ImageFormats.includes(format.toLowerCase())) {
            format = url.includes("/a_") ? "gif" : this.#client.options.defaultImageFormat;
        }
        if (!size || size < Constants_js_1.MIN_IMAGE_SIZE || size > Constants_js_1.MAX_IMAGE_SIZE) {
            size = this.#client.options.defaultImageSize;
        }
        return `${Routes_1.CDN_URL}${url}.${format}?size=${size}`;
    }
    getMagic(file, len = 4) {
        return [...new Uint8Array(file.subarray(0, len))].map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
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
    updateChannel(channelData) {
        if (channelData.guild_id) {
            const guild = this.#client.guilds.get(channelData.guild_id);
            if (guild) {
                this.#client.channelGuildMap[channelData.id] = channelData.guild_id;
                const channel = guild.channels.has(channelData.id) ? guild.channels.update(channelData) : guild.channels.add(Channel_js_1.default.from(channelData, this.#client));
                return channel;
            }
        }
        return Channel_js_1.default.from(channelData, this.#client);
    }
    updateMember(guildID, memberID, member) {
        const guild = this.#client.guilds.get(guildID);
        if (guild && this.#client["_user"] && this.#client.user.id === memberID) {
            if (guild["_clientMember"]) {
                guild["_clientMember"]["update"](member);
            }
            else {
                guild["_clientMember"] = guild.members.update({ ...member, id: memberID }, guildID);
            }
            return guild["_clientMember"];
        }
        return guild ? guild.members.update({ ...member, id: memberID }, guildID) : new Member_js_1.default({ ...member, id: memberID }, this.#client, guildID);
    }
    updateThread(threadData) {
        const guild = this.#client.guilds.get(threadData.guild_id);
        if (guild) {
            this.#client.threadGuildMap[threadData.id] = threadData.guild_id;
            const thread = guild.threads.has(threadData.id) ? guild.threads.update(threadData) : guild.threads.add(Channel_js_1.default.from(threadData, this.#client));
            const channel = guild.channels.get(threadData.parent_id);
            if (channel && "threads" in channel) {
                channel.threads.update(thread);
            }
            return thread;
        }
        return Channel_js_1.default.from(threadData, this.#client);
    }
}
exports.default = Util;
function is(input) {
    return true;
}
exports.is = is;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG1CQUFtQjtBQUNuQixxQ0FBbUM7QUFFbkMsa0RBT3lCO0FBeUJ6QixnRkFBNkM7QUFDN0Msa0ZBQStDO0FBRS9DLHVJQUF1STtBQUN2SSxNQUFxQixJQUFJO0lBQ3JCLE1BQU0sQ0FBQyxlQUFlLEdBQUcsdUdBQXVHLENBQUM7SUFDakksT0FBTyxDQUFTO0lBRWhCLFlBQVksTUFBYztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQsMEVBQTBFO0lBQzFFLGFBQWEsQ0FBQyxLQUFzQixFQUFFLElBQVk7UUFDOUMsSUFBSTtZQUNBLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLElBQUksMEVBQTBFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLENBQUMsQ0FBQztTQUN2STtJQUNMLENBQUM7SUFFRCxpQkFBaUIsQ0FBeUIsU0FBWTtRQUNsRCxRQUFRLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDcEIsS0FBSyw2QkFBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSywyQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDeEQsUUFBUSxFQUFFLFNBQVMsQ0FBQyxTQUFTO29CQUM3QixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7b0JBQzVCLEtBQUssRUFBSyxTQUFTLENBQUMsS0FBSztvQkFDekIsS0FBSyxFQUFLLFNBQVMsQ0FBQyxLQUFLO29CQUN6QixLQUFLLEVBQUssU0FBUyxDQUFDLEtBQUs7b0JBQ3pCLElBQUks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