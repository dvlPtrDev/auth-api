import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from "jose";
import { env } from "../../config/env.config";
import { jwtPayload } from "./jwt.types";
import { JWT_CONFIG, JwtConfig } from "./jwt.constants";
import { ErrorCode } from "../http/http.types";
import { ErrorResult, SuccessResult } from "../response/response.schema";
import { failure, success } from "../response/response.helper";

export default class JsonWebToken {
    private secret: Uint8Array;
    constructor() {
        this.secret = new TextEncoder().encode(env.loadVar("JWT_SECRET"))
    }
    signJWT(payload: jwtPayload, expiresIn: string = JWT_CONFIG.expiresIn): Promise<string> {
        const token = new SignJWT(payload).setProtectedHeader({
            alg: "HS256",
            typ: "JWT"
        })  
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(this.secret)
        return token;
    }    
    async verifyToken(token: string): Promise<SuccessResult<JWTVerifyResult<JWTPayload>> | ErrorResult> {
        try {
            return success(await jwtVerify(token, this.secret))
        } catch (err) {
            return failure(
                ErrorCode.UNAUTHORIZED,
                "Invalid or expired token"
            )
        }
    }
    async getIdByToken(token: string) {
        const result = await this.verifyToken(token)
        if (!result.success) {
            return result
        }
        const userId = Number(result.data.payload.sub)
        if (Number.isNaN(userId)) {
            return failure(
                ErrorCode.VALIDATION_ERROR,
                "Invalid Token Payload"
            )
        }
        return success(userId)

    }
}