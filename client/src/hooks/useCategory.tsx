import React, { useEffect, useState } from 'react'
import type { CreateServerType, ServerType } from '../types/server.type'
import { serverApi } from '../api/server.api';
import toast from "react-hot-toast";
import { useServerStore } from '../store/server-store.';
import { categoryApi } from '../api/category.api';
import type { CategoryDataType } from '../types/category.types';


export function useCategory() {

    const [loading, setLoading] = useState<boolean>(false);
    const [categoryError, setCategoryError] = useState<string | null | undefined>(null)
    const { categories, setCategories } = useServerStore()

    useEffect(() => {
        console.log("Categories :: ", categories);

    }, [categories])


    const getServerCategories = async (serverId: string) => {
        try {
            const res = await categoryApi.getServerCategories(serverId)

            if (res.success) {
                setCategories(res.data)
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

    const createCategory = async (data: CategoryDataType) => {
        setLoading(true)
        try {
            const res = await categoryApi.createCategory(data)

            if (res.success) {
                toast.success("Category created successfully.")
                // Refresh categories for the server
                await getServerCategories(data.serverId)
                return res.data;
            } else {
                toast.error(res.message || "Failed to create category")
                setCategoryError(res.message)
                return null;
            }
        } catch (error: any) {
            setCategoryError(error.message)
            toast.error(error.message || "Failed to create category")
            return null;
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        setLoading,
        categoryError,
        setCategoryError,
        getServerCategories,
        createCategory
    }

}