import { SuccessCode } from "../http/http.types";
import { SuccessStatus } from "../http/http.types";

export function successStatusMapper(code: SuccessCode): SuccessStatus {
    switch (code) {
        case SuccessCode.CREATED:
            return SuccessStatus.CREATED;

        case SuccessCode.NO_CONTENT:
        case SuccessCode.DELETED:
            return SuccessStatus.NO_CONTENT;

        case SuccessCode.OK:
        case SuccessCode.UPDATED:
            return SuccessStatus.OK;

        default:
            return SuccessStatus.OK;
    }
}