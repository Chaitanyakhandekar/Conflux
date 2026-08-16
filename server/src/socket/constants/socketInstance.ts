import { Server } from "socket.io";

/**
 * @description IO instance for gloal access 
 */
let io: Server;

/**
 * @description setter to set IO as global instance
 * @param sio : Server
 */
const setIO = (sio: Server) => {
    io = sio;
}

/**
 * @description getter for IO instance
 * @returns IO instance
 */
const getIO = (): Server => {
    return io;
}

export {
    setIO,
    getIO
}