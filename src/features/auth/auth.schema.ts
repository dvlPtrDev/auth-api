import z from "zod";
import { createRefreshTokenInputSchema } from "../token/token.schema";


export const baseUserSchema = z.object({
    email: z
        .email()
        .trim()
        .toLowerCase()
        .max(255, "Email too long"),

    password: z
        .string()
        .min(8, "Password too short")
        .max(128, "Password too long")
        .regex(/^[\x20-\x7E]+$/, "Invalid characters")
})

export const registerUserSchema = baseUserSchema;

export const loginUserSchema = z.object({
    email: baseUserSchema.shape.email,
    password: baseUserSchema.shape.password,
    remember: z.boolean().default(false)
})

export const logoutUserSchema = z.object({
    refresh_token: createRefreshTokenInputSchema
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>
export type CreateUserInput = Omit<RegisterUserInput, "password"> & {
    passwordHash: string
}

export type LoginUserInput = z.infer<typeof loginUserSchema>