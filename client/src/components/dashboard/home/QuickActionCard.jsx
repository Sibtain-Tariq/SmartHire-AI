import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function QuickActionCard({ action, index }) {
  const Icon = action.icon
  const navigate = useNavigate()

  return (
    <motion.button
      type="button"
      onClick={() => action.path && navigate(action.path)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      className="group min-w-[16rem] rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm outline-none transition hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/70 focus-visible:ring-2 focus-visible:ring-sky-400 md:min-w-0"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-sky-600 transition group-hover:bg-sky-50 group-hover:text-sky-700">
          <Icon size={22} aria-hidden="true" />
        </span>
        <ArrowRight size={17} aria-hidden="true" className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-700" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-950">{action.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{action.description}</p>
    </motion.button>
  )
}
