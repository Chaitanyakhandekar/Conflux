import { env } from "../config/env.config"
import type { LoginUserType, RegisterUserType } from "../types/user.type"
import axios from "axios"

class AuthApi {

    baseUrl: string

    constructor() {
        this.baseUrl = `${env.VITE_ENV === "production" ? env.VITE_SERVER_URL_PRODUCTION : env.VITE_SERVER_URL_LOCAL}/api/v1/auth`
    }

    registerUser = async (user: RegisterUserType): Promise<any> => {
        try {

            const response = await axios.post(
                `${this.baseUrl}/register`,
                user,
            )

            console.log('register data : ', response.data);

            if (!response.data.success) {
                return {
                    success: false,
                    error: response.data.errorCode,
                    message: response.data?.message
                }
            }

            return {
                success: true,
                statusCode: response.status,
                data: response.data.data
            }

        } catch (error: any) {
            console.log('register error : ', error);

            return {
                success: false,
                error: error,
                message: error?.message
            }

        }
    }

    loginUser = async (user: LoginUserType): Promise<any> => {
        try {

            const response = await axios.post(
                `${this.baseUrl}/login`,
                user,
                {
                    withCredentials: true
                }
            )

            console.log('Login data : ', response.data);

            if (!response.data.success) {
                return {
                    success: false,
                    error: response.data.errorCode,
                    message: response.data?.message
                }
            }

            return {
                success: true,
                statusCode: response.status,
                data: response.data.data
            }

        } catch (error: any) {
            console.log('register error : ', error);

            return {
                success: false,
                error: error,
                message: error?.message
            }

        }
    }

    resendOTP = async (email: string): Promise<any> => {
        try {

            const response = await axios.post(
                `${this.baseUrl}/resend-otp`,
                {
                    email
                },
            )

            return {
                success: true,
                statusCode: response.status,
                data: response.data.data
            }

        } catch (error: any) {

            return {
                success: false,
                error: error,
                message: error?.message
            }

        }
    }

    verifyOTP = async (email: string, otp: string): Promise<any> => {
        try {

            const response = await axios.post(
                `${this.baseUrl}/verify-otp`,
                {
                    email,
                    otp
                },
            )

            console.log('Verify OTP respnse : ', response.data);


            return {
                success: true,
                statusCode: response.status,
                data: response.data.data
            }

        } catch (error: any) {

            console.log('Verify OTP respnse : ', error);

            return {
                success: false,
                error: error,
                message: error?.message
            }

        }
    }
}

export const authApi = new AuthApi()