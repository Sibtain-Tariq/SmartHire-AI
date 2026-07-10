import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'
import PublicRoute from '../features/auth/components/PublicRoute'

const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('../features/auth/pages/ResetPasswordPage'))

// Resume Module Routes
const ResumeAnalyzerPage = lazy(() => import('../features/resumes/pages/ResumeAnalyzerPage'))
const JobMatchPage = lazy(() => import('../features/job-match/pages/JobMatchPage'))

// Interview Prep Routes
const InterviewPrepPage = lazy(() => import('../features/interview-prep/pages/InterviewPrepPage'))
const SettingsPage = lazy(() => import('../features/settings/pages/SettingsPage'))
const UserProfilePage = lazy(() => import('../features/profile/pages/UserProfilePage'))

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
        
        {/* Resume Analyzer */}
        <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
        
        {/* Job Matching */}
        <Route path="/job-matching" element={<JobMatchPage />} />

        <Route path="/interviews" element={<InterviewPrepPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </>
  )
}
