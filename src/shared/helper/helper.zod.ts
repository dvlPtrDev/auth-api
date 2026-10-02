import { ZodSafeParseResult } from "zod"
import { failure, success } from "../response/response.helper"
import { ErrorCode } from "../http/http.types"
import { ErrorResult, SuccessResult } from "../response/response.schema"
import { z } from "zod";

export function handleZodResult<T>(zodResult: ZodSafeParseResult<T>): ErrorResult | SuccessResult<T> {
    if (!zodResult.success) {
        const message = zodResult.error.issues.map(issue => ({
            issue: issue !== null ? issue.path.join(".") : undefined,
            message: issue.message
        }))
        return failure(
            ErrorCode.VALIDATION_ERROR,
            message.map(
                m => 
                    m.issue !== undefined ? `${m.issue} - ${m.message}` : m.message
            ).join("; ")
        )
    }
    return success(zodResult.data)
}


export const paramIdSchema = z.object({
    id: z.coerce.number().int().positive()
}) 

export type IdParamInput = z.infer<
    typeof paramIdSchema
>;