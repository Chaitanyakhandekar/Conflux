import { log } from "node:console"
import { socketEvents } from "../../constants/socketEvents.ts"
import { getIO } from "../constants/socketInstance.ts"
import { Server, Socket } from "socket.io"

const io = getIO()

export const initializeSocketListeners = (io: Server, socket: Socket) => {

}