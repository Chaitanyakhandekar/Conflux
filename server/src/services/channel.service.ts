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
import { ChannelDataType, IChannel } from "../types/channel.type.ts";
import { Channel } from "../models/channel.model.ts";


const createChannelService = async (channelData: ChannelDataType): Promise<IChannel> => {

    if (!channelData.name.trim()) {
        throw new ApiError(400, "Name is required Field", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    const channel = await Channel.create(channelData)

    if (!channel) {
        throw new ApiError(500, "Server Error While Creating Channel", ERROR_CODES.CREATE_FAILED)
    }

    return channel;

}