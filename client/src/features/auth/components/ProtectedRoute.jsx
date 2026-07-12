import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

/**
 * ProtectedRoute
 * Guards routes that require active authentication (e.g., Dashboard).
 * Automatically handles missing or expired sessions by intercepting the user 
 * and redirecting them to the login page safely.
 */
export default function ProtectedRoute({ children }) {
  const { session } = useAuth()
  const location = useLocation()

  // Intercept unauthenticated users
  if (!session) {
    // Pass the original target location in React Router state.
    // This allows the Login page to seamlessly redirect them back 
    // to their intended destination after a successful authentication!
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If authenticated, render the child component or the nested routes (Outlet)
  return children ? children : <Outlet />
}
