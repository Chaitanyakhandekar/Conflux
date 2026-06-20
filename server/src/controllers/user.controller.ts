import { asyncHandler } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { RegisterUserType } from "../types/user.type.ts";
import { registerUserService } from "../services/user.service.ts";
import { ApiResponse } from "../types/error.type.ts";

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

export {
    registerUser
}