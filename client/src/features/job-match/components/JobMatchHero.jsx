import React, { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle, ShieldAlert, RefreshCw, FileText, Briefcase, Calendar, Sparkles } from 'lucide-react'

export default function JobMatchHero({ matchData, onAnalyzeAgain }) {
  const [score, setScore] = useState(0)
  const targetScore = 86 // Mock data
  
  useEffect(() => {
    let start = 0
    const duration = 1500
    const increment = targetScore / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= targetScore) {
        setScore(targetScore)
        clearInterval(timer)
      } else {
        setScore(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [targetScore])

  const getScoreConfig = (val) => {
    if (val >= 90) return { label: 'Excellent Match', color: 'text-emerald-500', textColors: 'text-emerald-950', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-800', stroke: 'stroke-emerald-500', icon: CheckCircle2 }
    if (val >= 75) return { label: 'Good Match', color: 'text-sky-500', textColors: 'text-sky-950', bg: 'bg-sky-50', badge: 'bg-sky-100 text-sky-800', stroke: 'stroke-sky-500', icon: CheckCircle2 }
    if (val >= 60) return { label: 'Average Match', color: 'text-amber-500', textColors: 'text-amber-950', bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-800', stroke: 'stroke-amber-500', icon: AlertCircle }
    return { label: 'Needs Improvement', color: 'text-red-500', textColors: 'text-red-950', bg: 'bg-red-50', badge: 'bg-red-100 text-red-800', stroke: 'stroke-red-500', icon: ShieldAlert }
  }

  const config = getScoreConfig(targetScore)
  const StatusIcon = config.icon

  // SVG calculations for circle
  const size = 220
  const strokeWidth = 16
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      
      {/* Top Bar: Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Sparkles size={20} className="text-indigo-500" />
          Match Overview
        </div>
        
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
            <FileText size={14} className="text-slate-400" />
            <span className="truncate max-w-[150px]">{matchData?.resume?.title || 'Senior_Software_Engineer_Resume.pdf'}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
            <Briefcase size={14} className="text-slate-400" />
            <span className="truncate max-w-[150px]">Software Engineer (Mock Title)</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
            <Calendar size={14} className="text-slate-400" />
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Main Content: Circular Progress & Details */}
      <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 mt-2">
        
        {/* Left: Circular Chart */}
        <div className="relative flex shrink-0 items-center justify-center">
          <svg width={size} height={size} className="rotate-[-90deg]">
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className="fill-none stroke-slate-100"
              strokeWidth={strokeWidth}
            />
            {/* Progress Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className={`fill-none ${config.stroke} transition-all duration-300 ease-out`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black tracking-tighter text-slate-900">
              {score}%
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
              Match Score
            </span>
          </div>
        </div>

        {/* Right: Status & Explanation */}
        <div className="flex flex-col flex-1 text-center sm:text-left">
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${config.badge}`}>
              <StatusIcon size={14} />
              {config.label}
            </span>
          </div>
          
          <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-4 ${config.textColors}`}>
            {config.label}
          </h3>
          
          <p className="text-base font-medium leading-relaxed text-slate-600 mb-8 max-w-lg">
            Your resume aligns well with this job description. Adding a few missing technical keywords and emphasizing leadership experience could significantly improve your ATS compatibility.
          </p>
          
          <div>
            <button 
              onClick={onAnalyzeAgain}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              <RefreshCw size={16} />
              Analyze Again
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

