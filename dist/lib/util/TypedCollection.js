"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module TypedCollection */
const Collection_js_1 = tslib_1.__importDefault(require("./Collection.js"));
const Base_js_1 = tslib_1.__importDefault(require("../structures/Base.js"));
/** This is an internal class, you should not use it in your projects. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class TypedCollection extends Collection_js_1.default {
    #baseObject;
    #client;
    limit;
    constructor(baseObject, client, limit = Infinity) {
        super();
        if (!(baseObject.prototype instanceof Base_js_1.default)) {
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
exports.default = TypedCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZWRDb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWwvVHlwZWRDb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhCQUE4QjtBQUM5Qiw0RUFBeUM7QUFFekMsNEVBQXlDO0FBSXpDLHlFQUF5RTtBQUN6RSw4REFBOEQ7QUFDOUQsTUFBcUIsZUFBeUgsU0FBUSx1QkFBZ0I7SUFDbEssV0FBVyxDQUFvQjtJQUMvQixPQUFPLENBQVM7SUFDaEIsS0FBSyxDQUFTO0lBQ2QsWUFBWSxVQUE2QixFQUFFLE1BQWMsRUFBRSxLQUFLLEdBQUcsUUFBUTtRQUN2RSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLFlBQVksaUJBQUksQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxTQUFTLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxjQUFjO0lBQ2QsR0FBRyxDQUFjLEtBQVE7UUFDckIsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFL0IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBVSxDQUFDLENBQUM7aUJBQ3ZDO2FBRUo7WUFFRCxPQUFPLEtBQUssQ0FBQztTQUNoQjthQUFNO1lBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksc0NBQXNDLENBQUMsQ0FBQztZQUN0RixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sR0FBRyxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsY0FBYztJQUNkLE1BQU0sQ0FBQyxLQUFtQyxFQUFFLEdBQUcsS0FBUTtRQUNuRCxJQUFJLEtBQUssWUFBWSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25DLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtnQkFDbkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDdEM7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELHdGQUF3RjtRQUN4RixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDM0UsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0U7YUFBTSxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUF2REQsa0NBdURDIn0=