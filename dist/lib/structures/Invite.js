"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Invite */
const Channel_js_1 = tslib_1.__importDefault(require("./Channel.js"));
const Guild_js_1 = tslib_1.__importDefault(require("./Guild.js"));
const PartialApplication_js_1 = tslib_1.__importDefault(require("./PartialApplication.js"));
/** Represents an invite. */
class Invite {
    _cachedChannel;
    /** The approximate number of total members in the guild this invite leads to. */
    approximateMemberCount;
    /** The approximate number of online members in the guild this invite leads to. */
    approximatePresenceCount;
    /** The ID of the channel this invite leads to. */
    channelID;
    client;
    /** The code of this invite. */
    code;
    /** When this invite was created. */
    createdAt;
    /** The date at which this invite expires. */
    expiresAt;
    /** The guild this invite leads to or `null` if this invite leads to a Group DM. */
    guild;
    /** The ID of the guild this invite leads to or `null` if this invite leads to a Group DM. */
    guildID;
    /** The user that created this invite. */
    inviter;
    /** The time after which this invite expires. */
    maxAge;
    /** The maximum number of times this invite can be used, */
    maxUses;
    /** @deprecated The stage instance in the invite this channel is for (deprecated). */
    stageInstance;
    /** The embedded application this invite will open. */
    targetApplication;
    /** The [target type](https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types) of this invite. */
    targetType;
    /** The user whose stream to display for this voice channel stream invite. */
    targetUser;
    /** If this invite only grants temporary membership. */
    temporary;
    /** The number of times this invite has been used. */
    uses;
    constructor(data, client) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false
        });
        this.channelID = (data.channel_id ?? data.channel?.id) ?? null;
        this.code = data.code;
        this.guild = null;
        this.guildID = data.guild?.id ?? null;
        this.expiresAt = (!data.expires_at ? undefined : new Date(data.expires_at));
        this.targetType = data.target_type;
        this.update(data);
    }
    update(data) {
        if (data.approximate_member_count !== undefined) {
            this.approximateMemberCount = data.approximate_member_count;
        }
        if (data.approximate_presence_count !== undefined) {
            this.approximatePresenceCount = data.approximate_presence_count;
        }
        let guild;
        if (data.guild) {
            guild = this.client.guilds.has(data.guild.id) ? this.client.guilds.update(data.guild) : new Guild_js_1.default(data.guild, this.client);
            this.guild = guild;
        }
        if (this.channelID !== null) {
            let channel;
            channel = this.client.getChannel(this.channelID);
            if (data.channel !== undefined) {
                if (channel && channel instanceof Channel_js_1.default) {
                    channel["update"](data.channel);
                }
                else {
                    channel = data.channel;
                }
            }
            this._cachedChannel = channel;
        }
        else {
            this._cachedChannel = null;
        }
        if (data.inviter !== undefined) {
            this.inviter = this.client.users.update(data.inviter);
        }
        if (data.stage_instance !== undefined) {
            this.stageInstance = {
                members: data.stage_instance.members.map(member => this.client.util.updateMember(guild.id, member.user.id, member)),
                participantCount: data.stage_instance.participant_count,
                speakerCount: data.stage_instance.speaker_count,
                topic: data.stage_instance.topic
            };
        }
        if (data.target_application !== undefined) {
            this.targetApplication = new PartialApplication_js_1.default(data.target_application, this.client);
        }
        if (data.target_user !== undefined) {
            this.targetUser = this.client.users.update(data.target_user);
        }
        if ("created_at" in data) {
            if (data.created_at !== undefined) {
                this.createdAt = new Date(data.created_at);
            }
            if (data.uses !== undefined) {
                this.uses = data.uses;
            }
            if (data.max_uses !== undefined) {
                this.maxUses = data.max_uses;
            }
            if (data.max_age !== undefined) {
                this.maxAge = data.max_age;
            }
            if (data.temporary !== undefined) {
                this.temporary = data.temporary;
            }
        }
    }
    /** The channel this invite leads to. If the channel is not cached, this will be a partial with only `id`, `name, and `type`. */
    get channel() {
        if (this.channelID !== null && this._cachedChannel !== null) {
            if (this._cachedChannel instanceof Channel_js_1.default) {
                return this._cachedChannel;
            }
            const cachedChannel = this.client.getChannel(this.channelID);
            return (cachedChannel ? (this._cachedChannel = cachedChannel) : this._cachedChannel);
        }
        return this._cachedChannel === null ? this._cachedChannel : (this._cachedChannel = null);
    }
    /**
     * Delete this invite.
     * @param reason The reason for deleting this invite.
     */
    async deleteInvite(reason) {
        return this.client.rest.channels.deleteInvite(this.code, reason);
    }
    /** Whether this invite belongs to a cached channel. The only difference on using this method over a simple if statement is to easily update all the invite properties typing definitions based on the channel it belongs to. */
    inCachedChannel() {
        return this.channel instanceof Channel_js_1.default;
    }
    toJSON() {
        return {
            approximateMemberCount: this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            channelID: this.channelID ?? undefined,
            code: this.code,
            createdAt: this.createdAt?.getTime(),
            expiresAt: this.expiresAt?.getTime(),
            guildID: this.guildID ?? undefined,
            inviter: this.inviter?.id,
            maxAge: this.maxAge,
            maxUses: this.maxUses,
            stageInstance: !this.stageInstance ? undefined : {
                members: this.stageInstance.members.map(member => member.id),
                participantCount: this.stageInstance.participantCount,
                speakerCount: this.stageInstance.speakerCount,
                topic: this.stageInstance.topic
            },
            targetApplication: this.targetApplication?.toJSON(),
            targetType: this.targetType,
            targetUser: this.targetUser?.id,
            temporary: this.temporary,
            uses: this.uses
        };
    }
}
exports.default = Invite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvSW52aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFCQUFxQjtBQUNyQixzRUFBbUM7QUFDbkMsa0VBQStCO0FBRS9CLDRGQUF5RDtBQWV6RCw0QkFBNEI7QUFDNUIsTUFBcUIsTUFBTTtJQUNmLGNBQWMsQ0FBaUU7SUFDdkYsaUZBQWlGO0lBQ2pGLHNCQUFzQixDQUFVO0lBQ2hDLGtGQUFrRjtJQUNsRix3QkFBd0IsQ0FBVTtJQUNsQyxrREFBa0Q7SUFDbEQsU0FBUyxDQUFnQjtJQUN6QixNQUFNLENBQVU7SUFDaEIsK0JBQStCO0lBQy9CLElBQUksQ0FBUztJQUNiLG9DQUFvQztJQUNwQyxTQUFTLENBQStDO0lBQ3hELDZDQUE2QztJQUM3QyxTQUFTLENBQWlFO0lBQzFFLG1GQUFtRjtJQUNuRixLQUFLLENBQWU7SUFDcEIsNkZBQTZGO0lBQzdGLE9BQU8sQ0FBZ0I7SUFDdkIseUNBQXlDO0lBQ3pDLE9BQU8sQ0FBUTtJQUNmLGdEQUFnRDtJQUNoRCxNQUFNLENBQTZDO0lBQ25ELDJEQUEyRDtJQUMzRCxPQUFPLENBQTZDO0lBQ3BELHFGQUFxRjtJQUNyRixhQUFhLENBQXVCO0lBQ3BDLHNEQUFzRDtJQUN0RCxpQkFBaUIsQ0FBc0I7SUFDdkMsZ0lBQWdJO0lBQ2hJLFVBQVUsQ0FBcUI7SUFDL0IsNkVBQTZFO0lBQzdFLFVBQVUsQ0FBUTtJQUNsQix1REFBdUQ7SUFDdkQsU0FBUyxDQUE4QztJQUN2RCxxREFBcUQ7SUFDckQsSUFBSSxDQUE2QztJQUNqRCxZQUFZLElBQXVDLEVBQUUsTUFBYztRQUMvRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxFQUFTLE1BQU07WUFDcEIsVUFBVSxFQUFJLEtBQUs7WUFDbkIsUUFBUSxFQUFNLEtBQUs7WUFDbkIsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDL0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFVLENBQUM7UUFDckYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVTLE1BQU0sQ0FBQyxJQUF5RDtRQUN0RSxJQUFJLElBQUksQ0FBQyx3QkFBd0IsS0FBSyxTQUFTLEVBQUU7WUFDN0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztTQUMvRDtRQUNELElBQUksSUFBSSxDQUFDLDBCQUEwQixLQUFLLFNBQVMsRUFBRTtZQUMvQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDO1NBQ25FO1FBRUQsSUFBSSxLQUF3QixDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksa0JBQUssQ0FBQyxJQUFJLENBQUMsS0FBaUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkosSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDdEI7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3pCLElBQUksT0FBbUQsQ0FBQztZQUN4RCxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoRSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUM1QixJQUFJLE9BQU8sSUFBSSxPQUFPLFlBQVksb0JBQU8sRUFBRTtvQkFDdkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkM7cUJBQU07b0JBQ0gsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUErQixDQUFDO2lCQUNsRDthQUNKO1lBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUF3RSxDQUFDO1NBQ2xHO2FBQU07WUFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHO2dCQUNqQixPQUFPLEVBQVcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUssQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlILGdCQUFnQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCO2dCQUN2RCxZQUFZLEVBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhO2dCQUNuRCxLQUFLLEVBQWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO2FBQzlDLENBQUM7U0FDTDtRQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsRUFBRTtZQUN2QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSwrQkFBa0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pGO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDaEU7UUFDRCxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFVLENBQUM7YUFDdkQ7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFhLENBQUM7YUFDbEM7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFpQixDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBZ0IsQ0FBQzthQUN2QztZQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQWtCLENBQUM7YUFDNUM7U0FDSjtJQUNMLENBQUM7SUFFRCxnSUFBZ0k7SUFDaEksSUFBSSxPQUFPO1FBQ1AsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUN6RCxJQUFJLElBQUksQ0FBQyxjQUFjLFlBQVksb0JBQU8sRUFBRTtnQkFDeEMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQzlCO1lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU1RSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBcUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDaEo7UUFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBZTtRQUM5QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUssSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsZ09BQWdPO0lBQ2hPLGVBQWU7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLFlBQVksb0JBQU8sQ0FBQztJQUMzQyxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU87WUFDSCxzQkFBc0IsRUFBSSxJQUFJLENBQUMsc0JBQXNCO1lBQ3JELHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0I7WUFDdkQsU0FBUyxFQUFpQixJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVM7WUFDckQsSUFBSSxFQUFzQixJQUFJLENBQUMsSUFBSTtZQUNuQyxTQUFTLEVBQWlCLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFO1lBQ25ELFNBQVMsRUFBaUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUU7WUFDbkQsT0FBTyxFQUFtQixJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVM7WUFDbkQsT0FBTyxFQUFtQixJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDMUMsTUFBTSxFQUFvQixJQUFJLENBQUMsTUFBTTtZQUNyQyxPQUFPLEVBQW1CLElBQUksQ0FBQyxPQUFPO1lBQ3RDLGFBQWEsRUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELE9BQU8sRUFBVyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNyRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQjtnQkFDckQsWUFBWSxFQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTtnQkFDakQsS0FBSyxFQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSzthQUM3QztZQUNELGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUU7WUFDbkQsVUFBVSxFQUFTLElBQUksQ0FBQyxVQUFVO1lBQ2xDLFVBQVUsRUFBUyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDdEMsU0FBUyxFQUFVLElBQUksQ0FBQyxTQUFTO1lBQ2pDLElBQUksRUFBZSxJQUFJLENBQUMsSUFBSTtTQUMvQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBM0tELHlCQTJLQyJ9