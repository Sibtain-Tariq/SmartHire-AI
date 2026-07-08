import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const toneClass = {
  sky: 'from-sky-500/12 to-cyan-400/12 text-sky-600',
  indigo: 'from-indigo-600/12 to-sky-500/12 text-indigo-600',
  emerald: 'from-emerald-500/12 to-teal-400/12 text-emerald-600',
  amber: 'from-amber-400/16 to-orange-400/10 text-amber-700',
}

export default function StatCard({ stat, index }) {
  const Icon = stat.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl hover:shadow-slate-200/70"
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${toneClass[stat.tone]}`}>
          <Icon size={21} aria-hidden="true" />
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          <TrendingUp size={13} aria-hidden="true" />
          {stat.trend}
        </div>
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{stat.label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{stat.description}</p>
    </motion.article>
  )
}
