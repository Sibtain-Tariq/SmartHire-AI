import React from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ className = 'hidden w-full max-w-sm md:block' }) {
  return (
    <label className={`relative ${className}`}>
      <span className="sr-only">Search dashboard</span>
      <Search
        size={17}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        placeholder="Search workspace..."
        className="h-10 w-full rounded-2xl border border-slate-200 bg-white/80 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
        aria-label="Search workspace"
      />
    </label>
  )
}
