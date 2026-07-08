import React from 'react'
import { emptyStateIcon } from '../../../constants/dashboardHomeData'

export default function EmptyState({ title = 'No data yet', description = 'Future activity will appear here.' }) {
  const Icon = emptyStateIcon

  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
        <Icon size={21} aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
    </div>
  )
}
