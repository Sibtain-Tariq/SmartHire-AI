import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Settings, User, CreditCard } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import UserProfileService from '../../services/UserProfileService'

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { session, signOut, isLoading } = useAuth()
  const navigate = useNavigate()

  // Safely retrieve standard profile from session via our centralized service
  const profile = UserProfileService.getProfileFromSession(session?.user)

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-7 w-7 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="hidden h-3 w-16 animate-pulse rounded bg-slate-200 sm:inline-block dark:bg-slate-800" />
      </div>
    )
  }

  if (!profile) {
    return (
      <Link 
        to="/login"
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80"
      >
        <User size={16} />
        <span className="hidden sm:inline-block">Sign In</span>
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-slate-700 outline-none transition hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/80"
      >
        {profile.avatar ? (
          <img 
            src={profile.avatar} 
            alt={profile.fullName} 
            className="flex h-7 w-7 items-center justify-center rounded-full object-cover"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 dark:bg-sky-900/50 dark:text-sky-400">
            {profile.initials}
          </div>
        )}
        <span className="hidden sm:inline-block">{profile.fullName.split(' ')[0]}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to detect outside clicks */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-2 flex items-center gap-3 px-3 pb-3 pt-2">
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.fullName} 
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700 shadow-sm dark:bg-sky-900/50 dark:text-sky-400">
                    {profile.initials}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">{profile.fullName}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{profile.email}</p>
                </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800" />

              <div className="py-2">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 outline-none transition hover:bg-slate-50 focus-visible:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
                >
                  <User size={16} />
                  My Profile
                </Link>
                <Link
                  to="/dashboard/settings/billing"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 outline-none transition hover:bg-slate-50 focus-visible:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
                >
                  <CreditCard size={16} />
                  Billing
                </Link>
                <Link
                  to="/dashboard/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 outline-none transition hover:bg-slate-50 focus-visible:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/50"
                >
                  <Settings size={16} />
                  Settings
                </Link>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800" />

              <div className="pt-2">
                <button
                  onClick={async () => {
                    setIsOpen(false)
                    try {
                      await signOut()
                      toast.success('Logged out successfully.')
                      navigate('/')
                    } catch (error) {
                      console.error('Logout error:', error)
                    }
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 outline-none transition hover:bg-red-50 focus-visible:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10"
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
