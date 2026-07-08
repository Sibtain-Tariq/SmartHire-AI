import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  dashboardFooterNavigation,
  dashboardNavigation,
  productVersion,
} from '../../constants/dashboardNavigation'
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default function Sidebar({ collapsed = false, onToggle, onNavigate }) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 88 : 288 }}
      transition={{ type: 'spring', stiffness: 360, damping: 34 }}
      className="hidden h-screen shrink-0 border-r border-slate-200/80 bg-slate-50/95 p-4 lg:sticky lg:top-0 lg:flex lg:flex-col"
      aria-label="Dashboard navigation"
    >
      <div className="flex items-center justify-between gap-2">
        <Logo collapsed={collapsed} />
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm outline-none transition hover:-translate-y-0.5 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Primary">
        {dashboardNavigation.map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} onSelect={onNavigate} />
        ))}
      </nav>

      <div className="border-t border-slate-200 pt-4">
        {dashboardFooterNavigation.map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} onSelect={onNavigate} />
        ))}
        {!collapsed ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-sm">
            <p className="font-medium text-slate-700">Preview Foundation</p>
            <p className="mt-1">{productVersion}</p>
          </div>
        ) : null}
      </div>
    </motion.aside>
  )
}
