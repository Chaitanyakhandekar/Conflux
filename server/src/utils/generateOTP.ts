import { ERROR_CODES } from "../constants/error-codes";
import { ApiError } from "../types/error.type";

/**
 * @description Util function for generate OTP
 * @param length 
 */
export const gnerateOTP = (length: number = 6): string => {

    let otp: string = ""

    for (let i: number = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10)
    }

    if (!otp || (otp && otp.length !== length)) {
        throw new ApiError(500, "Error While Generating OTP", ERROR_CODES.CREATE_FAILED)
    }

    return otp;
}