"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Attachment */
const Base_1 = tslib_1.__importDefault(require("./Base"));
/** Represents a file attachment. */
class Attachment extends Base_1.default {
    /** The mime type of this attachment. */
    contentType;
    /** The description of this attachment. */
    description;
    /** If this attachment is ephemeral. Ephemeral attachments will be removed after a set period of time. */
    ephemeral;
    /** The filename of this attachment. */
    filename;
    /** The height of this attachment, if an image. */
    height;
    /** A proxied url of this attachment. */
    proxyURL;
    /** The size of this attachment. */
    size;
    /** The source url of this attachment. */
    url;
    /** The width of this attachment, if an image. */
    width;
    constructor(data, client) {
        super(data.id, client);
        this.contentType = data.content_type;
        this.description = data.description;
        this.ephemeral = data.ephemeral;
        this.filename = data.filename;
        this.height = data.height;
        this.proxyURL = data.proxy_url;
        this.size = data.size;
        this.url = data.url;
        this.width = data.width;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            contentType: this.contentType,
            description: this.description,
            ephemeral: this.ephemeral,
            filename: this.filename,
            height: this.height,
            proxyURL: this.proxyURL,
            size: this.size,
            url: this.url,
            width: this.width
        };
    }
}
exports.default = Attachment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXR0YWNobWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0F0dGFjaG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLDBEQUEwQjtBQUsxQixvQ0FBb0M7QUFDcEMsTUFBcUIsVUFBVyxTQUFRLGNBQUk7SUFDeEMsd0NBQXdDO0lBQ3hDLFdBQVcsQ0FBVTtJQUNyQiwwQ0FBMEM7SUFDMUMsV0FBVyxDQUFVO0lBQ3JCLHlHQUF5RztJQUN6RyxTQUFTLENBQVc7SUFDcEIsdUNBQXVDO0lBQ3ZDLFFBQVEsQ0FBUztJQUNqQixrREFBa0Q7SUFDbEQsTUFBTSxDQUFVO0lBQ2hCLHdDQUF3QztJQUN4QyxRQUFRLENBQVM7SUFDakIsbUNBQW1DO0lBQ25DLElBQUksQ0FBUztJQUNiLHlDQUF5QztJQUN6QyxHQUFHLENBQVM7SUFDWixpREFBaUQ7SUFDakQsS0FBSyxDQUFVO0lBQ2YsWUFBWSxJQUFtQixFQUFFLE1BQWM7UUFDM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsU0FBUyxFQUFJLElBQUksQ0FBQyxTQUFTO1lBQzNCLFFBQVEsRUFBSyxJQUFJLENBQUMsUUFBUTtZQUMxQixNQUFNLEVBQU8sSUFBSSxDQUFDLE1BQU07WUFDeEIsUUFBUSxFQUFLLElBQUksQ0FBQyxRQUFRO1lBQzFCLElBQUksRUFBUyxJQUFJLENBQUMsSUFBSTtZQUN0QixHQUFHLEVBQVUsSUFBSSxDQUFDLEdBQUc7WUFDckIsS0FBSyxFQUFRLElBQUksQ0FBQyxLQUFLO1NBQzFCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE5Q0QsNkJBOENDIn0=