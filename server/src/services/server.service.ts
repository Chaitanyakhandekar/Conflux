import { asyncHandler, decodeJWT, gnerateOTP } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { IUser, LoginUserType, RegisterUserType, SetupProfileType } from "../types/user.type.ts";
import { ApiError } from "../types/error.type.ts";
import { User } from "../models/user.model.ts";
import { addEmailJob } from "../producers/email.producer.ts";
import type { emailJobType } from "../types/job.type.ts";
import { getEmailVerificationHtml } from "../constants/index.ts";
import { ERROR_CODES } from "../constants/error-codes.ts";
import { isUserExists } from "../utils/existance.ts";
import { generateAccessAndRefreshTokens } from "../utils/generateARTokens.ts";
import { LoginServiceReturnType } from "../types/auth.type.ts";
import { env } from "../config/env.config.ts";
import { uploadFileOnCloudinary } from "../providers/cloudinary.provider.ts";
import { ServerInfoType } from "../types/server.type.ts";
import { Server } from "../models/server.model.ts";


const createServerService = async (serverInfo: ServerInfoType): Promise<any> => {

    const server = await Server.create(serverInfo)

    if (!server) {
        throw new ApiError(500, "Server Creation Error.", ERROR_CODES.CREATE_FAILED)
    }

    return server;

}

export {
    createServerService
}