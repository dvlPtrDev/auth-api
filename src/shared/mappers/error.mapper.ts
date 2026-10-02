// src/utils/Error.ts

import { SuccessCode } from "../http/http.types";
import { SuccessStatus } from "../http/http.types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { ErrorCode } from "../http/http.types";
import { ErrorStatus } from "../http/http.types";
import { failure } from "../response/response.helper";
import { PrismaErrorCode } from "../errors/error.prisma";
import { APIResponse } from "../response/response.schema";

export function errorStatusMapper(code: ErrorCode): ErrorStatus {
    switch (code) {
        case ErrorCode.VALIDATION_ERROR:
        case ErrorCode.INVALID_JSON:
            return ErrorStatus.BAD_REQUEST;

        case ErrorCode.NOT_FOUND:
            return ErrorStatus.NOT_FOUND;

        case ErrorCode.CONFLICT:
            return ErrorStatus.CONFLICT;

        case ErrorCode.UNAUTHORIZED:
            return ErrorStatus.UNAUTHORIZED;

        default :
            return ErrorStatus.INTERNAL_SERVER_ERROR;
    }
}