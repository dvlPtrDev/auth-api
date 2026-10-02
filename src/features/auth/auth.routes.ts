import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller";
import { validateLoginPayload, validateRegisterPayload } from "./auth.middleware";
import { LoginUserInput, RegisterUserInput } from "./auth.schema";
import { authService } from "../../factory";

export function authRoutes(fst: FastifyInstance): void {
    
    const controller = new AuthController(authService)
    // create account
    fst.post< {Body: RegisterUserInput } >("/users", 
            { preHandler: validateRegisterPayload },
            controller.register.bind(controller)
    )
    // login
    fst.post< { Body: LoginUserInput }>("/sessions", 
        { preHandler: validateLoginPayload },
        controller.login.bind(controller))
    
}