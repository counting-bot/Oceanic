"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module PrivateChannel */
const Channel_js_1 = tslib_1.__importDefault(require("./Channel.js"));
const Message_js_1 = tslib_1.__importDefault(require("./Message.js"));
const TypedCollection_js_1 = tslib_1.__importDefault(require("../util/TypedCollection.js"));
/** Represents a direct message with a user. */
class PrivateChannel extends Channel_js_1.default {
    /** The cached messages in this channel. */
    messages;
    /** The other user in this direct message. */
    recipient;
    constructor(data, client) {
        super(data, client);
        this.messages = new TypedCollection_js_1.default((Message_js_1.default), client, client.options.collectionLimits.messages);
        this.recipient = client.users.update(data.recipients[0]);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            messages: this.messages.map(message => message.id),
            recipient: this.recipient?.toJSON(),
            type: this.type
        };
    }
}
exports.default = PrivateChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpdmF0ZUNoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9Qcml2YXRlQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0Isc0VBQW1DO0FBRW5DLHNFQUFtQztBQUluQyw0RkFBeUQ7QUFHekQsK0NBQStDO0FBQy9DLE1BQXFCLGNBQWUsU0FBUSxvQkFBTztJQUMvQywyQ0FBMkM7SUFDM0MsUUFBUSxDQUFxRDtJQUM3RCw2Q0FBNkM7SUFDN0MsU0FBUyxDQUFPO0lBRWhCLFlBQVksSUFBdUIsRUFBRSxNQUFjO1FBQy9DLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDRCQUFlLENBQUMsQ0FBQSxvQkFBYSxDQUFBLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLFFBQVEsRUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDbkQsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQ25DLElBQUksRUFBTyxJQUFJLENBQUMsSUFBSTtTQUN2QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBcEJELGlDQW9CQyJ9