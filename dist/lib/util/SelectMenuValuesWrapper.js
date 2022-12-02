"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module SelectMenuValuesWrapper */
const Constants_js_1 = require("../Constants.js");
/** A wrapper for select menu data. */
class SelectMenuValuesWrapper {
    /** The raw received values. */
    raw;
    /** The resolved data for this instance. */
    resolved;
    constructor(resolved, values) {
        this.resolved = resolved;
        this.raw = values;
    }
    /**
     * Get the selected channels.
     *
     * If `ensurePresent` is false, channels that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a channel.
     */
    getChannels(ensurePresent) {
        return this.raw.map(id => {
            const ch = this.resolved.channels.get(id);
            if (!ch && ensurePresent) {
                throw new Error(`Failed to find channel in resolved data: ${id}`);
            }
            return ch;
        }).filter(Boolean);
    }
    /**
     * Get the complete version of the selected channels. This will only succeed if the channel is cached. If the channel is private and isn't cached, an `InteractionResolvedChannel` instance will still be returned.
     *
     * If `ensurePresent` is false, channels that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a member.
     */
    getCompleteChannels(ensurePresent) {
        return this.raw.map(id => {
            const ch = this.resolved.channels.get(id);
            if (ch && ch.type === Constants_js_1.ChannelTypes.DM) {
                return ch?.completeChannel ?? ch;
            }
            if (!ch && ensurePresent) {
                throw new Error(`Failed to find channel in resolved data: ${id}`);
            }
            return ch;
        }).filter(Boolean);
    }
    /**
     * Get the selected members.
     *
     * If `ensurePresent` is false, members that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a member.
     */
    getMembers(ensurePresent) {
        return this.raw.map(id => {
            const member = this.resolved.members.get(id);
            if (!member && ensurePresent) {
                throw new Error(`Failed to find member in resolved data: ${id}`);
            }
            return member;
        }).filter(Boolean);
    }
    /**
     * Get the selected mentionables. (channels, users, roles)
     *
     * If `ensurePresent` is false, mentionables that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a channel, user, or role.
     */
    getMentionables(ensurePresent) {
        const res = [];
        for (const id of this.raw) {
            const ch = this.resolved.channels.get(id);
            const role = this.resolved.roles.get(id);
            const user = this.resolved.users.get(id);
            if ((!ch && !role && !user)) {
                if (ensurePresent) {
                    throw new Error(`Failed to find mentionable in resolved data: ${id}`);
                }
            }
            else {
                res.push((ch ?? role ?? user));
            }
        }
        return res;
    }
    /**
     * Get the selected roles.
     *
     * If `ensurePresent` is false, roles that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a role.
     */
    getRoles(ensurePresent) {
        return this.raw.map(id => {
            const role = this.resolved.roles.get(id);
            if (!role && ensurePresent) {
                throw new Error(`Failed to find role in resolved data: ${id}`);
            }
            return role;
        }).filter(Boolean);
    }
    /**
     * Get the selected string values. This cannot fail.
     */
    getStrings() {
        return this.raw;
    }
    /**
     * Get the selected users.
     *
     * If `ensurePresent` is false, users that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a user.
     */
    getUsers(ensurePresent) {
        return this.raw.map(id => {
            const user = this.resolved.users.get(id);
            if (!user && ensurePresent) {
                throw new Error(`Failed to find user in resolved data: ${id}`);
            }
            return user;
        }).filter(Boolean);
    }
}
exports.default = SelectMenuValuesWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0TWVudVZhbHVlc1dyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvdXRpbC9TZWxlY3RNZW51VmFsdWVzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzQztBQUN0QyxrREFBK0M7QUFTL0Msc0NBQXNDO0FBQ3RDLE1BQXFCLHVCQUF1QjtJQUN4QywrQkFBK0I7SUFDL0IsR0FBRyxDQUFnQjtJQUNuQiwyQ0FBMkM7SUFDM0MsUUFBUSxDQUEwQztJQUNsRCxZQUFZLFFBQWlELEVBQUUsTUFBcUI7UUFDaEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBSyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsV0FBVyxDQUFDLGFBQXVCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxFQUFFLElBQUksYUFBYSxFQUFFO2dCQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3JFO1lBQ0QsT0FBTyxFQUFHLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUJBQW1CLENBQUMsYUFBdUI7UUFDdkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNyQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUMsSUFBSSxFQUFF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