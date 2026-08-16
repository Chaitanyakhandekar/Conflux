import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

function ProfileSetupRestriction({ children }) {
    const { user } = useAuth()


    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (user && !user.setupProfile) {
        return <Navigate to="/profile-setup" replace />
    }

    return children
}

export default ProfileSetupRestriction