import React from 'react'
import { BarChart3, Activity } from 'lucide-react'

const getScoreStatus = (score) => {
  if (score >= 90) return { label: 'Excellent', color: 'text-emerald-700', bg: 'bg-emerald-50', bar: 'bg-emerald-500', stroke: 'text-emerald-500', border: 'border-emerald-200' }
  if (score >= 75) return { label: 'Good', color: 'text-sky-700', bg: 'bg-sky-50', bar: 'bg-sky-500', stroke: 'text-sky-500', border: 'border-sky-200' }
  if (score >= 60) return { label: 'Average', color: 'text-amber-700', bg: 'bg-amber-50', bar: 'bg-amber-500', stroke: 'text-amber-500', border: 'border-amber-200' }
  return { label: 'Needs Improvement', color: 'text-red-700', bg: 'bg-red-50', bar: 'bg-red-500', stroke: 'text-red-500', border: 'border-red-200' }
}

const MiniMetric = ({ label, score }) => {
  const status = getScoreStatus(score)
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        <span className={`font-bold ${status.color}`}>{score}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div 
          className={`h-full rounded-full ${status.bar} transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

export default function ResumeHealthScore({ resume }) {
  if (!resume) return null

  const status = getScoreStatus(resume.ats_score || 0)

  // Mock mini metrics
  const metrics = [
    { label: 'ATS Compatibility', score: 89 },
    { label: 'Recruiter Readability', score: 95 },
    { label: 'Resume Completeness', score: 72 },
    { label: 'Keyword Coverage', score: 82 },
  ]

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm w-full dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-50">
          <Activity size={20} className="text-sky-500" />
          Resume Health Score
        </div>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.bg} ${status.color} ${status.border}`}>
          {status.label}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Left Side: Circular Gauge */}
        <div className="flex flex-col items-center justify-center md:w-1/3">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-slate-50 shadow-inner dark:border-slate-800/50">
            <svg className="absolute inset-0 h-full w-full -rotate-90 transform transition-all duration-1000 ease-out" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
              <circle 
                cx="50" cy="50" r="46" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="8" 
                className={status.stroke} 
                strokeDasharray={`${(resume.ats_score || 0) * 2.89} 289`} 
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50">{resume.ats_score || 0}</span>
              <span className="text-xs font-medium text-slate-400 mt-1 dark:text-slate-500">/ 100</span>
            </div>
          </div>
          <p className="mt-6 text-center text-sm font-medium text-slate-500 max-w-xs dark:text-slate-400">
            Your resume is well optimized for ATS systems, but there are several areas that could improve your interview chances.
          </p>
        </div>

        {/* Right Side: Mini Metrics */}
        <div className="flex flex-col justify-center gap-6 md:w-2/3 md:border-l md:border-slate-100 md:pl-8 dark:md:border-slate-800">
          <div className="grid gap-6 sm:grid-cols-2">
            {metrics.map(metric => (
              <MiniMetric key={metric.label} label={metric.label} score={metric.score} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          Last Analyzed: {new Date(resume.updated_at || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
        <button disabled className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 cursor-not-allowed transition hover:text-slate-500 dark:text-slate-600">
          <BarChart3 size={14} />
          Analyze Again
        </button>
      </div>
    </div>
  )
}
