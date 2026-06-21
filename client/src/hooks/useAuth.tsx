import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth-store";
import { useState } from "react";
import type { RegisterUserType } from "../types/user.type";
import { useNavigate } from "react-router-dom";

export const useAuth = (): any => {

    const [loading, setLoading] = useState<boolean>(false)
    const {
        user,
        setUser
    } = useAuthStore()
    const navigate = useNavigate()

    const register = async (userData: RegisterUserType): Promise<any> => {
        setLoading(true)
        const res = await authApi.registerUser(userData)

        console.log("register user data: ", res.data)

        if (res.success) {
            setUser(res.data)
            navigate("/verify-otp")
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