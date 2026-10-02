import { Cryptography } from "../../shared/Crypto";
import { safeDatabaseOperation } from "../../shared/wrappers/wrapper.try-catch.db";
import { TokenRepository } from "./token.repository";
import { failure, success } from "../../shared/response/response.helper";
import { ErrorCode } from "../../shared/http/http.types";
import JsonWebToken from "../../shared/jwt/jwt.service";
import { ErrorResult, SuccessResult } from "../../shared/response/response.schema";
import { accessTokenResponse } from "../../shared/helper/helper.jwt";
import { AccessTokenResponse } from "../../shared/jwt/jwt.types";
import { UserService } from "../user/user.service";

export default class TokenService {
    constructor(
        private crypto: typeof Cryptography,
        private repository: TokenRepository,
        private jwt: JsonWebToken,
        private userService: UserService
    ) {}

    async createRefreshToken(
        userId: number,
        remember: boolean
    ): Promise<SuccessResult<string> | ErrorResult> {
        const token = this.crypto.generateRefreshToken();

        const tokenHash = this.crypto.generateRefreshTokenHash(token);

        const expiresAt = new Date(
            Date.now() + (remember ? 30 : 1) * 24 * 60 * 60 * 1000
        );

        const result = await this.repository.insertRefreshToken({
                user_id: userId,
                token_hash: tokenHash,
                expires_at: expiresAt
            })

        if (!result.success) {
            return result;
        }

        return success(token);
    }

    async logout(rawRefreshToken: string) {
        return this.revokeRefreshToken(rawRefreshToken);
    }

    async refreshAccessToken(
        refreshToken: string
    ): Promise<ErrorResult | SuccessResult<AccessTokenResponse>> {
        const tokenHash = this.crypto.generateRefreshTokenHash(refreshToken);

        const result = await this.repository.findByTokenHash(tokenHash)

        if (!result.success) {
            return result;
        }

        if (!result.data) {
            return failure(
                ErrorCode.UNAUTHORIZED,
                "Invalid refresh token"
            );
        }

        const {
            user_id: userId,
            expires_at: expiresAt,
            revoked_at: revokedAt
        } = result.data;

        const isUserActiveResult = await this.userService.isUserActive(userId);

        if (!isUserActiveResult.success) {
            return isUserActiveResult;
        }

        if (
            this.isRevoked(revokedAt) ||
            this.isExpired(expiresAt) ||
            !isUserActiveResult.data
        ) {
            return failure(
                ErrorCode.UNAUTHORIZED,
                "Invalid refresh token"
            );
        }

        const accessToken = await this.jwt.signJWT({
            sub: `${userId}`
        });

        return success(accessTokenResponse(accessToken));
    }

    async revokeRefreshToken(
        rawRefreshToken: string
    ): Promise<ErrorResult | SuccessResult<number>> {
        const tokenHash = this.crypto.generateRefreshTokenHash(
            rawRefreshToken
        );

        const result = await this.repository.revokeRefreshTokenByHash(tokenHash)

        if (!result.success) {
            return result;
        }

        return success(result.data.count);
    }
    private isRevoked(
        revokedAt: Date | null
    ): boolean {
        return revokedAt !== null;
    }

    private isExpired(
        expiresAt: Date
    ): boolean {
        return expiresAt <= new Date();
    }
}