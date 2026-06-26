import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { User } from "../types/user.type";


type AuthStoreType = {
    user: User | null;
    pendingVerificationEmail?: string | null;
    isAuthenticated?: boolean;

    setUser: (user: object | null) => void;
    setPendingVerificationEmail?: (email: string | null) => void;
    clearPendingVerificationEmail?: () => void;
    logout?: () => void;
};

export const useAuthStore = create<AuthStoreType>()(

    persist(
        (set) => ({
            user: null,
            pendingVerificationEmail: null,
            isAuthenticated: false,

            setUser: (user: User) => {
                set({
                    user
                })
            },

            setPendingVerificationEmail: (email: string) => {
                set({
                    pendingVerificationEmail: email
                })
            },

            clearPendingVerificationEmail: () => {
                set({
                    pendingVerificationEmail: null
                })
            },

            logout: () => {
                set({
                    user: null,
                    pendingVerificationEmail: null,
                    isAuthenticated: false
                })
            }
        }),

        {
            name: "auth-store"
        }
    )
)