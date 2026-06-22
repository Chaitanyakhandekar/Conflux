import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"


type AuthStoreType = {
    user: object | null;
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

            setUser: (user: object) => {
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