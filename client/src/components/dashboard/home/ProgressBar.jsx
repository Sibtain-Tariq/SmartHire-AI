import React from 'react'

export default function ProgressBar({ value, label }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-950">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}
