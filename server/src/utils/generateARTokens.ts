import { ERROR_CODES } from "../constants/error-codes";
import { ApiError } from "../types/error.type";
import { IUser, } from "../types/user.type";

type TokensType = {
    accessToken: string
    refreshToken: string
}

export const generateAccessAndRefreshTokens = (user: any): TokensType => {
    try {

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        if (!accessToken || !refreshToken) {
            throw new Error()
        }

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Server Error While Genrating Tokens", ERROR_CODES.INTERNAL_SERVER_ERROR)
    }
}