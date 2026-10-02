import * as argon2 from 'argon2'
import crypto from "node:crypto"
import { env } from '../config/env.config'

export class Cryptography {
    static generateHash(password: string): Promise<string> {
        return argon2.hash(password, {
            timeCost: 2,
            memoryCost: 65536, // 64 MiB
            parallelism: 1,
        })
    }
    static compareHash(hash: string, password: string): Promise<boolean> {
        return argon2.verify(hash, password)
    }
    static generateRefreshToken(): string {
        return crypto.randomUUID()
    }   
    static generateRefreshTokenHash(token: string): string {
        return crypto
            .createHmac("sha256", env.loadVar("REFRESH_TOKEN_SECRET"))
            .update(token)
            .digest("hex")
    }
}