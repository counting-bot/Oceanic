"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module GroupChannel */
const Channel_js_1 = tslib_1.__importDefault(require("./Channel.js"));
const User_js_1 = tslib_1.__importDefault(require("./User.js"));
const Routes = tslib_1.__importStar(require("../util/Routes.js"));
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
        if (data.application_id !== undefined) {
            this.application = this.client["_application"] && this.client.application.id === data.application_id ? this.client.application : undefined;
            this.applicationID = data.application_id;
        }
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.last_message_id !== undefined) {
            this.lastMessageID = data.last_message_id;
        }
        if (data.managed !== undefined) {
            this.managed = data.managed;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.nicks !== undefined) {
            this.nicks = data.nicks;
        }
        if (data.owner_id !== undefined) {
            this.owner = this.client.users.get(data.owner_id);
            this.ownerID = data.owner_id;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
        if (data.recipients !== undefined) {
            for (const id of this.recipients.keys()) {
                if (!data.recipients.some(r => r.id === id)) {
                    this.recipients.delete(id);
                }
            }
            for (const r of data.recipients) {
                if (!this.recipients.has(r.id)) {
                    this.recipients.add(this.client.users.update(r));
                }
            }
        }
    }
    /**
     * Add a user to this channel.
     * @param options The options for adding the user.
     */
    async addRecipient(options) {
        return this.client.rest.channels.addGroupRecipient(this.id, options);
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    async edit(options) {
        return this.client.rest.channels.edit(this.id, options);
    }
    /**
     * The url of this application's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.APPLICATION_ICON(this.applicationID, this.icon), format, size);
    }
    /**
     * Remove a user from this channel.
     * @param userID The ID of the user to remove.
     */
    async removeRecipient(userID) {
        return this.client.rest.channels.removeGroupRecipient(this.id, userID);
    }
    /**
     * Show a typing indicator in this channel.
     */
    async sendTyping() {
        return this.client.rest.channels.sendTyping(this.id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvR3JvdXBDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixzRUFBbUM7QUFDbkMsZ0VBQTZCO0FBSTdCLGtFQUE0QztBQUc1Qyw0RkFBeUQ7QUFHekQseUNBQXlDO0FBQ3pDLE1BQXFCLFlBQWEsU0FBUSxvQkFBTztJQUM3QyxvREFBb0Q7SUFDcEQsV0FBVyxDQUFxQjtJQUNoQyw4REFBOEQ7SUFDOUQsYUFBYSxDQUFTO0lBQ3RCLDJDQUEyQztJQUMzQyxJQUFJLENBQWdCO0lBQ3BCLG1EQUFtRDtJQUNuRCxhQUFhLENBQWdCO0lBQzdCLDBEQUEwRDtJQUMxRCxPQUFPLENBQVU7SUFDakIsc0NBQXNDO0lBQ3RDLElBQUksQ0FBZ0I7SUFDcEIsMkRBQTJEO0lBQzNELEtBQUssQ0FBdUM7SUFDNUMsdUNBQXVDO0lBQ3ZDLEtBQUssQ0FBUTtJQUNiLGlEQUFpRDtJQUNqRCxPQUFPLENBQVM7SUFDaEIsa0RBQWtEO0lBQ2xELFVBQVUsQ0FBeUM7SUFFbkQsWUFBWSxJQUFxQixFQUFFLE1BQWM7UUFDN0MsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxD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