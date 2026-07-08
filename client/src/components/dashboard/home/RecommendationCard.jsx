import React from 'react'
import { ArrowRight } from 'lucide-react'

const priorityClass = {
  High: 'border-rose-200 bg-rose-50 text-rose-700',
  Medium: 'border-amber-200 bg-amber-50 text-amber-800',
  Low: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

export default function RecommendationCard({ recommendation }) {
  const Icon = recommendation.icon

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
          <Icon size={20} aria-hidden="true" />
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityClass[recommendation.priority]}`}>
          {recommendation.priority}
        </span>
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-950">{recommendation.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{recommendation.description}</p>
      <button
        type="button"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 outline-none transition hover:text-sky-700 focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        Review suggestion
        <ArrowRight size={15} aria-hidden="true" />
      </button>
    </article>
  )
}
