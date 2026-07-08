import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme preview"
      aria-pressed={isDark}
      className="flex h-10 items-center gap-1 rounded-2xl border border-slate-200 bg-white/80 p-1 text-slate-600 shadow-sm outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
          !isDark ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500'
        }`}
      >
        <Sun size={15} aria-hidden="true" />
      </span>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
          isDark ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500'
        }`}
      >
        <Moon size={15} aria-hidden="true" />
      </span>
    </button>
  )
}
