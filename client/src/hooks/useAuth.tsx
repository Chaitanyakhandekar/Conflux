import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth-store";
import { useState } from "react";
import type { LoginUserType, RegisterUserType } from "../types/user.type";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type OTPStatus = 'sending' | "sent" | "verified" | "invalid" | "verifying"

export const useAuth = (): any => {

    const [loading, setLoading] = useState<boolean>(false)
    const [otpStatus, setOtpStatus] = useState<OTPStatus>("sent")
    const [errorType, setErrorType] = useState<string | null>(null)
    const navigate = useNavigate()
    const {
        user,
        setUser,
        setPendingVerificationEmail,
        pendingVerificationEmail,
        logout
    } = useAuthStore()


    const register = async (userData: RegisterUserType): Promise<any> => {
        setLoading(true)
        const res = await authApi.registerUser(userData)
        setLoading(false)

        console.log("register user data: ", res.data)

        if (res.success) {
            setUser(res.data)
            localStorage.setItem("email", res.data.email)
            setPendingVerificationEmail(res.data.email)
            navigate("/verify-otp")
        }
        else {
            setErrorType(res.error)
        }
    }

    const login = async (userData: LoginUserType): Promise<any> => {
        setLoading(true)
        const res = await authApi.loginUser(userData)
        setLoading(false)

        if (res.success) {
            setUser(res.data)
            toast.success(
                "Login Successfull."
            )
            navigate("/")
        }
        else {
            setErrorType(res.error)
        }

    }

    const resendOTP = async (email: string): Promise<void> => {
        console.log("EMAIL : ", email)
        setOtpStatus("sending")
        setLoading(true)
        const res = await authApi.resendOTP(email)

        setLoading(false)

        if (res.success) {
            setOtpStatus("sent")
            toast.success(
                "Verification code resent to your email."
            )
        }

    }

    const verifyOTP = async (email: string, otp: string): Promise<void> => {
        setOtpStatus("verifying")
        setLoading(true)
        const res = await authApi.verifyOTP(email, otp)
        setLoading(false)

        if (res.success) {
            if (res.data.isVerified) {
                setOtpStatus("verified")
                setPendingVerificationEmail(null)
                toast.success(
                    "Verification completed. Welcome to Conflux."
                )
                navigate("/profile-setup")
            }
            else {
                setOtpStatus("invalid")
                toast.error(
                    "Invalid verification code. Please try again."
                )
            }
        }
        else {
            setOtpStatus("invalid")
            toast.error(
                "Invalid verification code. Please try again."
            )
        }

    }

    const authMe = async () => {
        setLoading(true)
        const res = await authApi.authMe()
        setLoading(false)

        if (!res.success) {
            logout()
        }
        else {
            setUser(res.data)
        }
    }



    return {
        register,
        login,
        loading,
        setLoading,
        user,
        setUser,
        otpStatus,
        setOtpStatus,
        resendOTP,
        verifyOTP,
        errorType,
        setErrorType,
        authMe
    }

}