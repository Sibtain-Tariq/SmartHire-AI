import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Quote, UploadCloud } from 'lucide-react'
import { currentFocus, dashboardUser } from '../../../constants/dashboardHomeData'



export default function DashboardHero() {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())
  const FocusIcon = currentFocus.icon

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.22),_transparent_34%),linear-gradient(135deg,_#ffffff_0%,_#eef6ff_55%,_#f8fafc_100%)] dark:border-slate-800 dark:bg-slate-900 dark:bg-none p-6 shadow-sm sm:p-8"
    >
      <div className="absolute right-8 top-8 hidden h-24 w-24 rounded-full border border-white/80 bg-white/50 blur-2xl lg:block dark:border-slate-800/80 dark:bg-slate-800/50" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800/75 dark:text-slate-300">
            <Calendar size={15} aria-hidden="true" className="text-sky-600" />
            {formattedDate}
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-slate-50">
            Welcome back, {dashboardUser.name}.
          </h1>
          <div className="mt-4 flex max-w-3xl gap-3 text-base leading-7 text-slate-600 dark:text-slate-400">
            <Quote size={20} aria-hidden="true" className="mt-1 shrink-0 text-sky-500" />
            <p>{dashboardUser.quote}</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 outline-none transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-sky-400 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:shadow-none"
            >
              Continue Preparing
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white"
            >
              <UploadCloud size={16} aria-hidden="true" />
              Upload Resume
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/80 bg-white/70 p-5 shadow-xl shadow-sky-100/60 backdrop-blur dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-200 dark:bg-slate-800 dark:shadow-none">
            <FocusIcon size={22} aria-hidden="true" />
          </div>
          <p className="mt-5 text-sm font-semibold text-slate-950 dark:text-slate-50">{currentFocus.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{currentFocus.value}</p>
        </div>
      </div>
    </motion.section>
  )
}
