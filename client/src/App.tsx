import { Toaster } from "react-hot-toast"
import { Routes, Route } from "react-router-dom"
import Register from './pages/auth/Register'
import VerifyOtp from './pages/auth/VerifyOtp'
import ProfileSetup from './pages/user/ProfileSetup'
import Workspace from "./pages/workspace/Workspace"
import Login from "./pages/auth/Login"
import { UIProvider } from "./contexts/UIContext"
import ProtectedRoute from "./routes/ProtectedRoute"
import ProtectedRouteReverese from "./routes/ProtectedRouteReverese"
import { useEffect } from "react"
import { useAuth } from "./hooks/useAuth"
import { useAuthStore } from "./store/auth-store"
import SendVerificationOtp from "./pages/auth/SendVerificationOtp"

function App() {

  const { authMe } = useAuth()

  const authMeP = async () => {
    await authMe()
  }

  useEffect(() => {
    authMeP()
  }, [])

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e1b4b",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            iconTheme: { primary: "#a855f7", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
          },
        }}
      />
      <UIProvider>
        <Routes>

          <Route path="/" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRouteReverese><Register /></ProtectedRouteReverese>} />
          <Route path="/login" element={<ProtectedRouteReverese><Login /></ProtectedRouteReverese>} />
          <Route path="/verify-otp" element={<ProtectedRouteReverese><VerifyOtp /></ProtectedRouteReverese>} />
          <Route path="/send-otp" element={<ProtectedRouteReverese><SendVerificationOtp /></ProtectedRouteReverese>} />
          <Route path="/profile-setup" element={<ProfileSetup />} />

        </Routes>
      </UIProvider>
    </>
  )
}

export default App
