"use strict";
/** @module GatewayError */
Object.defineProperty(exports, "__esModule", { value: true });
/** A gateway error. */
class GatewayError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.default = GatewayError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2F0ZXdheUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvR2F0ZXdheUVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQkFBMkI7O0FBRTNCLHVCQUF1QjtBQUN2QixNQUFxQixZQUFhLFNBQVEsS0FBSztJQUMzQyxJQUFJLENBQVM7SUFDYixZQUFZLE9BQWUsRUFBRSxJQUFZO1FBQ3JDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQU5ELCtCQU1DIn0=