/** @module Collection */
/** A {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map | Map} with some Array-like additions. */
export default class Collection extends Map {
    /** If this collection is empty. */
    get empty() {
        return this.size === 0;
    }
    every(predicate, thisArg) {
        return this.toArray().every(predicate, thisArg);
    }
    filter(predicate, thisArg) {
        return this.toArray().filter(predicate, thisArg);
    }
    find(predicate, thisArg) {
        return this.toArray().find(predicate, thisArg);
    }
    /** See: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex | Array#findIndex } */
    findIndex(predicate, thisArg) {
        return this.toArray().findIndex(predicate, thisArg);
    }
    first(amount) {
        if (typeof amount === "undefined") {
            const iterable = this.values();
            return iterable.next().value;
        }
        if (amount < 0) {
            return this.last(amount * -1);
        }
        amount = Math.min(amount, this.size);
        const iterable = this.values();
        return Array.from({ length: amount }, () => iterable.next().value);
    }
    last(amount) {
        const iterator = Array.from(this.values());
        if (typeof amount === "undefined") {
            return iterator[iterator.length - 1];
        }
        if (amount < 0) {
            return this.first(amount * -1);
        }
        if (!amount) {
            return [];
        }
        return iterator.slice(-amount);
    }
    /** See: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map | Array#map } */
    map(predicate, thisArg) {
        return this.toArray().map(predicate, thisArg);
    }
    /**
     * Pick a random element from the collection, or undefined if the collection is empty.
     */
    random() {
        if (this.empty) {
            return undefined;
        }
        const iterable = Array.from(this.values());
        return iterable[Math.floor(Math.random() * iterable.length)];
    }
    reduce(predicate, initialValue) {
        return this.toArray().reduce(predicate, initialValue);
    }
    reduceRight(predicate, initialValue) {
        return this.toArray().reduceRight(predicate, initialValue);
    }
    /** See: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some | Array#some } */
    some(predicate, thisArg) {
        return this.toArray().some(predicate, thisArg);
    }
    /** Get the values of this collection as an array. */
    toArray() {
        return Array.from(this.values());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL0NvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUJBQXlCO0FBQ3pCLDJJQUEySTtBQUMzSSxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQWlCLFNBQVEsR0FBUztJQUNuRCxtQ0FBbUM7SUFDbkMsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBS0QsS0FBSyxDQUFDLFNBQWdFLEVBQUUsT0FBaUI7UUFDckYsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVwRCxDQUFDO0lBTUQsTUFBTSxDQUFDLFNBQWdFLEVBQUUsT0FBaUI7UUFDdEYsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBRTtJQUN0RCxDQUFDO0lBS0QsSUFBSSxDQUFDLFNBQThELEVBQUUsT0FBaUI7UUFDbEYsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsdUlBQXVJO0lBQ3ZJLFNBQVMsQ0FBQyxTQUE4RCxFQUFFLE9BQWlCO1FBQ3ZGLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQVFELEtBQUssQ0FBQyxNQUFlO1FBQ2pCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQixPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFVLENBQUM7U0FDckM7UUFFRCxJQUFJ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