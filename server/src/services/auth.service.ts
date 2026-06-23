import { asyncHandler, gnerateOTP } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { IUser, LoginUserType, RegisterUserType } from "../types/user.type.ts";
import { ApiError } from "../types/error.type.ts";
import { User } from "../models/user.model.ts";
import { addEmailJob } from "../producers/email.producer.ts";
import type { emailJobType } from "../types/job.type.ts";
import { getEmailVerificationHtml } from "../constants/index.ts";
import { ERROR_CODES } from "../constants/error-codes.ts";
import { isUserExists } from "../utils/existance.ts";
import { generateAccessAndRefreshTokens } from "../utils/generateARTokens.ts";
import { LoginServiceReturnType } from "../types/auth.type.ts";


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

/**
 * @description Service for Login User
 * @param userData 
 * @returns 
 */
const loginUserService = async (userData: LoginUserType): Promise<LoginServiceReturnType> => {

    if (userData.email.trim() === "" || userData.password.trim() === "") {
        throw new ApiError(400, "Email and Password are Required and Should be non-empty.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    const user = await isUserExists({ email: userData.email })

    if (!user.isVerified) {
        throw new ApiError(401, "User Not Verified", ERROR_CODES.VERIFICATION_REQUIRED)
    }

    if (!user.isCorrectPassword(userData.password)) {
        throw new ApiError(401, "Invalid Credentials", ERROR_CODES.INVALID_CREDENTIALS)
    }

    const tokens = generateAccessAndRefreshTokens(user)

    user.refreshToken = tokens.refreshToken

    await user.save({ validateBeforeSave: false })

    return {
        user: user.toSafeObject(),
        tokens
    }
}

/**
 * @description Service for resending verification OTP via Email 
 * @param email 
 */
const resendOTPEmailService = async (email: string): Promise<any> => {

    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new ApiError(404, "User with this email doesnt exists.", ERROR_CODES.NOT_FOUND)
    }

    const otp = gnerateOTP(6)
    user.verificationOTP = otp
    user.OTPGeneratedAt = new Date()

    await user.save({ validateBeforeSave: false })

    addEmailJob({
        to: {
            email: email,
            name: user.username
        },
        subject: "Complete your Conflux signup with this verification code",
        html: getEmailVerificationHtml(otp)
    })

    return user.toSafeObject()

}

/**
 * @description Service for Verifying OTP
 * @param email 
 * @param otp 
 * @returns Boolean (true/false)
 */
const verifyOTPService = async (email: string, otp: string): Promise<any> => {

    if (!otp || !email || (otp && otp.trim() === "") || (email && email.trim() === "")) {
        throw new ApiError(400, "All Fields Are required", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    const user = await isUserExists({ email })

    const currentTime = Date.now()

    const differece = currentTime - new Date(user?.OTPGeneratedAt).getTime()

    if (differece > 10 * 60 * 1000) {
        throw new ApiError(400, "OTP Expired", ERROR_CODES.OTP_EXPIRED)
    }

    if (otp !== user.verificationOTP) {
        throw new ApiError(401, "Invalid OTP", ERROR_CODES.OTP_INVALID)
    }

    user.isVerified = otp === user.verificationOTP

    await user.save({
        validateBeforeSave: false
    })

    return true

}


export {
    registerUserService,
    loginUserService,
    resendOTPEmailService,
    verifyOTPService
}