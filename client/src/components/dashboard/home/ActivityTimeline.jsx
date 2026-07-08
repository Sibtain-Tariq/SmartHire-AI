import React from 'react'
import { motion } from 'framer-motion'
import { activityTimeline } from '../../../constants/dashboardHomeData'

export default function ActivityTimeline() {
  return (
    <ol className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-label="Recent activity timeline">
      {activityTimeline.map((activity, index) => {
        const Icon = activity.icon
        const isLast = index === activityTimeline.length - 1

        return (
          <motion.li
            key={activity.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.26, delay: index * 0.05 }}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            {!isLast ? <span className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-slate-200" /> : null}
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sky-600">
              <Icon size={18} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-slate-950">{activity.title}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {activity.status}
                </span>
              </span>
              <span className="mt-1 block text-sm text-slate-500">{activity.time}</span>
            </span>
          </motion.li>
        )
      })}
    </ol>
  )
}
