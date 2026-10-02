import z from "zod";


export const internalSecretHeaderSchema = z.object({
    "x-internal-secret": z.string("X-Internal-Secret is required"),
});



export type InternalSecretHeader = z.infer<typeof internalSecretHeaderSchema>;