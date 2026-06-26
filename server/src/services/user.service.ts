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

/**
 * @description Service for Profile setup
 * @param data 
 * @returns 
 */
const setupProfileService = async (data: SetupProfileType): Promise<any> => {

    let uploadInfo = null;

    if (data.avatar) {
        uploadInfo = await uploadFileOnCloudinary(data.avatar)
    }

    let dataToUpdate: any = {
        displayName: data.displayName,
        setupProfile: true
    }

    if (uploadInfo) {
        dataToUpdate.avatar = {
            secure_url: uploadInfo.secure_url,
            public_id: uploadInfo.public_id
        }
    }

    if (data.bio && data.bio.trim() === "") {
        dataToUpdate.bio = data.bio
    }


    const user = await User.findByIdAndUpdate(
        data._id,
        {
            $set: dataToUpdate
        },
        { returnDocument: "after" }
    )

    if (!user) {
        throw new ApiError(500, "Server Error While Profile Setup.", ERROR_CODES.INTERNAL_SERVER_ERROR)
    }

    return user.toSafeObject();
}

export {
    setupProfileService
}