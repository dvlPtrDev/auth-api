import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { internalSecretHeaderSchema } from "./internal-auth.schema";
import { env } from "../../config/env.config";
import { handleZodResult } from "../helper/helper.zod";
import { sendReply } from "../../shared/response/response.helper";
import { ErrorResult } from "../../shared/response/response.schema";
import { ErrorCode } from "../../shared/http/http.types";

function get_token() {
    return env.loadVar("API_SECRET");
}

export function validateInternalSecret(
    req: FastifyRequest,
    rep: FastifyReply,
    done: HookHandlerDoneFunction
) {
    const result = handleZodResult(
        internalSecretHeaderSchema.safeParse(req.headers)
    );

    if (!result.success) {
        sendReply(rep)(result);
        return;
    }

    if (result.data["x-internal-secret"] !== get_token()) {
        const error: ErrorResult = {
            success: false,
            error: {
                code: ErrorCode.UNAUTHORIZED,
                message: "Error validating internal header"
            }
        };

        sendReply(rep)(error);
        return;
    }

    done();
}
