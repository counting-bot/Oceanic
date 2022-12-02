"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_util_1 = require("node:util");
/** A base class which most other classes extend. */
class Base {
    client;
    id;
    constructor(id, client) {
        this.id = id;
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false
        });
    }
    static getCreatedAt(id) {
        return new Date(Base.getDiscordEpoch(id) + 1420070400000);
    }
    static getDiscordEpoch(id) {
        return Number(BigInt(id) / 4194304n);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    update(data) { }
    get createdAt() {
        return Base.getCreatedAt(this.id);
    }
    /** @hidden */
    [node_util_1.inspect.custom]() {
        // https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        const copy = new { [this.constructor.name]: class {
            } }[this.constructor.name]();
        for (const key in this) {
            if (Object.hasOwn(this, key) && !key.startsWith("_") && this[key] !== undefined) {
                copy[key] = this[key];
            }
        }
        return copy;
    }
    toJSON() {
        return {
            createdAt: this.createdAt.getTime(),
            id: this.id
        };
    }
    toString() {
        return `[${this.constructor.name} ${this.id}]`;
    }
}
exports.default = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSx5Q0FBb0M7QUFFcEMsb0RBQW9EO0FBQ3BELE1BQThCLElBQUk7SUFDOUIsTUFBTSxDQUFVO0lBQ2hCLEVBQUUsQ0FBUztJQUNYLFlBQVksRUFBVSxFQUFFLE1BQWM7UUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxFQUFTLE1BQU07WUFDcEIsVUFBVSxFQUFJLEtBQUs7WUFDbkIsUUFBUSxFQUFNLEtBQUs7WUFDbkIsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBVTtRQUMxQixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBVTtRQUM3QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELG1HQUFtRztJQUN6RixNQUFNLENBQUMsSUFBYSxJQUFTLENBQUM7SUFFeEMsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsY0FBYztJQUNkLENBQUMsbUJBQU8sQ0FBQyxNQUFNLENBQUM7UUFDWixrRkFBa0Y7UUFDbEYsTUFBTSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTthQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFVLENBQUM7UUFDeEYsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDcEIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDN0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QjtTQUNKO1FBR0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPO1lBQ0gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQ25DLEVBQUUsRUFBUyxJQUFJLENBQUMsRUFBRTtTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQXBERCx1QkFvREMifQ==