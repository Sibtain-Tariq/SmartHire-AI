import React from 'react'
import { Sparkles, ArrowUpCircle, CheckCircle2, AlertTriangle, AlertCircle, Info, TrendingUp, Search, Briefcase, Award } from 'lucide-react'

const strengthsMock = [
  {
    id: 's1',
    title: 'Strong Technical Skills',
    explanation: 'You have a high density of in-demand hard skills relevant to the role.',
    icon: TrendingUp,
    impact: 'high', // high, medium
  },
  {
    id: 's2',
    title: 'ATS-Friendly Formatting',
    explanation: 'Your document uses standard fonts and clear headings easily parsed by robots.',
    icon: CheckCircle2,
    impact: 'high',
  },
  {
    id: 's3',
    title: 'Action Verbs Used Effectively',
    explanation: 'You start your bullet points with strong action verbs (e.g., Developed, Managed).',
    icon: Sparkles,
    impact: 'medium',
  },
]

const weaknessesMock = [
  {
    id: 'w1',
    title: 'Missing Measurable Achievements',
    explanation: 'Most of your bullet points describe responsibilities rather than quantified results (e.g., "Increased sales by 20%").',
    icon: AlertTriangle,
    severity: 'critical', // critical, high, medium
  },
  {
    id: 'w2',
    title: 'Limited Leadership Experience',
    explanation: 'There are few mentions of mentoring, leading projects, or cross-functional collaboration.',
    icon: Briefcase,
    severity: 'high',
  },
  {
    id: 'w3',
    title: 'Missing Certifications',
    explanation: 'Adding relevant industry certifications (like AWS Solutions Architect) would significantly boost your profile.',
    icon: Award,
    severity: 'medium',
  },
]

const ImpactBadge = ({ level, type }) => {
  if (type === 'strength') {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
        level === 'high' ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-50 text-emerald-600'
      }`}>
        {level} Impact
      </span>
    )
  }

  // Weakness severity
  const severityStyles = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${severityStyles[level]}`}>
      {level} Priority
    </span>
  )
}

const InsightCard = ({ item, type }) => {
  const Icon = item.icon
  const isStrength = type === 'strength'

  return (
    <div className={`flex flex-col gap-3 rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
      isStrength ? 'border-emerald-100 hover:border-emerald-300' : 'border-red-100 hover:border-red-300'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isStrength ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
          }`}>
            <Icon size={20} />
          </div>
          <h4 className={`font-bold ${isStrength ? 'text-emerald-950' : 'text-slate-900'}`}>
            {item.title}
          </h4>
        </div>
      </div>
      
      <p className="text-sm leading-relaxed text-slate-600">
        {item.explanation}
      </p>

      <div className="mt-auto pt-2">
        <ImpactBadge level={isStrength ? item.impact : item.severity} type={type} />
      </div>
    </div>
  )
}

export default function StrengthsWeaknessesSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-2 font-semibold text-slate-900 px-2">
        <ArrowUpCircle size={20} className="text-indigo-500" />
        Strengths & Weaknesses
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Strengths Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={14} />
            </span>
            Key Strengths
          </h3>
          <div className="flex flex-col gap-4">
            {strengthsMock.map(item => (
              <InsightCard key={item.id} item={item} type="strength" />
            ))}
          </div>
        </div>

        {/* Weaknesses Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-700">
              <AlertCircle size={14} />
            </span>
            Areas for Improvement
          </h3>
          <div className="flex flex-col gap-4">
            {weaknessesMock.map(item => (
              <InsightCard key={item.id} item={item} type="weakness" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
