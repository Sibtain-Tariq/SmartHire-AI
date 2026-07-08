import React from 'react'
import { FileSearch } from 'lucide-react'
import { atsSummary } from '../../../constants/dashboardHomeData'
import ProgressBar from './ProgressBar'

export default function ATSOverviewCard() {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
            <FileSearch size={18} aria-hidden="true" />
            ATS Summary
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">Mock readiness signals for your current resume.</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-semibold tracking-tight text-slate-950">{atsSummary.overallScore}%</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Overall</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {atsSummary.metrics.map((metric) => (
          <ProgressBar key={metric.label} label={metric.label} value={metric.value} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">Missing Keywords</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {atsSummary.missingKeywords.map((keyword) => (
            <span key={keyword} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
