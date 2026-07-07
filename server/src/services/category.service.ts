import { asyncHandler, decodeJWT, gnerateOTP } from "../utils/index.ts";
import { Request, Response, NextFunction } from "express";
import type { IUser, LoginUserType, RegisterUserType } from "../types/user.type.ts";
import { ApiError } from "../types/error.type.ts";
import { User } from "../models/user.model.ts";
import { addEmailJob } from "../producers/email.producer.ts";
import type { emailJobType } from "../types/job.type.ts";
import { getEmailVerificationHtml } from "../constants/index.ts";
import { ERROR_CODES } from "../constants/error-codes.ts";
import { isUserExists } from "../utils/existance.ts";
import { generateAccessAndRefreshTokens } from "../utils/generateARTokens.ts";
import { LoginServiceReturnType } from "../types/auth.type.ts";
import { env } from "../config/env.config.ts";
import { CategoryDataType } from "../types/category.type.ts";
import { Category } from "../models/category.model.ts";
import { createCategoryValidator } from "../validators/category.validator.ts";


const createCategoryService = async (categoryData: CategoryDataType): Promise<any> => {

    const validData = createCategoryValidator(categoryData)

    const category = await Category.create(validData)

    if (!category) {
        throw new ApiError(500, "Server Error While Creating Category.", ERROR_CODES.CREATE_FAILED)
    }

    return category;
}

export {
    createCategoryService
}