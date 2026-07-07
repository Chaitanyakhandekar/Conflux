import { asyncHandler } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { LoginUserType, RegisterUserType } from "../types/user.type.ts";
import { authMeService, loginUserService, registerUserService, resendOTPEmailService } from "../services/auth.service.ts";
import { ApiResponse } from "../types/error.type.ts";
import { verifyOTPService } from "../services/auth.service.ts";
import { env } from "../config/env.config.ts";
import { createChannelValidator } from "../validators/channel.validator.ts";
import { createChannelService } from "../services/channel.service.ts";
import { ChannelDataType, IChannel } from "../types/channel.type.ts";

/**
 * @description Controller for creating Channel
 * @method POST
 * @access User
 */
const createChannelController = asyncHandler(async (req: Request<{}, {}, ChannelDataType>, res: Response): Promise<any> => {

    const channel = await createChannelService(req.body)

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Channel Created.", channel)
        )

})

export {
    createChannelController
}