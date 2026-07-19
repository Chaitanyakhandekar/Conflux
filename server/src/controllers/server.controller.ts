import { asyncHandler } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { IUser, LoginUserType, RegisterUserType } from "../types/user.type.ts";
import { authMeService, loginUserService, registerUserService, resendOTPEmailService } from "../services/auth.service.ts";
import { ApiResponse } from "../types/error.type.ts";
import { verifyOTPService } from "../services/auth.service.ts";
import { env } from "../config/env.config.ts";
import { createServerValidator } from "../validators/server.validator.ts";
import { createServerService, getUserServersService } from "../services/server.service.ts";
import { ServerInfoType } from "../types/server.type.ts";

const createServerController = asyncHandler(async (req: Request<{}, {}, ServerInfoType>, res: Response) => {

    console.log('Data ', req.body);


    const server = createServerValidator(req.body, req.user)

    const newServer = await createServerService(server, req.user!)

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Server Created.", newServer)
        )

})

const getUserServersController = asyncHandler(async (req: Request, res: Response): Promise<any> => {

    const user = req.user
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const servers = await getUserServersService(user!, page, limit)

    return res
        .status(200)
        .json(
            new ApiResponse(200, `${!servers.length ? "You Havent created servers yet." : "Servers Fetched."}`, servers)
        )
})

const getServerCategoriesController = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const categories = await getServerCategoriesService(req.params.id.toString())

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                `${!categories.length ? "No categories in server yet" : "categories with channels fetahced"}`,
                categories,
            )
        )
})

export {
    createServerController,
    getUserServersController,
    getServerCategoriesController
}