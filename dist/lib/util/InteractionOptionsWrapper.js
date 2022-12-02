"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module InteractionOptionsWrapper */
const Constants_js_1 = require("../Constants.js");
/** A wrapper for interaction options. */
class InteractionOptionsWrapper {
    /** The raw options from Discord.  */
    raw;
    /** The resolved data for this options instance. */
    resolved;
    constructor(data, resolved) {
        this.raw = data;
        this.resolved = resolved;
    }
    _getFocusedOption(required = false) {
        let baseOptions;
        const sub = this.getSubCommand(false);
        if (sub?.length === 1) {
            baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
        }
        else if (sub?.length === 2) {
            baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP)?.options?.find(o2 => o2.name === sub[1] && o2.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
        }
        const opt = (baseOptions ?? this.raw).find(o => o.focused === true);
        if (!opt && required) {
            throw new Error("Missing required focused option");
        }
        else {
            return opt;
        }
    }
    _getOption(name, required = false, type) {
        let baseOptions;
        const sub = this.getSubCommand(false);
        if (sub?.length === 1) {
            baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
        }
        else if (sub?.length === 2) {
            baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP)?.options?.find(o2 => o2.name === sub[1] && o2.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
        }
        const opt = (baseOptions ?? this.raw).find(o => o.name === name && o.type === type);
        if (!opt && required) {
            throw new Error(`Missing required option: ${name}`);
        }
        else {
            return opt;
        }
    }
    getAttachment(name, required) {
        if (this.resolved === null) {
            throw new Error("Attempt to use getAttachment with null resolved. If this is on an autocomplete interaction, use getAttachmentOption instead.");
        }
        let val;
        if (!(val = this.getAttachmentOption(name, required)?.value)) {
            return undefined;
        }
        const a = this.resolved.attachments.get(val);
        if (!a && required) {
            throw new Error(`Attachment not present for required option: ${name}`);
        }
        return a;
    }
    getAttachmentOption(name, required) {
        return this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.ATTACHMENT);
    }
    getBoolean(name, required) {
        return this.getBooleanOption(name, required)?.value;
    }
    getBooleanOption(name, required) {
        return this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.BOOLEAN);
    }
    getChannel(name, required) {
        if (this.resolved === null) {
            throw new Error("Attempt to use getChannel with null resolved. If this is on an autocomplete interaction, use getChannelOption instead.");
        }
        let val;
        if (!(val = this.getChannelOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.channels.get(val);
        if (!ch && required) {
            throw new Error(`Channel not present for required option: ${name}`);
        }
        return ch;
    }
    getChannelOption(name, required) {
        return this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.CHANNEL);
    }
    getCompleteChannel(name, required) {
        const resolved = this.getChannel(name, required);
        if (!resolved) {
            return undefined; // required will be handled in getChannel
        }
        const channel = resolved.completeChannel ?? resolved.type === Constants_js_1.ChannelTypes.DM ? resolved : undefined;
        if (!channel && required) {
            throw new Error(`Failed to resolve complete channel for required option: ${name}`);
        }
        return channel;
    }
    getFocused(required) {
        return this._getFocusedOption(required);
    }
    getInteger(name, required) {
        return this.getIntegerOption(name, required)?.value;
    }
    getIntegerOption(name, required) {
        return this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.INTEGER);
    }
    getMember(name, required) {
        if (this.resolved === null) {
            throw new Error("Attempt to use getMember with null resolved. If this is on an autocomplete interaction, use getUserOption instead.");
        }
        let val;
        if (!(val = this.getUserOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.members.get(val);
        if (!ch && required) {
            throw new Error(`Member not present for required option: ${name}`);
        }
        return ch;
    }
    getMentionable(name, required) {
        if (this.resolved === null) {
            throw new Error("Attempt to use getMentionable with null resolved. If this is on an autocomplete interaction, use getAttachmentOption instead.");
        }
        let val;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        if (!(val = this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.MENTIONABLE)?.value)) {
            return undefined;
        }
        const ch = this.resolved.channels.get(val);
        const role = this.resolved.roles.get(val);
        const user = this.resolved.users.get(val);
        if ((!ch && !role && !user) && required) {
            throw new Error(`Value not present for required option: ${name}`);
        }
        return ch;
    }
    getMentionableOption(name, required) {
        return this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.MENTIONABLE);
    }
    getNumber(name, required) {
        return this.getNumberOption(name, required)?.value;
    }
    getNumberOption(name, required) {
        return this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.NUMBER);
    }
    getRole(name, required) {
        if (this.resolved === null) {
            throw new Error("Attempt to use getRole with null resolved. If this is on an autocomplete interaction, use getRoleOption instead.");
        }
        let val;
        if (!(val = this.getRoleOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.roles.get(val);
        if (!ch && required) {
            throw new Error(`Role not present for required option: ${name}`);
        }
        return ch;
    }
    getRoleOption(name, required) {
        return this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.ROLE);
    }
    getString(name, required) {
        return this.getStringOption(name, required)?.value;
    }
    getStringOption(name, required) {
        return this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.STRING);
    }
    getSubCommand(required) {
        const opt = this.raw.find(o => o.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND || o.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP);
        if (!opt?.options) {
            if (required) {
                throw new Error("Missing required option: SubCommand/SubCommandGroup.");
            }
            else {
                return undefined;
            }
        }
        else {
            // nested
            if (opt.options.length === 1 && opt.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP) {
                const sub = opt.options.find(o => o.type === Constants_js_1.ApplicationCommandOptionTypes.SUB_COMMAND);
                return !sub?.options ? [opt.name] : [opt.name, sub.name];
            }
            else {
                return [opt.name];
            }
        }
    }
    getUser(name, required) {
        if (this.resolved === null) {
            throw new Error("Attempt to use getUser with null resolved. If this is on an autocomplete interaction, use getUseOption instead.");
        }
        let val;
        if (!(val = this.getUserOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.users.get(val);
        if (!ch && required) {
            throw new Error(`User not present for required option: ${name}`);
        }
        return ch;
    }
    getUserOption(name, required) {
        return this._getOption(name, required, Constants_js_1.ApplicationCommandOptionTypes.USER);
    }
}
exports.default = InteractionOptionsWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25PcHRpb25zV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL0ludGVyYWN0aW9uT3B0aW9uc1dyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBd0M7QUFDeEMsa0RBQThFO0FBMEI5RSx5Q0FBeUM7QUFDekMsTUFBcUIseUJBQXlCO0lBQzFDLHFDQUFxQztJQUNyQyxHQUFHLENBQTRCO0lBQy9CLG1EQUFtRDtJQUNuRCxRQUFRLENBQW1EO0lBQzNELFlBQVksSUFBK0IsRUFBRSxRQUEwRDtRQUNuRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRU8saUJBQWlCLENBQThLLFFBQVEsR0FBRyxLQUFLO1FBQ25OLElBQUksV0FBMkQsQ0FBQztRQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLElBQUksR0FBRyxFQUFFLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkIsV0FBVyxHQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyw0Q0FBNkIsQ0FBQyxXQUFXLENBQThDLEVBQUUsT0FBTyxDQUFDO1NBQ3RLO2FBQU0sSUFBSSxHQUFHLEVBQUUsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMxQixXQUFXLEdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLDRDQUE2QixDQUFDLGlCQUFpQixD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