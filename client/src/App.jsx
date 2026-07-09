import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import BaseLayout from './layouts/BaseLayout'
import LandingPage from './pages/LandingPage'
import AppRoutes from './routes/AppRoutes'

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
  </div>
)

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<LandingPage />} />
          {AppRoutes()}
        </Route>
      </Routes>
    </Suspense>
  )
}
