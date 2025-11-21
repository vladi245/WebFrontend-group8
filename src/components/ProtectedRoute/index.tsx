import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface Props {
    children: React.ReactElement
    requiredType?: string
}

const ProtectedRoute: React.FC<Props> = ({ children, requiredType }) => {
    const location = useLocation()
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    if (requiredType) {
        const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null
        let user: any = null
        try {
            user = userJson ? JSON.parse(userJson) : null
        } catch (e) {
            user = null
        }

        if (!user || user.type !== requiredType) {
            return <Navigate to="/dashboard" replace />
        }
    }

    return children
}

export default ProtectedRoute
