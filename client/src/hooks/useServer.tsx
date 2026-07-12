import React, { useState } from 'react'
import type { ServerType } from '../types/server.type'
import { serverApi } from '../api/server.api';
import toast from "react-hot-toast";


export function useServer() {

    const [loading,setLoading] = useState<boolean>(false);
    const [serverError,setServerError] = useState<string | null | undefined>(null)
    
    const createServer = async (server:ServerType) : Promise<any> =>{
       try {
            const res = await serverApi.createServer(server)
            
            if(res.success){
                toast.success(
                    "Server Created."
                )
            }

       } catch (error) {
            setServerError(error.message)
       }
       finally{
        setLoading(false)
        return;
       }

    }

    return {
        createServer,
        loading,
        setLoading,
        serverError,
        setServerError
    }

}