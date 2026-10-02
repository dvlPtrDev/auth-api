import { ErrorCode } from "../http/http.types";

export function fstErrorMapper(error: any): ErrorCode {
    switch (error.code) {
        case "FST_ERR_CTP_INVALID_JSON_BODY":
            return ErrorCode.INVALID_JSON;

        default:
            return ErrorCode.INTERNAL_ERROR;
    }
}
