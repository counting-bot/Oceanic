/** @module CategoryChannel */
import GuildChannel from "./GuildChannel";
import type Client from "../Client";
import type { RawCategoryChannel } from "../types/channels";

/** Represents a guild category channel. */
export default class CategoryChannel extends GuildChannel {
    constructor(data: RawCategoryChannel, client: Client) {
        super(data, client);
        this.update(data);
    }

    protected override update(data: Partial<RawCategoryChannel>): void {
        super.update(data);
    }
}
