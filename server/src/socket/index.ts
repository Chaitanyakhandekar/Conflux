import { eventNames } from "node:cluster"
import { httpServer, app } from "../app.ts"
import { Server, Socket } from "socket.io"
import { env } from "../config/env.config.ts"
import { setIO } from "./constants/socketInstance.ts"
import { initializeSocketListeners } from "./listners/index.ts"
import { socketEvents } from "../constants/socketEvents.ts"
import { log } from "node:console"

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

    io.on(socketEvents.connection.CONNECT , (socket:Socket)=>{
        console.log(`Socket ${socket.id} Connected to Socket Server/IO.`);
        
        initializeSocketListeners(io,socket)
    })

}