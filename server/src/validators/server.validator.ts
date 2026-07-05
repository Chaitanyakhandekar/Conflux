import { ERROR_CODES } from "../constants/error-codes";
import { ApiError } from "../types/error.type.ts";
import { ServerInfoType } from "../types/server.type.ts";

const createServerValidator = (server: ServerInfoType): any => {

    if (!server.name.trim() || server.name.trim() === "") {
        throw new ApiError(400, "Server Name is Required.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    return server;

}

export {
    createServerValidator
}