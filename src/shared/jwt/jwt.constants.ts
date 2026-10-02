export const JWT_EXPIRATION = {
    FIVE_MINUTES: "300s",
    FIFTEEN_MINUTES: "900s",
    THIRTY_MINUTES: "1800s",
    ONE_HOUR: "3600s"
} as const

export const JWT_CONFIG = {
    expiresIn: JWT_EXPIRATION.FIVE_MINUTES,
    expiresInSeconds: 300
} as const;

export type JwtConfig = typeof JWT_CONFIG;