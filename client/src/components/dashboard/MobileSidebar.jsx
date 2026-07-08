import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import {
  dashboardFooterNavigation,
  dashboardNavigation,
  productVersion,
} from '../../constants/dashboardNavigation'
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default function MobileSidebar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation drawer"
            className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile dashboard navigation"
            className="fixed inset-y-0 left-0 z-50 flex w-[min(22rem,calc(100vw-2rem))] flex-col border-r border-slate-200 bg-slate-50 p-4 shadow-2xl lg:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close sidebar"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 outline-none transition hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Mobile primary">
              {dashboardNavigation.map((item) => (
                <SidebarItem key={item.label} item={item} onSelect={onClose} />
              ))}
            </nav>

            <div className="border-t border-slate-200 pt-4">
              {dashboardFooterNavigation.map((item) => (
                <SidebarItem key={item.label} item={item} onSelect={onClose} />
              ))}
              <p className="mt-4 px-3 text-xs font-medium text-slate-500">{productVersion}</p>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
