import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Download, BarChart3, RefreshCw, Share2, AlertTriangle, X, CheckCircle2, Loader2 } from 'lucide-react'

// Simple tooltip component
const Tooltip = ({ children, text }) => {
  const [show, setShow] = useState(false)
  return (
    <div className="relative flex items-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2.5 py-1 text-xs font-medium text-white shadow-lg pointer-events-none z-10"
          >
            {text}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ResumeActionCenter({ onReplace, onRemove }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showReplaceConfirm, setShowReplaceConfirm] = useState(false)
  const [toast, setToast] = useState(null) // { message, type }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
      if (onRemove) onRemove()
    }, 1500)
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      showToast('Resume analysis complete!')
    }, 2000)
  }

  const handleReplace = () => {
    setShowReplaceConfirm(false)
    if (onReplace) onReplace()
  }

  return (
    <section className="relative flex flex-col sm:flex-row flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-8 pb-4 mt-4">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl"
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            {toast.message}
            <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-white">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modals */}
      <AnimatePresence>
        {(showDeleteConfirm || showReplaceConfirm) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${showDeleteConfirm ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                  {showDeleteConfirm ? <Trash2 size={24} /> : <RefreshCw size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {showDeleteConfirm ? 'Delete Resume?' : 'Replace Resume?'}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {showDeleteConfirm ? 'This action cannot be undone. All ATS data will be lost.' : 'Uploading a new resume will replace the current analysis data.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-8">
                <button 
                  onClick={() => { setShowDeleteConfirm(false); setShowReplaceConfirm(false); }}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                {showDeleteConfirm ? (
                  <button 
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex min-w-[100px] items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-70"
                  >
                    {isDeleting ? <Loader2 size={16} className="animate-spin" /> : 'Delete'}
                  </button>
                ) : (
                  <button 
                    onClick={handleReplace}
                    className="flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-700 transition"
                  >
                    Replace
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <Tooltip text="Permanently delete this resume">
        <button 
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-100 hover:border-red-200"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </Tooltip>

      <Tooltip text="Upload a newer version">
        <button 
          onClick={() => setShowReplaceConfirm(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <RefreshCw size={16} />
          Replace
        </button>
      </Tooltip>

      <div className="hidden sm:block h-6 w-px bg-slate-200 mx-2" />

      <Tooltip text="Export PDF report (Coming Soon)">
        <button disabled className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-400 cursor-not-allowed">
          <Download size={16} />
          Report
        </button>
      </Tooltip>

      <Tooltip text="Share analysis link (Coming Soon)">
        <button disabled className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-400 cursor-not-allowed">
          <Share2 size={16} />
          Share
        </button>
      </Tooltip>

      <Tooltip text="Re-run the ATS engine">
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full sm:w-auto inline-flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <><Loader2 size={16} className="animate-spin" /> Analyzing...</>
          ) : (
            <><BarChart3 size={16} /> Analyze Again</>
          )}
        </button>
      </Tooltip>
      
    </section>
  )
}
