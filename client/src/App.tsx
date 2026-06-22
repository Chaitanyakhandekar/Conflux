import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Register from './pages/auth/Register'
import VerifyOtp from './pages/auth/VerifyOtp'
import ProfileSetup from './pages/user/ProfileSetup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>

      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />

    </Routes>
  )
}

export default App
