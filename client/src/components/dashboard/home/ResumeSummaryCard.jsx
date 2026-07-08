import React from 'react'
import { FileText } from 'lucide-react'
import { resumeSummary } from '../../../constants/dashboardHomeData'
import ProgressBar from './ProgressBar'

export default function ResumeSummaryCard() {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FileText size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Current Resume</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-950">{resumeSummary.title}</h3>
          </div>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {resumeSummary.status}
        </span>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Uploaded</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">{resumeSummary.uploadDate}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Updated</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">{resumeSummary.lastUpdated}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Strength</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">{resumeSummary.strength}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <ProgressBar label="Resume Completion" value={resumeSummary.completion} />
      </div>

      <button
        type="button"
        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm outline-none transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        View Resume
      </button>
    </article>
  )
}
