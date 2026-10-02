import z from "zod";

export const createRefreshTokenInputSchema = z.object({
    user_id: z.number().int().positive(),
    token_hash: z.string(),
    expires_at: z.date()
});

export type CreateRefreshTokenInput = z.infer<
    typeof createRefreshTokenInputSchema
>;


export const refreshTokenRequestSchema = z.object({
    refresh_token: z.uuid()
});

export type RefreshTokenRequest = z.infer<
    typeof refreshTokenRequestSchema
>;