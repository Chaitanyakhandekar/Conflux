import { asyncHandler } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { IUser, LoginUserType, RegisterUserType } from "../types/user.type.ts";
import { authMeService, loginUserService, registerUserService, resendOTPEmailService } from "../services/auth.service.ts";
import { ApiResponse } from "../types/error.type.ts";
import { verifyOTPService } from "../services/auth.service.ts";
import { env } from "../config/env.config.ts";
import { createServerValidator } from "../validators/server.validator.ts";
import { createServerService } from "../services/server.service.ts";
import { ServerInfoType } from "../types/server.type.ts";

const createServerController = asyncHandler(async (req: Request<{}, {}, any>, res: Response) => {

    console.log('Data ', req.body);


    const server = createServerValidator(req.body,req.user)

    const newServer = await createServerService(server, req.user!)

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Server Created.", newServer)
        )

})

export {
    createServerController
}