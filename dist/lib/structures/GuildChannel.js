"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module GuildChannel */
const Channel_js_1 = tslib_1.__importDefault(require("./Channel.js"));
/** Represents a guild channel. */
class GuildChannel extends Channel_js_1.default {
    _cachedGuild;
    _cachedParent;
    /** The id of the guild this channel is in. */
    guildID;
    /** The name of this channel. */
    name;
    /** The ID of the parent of this channel, if applicable. */
    parentID;
    constructor(data, client) {
        super(data, client);
        this.guildID = data.guild_id;
        this.name = data.name;
        this.parentID = data.parent_id;
    }
    update(data) {
        super.update(data);
        if (data.guild_id !== undefined) {
            this.guildID = data.guild_id;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.parent_id !== undefined) {
            this.parentID = data.parent_id;
        }
    }
    /** The guild associated with this channel. This will throw an error if the guild is not cached. */
    get guild() {
        if (!this._cachedGuild) {
            this._cachedGuild = this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
            }
        }
        return this._cachedGuild;
    }
    /** The parent of this channel, if applicable. This will be a text/announcement/forum channel if we're in a thread, category otherwise. */
    get parent() {
        if (this.parentID !== null && this._cachedParent !== null) {
            return this._cachedParent ?? (this._cachedParent = this.client.getChannel(this.parentID));
        }
        return this._cachedParent === null ? this._cachedParent : (this._cachedParent = null);
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    async edit(options) {
        return this.client.rest.channels.edit(this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            guildID: this.guildID,
            name: this.name,
            parentID: this.parentID,
            type: this.type
        };
    }
}
exports.default = GuildChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvR3VpbGRDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixzRUFBbUM7QUFXbkMsa0NBQWtDO0FBQ2xDLE1BQXFCLFlBQWEsU0FBUSxvQkFBTztJQUNyQyxZQUFZLENBQVM7SUFDckIsYUFBYSxDQUE2RTtJQUNsRyw4Q0FBOEM7SUFDOUMsT0FBTyxDQUFTO0lBQ2hCLGdDQUFnQztJQUNoQyxJQUFJLENBQVM7SUFDYiwyREFBMkQ7SUFDM0QsUUFBUSxDQUFnQjtJQUV4QixZQUFZLElBQXFCLEVBQUUsTUFBYztRQUM3QyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ25DLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQThCO1FBQ3BELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDaEM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN6QjtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELG1HQUFtRztJQUNuRyxJQUFJLEtBQUs7UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFekQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksNERBQTRELENBQUMsQ0FBQzthQUN6RztTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCwwSUFBMEk7SUFDMUksSUFBSSxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRTtZQUN2RCxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFxRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNqSztRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFnQztRQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTyxFQUFHLElBQUksQ0FBQyxPQUFPO1lBQ3RCLElBQUksRUFBTSxJQUFJLENBQUMsSUFBSTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsSUFBSSxFQUFNLElBQUksQ0FBQyxJQUFJO1NBQ3RCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFyRUQsK0JBcUVDIn0=