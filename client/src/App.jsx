import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import LandingPage from './pages/LandingPage'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<LandingPage />} />
        {AppRoutes()}
      </Route>
    </Routes>
  )
}
