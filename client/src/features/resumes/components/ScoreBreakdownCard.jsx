import React from 'react'
import { CheckCircle2, AlertCircle, ShieldAlert, Loader2 } from 'lucide-react'

const getStatusConfig = (score) => {
  if (score >= 90) return { label: 'Excellent', color: 'text-emerald-700', bg: 'bg-emerald-50', bar: 'bg-emerald-500', icon: CheckCircle2 }
  if (score >= 75) return { label: 'Good', color: 'text-sky-700', bg: 'bg-sky-50', bar: 'bg-sky-500', icon: CheckCircle2 }
  if (score >= 60) return { label: 'Needs Improvement', color: 'text-amber-700', bg: 'bg-amber-50', bar: 'bg-amber-500', icon: AlertCircle }
  return { label: 'Poor', color: 'text-red-700', bg: 'bg-red-50', bar: 'bg-red-500', icon: ShieldAlert }
}

export default function ScoreBreakdownCard({ title, score, explanation, impact, icon: Icon, isLoading, isEmpty }) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
          </div>
          <div className="h-6 w-16 rounded-full bg-slate-200" />
        </div>
        <div className="flex items-end gap-2 mt-2">
          <div className="h-8 w-12 rounded bg-slate-200" />
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 mt-2 dark:bg-slate-800">
          <div className="h-full w-1/3 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="h-3 w-full rounded bg-slate-200 mt-2" />
        <div className="h-3 w-2/3 rounded bg-slate-200" />
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:bg-slate-900/50 dark:border-slate-800">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
          {Icon && <Icon size={18} />}
          <span className="font-semibold">{title}</span>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center py-4 text-center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Not enough data to calculate score.</span>
        </div>
      </div>
    )
  }

  const status = getStatusConfig(score)
  const StatusIcon = status.icon

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-50">
          {Icon && <Icon size={18} className="text-slate-400 group-hover:text-sky-500 transition-colors dark:text-slate-500" />}
          {title}
        </div>
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.color}`}>
          <StatusIcon size={12} />
          {status.label}
        </span>
      </div>

      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">{score}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div 
          className={`h-full rounded-full ${status.bar} transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-1 text-sm font-medium text-slate-500 leading-relaxed flex-1 dark:text-slate-400">
        {explanation}
      </p>

      {impact && (
        <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Est. Impact</span>
          <span className="inline-flex items-center rounded bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800/50">
            {impact} ATS Score
          </span>
        </div>
      )}
    </div>
  )
}
