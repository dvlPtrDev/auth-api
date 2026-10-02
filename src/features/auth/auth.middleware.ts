import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { registerUserSchema, loginUserSchema } from "./auth.schema";
import { handleZodResult } from "../../shared/helper/helper.zod";
import { sendReply } from "../../shared/response/response.helper";


export function validateRegisterPayload(
    req: FastifyRequest,
    rep: FastifyReply,
    done: HookHandlerDoneFunction
): void {

    const result = handleZodResult(
        registerUserSchema.safeParse(req.body)
    );

    if (!result.success) {
        sendReply(rep)(result);
        return;
    }

    req.body = result.data;

    done();
}


export function validateLoginPayload(
    req: FastifyRequest,
    rep: FastifyReply,
    done: HookHandlerDoneFunction
): void {

    const result = handleZodResult(
        loginUserSchema.safeParse(req.body)
    );

    if (!result.success) {
        sendReply(rep)(result);
        return;
    }

    req.body = result.data;

    done();
}