import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

function ProtectedRouteReverese({ children }) {
    const { user } = useAuth()

    useEffect(() => {
        console.log("User : ", user);

    })

    if (user) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRouteReverese 