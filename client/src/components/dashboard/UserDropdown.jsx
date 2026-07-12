import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockUser } from '../../constants/dashboardNavigation'
import { useAuth } from '../../../hooks/useAuth'

const menuItems = [
  { label: 'Profile', icon: User, path: '/profile' },
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Logout', icon: LogOut, path: '/logout' },
]

export default function UserDropdown() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const { signOut } = useAuth()

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open user menu"
        aria-expanded={open}
        aria-haspopup="true"
        className="flex h-10 items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 pl-1.5 pr-3 text-left shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-xs font-semibold text-white">
          {mockUser.initials}
        </span>
        <span className="hidden min-w-0 sm:block">
          <span className="block truncate text-xs font-semibold text-slate-800">{mockUser.name}</span>
          <span className="block truncate text-[11px] text-slate-500">Preview user</span>
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            role="menu"
            aria-orientation="vertical"
            aria-label="User menu"
            className="absolute right-0 top-12 z-30 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200"
          >
            <div className="mb-2 rounded-xl bg-slate-50 px-3 py-3" role="presentation">
              <p className="text-sm font-semibold text-slate-900">{mockUser.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{mockUser.email}</p>
            </div>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    type="button"
                    role="menuitem"
                    onClick={async () => {
                      setOpen(false)
                      if (item.path === '/logout') {
                        await signOut()
                        navigate('/')
                      } else {
                        navigate(item.path)
                      }
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 outline-none transition hover:bg-slate-50 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
