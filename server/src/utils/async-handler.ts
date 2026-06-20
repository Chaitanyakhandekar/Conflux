import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/error.type.ts";

type AsyncHandlerType = (
    req: Request,
    res: Response,
    next?: NextFunction
) => Promise<any>



export const asyncHandler = (requestHandler: AsyncHandlerType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error: any) => {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({
                    success: error.success,
                    data: error.data,
                    message: error.message,
                })
            }
            return {
                success: false,
                message: "Internal Server Error",
                data: null
            }
        })
    }
}