import React from 'react'

const widthClassByValue = {
  78: 'w-[78%]',
  82: 'w-[82%]',
  84: 'w-[84%]',
  92: 'w-[92%]',
}

export default function ProgressBar({ value, label }) {
  const widthClass = widthClassByValue[value] || 'w-full'

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-950">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        <div className={`h-full rounded-full bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400 ${widthClass}`} />
      </div>
    </div>
  )
}
