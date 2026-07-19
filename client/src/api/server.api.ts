import { env } from "../config/env.config"
import { messages } from "../data/messages";
import type { CreateServerType } from "../types/server.type";
import type { LoginUserType, RegisterUserType } from "../types/user.type"
import axios from "axios"

type ProfileFormType = {
    displayName: string;
    bio?: string;
    avatar?: File | null;
};

type ServerType = {
    icon: React.JSX.Element | "<></>",
    label: string,
    desc: string,
    type: "GAMING" | "STUDY" | "DEVELOPER" | "STARTUP" | "CUSTOM"
}

class ServerApi {

    baseUrl: string

    constructor() {
        this.baseUrl = `${env.VITE_ENV === "production" ? env.VITE_SERVER_URL_PRODUCTION : env.VITE_SERVER_URL_LOCAL}/api/v1/servers`
    }

    createServer = async (server: CreateServerType): Promise<any> => {
        try {
            const response = await axios.post(
                `${this.baseUrl}/`,
                server,
                {
                    withCredentials: true
                }
            )

            console.log('Create Server Response : ', response.data);

            return {
                success: true,
                data: response.data,
                message: "Server Created."
            }
        } catch (error: any) {
            console.log('Create Server :: Error : ', error);
            return {
                success: false,
                error: error,
                message: error.message
            }

        }
    }

    getMyCreatedServers = async (page: number = 1, limit: number = 10): Promise<any> => {
        try {
            const response = await axios.get(
                `${this.baseUrl}/my/?page=${page}&limit=${limit}`,
                {
                    withCredentials: true
                }
            )

            if (!response || !response.data.success) {
                throw {
                    success: false,
                    errorCode: response.data.errorCode
                }
            }

            console.log('Servers Res : ', response.data);


            return {
                success: true,
                data: response.data.data
            }

        } catch (error) {
            console.log('Get my Servers :: Error :: ', error);
            return error
        }
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

export const serverApi = new ServerApi();