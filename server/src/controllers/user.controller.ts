import { asyncHandler } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { RegisterUserType } from "../types/user.type.ts";
import { registerUserService, resendOTPEmailService } from "../services/user.service.ts";
import { ApiResponse } from "../types/error.type.ts";
import { verifyOTPService } from "../services/auth.service.ts";

/**
 * @description Controller for register user
 * @method POST
 * @access User
 */
const registerUser = asyncHandler(async (req: Request<{}, {}, RegisterUserType>, res: Response) => {

    const user = await registerUserService(req.body)

    return res
        .status(201)
        .json(
            new ApiResponse(201, "User Registered, Verify Email", user)
        )

})

/**
 * @description Controller for Resend OTP for Verification via Email
 * @method POST
 * @access User
 */
const resendOTPEmail = asyncHandler(async (req: Request<{}, {}, { email: string }>, res: Response) => {

    const user = await resendOTPEmailService(req.body.email)
    return res
        .status(200)
        .json(
            new ApiResponse(200, "OTP sent on Email", null)
        )

})

/**
 * @description Controller for Verifying OTP
 * @method POST
 * @access User
 */
const verifyOTP = asyncHandler(async (req: Request<{}, {}, { email: string, otp: string }>, res: Response) => {

    const verified = await verifyOTPService(req.body.email, req.body.otp)
    return res
        .status(200)
        .json(
            new ApiResponse(200, "User Verified", {
                isVerified: verified
            })
        )
})

export {
    registerUser,
    resendOTPEmail,
    verifyOTP
}