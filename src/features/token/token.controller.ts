import { FastifyReply, FastifyRequest } from "fastify"
import { RefreshTokenRequest } from "./token.schema"
import TokenService from "./token.service"
import { sendReply } from "../../shared/response/response.helper"
import { SuccessCode } from "../../shared/http/http.types"
import { AccessTokenHeader } from "../../shared/jwt/jwt.schema"

export class TokenController {
    constructor(
        private service: TokenService
    ) {}

    async refreshAccessToken(
        req: FastifyRequest<{ Body: RefreshTokenRequest }>,
        rep: FastifyReply
    ): Promise<FastifyReply> {
        const result = await this.service.refreshAccessToken(
            req.body.refresh_token
        )

        if (!result.success) {
            return sendReply(rep)(result)
        }

        return sendReply(rep)(result, SuccessCode.OK)
    }

    async logout(req: FastifyRequest<{ Body: RefreshTokenRequest, Headers: AccessTokenHeader }>, rep: FastifyReply): Promise<FastifyReply> {
        const result = await this.service.logout(req.body.refresh_token)
        if (!result.success) {
            return sendReply(rep)(result)
        }
        return sendReply(rep)(result, SuccessCode.NO_CONTENT)
    }
}