import "fastify";

declare module "fastify" {
    interface FastifyRequest {
        auth: {
            token: string
        }
        user_data: {
            user_id: number
        }
    }
}