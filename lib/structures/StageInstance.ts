/** @module StageInstance */
import Base from "./Base";
import type StageChannel from "./StageChannel";
import type Guild from "./Guild";
import type Client from "../Client";
import type { StageInstancePrivacyLevels } from "../Constants";
import type { JSONStageInstance } from "../types/json";
import type { RawStageInstance } from "../types/guilds";

/** Represents a stage instance. */
export default class StageInstance extends Base {
    private _cachedChannel?: StageChannel;
    private _cachedGuild?: Guild;
    /** The ID of the associated stage channel. */
    channelID: string;
    /** @deprecated If the stage channel is discoverable */
    discoverableDisabled: boolean;
    /** The id of the guild associated with this stage instance's stage channel. */
    guildID: string;
    /** The [privacy level](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level) of this stage instance. */
    privacyLevel: StageInstancePrivacyLevels;
    /** The topic of this stage instance. */
    topic: string;
    constructor(data: RawStageInstance, client: Client) {
        super(data.id, client);
        this.channelID = data.channel_id;
        this.discoverableDisabled = !!data.discoverable_disabled;
        this.guildID = data.guild_id;
        this.privacyLevel = data.privacy_level;
        this.topic = data.topic;
        this.update(data);
    }

    protected override update(data: Partial<RawStageInstance>): void {
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
    get channel(): StageChannel | undefined {
        return this._cachedChannel ?? (this._cachedChannel = this.client.getChannel<StageChannel>(this.channelID));
    }

    /** The guild of the associated stage channel. This will throw an error if the guild is not cached. */
    get guild(): Guild {
        if (!this._cachedGuild) {
            this._cachedGuild = this.client.guilds.get(this.guildID);

            if (!this._cachedGuild) {
                throw new Error(`${this.constructor.name}#guild is not present if you don't have the GUILDS intent.`);
            }
        }

        return this._cachedGuild;
    }

    override toJSON(): JSONStageInstance {
        return {
            ...super.toJSON(),
            channelID:            this.channelID,
            discoverableDisabled: this.discoverableDisabled,
            guildID:              this.guildID,
            privacyLevel:         this.privacyLevel,
            topic:                this.topic
        };
    }
}
