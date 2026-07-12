import mongoose, { isValidObjectId } from "mongoose";
import { ERROR_CODES } from "../constants/error-codes";
import { ApiError } from "../types/error.type.ts";
import { ServerInfoType } from "../types/server.type.ts";

const createServerValidator = (server: ServerInfoType,user:any): any => {

    // if (!server?.name?.trim() || server?.name?.trim() === "") {
    //     throw new ApiError(400, "Server Name is Required.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    // }

    // if (!isValidObjectId(server.ownerId)) {
    //     throw new ApiError(400, "Valid Owner Id is Required.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    // }
    const serverInfo ={
        name:`${user?.fullName}'s ${server.serverType} Server`,
        description:server.description || "",
        serverType:server.serverType,
        ownerId: new mongoose.Types.ObjectId(user._id)
    }

    return serverInfo;

}

export {
    createServerValidator
}