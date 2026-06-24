import { asyncHandler } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { LoginUserType, RegisterUserType } from "../types/user.type.ts";
import { authMeService, loginUserService, registerUserService, resendOTPEmailService } from "../services/auth.service.ts";
import { ApiResponse } from "../types/error.type.ts";
import { verifyOTPService } from "../services/auth.service.ts";
import { env } from "../config/env.config.ts";

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
 * @description Controller for Login User
 * @method POST
 * @access User
 */
const loginUser = asyncHandler(async (req: Request<{}, {}, LoginUserType>, res: Response): Promise<any> => {

    const userData = await loginUserService(req.body)

    return res
        .status(200)
        .cookie("accessToken", userData.tokens.accessToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: env.NODE_ENV === "production" ? "none" : "lax"
        })
        .cookie("refreshToken", userData.tokens.refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: env.NODE_ENV === "production" ? "none" : "lax"
        })
        .json(
            new ApiResponse(200, "User Login Successful.", userData.user)
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

const authMe = asyncHandler(async (req: Request, res: Response) => {

    const { accessToken, refreshToken } = req.cookies

    const { user, tokens } = await authMeService(accessToken, refreshToken)

    if (!tokens) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, "User Authorize.", user)
            )
    }

    return res
        .status(200)
        .cookie("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: env.NODE_ENV === "production" ? "none" : "lax"
        })
        .cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: env.NODE_ENV === "production" ? "none" : "lax"
        })
        .json(
            new ApiResponse(200, "User Authorized", user)
        )
})

export {
    registerUser,
    loginUser,
    resendOTPEmail,
    verifyOTP,
    authMe
}