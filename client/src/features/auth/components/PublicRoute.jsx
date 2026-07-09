import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
// TODO: Re-enable useAuth when authentication is ready
// import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function PublicRoute({ children }) {
  // TODO: Re-enable real authentication checks
  // const { isAuthenticated, loading } = useAuth()
  const loading = false
  const isAuthenticated = false // False so guests don't instantly get bounced to dashboard from login page if they try to look at the UI

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children ? children : <Outlet />
}
