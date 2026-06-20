import jwt from "jsonwebtoken";
import { env } from "../config/env.config.ts";
import { ApiError } from "../types/error.type.js";
import { ERROR_CODES } from "../constants/error-codes.ts";

/**
 * @description Util function for decoding JWT token
 * @param token 
 * @param secret 
 * @returns decoded token
 */
export const decodeJWT = (token: string, secret: string): any => {

    try {
        const decodedToken = jwt.verify(token, secret)

        if (!decodedToken) {
            throw new Error()
        }

        return decodedToken;
    } catch (error: unknown) {
        throw new ApiError(401, "Unauthorize User", ERROR_CODES.UNAUTHORIZED)
    }
}