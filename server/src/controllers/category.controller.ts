import { asyncHandler } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { LoginUserType, RegisterUserType } from "../types/user.type.ts";
import { authMeService, loginUserService, registerUserService, resendOTPEmailService } from "../services/auth.service.ts";
import { ApiResponse } from "../types/error.type.ts";
import { verifyOTPService } from "../services/auth.service.ts";
import { env } from "../config/env.config.ts";
import { CategoryDataType } from "../types/category.type.ts";
import { createCategoryValidator } from "../validators/category.validator.ts";
import { createCategoryService } from "../services/category.service.ts";

const createCategoryController = asyncHandler(async (req: Request<{}, {}, CategoryDataType>, res: Response): Promise<any> => {

    const category = await createCategoryService(req.body);

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Category Created.", category)
        )

})

export {
    createCategoryController
}