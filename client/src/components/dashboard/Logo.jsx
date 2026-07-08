import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Logo({ collapsed = false }) {
  return (
    <Link
      to="/dashboard"
      aria-label="SmartHire AI dashboard"
      className="group flex min-h-12 items-center gap-3 rounded-2xl px-2 outline-none transition focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-sky-500 to-cyan-400 text-white shadow-lg shadow-sky-200 transition group-hover:scale-105">
        <Sparkles size={18} aria-hidden="true" />
      </span>
      {!collapsed ? (
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-slate-950">SmartHire AI</span>
          <span className="block truncate text-xs text-slate-500">Dashboard Preview</span>
        </span>
      ) : null}
    </Link>
  )
}
