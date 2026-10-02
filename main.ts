import Server from "./src/Server";

const svr = new Server({
    debug: false,
    port: 5001
})
svr.startServer()
