import { env } from "../config/env.config"
import { messages } from "../data/messages";
import type { CreateServerType } from "../types/server.type";
import type { LoginUserType, RegisterUserType } from "../types/user.type"
import axios from "axios"



class CategoryApi {

    baseUrl: string

    constructor() {
        this.baseUrl = `${env.VITE_ENV === "production" ? env.VITE_SERVER_URL_PRODUCTION : env.VITE_SERVER_URL_LOCAL}/api/v1/categories`
    }


    getServerCategories = async (serverId: string): Promise<any> => {
        try {
            const { data } = await axios.get(
                `${this.baseUrl}/server/${serverId}`,
                {
                    withCredentials: true
                }
            )

            if (!data.success) {
                return {
                    success: false,
                    errorCode: data.errorCode
                }
            }

            console.log('Categories Response : ', data);


            return {
                success: true,
                data: data.data,
                message: data.message
            }
        } catch (error) {
            return {
                success: false,
                error: error,
                message: error.message
            }
        }
    }

}

export const categoryApi = new CategoryApi();