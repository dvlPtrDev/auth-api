export enum ErrorCode {
    INVALID_JSON = "INVALID_JSON",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    NOT_FOUND = "NOT_FOUND",
    CONFLICT = "CONFLICT",
    UNAUTHORIZED = "UNAUTHORIZED",
    INTERNAL_ERROR = "INTERNAL_SERVER_ERROR",
}
export enum SuccessCode {
    OK = "OK",
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED",
    NO_CONTENT = "NO_CONTENT",
}

export enum ErrorStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}
export enum SuccessStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
}
