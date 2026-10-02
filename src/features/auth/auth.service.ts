import { Cryptography } from "../../shared/Crypto";
import { accessTokenResponse } from "../../shared/helper/helper.jwt";
import { ErrorCode } from "../../shared/http/http.types";
import { JWT_CONFIG } from "../../shared/jwt/jwt.constants";
import JsonWebToken from "../../shared/jwt/jwt.service";
import { failure, success } from "../../shared/response/response.helper";
import { APIResponse, ErrorResult, SuccessResult } from "../../shared/response/response.schema";
import TokenService from "../token/token.service";
import { LoginUserInput, RegisterUserInput } from "./auth.schema";
import { LoginServiceResponse, RegisterResponse } from "../user/user.types";
import { UserService } from "../user/user.service";

export class AuthService {
    constructor(
        private crypto: typeof Cryptography,
        private tokenService: TokenService,
        private jwt: JsonWebToken,
        private user: UserService
    ) {}

    async register(dto: RegisterUserInput): Promise<APIResponse<RegisterResponse>> {
        const passwordHash = await this.crypto.generateHash(dto.password);

        return this.user.createUser({
            email: dto.email,  
            passwordHash
        });
    }

    async login(
        dto: LoginUserInput
    ): Promise<APIResponse<LoginServiceResponse>> {
        const getUserResult = await this.user.getUserByLogin(dto.email);

        if (!getUserResult.success) {
            return getUserResult
        }

        if (!getUserResult.data) {
            return failure(
                ErrorCode.UNAUTHORIZED,
                "Invalid credentials"
            );
        }

        const userData = getUserResult.data;
        const passwordMatches = await this.crypto.compareHash(
            userData.pass_hash,
            dto.password
        );

        if (!passwordMatches) {
            return failure(
                ErrorCode.UNAUTHORIZED,
                "Invalid credentials"
            );
        }

        const accessToken = await this.jwt.signJWT(
            {
                sub: `${userData.user_id}`
            }
        );

        const refreshTokenResult = await this.tokenService.createRefreshToken(
            userData.user_id,
            dto.remember
        );

        if (!refreshTokenResult.success) {
            return refreshTokenResult
        }
        return success({
            ...accessTokenResponse(accessToken),
            refresh_token: refreshTokenResult.data
        });
    }
}