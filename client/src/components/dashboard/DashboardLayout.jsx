import React, { useState } from 'react'
import { motion } from 'framer-motion'
import MobileSidebar from './MobileSidebar'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'

export default function DashboardLayout({ title = 'Dashboard', breadcrumbItems, children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-950">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((value) => !value)}
        onNavigate={() => setMobileOpen(false)}
      />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopNavbar
          title={title}
          breadcrumbItems={breadcrumbItems}
          onMenuClick={() => setMobileOpen(true)}
          onSidebarToggle={() => setMobileOpen(true)}
        />
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
