import { eventNames } from "node:cluster"
import { httpServer, app } from "../app.ts"
import { Server } from "socket.io"
import { env } from "../config/env.config.ts"
import { setIO } from "./constants/socketInstance.ts"

/**
 * @description Function to initialize socket server
 */
export const initializeSocket = () => {

    const io = new Server(
        httpServer,
        {
            cors: {
                origin: env.ALLOW_ORIGIN,
                methods: ["GET", "POST"],
                credentials: true
            }
        }
    )

    setIO(io);    // sets io so that we can access it globally



}