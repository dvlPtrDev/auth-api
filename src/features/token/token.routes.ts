import { FastifyInstance } from "fastify";
import { validateRefreshTokenPayload } from "./token.middleware";
import { TokenController } from "./token.controller";
import { RefreshTokenRequest } from "./token.schema";
import { tokenService } from "../../factory";
import { AccessTokenHeader } from "../../shared/jwt/jwt.schema";

export function refreshTokenRoutes(fst: FastifyInstance): void {
    // refresh access
    const controller = new TokenController(tokenService)
    fst.post<{ Body: RefreshTokenRequest }>("/refresh",    
            { preHandler: validateRefreshTokenPayload },
            controller.refreshAccessToken.bind(controller)
    )
    // logout
    fst.delete
    <{ Body: RefreshTokenRequest, Headers: AccessTokenHeader }>
    ("/sessions/current", 
        { preHandler: validateRefreshTokenPayload },
        controller.logout.bind(controller)
    )
}