import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { handleZodResult } from "../../shared/helper/helper.zod";
import { RefreshTokenRequest, refreshTokenRequestSchema } from "./token.schema";
import { sendReply } from "../../shared/response/response.helper";

export function validateRefreshTokenPayload(
    req: FastifyRequest<{ Body: RefreshTokenRequest }>,
    rep: FastifyReply,
    done: HookHandlerDoneFunction
): void {
    const result = handleZodResult(refreshTokenRequestSchema.safeParse(req.body))

    if (!result.success) {
        sendReply(rep)(result)
        return
    }

    done()
}
