/** @module TypedEmitter */
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */
import UncaughtError from "./UncaughtError.js";
import EventEmitter from "node:events";
class TypedEmitter extends EventEmitter {
    emit(eventName, ...args) {
        if (this.listenerCount(eventName) === 0) {
            if (eventName === "error") {
                throw new UncaughtError(args[0]);
            }
            return false;
        }
        return super.emit(eventName, ...args);
    }
}
export default TypedEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZWRFbWl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWwvVHlwZWRFbWl0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJCQUEyQjtBQUMzQiw0SEFBNEg7QUFDNUgsT0FBTyxhQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBa0J2QyxNQUFNLFlBQTBELFNBQVEsWUFBWTtJQUN2RSxJQUFJLENBQXlCLFNBQVksRUFBRSxHQUFHLElBQWU7UUFDbEUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3RDLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUN4QixNQUFNLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQW1CLEVBQUUsR0FBRyxJQUFrQixDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNKO0FBRUQsZUFBZSxZQUFZLENBQUMifQ==