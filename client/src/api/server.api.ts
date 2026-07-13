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

type ServerType={
    icon:React.JSX.Element | "<></>",
    label:string,
    desc:string,
    type:"GAMING" | "STUDY" | "DEVELOPER" | "STARTUP" | "CUSTOM"
  }

class ServerApi {

    baseUrl: string

    constructor() {
        this.baseUrl = `${env.VITE_ENV === "production" ? env.VITE_SERVER_URL_PRODUCTION : env.VITE_SERVER_URL_LOCAL}/api/v1/servers`
    }

    createServer = async (server:CreateServerType) : Promise<any> =>{
        try {
            const response = await axios.post(
                `${this.baseUrl}/`,
                server,
                {
                    withCredentials:true
                }
            )

            console.log('Create Server Response : ',response.data);
            
            return {
                success:true,
                data:response.data,
                message:"Server Created."
            }
        } catch (error:any) {
            console.log('Create Server :: Error : ',error);
            return {
                success:false,
                error:error,
                message:error.message
            }
            
        }
    }

}

export const serverApi = new ServerApi();