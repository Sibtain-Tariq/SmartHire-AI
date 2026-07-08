import React from 'react'
import { recentReports, reportActions } from '../../../constants/dashboardHomeData'

export default function RecentReportsTable() {
  const ViewIcon = reportActions.view
  const DownloadIcon = reportActions.download

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[1.4fr_0.8fr_0.6fr_0.8fr_0.8fr] border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:grid">
        <span>Report Name</span>
        <span>Date</span>
        <span>ATS Score</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>
      <div className="divide-y divide-slate-100">
        {recentReports.map((report) => (
          <article key={report.name} className="grid gap-3 px-5 py-4 md:grid-cols-[1.4fr_0.8fr_0.6fr_0.8fr_0.8fr] md:items-center">
            <div>
              <p className="font-semibold text-slate-950">{report.name}</p>
              <p className="mt-1 text-sm text-slate-500 md:hidden">{report.date}</p>
            </div>
            <p className="hidden text-sm text-slate-600 md:block">{report.date}</p>
            <p className="text-sm font-semibold text-slate-950">{report.score}%</p>
            <div>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
                {report.status}
              </span>
            </div>
            <div className="flex gap-2 md:justify-end">
              <button
                type="button"
                aria-label={`View ${report.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 outline-none transition hover:-translate-y-0.5 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <ViewIcon size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={`Download ${report.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 outline-none transition hover:-translate-y-0.5 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <DownloadIcon size={16} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
