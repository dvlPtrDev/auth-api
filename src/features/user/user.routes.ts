import { FastifyInstance, FastifyRequest } from "fastify";
import { validateAuthorizationHeader } from "../../shared/http/http.middleware";
import { userService } from "../../factory";
import UserController from "./user.controller";
import { validateInternalSecret } from "../../shared/internal-auth/internal-auth.middleware";
import { InternalSecretHeader } from "../../shared/internal-auth/internal-auth.schema";
import { validateIdParam } from "./user.middleware";
import { IdParamInput } from "../../shared/helper/helper.zod";


export default function userRoutes(fst: FastifyInstance) {
    const controller = new UserController(userService)
    fst.delete("/users/me",
        { preHandler: validateAuthorizationHeader },
        controller.deactiveMe.bind(controller)
    )
    fst.delete<{ 
        Headers: InternalSecretHeader, 
        Params: IdParamInput 
    }>("/users/:id",
        { 
            preHandler: [
                validateInternalSecret,
                validateIdParam
            ]
        },
        controller.deleteById.bind(controller)
    )
    fst.get("/users/me", 
        { preHandler: validateAuthorizationHeader },
        controller.getMe.bind(controller)
    )
}