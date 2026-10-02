import Fastify, { FastifyError, FastifyInstance } from "fastify";
import { failure, sendReply } from "./shared/response/response.helper";
import { fstErrorMapper } from "./shared/mappers/fst.mapper";
import { authRoutes } from "./features/auth/auth.routes";
import { refreshTokenRoutes } from "./features/token/token.routes";
import userRoutes from "./features/user/user.routes";

type ServerOptions = {
    debug?: boolean;
    port?: number;
    host?: string;
}
export default class Server {
    private f: FastifyInstance; 
    private opt: Required<ServerOptions>;
    constructor(opt: ServerOptions = {}) {
        this.opt = {
            debug: false,
            port: 4444,
            host: "localhost",
            ...opt
        };
        this.f = Fastify({ logger: this.opt.debug });
        
    }
    private loadRoutes() {
        this.f.register(authRoutes)
        this.f.register(refreshTokenRoutes)
        this.f.register(userRoutes)
    }
    private modifyErrors() {
        this.f.setErrorHandler((error: FastifyError, req, rep) => {
        const send = sendReply(rep);
        const errObj = failure(
            fstErrorMapper(error),
            error.message
        );

        return send(errObj);
    });
    }
    async startServer() {
        this.loadRoutes()   
        this.modifyErrors()
        await this.f.listen({
            host: this.opt.host,
            port: this.opt.port
        })
        console.clear()
        console.log(`\x1b[34mServer listening at: http://${this.opt.host}:${this.opt.port}\x1b[0m\n\x1b[32mDev mode: ${this.opt.debug}\x1b[0m`)
    }
}
