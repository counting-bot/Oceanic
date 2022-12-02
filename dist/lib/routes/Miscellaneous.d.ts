import type RESTManager from "../rest/RESTManager.js";
import type { Sticker, StickerPack } from "../types/guilds.js";
/** Methods that don't fit anywhere else. */
export default class Miscellaneous {
    #private;
    constructor(manager: RESTManager);
    /**
     * Get the nitro sticker packs.
     */
    getNitroStickerPacks(): Promise<Array<StickerPack>>;
    /**
     * Get a sticker.
     * @param stickerID The ID of the sticker to get.
     */
    getSticker(stickerID: string): Promise<Sticker>;
}
