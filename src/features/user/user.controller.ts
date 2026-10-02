import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service";
import { sendReply } from "../../shared/response/response.helper";
import { SuccessCode } from "../../shared/http/http.types";

export default class UserController {
    constructor(
        private service: UserService
    ) {}

    async deactiveMe(req: FastifyRequest, rep: FastifyReply) {
        const result = await this.service.deactiveMe(req.auth.token)

        if (!result.success) {
            return sendReply(rep)(result)
        }
        return sendReply(rep)(result, SuccessCode.DELETED)
    }
    async deleteById(req: FastifyRequest, rep: FastifyReply) {
        const result = await this.service.deleteById(req.user_data.user_id);
        if (!result.success) {
            return sendReply(rep)(result)
        }
        return sendReply(rep)(result, SuccessCode.DELETED)
    }
    
    async getMe(req: FastifyRequest, rep: FastifyReply) {
        return sendReply(rep)(await this.service.getMe(req.auth.token))
    }
}