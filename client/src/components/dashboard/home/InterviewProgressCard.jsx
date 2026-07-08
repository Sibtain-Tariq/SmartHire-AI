import React from 'react'
import { MessageSquare } from 'lucide-react'
import { interviewProgress } from '../../../constants/dashboardHomeData'

export default function InterviewProgressCard() {
  const circumference = 2 * Math.PI * 44
  const offset = circumference - (interviewProgress.completion / 100) * circumference

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
        <MessageSquare size={18} aria-hidden="true" />
        Interview Progress
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-[8rem_1fr] sm:items-center">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 104 104" className="h-32 w-32 -rotate-90" aria-hidden="true">
            <circle cx="52" cy="52" r="44" strokeWidth="10" className="fill-none stroke-slate-100" />
            <circle
              cx="52"
              cy="52"
              r="44"
              strokeWidth="10"
              strokeLinecap="round"
              className="fill-none stroke-sky-500"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-slate-950">{interviewProgress.completion}%</span>
            <span className="text-xs font-medium text-slate-400">Practice</span>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Attempted</dt>
            <dd className="mt-1 text-2xl font-semibold text-slate-950">{interviewProgress.attempted}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Average</dt>
            <dd className="mt-1 text-2xl font-semibold text-slate-950">{interviewProgress.averageScore}/10</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Best</dt>
            <dd className="mt-1 text-2xl font-semibold text-slate-950">{interviewProgress.bestScore}/10</dd>
          </div>
        </dl>
      </div>
      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Next Suggested Practice</p>
        <p className="mt-1 text-sm font-semibold text-slate-800">{interviewProgress.nextPractice}</p>
      </div>
    </article>
  )
}
