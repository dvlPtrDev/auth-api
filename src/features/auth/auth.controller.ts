import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserInput, RegisterUserInput } from "./auth.schema";
import { AuthService } from "./auth.service";
import { sendReply } from "../../shared/response/response.helper";
import { SuccessCode } from "../../shared/http/http.types";

export class AuthController {
    constructor(
        private service: AuthService
    ) {
    }
    async register(req: FastifyRequest<{ Body: RegisterUserInput }>, rep: FastifyReply): Promise<FastifyReply> {
        const result = await this.service.register(req.body)
        if (!result.success) {
            return sendReply(rep)(result)
        }
        return sendReply(rep)(result, SuccessCode.CREATED)
    }

    async login(req: FastifyRequest<{ Body: LoginUserInput }>, rep: FastifyReply): Promise<FastifyReply> {
        const result = await this.service.login(req.body)
        if (!result.success) {
            return sendReply(rep)(result)
        }
        return sendReply(rep)(result, SuccessCode.OK)
    }
    
}