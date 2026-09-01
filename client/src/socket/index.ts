import { socketEvents } from "../constants/socketEvents.ts"
import { socket } from "./constants/socketInstance.ts"

export const initializeSocketListeners = () => {

    socket.on(socketEvents.connection.CONNECT, () => {
        console.log(`Socket ${socket.id} Connected to Socket Server.`);
    })

}