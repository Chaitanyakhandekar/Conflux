import { asyncHandler } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { LoginUserType, RegisterUserType, SetupProfileType } from "../types/user.type.ts";
import { authMeService, loginUserService, registerUserService, resendOTPEmailService } from "../services/auth.service.ts";
import { ApiResponse } from "../types/error.type.ts";
import { verifyOTPService } from "../services/auth.service.ts";
import { env } from "../config/env.config.ts";
import { setupProfileService } from "../services/user.service.ts";
import mongoose from "mongoose";

const setupProfile = asyncHandler(async (req: Request<{}, {}, SetupProfileType>, res: Response) => {
    console.log('Files', req.file);

    const data: SetupProfileType = {
        _id: new mongoose.Types.ObjectId(req?.user?._id) || "",
        displayName: req.body.displayName || "",
        bio: req.body?.bio || "",
        avatar: req.file?.path

    }

    const user = await setupProfileService(data)

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Profile Setup Done.", user)
        )

})

export {
    setupProfile
}