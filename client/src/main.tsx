import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from './config/env.config.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={"909704884132-pnumc72l30frptf886q4d1c3qofrr87a.apps.googleusercontent.com"}>
      <StrictMode>
        <App />
      </StrictMode>
    </GoogleOAuthProvider>
  </BrowserRouter>
)
