import { Mycontext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<Mycontext> = ({context}, next) => {
    if(!context.req.session.userId) {
        throw new Error("not authenticated");
    }
    return next();
}