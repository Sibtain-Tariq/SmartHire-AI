import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import BaseLayout from './layouts/BaseLayout'
import LandingPage from './pages/LandingPage'
import AppRoutes from './routes/AppRoutes'
import SessionGuard from './features/auth/components/SessionGuard'

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
  </div>
)

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          className: 'dark:bg-slate-800 dark:text-white rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 font-medium text-sm',
          success: { iconTheme: { primary: '#0ea5e9', secondary: '#ffffff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#ffffff' } }
        }} 
      />
      <SessionGuard>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<LandingPage />} />
            {AppRoutes()}
          </Route>
        </Routes>
      </SessionGuard>
    </Suspense>
  )
}
