/** @module Integration */
import Base from "./Base";
import PartialApplication from "./PartialApplication";
/** Represents a guild integration. */
export default class Integration extends Base {
    _cachedGuild;
    _cachedRole;
    /** The account information associated with this integration. */
    account;
    /** The application associated with this integration. */
    application;
    /** If emoticons should be synced for this integration. */
    enableEmoticons;
    /** If this integration is enabled. */
    enabled;
    /** The [behavior](https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors) of expiring subscribers. */
    expireBehavior;
    /** The grace period (in days) before expiring subscribers. */
    expireGracePeriod;
    /** The ID of the guild this integration belongs to, if applicable. */
    guildID;
    /** The name of the integration. */
    name;
    /** If this integration has been revoked. */
    revoked;
    /** The id of the role this integration uses for subscribers, if any. */
    roleID;
    /** The scopes the application associated with this integration has been authorized for. */
    scopes;
    /** The number of subscribers this integration has. */
    subscriberCount;
    /** The last date at which this integration was synced at. */
    syncedAt;
    /** If this integration is syncing. */
    syncing;
    /** The type of integration. */
    type;
    /** The user associated with this integration, if applicable. */
    user;
    constructor(data, client, guildID) {
        super(data.id, client);
        this.account = data.account;
        this.application = null;
        this.enableEmoticons = !!data.enable_emoticons;
        this.enabled = !!data.enabled;
        this.guildID = guildID === undefined ? null : guildID;
        this.name = data.name;
        this.revoked = !!data.revoked;
        this.roleID = data.role_id === undefined ? null : data.role_id;
        this.syncing = !!data.syncing;
        this.type = data.type;
        this.update(data);
    }
    update(data) {
        if (data.account !== undefined) {
            this.account = data.account;
        }
        if (data.application !== undefined) {
            this.application = new PartialApplication(data.application, this.client);
        }
        if (data.enable_emoticons !== undefined) {
            this.enableEmoticons = data.enable_emoticons;
        }
        if (data.enabled !== undefined) {
            this.enabled = data.enabled;
        }
        if (data.expire_behavior !== undefined) {
            this.expireBehavior = data.expire_behavior;
        }
        if (data.expire_grace_period !== undefined) {
            this.expireGracePeriod = data.expire_grace_period;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.revoked !== undefined) {
            this.revoked = data.revoked;
        }
        if (data.role_id !== undefined) {
            this.roleID = data.role_id;
        }
        if (data.scopes !== undefined) {
            this.scopes = data.scopes;
        }
        if (data.subscriber_count !== undefined) {
            this.subscriberCount = data.subscriber_count;
        }
        if (data.synced_at !== undefined) {
            this.syncedAt = new Date(data.synced_at);
        }
        if (data.syncing !== undefined) {
            this.syncing = data.syncing;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
        if (data.user !== undefined) {
            this.user = this.client.users.update(data.user);
        }
    }
    /** The guild this integration belongs to, if applicable. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            if (!this._cachedGuild) {
                this._cachedGuild = this.client.guilds.get(this.guildID);
                if (!this._cachedGuild) {
                    throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
                }
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    /** The role this integration uses for subscribers, if any. */
    get role() {
        if (this.roleID !== null && this._cachedRole !== null) {
            try {
                return this._cachedRole ?? (this._cachedRole = this.guild?.roles.get(this.roleID));
            }
            catch {
                return (this._cachedRole = undefined);
            }
        }
        return this._cachedRole === null ? this._cachedRole : (this._cachedRole = null);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            account: this.account,
            application: this.application?.toJSON(),
            enableEmoticons: this.enableEmoticons,
            enabled: this.enabled,
            expireBehavior: this.expireBehavior,
            expireGracePeriod: this.expireGracePeriod,
            name: this.name,
            revoked: this.revoked,
            roleID: this.roleID,
            scopes: this.scopes,
            subscriberCount: this.subscriberCount,
            syncedAt: this.syncedAt?.getTime(),
            syncing: this.syncing,
            type: this.type,
            user: this.user?.toJSON()
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlZ3JhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBQzFCLE9BQU8sa0JBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFTdEQsc0NBQXNDO0FBQ3RDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLElBQUk7SUFDakMsWUFBWSxDQUFnQjtJQUM1QixXQUFXLENBQWU7SUFDbEMsZ0VBQWdFO0lBQ2hFLE9BQU8sQ0FBcUI7SUFDNUIsd0RBQXdEO0lBQ3hELFdBQVcsQ0FBNEI7SUFDdkMsMERBQTBEO0lBQzFELGVBQWUsQ0FBVTtJQUN6QixzQ0FBc0M7SUFDdEMsT0FBTyxDQUFVO0lBQ2pCLG1KQUFtSjtJQUNuSixjQUFjLENBQThCO0lBQzVDLDhEQUE4RDtJQUM5RCxpQkFBaUIsQ0FBVTtJQUMzQixzRUFBc0U7SUFDdEUsT0FBTyxDQUFnQjtJQUN2QixtQ0FBbUM7SUFDbkMsSUFBSSxDQUFTO0lBQ2IsNENBQTRDO0lBQzVDLE9BQU8sQ0FBVTtJQUNqQix3RUFBd0U7SUFDeEUsTUFBTSxDQUFnQjtJQUN0QiwyRkFBMkY7SUFDM0YsTUFBTSxDQUFpQjtJQUN2QixzREFBc0Q7SUFDdEQsZUFBZSxDQUFVO0lBQ3pCLDZEQUE2RDtJQUM3RCxRQUFRLENBQVE7SUFDaEIsc0NBQXNDO0lBQ3RDLE9BQU8sQ0FBVTtJQUNqQiwrQkFBK0I7SUFDL0IsSUFBSSxDQUFrQjtJQUN0QixnRUFBZ0U7SUFDaEUsSUFBSSxDQUFRO0lBQ1osWUFBWSxJQUFvQixFQUFFLE1BQWMsRUFBRSxPQUFnQjtRQUM5RCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7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