import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { ApiError } from "../types/error.type.ts";
import { ERROR_CODES } from "../constants/error-codes.ts";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config.ts";
import { decodeJWT } from "../utils/decodeJWT.ts";
import { isUserExists } from "../utils/existance.ts";

const userAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { accessToken } = req.cookies;
    // console.log("Access Token From Cookies : ",accessToken);

    if (!accessToken || accessToken.trim() === "") {
        throw new ApiError(401, "Unauthorize User", ERROR_CODES.UNAUTHORIZED);
    }

    let decodedToken;

    try {
        decodedToken = decodeJWT(accessToken, env.JWT_ACCESS_SECRET)

    } catch (error) {
        throw new ApiError(500, "Error While Decoding AccessToken", ERROR_CODES.TOKEN_EXPIRED)
    }

    if (!decodedToken) {
        throw new ApiError(500, "No Decoded Token Found", ERROR_CODES.UNAUTHORIZED)
    }

    // console.log("Decoded Token in Auth Middleware : ",decodedToken);

    const user = await isUserExists(decodedToken.decodedToken._id)

    req.user = user

    console.log('User Authenticated : ', user);


    next();
})

export { userAuth }