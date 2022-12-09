"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module GroupChannel */
const Channel_js_1 = tslib_1.__importDefault(require("./Channel.js"));
const User_js_1 = tslib_1.__importDefault(require("./User.js"));
const TypedCollection_js_1 = tslib_1.__importDefault(require("../util/TypedCollection.js"));
/** Represents a group direct message. */
class GroupChannel extends Channel_js_1.default {
    /** The application that made this group channel. */
    application;
    /** The ID of the application that made this group channel. */
    applicationID;
    /** The icon hash of this group, if any. */
    icon;
    /** The ID of last message sent in this channel. */
    lastMessageID;
    /** If this group channel is managed by an application. */
    managed;
    /** The name of this group channel. */
    name;
    /** The nicknames used when creating this group channel. */
    nicks;
    /** The owner of this group channel. */
    owner;
    /** The ID of the owner of this group channel. */
    ownerID;
    /** The other recipients in this group channel. */
    recipients;
    constructor(data, client) {
        super(data, client);
        this.applicationID = data.application_id;
        this.icon = null;
        this.lastMessageID = data.last_message_id;
        this.managed = false;
        this.name = data.name;
        this.nicks = [];
        this.owner = this.client.users.get(data.owner_id);
        this.ownerID = data.owner_id;
        this.recipients = new TypedCollection_js_1.default(User_js_1.default, client);
        for (const r of data.recipients)
            this.recipients.add(client.users.update(r));
        this.update(data);
    }
    update(data) {
        super.update(data);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            icon: this.icon,
            managed: this.managed,
            name: this.name,
            nicks: this.nicks,
            ownerID: this.ownerID,
            recipients: this.recipients.map(user => user.toJSON()),
            type: this.type
        };
    }
}
exports.default = GroupChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvR3JvdXBDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixzRUFBbUM7QUFDbkMsZ0VBQTZCO0FBTTdCLDRGQUF5RDtBQUd6RCx5Q0FBeUM7QUFDekMsTUFBcUIsWUFBYSxTQUFRLG9CQUFPO0lBQzdDLG9EQUFvRDtJQUNwRCxXQUFXLENBQXFCO0lBQ2hDLDhEQUE4RDtJQUM5RCxhQUFhLENBQVM7SUFDdEIsMkNBQTJDO0lBQzNDLElBQUksQ0FBZ0I7SUFDcEIsbURBQW1EO0lBQ25ELGFBQWEsQ0FBZ0I7SUFDN0IsMERBQTBEO0lBQzFELE9BQU8sQ0FBVTtJQUNqQixzQ0FBc0M7SUFDdEMsSUFBSSxDQUFnQjtJQUNwQiwyREFBMkQ7SUFDM0QsS0FBSyxDQUF1QztJQUM1Qyx1Q0FBdUM7SUFDdkMsS0FBSyxDQUFRO0lBQ2IsaURBQWlEO0lBQ2pELE9BQU8sQ0FBUztJQUNoQixrREFBa0Q7SUFDbEQsVUFBVSxDQUF5QztJQUVuRCxZQUFZLElBQXFCLEVBQUUsTUFBYztRQUM3QyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDRCQUFlLENBQUMsaUJBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQThCO1FBQ3BELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxJQUFJLEVBQVcsSUFBSSxDQUFDLElBQUk7WUFDeEIsT0FBTyxFQUFRLElBQUksQ0FBQyxPQUFPO1lBQzNCLElBQUksRUFBVyxJQUFJLENBQUMsSUFBSTtZQUN4QixLQUFLLEVBQVUsSUFBSSxDQUFDLEtBQUs7WUFDekIsT0FBTyxFQUFRLElBQUksQ0FBQyxPQUFPO1lBQzNCLFVBQVUsRUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6RCxJQUFJLEVBQVcsSUFBSSxDQUFDLElBQUk7U0FDM0IsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXRERCwrQkFzREMifQ==