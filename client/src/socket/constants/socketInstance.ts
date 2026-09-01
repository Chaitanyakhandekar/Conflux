import { io } from "socket.io-client";
import { env } from "../../config/env.config.ts"

const SOCKET_SERVER_URL = env.VITE_ENV === "production" ? env.VITE_SERVER_URL_PRODUCTION : env.VITE_SERVER_URL_LOCAL;

export const socket = io(
    SOCKET_SERVER_URL,
    {
        withCredentials: true,
        autoConnect: false,
        reconnection: true
    }
)