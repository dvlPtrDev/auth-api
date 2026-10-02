import { configDotenv } from "dotenv";

class EnvironmentConfig {
    constructor(dotenvPath: string) {
        configDotenv({
            path: dotenvPath,
            debug: this.isDevEnv()
        });
    }
    isDevEnv(): boolean {   
        return process.env.environment === "dev"
    }

    loadVar(varName: string): string {
        const result = process.env[varName]
        if (!result) {
            throw new Error(`${varName} is not defined in .env file`)
        }
        return result
    }
}

export const env = new EnvironmentConfig(".env")
