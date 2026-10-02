import { PrismaClient } from "../../../prisma/generated/client";
import { prisma } from "../../config/db.config";
import { CreateRefreshTokenInput } from "./token.schema";
import { RefreshTokenModel } from "../../../prisma/generated/models"
import { safeDatabaseOperation } from "../../shared/wrappers/wrapper.try-catch.db";
import { ErrorResult, SuccessResult } from "../../shared/response/response.schema";


export class TokenRepository {
    constructor(
        private orm: PrismaClient = prisma
    ) {}

    async insertRefreshToken(
        dto: CreateRefreshTokenInput
    ): Promise<SuccessResult<RefreshTokenModel> | ErrorResult> {
        return safeDatabaseOperation(() => this.orm.refreshToken.create({
            data: dto
        }));
    }

    async findByTokenHash(
        tokenHash: string
    ): Promise<SuccessResult<{
        user_id: number;
        expires_at: Date;
        revoked_at: Date | null;
    } | null> | ErrorResult> {
        return safeDatabaseOperation(() => this.orm.refreshToken.findUnique({
            where: {
                token_hash: tokenHash
            },
            select: {
                user_id: true,
                expires_at: true,
                revoked_at: true
            }
        }));
    }

    async revokeRefreshTokenByHash(
        tokenHash: string
    ): Promise<SuccessResult<{ count: number }> | ErrorResult> {
        return safeDatabaseOperation(() => this.orm.refreshToken.updateMany({
            where: {
                token_hash: tokenHash,
                revoked_at: null
            },
            data: {
                revoked_at: new Date()
            }
        }));
    }
}