/** @module GatewayError */
/** A gateway error. */
export default class GatewayError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2F0ZXdheUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2dhdGV3YXkvR2F0ZXdheUVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJCQUEyQjtBQUUzQix1QkFBdUI7QUFDdkIsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsS0FBSztJQUMzQyxJQUFJLENBQVM7SUFDYixZQUFZLE9BQWUsRUFBRSxJQUFZO1FBQ3JDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSiJ9