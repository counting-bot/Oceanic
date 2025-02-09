/** @module Bucket */
/**
 * lovingly borrowed from eris
 * https://github.com/abalabahaha/eris/blob/dev/lib/util/Bucket.js (eb403730855714eafa36c541dbe2cb84c9979158)
 */
/** A bucket. */
export default class Bucket {
    interval;
    lastReset;
    lastSend;
    latencyRef;
    #queue = [];
    reservedTokens;
    timeout;
    tokenLimit;
    tokens;
    constructor(tokenLimit, interval, options) {
        this.tokenLimit = tokenLimit;
        this.interval = interval;
        this.latencyRef = options?.latencyRef ?? { latency: 0 };
        this.lastReset = this.tokens = this.lastSend = 0;
        this.reservedTokens = options?.reservedTokens ?? 0;
        this.timeout = null;
    }
    check() {
        if (this.timeout || this.#queue.length === 0) {
            return;
        }
        if (this.lastReset + this.interval + this.tokenLimit * this.latencyRef.latency < Date.now()) {
            this.lastReset = Date.now();
            this.tokens = Math.max(0, this.tokens - this.tokenLimit);
        }
        let val;
        let tokensAvailable = this.tokens < this.tokenLimit;
        let unreservedTokensAvailable = this.tokens < (this.tokenLimit - this.reservedTokens);
        while (this.#queue.length !== 0 && (unreservedTokensAvailable || (tokensAvailable && this.#queue[0].priority))) {
            this.tokens++;
            tokensAvailable = this.tokens < this.tokenLimit;
            unreservedTokensAvailable = this.tokens < (this.tokenLimit - this.reservedTokens);
            const item = this.#queue.shift();
            val = this.latencyRef.latency - Date.now() + this.lastSend;
            if (this.latencyRef.latency === 0 || val <= 0) {
                item.func();
                this.lastSend = Date.now();
            }
            else {
                setTimeout(() => {
                    item.func();
                }, val);
                this.lastSend = Date.now() + val;
            }
        }
        if (this.#queue.length !== 0 && !this.timeout) {
            this.timeout = setTimeout(() => {
                this.timeout = null;
                this.check();
            }, this.tokens < this.tokenLimit ? this.latencyRef.latency : Math.max(0, this.lastReset + this.interval + this.tokenLimit * this.latencyRef.latency - Date.now()));
        }
    }
    /**
     * Add an item to the queue.
     * @param func The function to queue.
     * @param priority If true, the item will be added to the front of the queue.
     */
    queue(func, priority = false) {
        if (priority) {
            this.#queue.unshift({ func, priority });
        }
        else {
            this.#queue.push({ func, priority });
        }
        this.check();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3Jlc3QvQnVja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFCQUFxQjtBQUNyQjs7O0dBR0c7QUFFSCxnQkFBZ0I7QUFDaEIsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFNO0lBQ3ZCLFFBQVEsQ0FBUztJQUNqQixTQUFTLENBQVM7SUFDbEIsUUFBUSxDQUFTO0lBQ2pCLFVBQVUsQ0FBdUI7SUFDakMsTUFBTSxHQUErQyxFQUFFLENBQUM7SUFDeEQsY0FBYyxDQUFTO0lBQ3ZCLE9BQU8sQ0FBd0I7SUFDL0IsVUFBVSxDQUFTO0lBQ25CLE1BQU0sQ0FBUztJQUNmLFlBQVksVUFBa0IsRUFBRSxRQUFnQixFQUFFLE9BQXlFO1FBQ3ZILElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLEVBQUUsY0FBYyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRU8sS0FBSztRQUNULElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUMzQyxPQUFPO1FBQ1gsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxP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