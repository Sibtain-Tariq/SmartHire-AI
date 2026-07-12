import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2 } from 'lucide-react'

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Left Sidebar (Branding & Marketing) - Hidden on smaller screens */}
      <div className="hidden w-1/2 flex-col justify-between border-r border-slate-200/80 bg-white p-12 lg:flex xl:w-5/12 dark:border-slate-800/80 dark:bg-slate-900">
        {/* Logo */}
        <Link to="/" className="flex w-max items-center gap-3 rounded-xl outline-none transition focus-visible:ring-2 focus-visible:ring-sky-400">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-200">
            <Sparkles size={18} aria-hidden="true" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">SmartHire AI</span>
        </Link>

        {/* Marketing Text & Illustration */}
        <div className="max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Hire smarter, <br /> not harder.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Join modern teams who use AI to screen resumes, align interviews, and close candidates with unshakeable confidence.
            </p>
            
            <div className="mt-8 space-y-4">
              {['AI-powered resume analysis', 'Structured interview copilots', 'Unbiased candidate scoring'].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={18} className="text-sky-500" />
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Optional Illustration Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-12 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-slate-100 to-slate-50 shadow-sm dark:border-slate-800/60 dark:from-slate-800 dark:to-slate-900"
          >
            {/* Abstract decorative elements */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-sky-100 opacity-60 blur-2xl dark:bg-sky-900/40"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-indigo-100 opacity-60 blur-2xl dark:bg-indigo-900/40"></div>
            <p className="relative z-10 text-sm font-medium text-slate-400 dark:text-slate-500">Illustration Placeholder</p>
          </motion.div>
        </div>

        {/* Small branding / Footer */}
        <div className="text-xs font-medium text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} SmartHire AI. All rights reserved.
        </div>
      </div>

      {/* Right Side (Dynamic Content / Forms) */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12 lg:p-8">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo (visible only on small screens) */}
          <div className="mb-8 flex justify-center lg:hidden">
            <Link to="/" className="flex items-center gap-3 rounded-xl outline-none transition focus-visible:ring-2 focus-visible:ring-sky-400">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-200">
                <Sparkles size={18} aria-hidden="true" />
              </span>
              <span className="text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">SmartHire AI</span>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
