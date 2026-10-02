import z from "zod";

export const rawAuthorizationHeaderSchema = z.object({
    authorization: z.string().trim().regex(/^Bearer .+/)
})

export const jwtSchema = z.jwt()

export type AccessTokenHeader = z.infer<typeof rawAuthorizationHeaderSchema>