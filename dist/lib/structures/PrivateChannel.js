"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module PrivateChannel */
const Channel_js_1 = tslib_1.__importDefault(require("./Channel.js"));
/** Represents a direct message with a user. */
class PrivateChannel extends Channel_js_1.default {
    /** The other user in this direct message. */
    recipient;
    constructor(data, client) {
        super(data, client);
        this.recipient = client.users.update(data.recipients[0]);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            recipient: this.recipient?.toJSON(),
            type: this.type
        };
    }
}
exports.default = PrivateChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpdmF0ZUNoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9Qcml2YXRlQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0Isc0VBQW1DO0FBT25DLCtDQUErQztBQUMvQyxNQUFxQixjQUFlLFNBQVEsb0JBQU87SUFDL0MsNkNBQTZDO0lBQzdDLFNBQVMsQ0FBTztJQUVoQixZQUFZLElBQXVCLEVBQUUsTUFBYztRQUMvQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDbkMsSUFBSSxFQUFPLElBQUksQ0FBQyxJQUFJO1NBQ3ZCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFoQkQsaUNBZ0JDIn0=