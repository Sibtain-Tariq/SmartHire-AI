import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function SlidePanel({ isOpen, onClose, title, children }) {
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
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="relative flex w-full max-w-xl flex-col bg-white shadow-2xl h-full border-l border-slate-200"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-full overflow-y-auto bg-slate-50 p-6 scrollbar-thin scrollbar-thumb-slate-200">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
