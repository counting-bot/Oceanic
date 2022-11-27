"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Routes/Miscellaneous */
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Methods that don't fit anywhere else. */
class Miscellaneous {
    #manager;
    constructor(manager) {
        this.#manager = manager;
    }
    /**
     * Get the nitro sticker packs.
     */
    async getNitroStickerPacks() {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.NITRO_STICKER_PACKS
        }).then(data => data.sticker_packs.map(pack => ({
            bannerAssetID: pack.banner_asset_id,
            coverStickerID: pack.cover_sticker_id,
            description: pack.description,
            id: pack.id,
            name: pack.name,
            skuID: pack.sku_id,
            stickers: pack.stickers.map(sticker => this.#manager.client.util.convertSticker(sticker))
        })));
    }
    /**
     * Get a sticker.
     * @param stickerID The ID of the sticker to get.
     */
    async getSticker(stickerID) {
        return this.#manager.authRequest({
            method: "GET",
            path: Routes.STICKER(stickerID)
        }).then(data => this.#manager.client.util.convertSticker(data));
    }
}
exports.default = Miscellaneous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzY2VsbGFuZW91cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yb3V0ZXMvTWlzY2VsbGFuZW91cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsK0RBQXlDO0FBSXpDLDRDQUE0QztBQUM1QyxNQUFxQixhQUFhO0lBQzlCLFFBQVEsQ0FBYztJQUN0QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxvQkFBb0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBNEM7WUFDeEUsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLG1CQUFtQjtTQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLGFBQWEsRUFBRyxJQUFJLENBQUMsZUFBZTtZQUNwQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUNyQyxXQUFXLEVBQUssSUFBSSxDQUFDLFdBQVc7WUFDaEMsRUFBRSxFQUFjLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksRUFBWSxJQUFJLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQVcsSUFBSSxDQUFDLE1BQU07WUFDM0IsUUFBUSxFQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNsRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBaUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBYTtZQUN6QyxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztTQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FDSjtBQWxDRCxnQ0FrQ0MifQ==