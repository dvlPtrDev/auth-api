import { JWT_CONFIG } from "../jwt/jwt.constants";
import { AccessTokenResponse } from "../jwt/jwt.types";

export function accessTokenResponse(token: string): AccessTokenResponse {
    return {
        access_token: {
            token,
            token_type: "Bearer",
            expires_in: JWT_CONFIG.expiresInSeconds
        }
    }
}