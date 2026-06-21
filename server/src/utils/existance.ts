import { ERROR_CODES } from "../constants/error-codes"
import { User } from "../models/user.model"
import { ApiError } from "../types/error.type"

/**
 * @description Util function for User Existsnace check.
 * @param data : string (UserId) | object ({email?,username? , etc})
 * @returns 
 */
export const isUserExists = async (data: string | object): Promise<any> => {

    let user: object | null

    if (typeof data === "string") {

        user = await User.findById(data)

    }
    else {
        user = await User.findOne(data)
    }

    if (!user) {
        throw new ApiError(404, "User Not Found", ERROR_CODES.NOT_FOUND)
    }

    return user;

}