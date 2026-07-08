import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { mockNotifications } from '../../constants/dashboardNavigation'

export default function NotificationButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-600 shadow-sm outline-none transition hover:-translate-y-0.5 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <Bell size={17} aria-hidden="true" />
        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-sky-500" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-12 z-30 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200"
          >
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Notifications
            </p>
            <div className="space-y-1">
              {mockNotifications.map((item) => (
                <div key={item} className="rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
