"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module UnavailableGuild */
const Base_js_1 = tslib_1.__importDefault(require("./Base.js"));
/** Represents a guild that is unavailable. */
class UnavailableGuild extends Base_js_1.default {
    unavailable;
    constructor(data, client) {
        super(data.id, client);
        this.unavailable = data.unavailable;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            unavailable: this.unavailable
        };
    }
}
exports.default = UnavailableGuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5hdmFpbGFibGVHdWlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1VuYXZhaWxhYmxlR3VpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLGdFQUE2QjtBQUs3Qiw4Q0FBOEM7QUFDOUMsTUFBcUIsZ0JBQWlCLFNBQVEsaUJBQUk7SUFDOUMsV0FBVyxDQUFPO0lBQ2xCLFlBQVksSUFBeUIsRUFBRSxNQUFjO1FBQ2pELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN4QyxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQ2hDLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFiRCxtQ0FhQyJ9