import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

/**
 * PublicRoute
 * Guards routes that should ONLY be accessed by unauthenticated users
 * (e.g., Login, Register, Forgot Password).
 * 
 * If a user with an active session tries to visit these routes, they are
 * gracefully intercepted and redirected to the dashboard (or back to where they came from).
 */
export default function PublicRoute({ children }) {
  const { session } = useAuth()
  const location = useLocation()

  // Intercept already authenticated users
  if (session) {
    // If they were trying to access a specific protected route before being sent to login, 
    // `state.from` holds that original path. We bounce them back there, or default to /dashboard.
    const from = location.state?.from?.pathname || '/dashboard'
    return <Navigate to={from} replace />
  }

  // If unauthenticated, allow them to view the login/register pages
  return children ? children : <Outlet />
}
