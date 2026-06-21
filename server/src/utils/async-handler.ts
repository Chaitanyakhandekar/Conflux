import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/error.type.ts";
import { ERROR_CODES } from "../constants/error-codes.ts";

type AsyncHandlerType = (
    req: Request,
    res: Response,
    next?: NextFunction
) => Promise<any>



export const asyncHandler = (requestHandler: AsyncHandlerType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error: any) => {
            return res.status(error.statusCode).json({
                success: error.success,
                data: error.data || null,
                message: error.message || "somthing went wrong",
                errorCode: error.errorCode || ERROR_CODES.INTERNAL_SERVER_ERROR
            })
        })
    }
}