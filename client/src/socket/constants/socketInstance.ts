import { io } from "socket.io-client"
import { env } from "../../config/env.config.ts"

const BACKEND_URL = env.VITE_ENV === "production" ? env.VITE_SERVER_URL_PRODUCTION : env.VITE_SERVER_URL_LOCAL;

const socket = io(
    BACKEND_URL,
    {
        withCredentials: true,
        autoConnect: false
    }
)

export {
    socket
}