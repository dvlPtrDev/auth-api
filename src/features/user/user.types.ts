import { AccessTokenResponse } from "../../shared/jwt/jwt.types"

export type RegisterResponse = {
    user_id: number,
    email: string
}
export type LoginServiceResponse = AccessTokenResponse & {
    refresh_token: string
}