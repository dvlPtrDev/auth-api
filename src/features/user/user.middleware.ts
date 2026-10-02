import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { handleZodResult, paramIdSchema } from "../../shared/helper/helper.zod";
import { sendReply } from "../../shared/response/response.helper";

export function validateIdParam(
    req: FastifyRequest,
    rep: FastifyReply,
    done: HookHandlerDoneFunction
) {
    const result = handleZodResult(
        paramIdSchema.safeParse(req.params)
    )
    if (!result.success) {
        sendReply(rep)(result);
        return;
    } 
    req.user_data = {
        user_id: Number(result.data.id)
    }
    done();
}