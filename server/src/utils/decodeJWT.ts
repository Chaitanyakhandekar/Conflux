import jwt from "jsonwebtoken";
import { env } from "../config/env.config.ts";
import { ApiError } from "../types/error.type.js";
import { ERROR_CODES } from "../constants/error-codes.ts";

type JWTRType = {
    decodedToken: any
    isExpired: boolean
}

/**
 * @description Util function for decoding JWT token
 * @param token 
 * @param secret 
 * @returns decoded token
 */
export const decodeJWT = (token: string, secret: string): JWTRType => {

    try {
        const decodedToken = jwt.verify(token, secret)

        if (!decodedToken) {
            throw new Error()
        }

        return {
            decodedToken,
            isExpired: false
        };
    } catch (error: any) {

        if (error?.message.trim() === "jwt expired".trim()) {

            return {
                decodedToken: null,
                isExpired: true
            }
        }
        throw new ApiError(401, "Unauthorize User 1", ERROR_CODES.UNAUTHORIZED)
    }
}