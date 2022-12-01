/** @module Attachment */
import Base from "./Base";
/** Represents a file attachment. */
export default class Attachment extends Base {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXR0YWNobWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0F0dGFjaG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLE9BQU8sSUFBSSxNQUFNLFFBQVEsQ0FBQztBQUsxQixvQ0FBb0M7QUFDcEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsSUFBSTtJQUN4Qyx3Q0FBd0M7SUFDeEMsV0FBVyxDQUFVO0lBQ3JCLDBDQUEwQztJQUMxQyxXQUFXLENBQVU7SUFDckIseUdBQXlHO0lBQ3pHLFNBQVMsQ0FBVztJQUNwQix1Q0FBdUM7SUFDdkMsUUFBUSxDQUFTO0lBQ2pCLGtEQUFrRDtJQUNsRCxNQUFNLENBQVU7SUFDaEIsd0NBQXdDO0lBQ3hDLFFBQVEsQ0FBUztJQUNqQixtQ0FBbUM7SUFDbkMsSUFBSSxDQUFTO0lBQ2IseUNBQXlDO0lBQ3pDLEdBQUcsQ0FBUztJQUNaLGlEQUFpRDtJQUNqRCxLQUFLLENBQVU7SUFDZixZQUFZLElBQW1CLEVBQUUsTUFBYztRQUMzQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixTQUFTLEVBQUksSUFBSSxDQUFDLFNBQVM7WUFDM0IsUUFBUSxFQUFLLElBQUksQ0FBQyxRQUFRO1lBQzFCLE1BQU0sRUFBTyxJQUFJLENBQUMsTUFBTTtZQUN4QixRQUFRLEVBQUssSUFBSSxDQUFDLFFBQVE7WUFDMUIsSUFBSSxFQUFTLElBQUksQ0FBQyxJQUFJO1lBQ3RCLEdBQUcsRUFBVSxJQUFJLENBQUMsR0FBRztZQUNyQixLQUFLLEVBQVEsSUFBSSxDQUFDLEtBQUs7U0FDMUIsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9