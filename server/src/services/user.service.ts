import { asyncHandler, gnerateOTP } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { RegisterUserType } from "../types/user.type.ts";
import { ApiError } from "../types/error.type.ts";
import { User } from "../models/user.model.ts";
import { addEmailJob } from "../producers/email.producer.ts";
import type { emailJobType } from "../types/job.type.ts";
import { getEmailVerificationHtml } from "../constants/index.ts";
import { ERROR_CODES } from "../constants/error-codes.ts";

/**
 * @description Service for Register User
 * @param payload 
 */
const registerUserService = async (payload: RegisterUserType): Promise<any> => {

    if (payload.email.trim() === "" || payload.fullName.trim() === "" || payload.username.trim() === "" || payload.password.trim() === "") {
        throw new ApiError(400, "Empty Fields Not Allowed", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    const userAlreadyExists = await User.findOne({
        $or: [
            { email: payload.email },
            { username: payload.username }
        ]
    })

    if (userAlreadyExists) {

        if (userAlreadyExists.email === payload.email) {
            throw new ApiError(409, "Email Already Exists", ERROR_CODES.EMAIL_ALREADY_EXISTS)
        }
        if (userAlreadyExists.username === payload.username) {
            throw new ApiError(409, "Username Already Exists", ERROR_CODES.USERNAME_ALREADY_EXISTS)
        }

    }

    const otp = gnerateOTP(6)

    const userPayload = {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        fullName: payload.fullName,
        avatar: {
            secure_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${payload.username}`,
            public_id: ""
        },
        verificationOTP: otp,
        OTPGeneratedAt: new Date()
    }

    const user = await User.create(userPayload)

    if (!user) {
        throw new ApiError(500, "Server Error While Register.", ERROR_CODES.CREATE_FAILED)
    }

    const emailJob: emailJobType = {
        to: {
            email: payload.email,
            name: payload.username
        },
        subject: "Complete your Conflux signup with this verification code",
        html: getEmailVerificationHtml(otp)
    }

    addEmailJob(emailJob)       // job added to email-queue for background processing

    return user.toSafeObject()
}


export {
    registerUserService
}