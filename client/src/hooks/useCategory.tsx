import React, { useState } from 'react'
import type { CreateServerType, ServerType } from '../types/server.type'
import { serverApi } from '../api/server.api';
import toast from "react-hot-toast";
import { useServerStore } from '../store/server-store.';
import { categoryApi } from '../api/category.api';


export function useCategory() {

    const [loading, setLoading] = useState<boolean>(false);
    const [categoryError, setCategoryError] = useState<string | null | undefined>(null)


    const getServerCategories = async (serverId: string) => {
        try {
            const res = await categoryApi.getServerCategories(serverId)

            if (res.success) {

                toast.success(
                    "Categories and Channels Fetched."
                )
            }

        } catch (error: any) {
            setCategoryError(error.message)
        }
        finally {
            setLoading(false)
            return;
        }

    }

    return {
        loading,
        setLoading,
        categoryError,
        setCategoryError,
        getServerCategories
    }

}