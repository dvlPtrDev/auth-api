import { AuthService } from "./features/auth/auth.service"
import { TokenRepository } from "./features/token/token.repository"
import TokenService from "./features/token/token.service"
import { UserRepository } from "./features/user/user.repository"
import { UserService } from "./features/user/user.service"
import { Cryptography } from "./shared/Crypto"
import JsonWebToken from "./shared/jwt/jwt.service"

const cryptoRef = Cryptography
const jwt = new JsonWebToken()

const userRepo = new UserRepository()
const tokenRepository = new TokenRepository()

export const userService = new UserService(userRepo, jwt)
export const tokenService = new TokenService(
    cryptoRef,
    tokenRepository,
    jwt,
    userService
)

export const authService = new AuthService(
    cryptoRef,
    tokenService,
    jwt,
    userService
)