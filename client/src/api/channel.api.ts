import { env } from "../config/env.config"
import { messages } from "../data/messages";
import type { ChannelDataType } from "../types/channel.type";
import type { CreateServerType } from "../types/server.type";
import type { LoginUserType, RegisterUserType } from "../types/user.type"
import axios from "axios"



class ChannelApi {

    baseUrl: string

    constructor() {
        this.baseUrl = `${env.VITE_ENV === "production" ? env.VITE_SERVER_URL_PRODUCTION : env.VITE_SERVER_URL_LOCAL}/api/v1/channels`
    }


    createChannel = async (channelData: ChannelDataType, categoryId: string): Promise<any> => {
        try {
            const { data } = await axios.post(
                `${this.baseUrl}/`,
                channelData,
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

            console.log('Channel Created : ', data);


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

export const channelApi = new ChannelApi();