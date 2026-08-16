import mongoose, { isValidObjectId } from "mongoose";
import { ERROR_CODES } from "../constants/error-codes";
import { ApiError } from "../types/error.type.ts";
import { ServerInfoType } from "../types/server.type.ts";
import { Server } from "../models/server.model.ts";

const createServerValidator = (server: ServerInfoType, user: any): any => {

    if (!server?.name?.trim() || server?.name?.trim() === "") {
        throw new ApiError(400, "Server Name is Required.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    const serverInfo = {
        name: server.name.trim(),
        description: server.description || "",
        serverType: server.serverType,
        ownerId: new mongoose.Types.ObjectId(user._id),
        serverIcon: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(server.name.trim())}`
    }

    return serverInfo;

}

const isServerExistsValidator = async (serverId: mongoose.Types.ObjectId) => {
    if (!serverId) {
        throw new ApiError(400, "Server Id is Required", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    if (!isValidObjectId(serverId)) {
        throw new ApiError(400, "Invalid Server Id", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    const server = await Server.findById(serverId)

    if (!server) {
        throw new ApiError(404, "Server With This ID doesnt Exists.", ERROR_CODES.NOT_FOUND)
    }

    return server;
}

export {
    createServerValidator,
    isServerExistsValidator
}