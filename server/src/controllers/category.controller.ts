import { asyncHandler } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { LoginUserType, RegisterUserType } from "../types/user.type.ts";
import { authMeService, loginUserService, registerUserService, resendOTPEmailService } from "../services/auth.service.ts";
import { ApiResponse } from "../types/error.type.ts";
import { verifyOTPService } from "../services/auth.service.ts";
import { env } from "../config/env.config.ts";
import { CategoryDataType } from "../types/category.type.ts";
import { createCategoryValidator } from "../validators/category.validator.ts";
import { createCategoryService, getServerCategoriesService } from "../services/category.service.ts";


const createCategoryController = asyncHandler(async (req: Request<{}, {}, CategoryDataType>, res: Response): Promise<any> => {

    const category = await createCategoryService(req.body);

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Category Created.", category)
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
    createCategoryController,
    getServerCategoriesController
}