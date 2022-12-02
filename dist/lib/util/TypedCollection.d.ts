/** @module TypedCollection */
import Collection from "./Collection.js";
import type Client from "../Client.js";
import Base from "../structures/Base.js";
export type AnyClass<T, I, E extends Array<unknown>> = new (data: T, client: Client, ...extra: E) => I;
/** This is an internal class, you should not use it in your projects. */
export default class TypedCollection<K extends string | number, M extends Record<string, any>, C extends Base, E extends Array<unknown> = []> extends Collection<K, C> {
    #private;
    limit: number;
    constructor(baseObject: AnyClass<M, C, E>, client: Client, limit?: number);
    /** @hidden */
    add<T extends C>(value: T): T;
    /** @hidden */
    update(value: C | Partial<M> & {
        id?: K;
    }, ...extra: E): C;
}
