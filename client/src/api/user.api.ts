import { env } from "../config/env.config"
import { messages } from "../data/messages";
import type { LoginUserType, RegisterUserType } from "../types/user.type"
import axios from "axios"

type ProfileFormType = {
    displayName: string;
    bio?: string;
    avatar?: File | null;
};


class UserApi {

    baseUrl: string

    constructor() {
        this.baseUrl = `${env.VITE_ENV === "production" ? env.VITE_SERVER_URL_PRODUCTION : env.VITE_SERVER_URL_LOCAL}/api/v1/users`
    }

    setupProfile = async (data: ProfileFormType) => {
        try {
            console.log('Bio', data);

            const response = await axios.post(
                `${this.baseUrl}/setup-profile`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )

            console.log('Setup Profile response :: ', response.data);

            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message
                }
            }

            return {
                success: false,
                error: response.data.errorCode,
                message: response.data?.message
            }
        } catch (error) {
            console.log('ERROR : PS ::', error);
            return {
                success: false,
                error: error
            }

        }

    }


}

export const userApi = new UserApi()