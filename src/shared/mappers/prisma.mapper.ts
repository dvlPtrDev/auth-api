import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client"
import { PrismaErrorCode } from "../errors/error.prisma"
import { ErrorCode } from "../http/http.types"
import { failure } from "../response/response.helper"
import { APIResponse } from "../response/response.schema"

export function databaseErrorMapper(err: unknown): APIResponse<never> {
    if (!(err instanceof PrismaClientKnownRequestError)) {
        return failure(
            ErrorCode.INTERNAL_ERROR,
            "Internal Server Error"
        )
    }
    switch(err.code) {
        case PrismaErrorCode.UNIQUE_CONSTRAINT:
            return failure( 
                ErrorCode.CONFLICT,
                "A record with these details already exists"
            )
        case PrismaErrorCode.FOREIGN_KEY_CONSTRAINT:
            return failure(
                ErrorCode.VALIDATION_ERROR,
                "An invalid reference was reported"
            )
        case PrismaErrorCode.REQUIRED_FIELD_MISSING:
        case PrismaErrorCode.REQUIRED_FIELD_NULL:
            return failure(
                ErrorCode.VALIDATION_ERROR,
                "Some mandatory fields were not submitted"
            )
        default:
            return failure(
                ErrorCode.INTERNAL_ERROR,
                "Internal Server Error"
            )
    }
}
