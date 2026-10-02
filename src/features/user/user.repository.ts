import { prisma, PrismaClient } from "../../config/db.config"
import { success } from "../../shared/response/response.helper"
import { APIResponse, ErrorResult, SuccessResult } from "../../shared/response/response.schema"
import { safeDatabaseOperation } from "../../shared/wrappers/wrapper.try-catch.db"
import { CreateUserInput } from "../auth/auth.schema"
import { RegisterResponse } from "./user.types"

export class UserRepository {
    private orm: PrismaClient
    constructor() { 
        this.orm = prisma
    }
    insertUser(data: CreateUserInput): Promise<APIResponse<RegisterResponse>> {
        return safeDatabaseOperation(() => this.orm.user.create({
            data: {
                email: data.email,
                pass_hash: data.passwordHash
            },
            select: {
                user_id: true,
                email: true,
            }
        }))
    }
    findByLogin(email: string): 
    Promise<APIResponse<{ user_id: number, pass_hash: string } | null>> {
        return safeDatabaseOperation(() => this.orm.user.findFirst( {
            where: {
                email: email
            },
            select: {
                user_id: true,
                pass_hash: true
            }
        }
        ))
    }
    async findUserStatusById(userId: number): Promise<APIResponse<{ is_active: boolean } | null>> {
        return safeDatabaseOperation(() => this.orm.user.findUnique({
            where: {
                user_id: userId
            },
            select: {
                is_active: true
            }
        }))
    }
    async deactiveById(user_id: number): Promise<APIResponse<null>> {
        const result = await safeDatabaseOperation(() => this.orm.user.update({
            where: {
                user_id
            },
            data: {
                is_active: false
            }
        })) 
        if (!result.success) {
            return result
        }
        return success(null)
    }
    async deleteById(user_id: number): Promise<APIResponse<null>> {
        const result = await safeDatabaseOperation(() => this.orm.user.delete({
            where: {
                user_id
            },
        })) 
        if (!result.success) {
            return result
        }
        return success(null)
    }
    findUserById(user_id: number): Promise<APIResponse<{ user_id: number, email: string } | null>> {
        return safeDatabaseOperation(() => this.orm.user.findUnique({
            where: {
                user_id
            },
            select: {
                user_id: true,
                email: true
            }
        }))
    }
}
