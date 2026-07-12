import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: '3.2x', label: 'faster screening' },
  { value: '94%', label: 'candidate satisfaction' },
  { value: '48h', label: 'average shortlist' },
  { value: '20+', label: 'integrations' },
]

export default function StatsSection() {
  return (
    <section className="border-y border-slate-200/80 bg-white/70 px-4 py-8 sm:px-6 lg:px-8 dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.07 }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
          >
            <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 dark:text-slate-50">{item.value}</p>
            <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400 dark:text-slate-400">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
