/** @module TypedCollection */
import Collection from "./Collection";
import Base from "../structures/Base";
/** This is an internal class, you should not use it in your projects. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class TypedCollection extends Collection {
    #baseObject;
    #client;
    limit;
    constructor(baseObject, client, limit = Infinity) {
        super();
        if (!(baseObject.prototype instanceof Base)) {
            throw new TypeError("baseObject must be a class that extends Base.");
        }
        this.#baseObject = baseObject;
        this.#client = client;
        this.limit = limit;
    }
    /** @hidden */
    add(value) {
        if ("id" in value) {
            if (this.limit === 0) {
                return value;
            }
            this.set(value.id, value);
            if (this.limit && this.size > this.limit) {
                const iter = this.keys();
                while (this.size > this.limit) {
                    this.delete(iter.next().value);
                }
            }
            return value;
        }
        else {
            const err = new Error(`${this.constructor.name}#add: value must have an id property`);
            Object.defineProperty(err, "_object", { value });
            throw err;
        }
    }
    /** @hidden */
    update(value, ...extra) {
        if (value instanceof this.#baseObject) {
            if ("update" in value) {
                value["update"].call(value, value);
            }
            return value;
        }
        // if the object does not have a direct id, we're forced to construct a whole new object
        let item = "id" in value && value.id ? this.get(value.id) : undefined;
        if (!item) {
            item = this.add(new this.#baseObject(value, this.#client, ...extra));
        }
        else if ("update" in item) {
            item["update"].call(item, value);
        }
        return item;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZWRDb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWwvVHlwZWRDb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhCQUE4QjtBQUM5QixPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFFdEMsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7QUFJdEMseUVBQXlFO0FBQ3pFLDhEQUE4RDtBQUM5RCxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQXlILFNBQVEsVUFBZ0I7SUFDbEssV0FBVyxDQUFvQjtJQUMvQixPQUFPLENBQVM7SUFDaEIsS0FBSyxDQUFTO0lBQ2QsWUFBWSxVQUE2QixFQUFFLE1BQWMsRUFBRSxLQUFLLEdBQUcsUUFBUTtRQUN2RSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLFlBQVksSUFBSSxDQUFDLEVBQUU7WUFDekMsTUFBTSxJQUFJLFNBQVMsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELGNBQWM7SUFDZCxHQUFHLENBQWMsS0FBUTtRQUNyQixJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDZixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNsQixPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUvQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFVLENBQUMsQ0FBQztpQkFDdkM7YUFFSjtZQUVELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxzQ0FBc0MsQ0FBQyxDQUFDO1lBQ3RGLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDakQsTUFBTSxHQUFHLENBQUM7U0FDYjtJQUNMLENBQUM7SUFFRCxjQUFjO0lBQ2QsTUFBTSxDQUFDLEtBQW1DLEVBQUUsR0FBRyxLQUFRO1FBQ25ELElBQUksS0FBSyxZQUFZLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkMsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO2dCQUNuQixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN0QztZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0Qsd0ZBQXdGO1FBQ3hGLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzRSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM3RTthQUFNLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSiJ9