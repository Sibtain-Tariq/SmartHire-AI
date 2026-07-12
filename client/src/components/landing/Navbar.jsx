import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, LogIn, Sparkles, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeProvider'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'ATS', href: '#ats' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-sky-500 to-cyan-400 text-sm font-semibold text-white shadow-lg shadow-sky-200">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50 dark:text-slate-50">SmartHire AI</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">AI recruiting platform</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-400 md:flex dark:text-slate-300">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-slate-900 dark:text-slate-50 dark:hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 text-slate-600 dark:text-slate-400 transition hover:bg-slate-50 dark:bg-slate-900 hover:text-slate-900 dark:text-slate-50 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white mr-2"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          {/* TODO: Revert to /login when authentication is re-enabled */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:bg-white dark:bg-slate-950 dark:text-slate-900 dark:text-slate-50 dark:hover:bg-slate-200 dark:shadow-none"
          >
            Login
            <LogIn size={16} />
          </Link>
          {/* TODO: Revert to /register when authentication is re-enabled */}
          <Link
            to="/dashboard"
            className="hidden items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 sm:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white"
          >
            Sign up
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
