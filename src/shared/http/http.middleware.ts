import { FastifyReply, FastifyRequest } from "fastify";
import { sendReply } from "../response/response.helper";
import { handleZodResult } from "../helper/helper.zod";
import { rawAuthorizationHeaderSchema } from "../jwt/jwt.schema";

export function validateAuthorizationHeader(
    req: FastifyRequest,
    rep: FastifyReply,
    done: () => void
) {
    const result = handleZodResult(
        rawAuthorizationHeaderSchema.safeParse(req.headers)
    );

    if (!result.success) {
        sendReply(rep)(result);
        return;
    }
    req.auth = {
        token: result.data.authorization.slice(7)
    }
    done();
}