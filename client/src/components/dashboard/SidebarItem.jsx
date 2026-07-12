import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export default function SidebarItem({ item, collapsed = false, onSelect, layoutId = 'active-sidebar-item' }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const isActive = item.path !== '#' && location.pathname.startsWith(item.path) && (item.path !== '/dashboard' || location.pathname === '/dashboard')
  const Icon = item.icon
  
  const hasChildren = item.children && item.children.length > 0
  const [isOpen, setIsOpen] = useState(isActive)

  useEffect(() => {
    if (isActive && !isOpen) {
      setIsOpen(true)
    }
  }, [isActive])

  const itemClass = `group relative flex w-full min-h-11 items-center gap-3 rounded-2xl px-3 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-sky-400 ${
    isActive && !hasChildren
      ? 'bg-slate-950 text-white shadow-lg shadow-slate-200'
      : isActive && hasChildren
      ? 'text-sky-600 bg-sky-50/50'
      : 'text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm'
  } ${collapsed ? 'justify-center' : ''}`

  const content = (
    <>
      {isActive && !hasChildren ? (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-2xl bg-slate-950"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        />
      ) : null}
      <span className="relative flex w-full items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <Icon size={18} aria-hidden="true" className="shrink-0 transition group-hover:scale-105" />
          {!collapsed ? <span className="truncate">{item.label}</span> : null}
        </span>
        {hasChildren && !collapsed && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
      </span>
    </>
  )

  const renderWrapper = () => {
    if (item.isDummy || hasChildren) {
      return (
        <button 
          type="button" 
          className={itemClass} 
          onClick={async (e) => {
            if (hasChildren) {
              e.preventDefault();
              setIsOpen(!isOpen);
            } else if (item.path === '#logout') {
              await signOut();
              navigate('/');
              if (onSelect) onSelect(e);
            } else if (onSelect) {
              onSelect(e);
            }
          }} 
          aria-label={item.label}
        >
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

  return (
    <div className="flex flex-col gap-1">
      {renderWrapper()}
      
      <AnimatePresence>
        {hasChildren && isOpen && !collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="ml-10 flex flex-col gap-1 py-1">
              {item.children.map((child, index) => {
                const isChildActive = location.pathname === child.path
                return (
                  <Link
                    key={index}
                    to={child.path}
                    onClick={onSelect}
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                      isChildActive 
                        ? 'bg-sky-100/50 font-medium text-sky-700' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {child.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
