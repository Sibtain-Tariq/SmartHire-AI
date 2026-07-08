import React from 'react'
import { upcomingFeatures } from '../../../constants/dashboardHomeData'

export default function ComingSoonSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {upcomingFeatures.map((feature) => {
        const Icon = feature.icon
        return (
          <article
            key={feature.title}
            aria-label={`${feature.title} coming soon`}
            className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 opacity-80"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
              <Icon size={19} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-700">{feature.title}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Coming Soon</p>
          </article>
        )
      })}
    </div>
  )
}
