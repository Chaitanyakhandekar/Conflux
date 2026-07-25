import React, { useEffect, useState } from 'react'
import type { CreateServerType, ServerType } from '../types/server.type'
import toast from "react-hot-toast";
import { useServerStore } from '../store/server-store.';
import type { ChannelDataType } from '../types/channel.type';
import { channelApi } from '../api/channel.api';


export function useChannel() {

    const [loading, setLoading] = useState<boolean>(false);
    const [channelError, setChannelError] = useState<string | null | undefined>(null)
    const { addChannel } = useServerStore()

    const createChannel = async (channelData: ChannelDataType, categoryId: string) => {
        try {
            const res = await channelApi.createChannel(channelData, categoryId)

            if (res.success) {
                addChannel(res.data, categoryId)
                toast.success(
                    "Channel Created."
                )
            }

        } catch (error: any) {
            setChannelError(error.message)
        }
        finally {
            setLoading(false)
            return;
        }

    }

    return {
        loading,
        setLoading,
        createChannel,
        channelError,
        setChannelError
    }

}