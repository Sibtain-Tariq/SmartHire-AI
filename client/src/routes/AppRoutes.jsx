import React from 'react'
import { Route } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'

export default function AppRoutes() {
  return (
    <>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/resumes" element={<div className="min-h-screen bg-slate-50 p-8 text-slate-900">Resumes Placeholder</div>} />
      <Route path="/ats" element={<div className="min-h-screen bg-slate-50 p-8 text-slate-900">ATS Placeholder</div>} />
      <Route path="/interviews" element={<div className="min-h-screen bg-slate-50 p-8 text-slate-900">Interviews Placeholder</div>} />
      <Route path="/profile" element={<div className="min-h-screen bg-slate-50 p-8 text-slate-900">Profile Placeholder</div>} />
    </>
  )
}
