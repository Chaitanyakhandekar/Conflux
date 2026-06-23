import { Toaster } from "react-hot-toast"
import { Routes, Route } from "react-router-dom"
import Register from './pages/auth/Register'
import VerifyOtp from './pages/auth/VerifyOtp'
import ProfileSetup from './pages/user/ProfileSetup'
import Workspace from "./pages/workspace/Workspace"
import Login from "./pages/auth/Login"

function App() {
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
      <Routes>

        <Route path="/" element={<Workspace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />

      </Routes>
    </>
  )
}

export default App
