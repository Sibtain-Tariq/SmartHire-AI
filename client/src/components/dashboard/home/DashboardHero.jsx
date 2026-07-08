import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Quote, UploadCloud } from 'lucide-react'
import { currentFocus, dashboardUser } from '../../../constants/dashboardHomeData'

const formattedDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}).format(new Date())

export default function DashboardHero() {
  const FocusIcon = currentFocus.icon

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.22),_transparent_34%),linear-gradient(135deg,_#ffffff_0%,_#eef6ff_55%,_#f8fafc_100%)] p-6 shadow-sm sm:p-8"
    >
      <div className="absolute right-8 top-8 hidden h-24 w-24 rounded-full border border-white/80 bg-white/50 blur-2xl lg:block" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
            <Calendar size={15} aria-hidden="true" className="text-sky-600" />
            {formattedDate}
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Welcome back, {dashboardUser.name}.
          </h1>
          <div className="mt-4 flex max-w-3xl gap-3 text-base leading-7 text-slate-600">
            <Quote size={20} aria-hidden="true" className="mt-1 shrink-0 text-sky-500" />
            <p>{dashboardUser.quote}</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 outline-none transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Continue Preparing
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <UploadCloud size={16} aria-hidden="true" />
              Upload Resume
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/80 bg-white/70 p-5 shadow-xl shadow-sky-100/60 backdrop-blur">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-200">
            <FocusIcon size={22} aria-hidden="true" />
          </div>
          <p className="mt-5 text-sm font-semibold text-slate-950">{currentFocus.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{currentFocus.value}</p>
        </div>
      </div>
    </motion.section>
  )
}
