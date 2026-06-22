import { asyncHandler, gnerateOTP } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { RegisterUserType } from "../types/user.type.ts";
import { ApiError } from "../types/error.type.ts";
import { User } from "../models/user.model.ts";
import { addEmailJob } from "../producers/email.producer.ts";
import type { emailJobType } from "../types/job.type.ts";
import { getEmailVerificationHtml } from "../constants/index.ts";
import { ERROR_CODES } from "../constants/error-codes.ts";
import { isUserExists } from "../utils/existance.ts";

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
    verifyOTPService
}