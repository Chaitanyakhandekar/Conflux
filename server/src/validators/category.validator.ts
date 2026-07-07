import { isValidObjectId } from "mongoose";
import { ERROR_CODES } from "../constants/error-codes.ts";
import { CategoryDataType } from "../types/category.type.ts";
import { ApiError } from "../types/error.type.ts";

const createCategoryValidator = (category: CategoryDataType): any => {

    if (!category.name.trim() || category.name.trim() === "") {
        throw new ApiError(400, "Non Empty Category name is required", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    if (!isValidObjectId(category.serverId)) {
        throw new ApiError(400, "Server Id is required.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    if (!isValidObjectId(category?.createdBy)) {
        throw new ApiError(400, "Server Id is required.", ERROR_CODES.REQUIRED_FIELDS_MISSING)
    }

    return category;

}

export {
    createCategoryValidator
}