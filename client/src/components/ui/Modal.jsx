import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-3xl' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
            className={`relative flex w-full flex-col rounded-3xl bg-white shadow-2xl ${maxWidth} max-h-[90vh] overflow-hidden`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
