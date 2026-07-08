import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SidebarItem({ item, collapsed = false, onSelect }) {
  const location = useLocation()
  const isActive = item.path !== '#' && location.pathname === item.path
  const Icon = item.icon
  const itemClass = `group relative flex min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-sky-400 ${
    isActive
      ? 'bg-slate-950 text-white shadow-lg shadow-slate-200'
      : 'text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm'
  } ${collapsed ? 'justify-center' : ''}`

  const content = (
    <>
      {isActive ? (
        <motion.span
          layoutId="active-sidebar-item"
          className="absolute inset-0 rounded-2xl bg-slate-950"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        />
      ) : null}
      <span className="relative flex items-center gap-3">
        <Icon size={18} aria-hidden="true" className="shrink-0 transition group-hover:scale-105" />
        {!collapsed ? <span className="truncate">{item.label}</span> : null}
      </span>
    </>
  )

  if (item.isDummy) {
    return (
      <button type="button" className={`${itemClass} w-full`} onClick={onSelect} aria-label={item.label}>
        {content}
      </button>
    )
  }

  return (
    <Link to={item.path} className={itemClass} onClick={onSelect} aria-label={item.label}>
      {content}
    </Link>
  )
}
