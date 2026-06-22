import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth-store";
import { useState } from "react";
import type { RegisterUserType } from "../types/user.type";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type OTPStatus = 'sending' | "sent" | "verified" | "invalid" | "verifying"

export const useAuth = (): any => {

    const [loading, setLoading] = useState<boolean>(false)
    const [otpStatus, setOtpStatus] = useState<OTPStatus>("sent")
    const navigate = useNavigate()
    const {
        user,
        setUser,
        setPendingVerificationEmail,
        pendingVerificationEmail
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



    return {
        register,
        loading,
        setLoading,
        user,
        setUser,
        otpStatus,
        setOtpStatus,
        resendOTP,
        verifyOTP
    }

}