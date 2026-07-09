import React from 'react'
import { Route } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'
import PublicRoute from '../features/auth/components/PublicRoute'

export default function AppRoutes() {
  return (
    <>
      {/* Public/Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resumes" element={<div className="min-h-screen bg-slate-50 p-8 text-slate-900">Resumes Placeholder</div>} />
        <Route path="/ats" element={<div className="min-h-screen bg-slate-50 p-8 text-slate-900">ATS Placeholder</div>} />
        <Route path="/interviews" element={<div className="min-h-screen bg-slate-50 p-8 text-slate-900">Interviews Placeholder</div>} />
        <Route path="/profile" element={<div className="min-h-screen bg-slate-50 p-8 text-slate-900">Profile Placeholder</div>} />
      </Route>
    </>
  )
}
