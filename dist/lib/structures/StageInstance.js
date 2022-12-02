"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module StageInstance */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
/** Represents a stage instance. */
class StageInstance extends Base_js_1.default {
    _cachedChannel;
    _cachedGuild;
    /** The ID of the associated stage channel. */
    channelID;
    /** @deprecated If the stage channel is discoverable */
    discoverableDisabled;
    /** The id of the guild associated with this stage instance's stage channel. */
    guildID;
    /** The [privacy level](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level) of this stage instance. */
    privacyLevel;
    /** The topic of this stage instance. */
    topic;
    constructor(data, client) {
        super(data.id, client);
        this.channelID = data.channel_id;
        this.discoverableDisabled = !!data.discoverable_disabled;
        this.guildID = data.guild_id;
        this.privacyLevel = data.privacy_level;
        this.topic = data.topic;
        this.update(data);
    }
    update(data) {
        if (data.channel_id !== undefined) {
            this.channelID = data.channel_id;
        }
        if (data.discoverable_disabled !== undefined) {
            this.discoverableDisabled = data.discoverable_disabled;
        }
        if (data.privacy_level !== undefined) {
            this.privacyLevel = data.privacy_level;
        }
        if (data.topic !== undefined) {
            this.topic = data.topic;
        }
    }
    /** The associated stage channel. */
    get channel() {
        return this._cachedChannel ?? (this._cachedChannel = this.client.getChannel(this.channelID));
    }
    /** The guild of the associated stage channel. This will throw an error if the guild is not cached. */
    get guild() {
        if (!this._cachedGuild) {
            this._cachedGuild = this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
            }
        }
        return this._cachedGuild;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            channelID: this.channelID,
            discoverableDisabled: this.discoverableDisabled,
            guildID: this.guildID,
            privacyLevel: this.privacyLevel,
            topic: this.topic
        };
    }
}
exports.default = StageInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhZ2VJbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1N0YWdlSW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQTRCO0FBQzVCLGdFQUE2QjtBQVE3QixtQ0FBbUM7QUFDbkMsTUFBcUIsYUFBYyxTQUFRLGlCQUFJO0lBQ25DLGNBQWMsQ0FBZ0I7SUFDOUIsWUFBWSxDQUFTO0lBQzdCLDhDQUE4QztJQUM5QyxTQUFTLENBQVM7SUFDbEIsdURBQXVEO0lBQ3ZELG9CQUFvQixDQUFVO0lBQzlCLCtFQUErRTtJQUMvRSxPQUFPLENBQVM7SUFDaEIsb0pBQW9KO0lBQ3BKLFlBQVksQ0FBNkI7SUFDekMsd0NBQXdDO0lBQ3hDLEtBQUssQ0FBUztJQUNkLFlBQVksSUFBc0IsRUFBRSxNQUFjO1FBQzlDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQStCO1FBQ3JELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLEtBQUssU0FBUyxFQUFFO1lBQzFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7U0FDMUQ7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMxQztRQUNELElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELG9DQUFvQztJQUNwQyxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQy9HLENBQUM7SUFFRCxzR0FBc0c7SUFDdEcsSUFBSSxLQUFLO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXpELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDREQUE0RCxDQUFDLENBQUM7YUFDekc7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsU0FBUyxFQUFhLElBQUksQ0FBQyxTQUFTO1lBQ3BDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7WUFDL0MsT0FBTyxFQUFlLElBQUksQ0FBQyxPQUFPO1lBQ2xDLFlBQVksRUFBVSxJQUFJLENBQUMsWUFBWTtZQUN2QyxLQUFLLEVBQWlCLElBQUksQ0FBQyxLQUFLO1NBQ25DLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFsRUQsZ0NBa0VDIn0=