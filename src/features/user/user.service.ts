import { success } from "../../shared/response/response.helper"
import { failure } from "../../shared/response/response.helper"
import { APIResponse, ErrorResult, SuccessResult } from "../../shared/response/response.schema"
import { CreateUserInput } from "../auth/auth.schema"
import { RegisterResponse } from "./user.types"
import { UserRepository } from "./user.repository"
import JsonWebToken from "../../shared/jwt/jwt.service"
import { ErrorCode } from "../../shared/http/http.types"

export class UserService {
    constructor(
        private repository: UserRepository,
        private jwt: JsonWebToken
    ) {}

    async createUser(data: CreateUserInput): Promise<APIResponse<RegisterResponse>> {
        return this.repository.insertUser(data)
    }

    async getUserByLogin(login: string): Promise<APIResponse<{ user_id: number, pass_hash: string } | null>> {
        return this.repository.findByLogin(login)
    }

    async isUserActive(userId: number): Promise<APIResponse<boolean>> {
        const userStatusResult = await this.repository.findUserStatusById(userId)

        if (!userStatusResult.success) {
            return userStatusResult
        }
        return success(userStatusResult.data?.is_active ?? false)
    }
    async deactiveMe(jwtToken: string): Promise<APIResponse<null>> {
        const userIdResult = await this.jwt.getIdByToken(jwtToken)
        
        if (!userIdResult.success) {
            return userIdResult
        }

        return await this.repository.deactiveById(userIdResult.data)
    }
    async deleteById(id: number): Promise<APIResponse<null>> {
        return await this.repository.deleteById(id);
    }
    
    async getMe(jwtToken: string): Promise<APIResponse<{ user_id: number, email: string } | null>> {
        const userIdResult = await this.jwt.getIdByToken(jwtToken)

        if (!userIdResult.success) {
            return userIdResult
        }
        return await this.repository.findUserById(userIdResult.data)
        
    }
    
}