import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth-store";
import { useState } from "react";
import type { RegisterUserType } from "../types/user.type";

export const useAuth = (): any => {

    const [loading, setLoading] = useState<boolean>(false)
    const {
        user,
        setUser
    } = useAuth()

    const register = async (userData: RegisterUserType): Promise<any> => {
        setLoading(true)
        const res = await authApi.registerUser(userData)

        console.log("register user data: ", res.data)

        if (res.success) {
            setUser(res.data)
        }
    }

    return {
        register,
        loading,
        setLoading,
        user,
        setUser
    }

}