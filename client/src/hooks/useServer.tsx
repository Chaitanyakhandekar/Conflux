import React, { useState } from 'react'
import type { CreateServerType, ServerType } from '../types/server.type'
import { serverApi } from '../api/server.api';
import toast from "react-hot-toast";
import { useServerStore } from '../store/server-store.';


export function useServer() {

    const [loading, setLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null | undefined>(null)
    const { servers, setServers, selectedServer, setSelectedServer } = useServerStore()

    const createServer = async (server: CreateServerType): Promise<any> => {
        try {
            const res = await serverApi.createServer(server)

            if (res.success) {
                toast.success(
                    "Server Created."
                )
            }

        } catch (error: any) {
            setServerError(error.message)
        }
        finally {
            setLoading(false)
            return;
        }

    }

    const getMyCreatedServers = async (page: number = 1, limit: number = 10): Promise<any> => {
        try {
            const res = await serverApi.getMyCreatedServers(page, limit)

            if (res.success) {
                setServers(res.data)
                toast.success(
                    "Servers Fetched."
                )
            }

        } catch (error: any) {
            setServerError(error.message)
        }
        finally {
            setLoading(false)
            return;
        }

    }

    const getServerCategories = async (serverId: string) => {
        try {
            const res = await serverApi.getServerCategories(serverId)

            if (res.success) {

                toast.success(
                    "Categories and Channels Fetched."
                )
            }

        } catch (error: any) {
            setServerError(error.message)
        }
        finally {
            setLoading(false)
            return;
        }

    }

    return {
        createServer,
        loading,
        setLoading,
        serverError,
        setServerError,
        getMyCreatedServers,
        servers,
        getServerCategories
    }

}