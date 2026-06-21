import { create } from "zustand"
import { devtools } from "zustand/middleware"


type AuthStoreType = {
    user: object | null;
    pendingVerificationEmail?: string | null;
    isAuthenticated?: boolean;

    setUser: (user: object | null) => void;
    setPendingVerificationEmail?: (email: string | null) => void;
    clearPendingVerificationEmail?: () => void;
    logout?: () => void;
};

export const useAuthStore = create<AuthStoreType>(

    (set) => ({
        user: null,

        setUser: (user: object) => {
            set({
                user
            })
        }
    }),

)