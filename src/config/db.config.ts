import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../prisma/generated/client"
import { env } from "./env.config"

const [dbUser, dbPass, dbHost, dbName] = [
    env.loadVar("DB_USER"), 
    env.loadVar("DB_PASS"),
    env.loadVar("DB_HOST"),
    env.loadVar("DB_NAME"),
]
const connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}/${dbName}`

const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({ adapter })

export type { PrismaClient } from "../../prisma/generated/client"