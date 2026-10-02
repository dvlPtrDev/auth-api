
export type jwtPayload<U extends Record<string, unknown> = {}> = {
    "sub": string;
} & U;

export interface AccessTokenResponse {
    access_token: {
        token: string;
        token_type: "Bearer";
        expires_in: number;
    }
}
