import { ErrorCode } from "../http/http.types"

export type SuccessResult<T> = {
    success: true,
    data: T
}
export type ErrorResult = {
    success: false,
    error: {
        code: ErrorCode,
        message: string
    }
}

export type APIResponse<T> = | SuccessResult<T> | ErrorResult
