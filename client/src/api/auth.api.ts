import { env } from "../config/env.config"
import type { RegisterUserType } from "../types/user.type"
import axios from "axios"

class AuthApi {

    baseUrl: string

    constructor() {
        this.baseUrl = `${env.VITE_ENV === "production" ? env.SERVER_URL_PRODUCTION : env.SERVER_URL_LOCAL}/api/v1/auth`
    }

    registerUser = async (user: RegisterUserType): Promise<any> => {
        try {

            const response = await axios.post(
                `${this.baseUrl}/register`,
                user,
            )

            return {
                success: true,
                statusCode: response.status,
                data: response.data
            }

        } catch (error: any) {

            return {
                success: false,
                error: error
            }

        }
    }
}

export const authApi = new AuthApi()