import React from 'react'
import { Sparkles, ArrowUpCircle, CheckCircle2, AlertTriangle, AlertCircle, Info, TrendingUp, Search, Briefcase, Award, Layers, Type, Cloud, Target, Code } from 'lucide-react'

const strengthsMock = [
  {
    id: 's1',
    title: 'Strong formatting',
    explanation: 'Your document uses standard fonts and clear headings easily parsed by robots.',
    icon: CheckCircle2,
    severity: 'High',
    impact: '+8',
  },
  {
    id: 's2',
    title: 'Excellent technical skills',
    explanation: 'You have a high density of in-demand hard skills relevant to the role.',
    icon: Code,
    severity: 'High',
    impact: '+12',
  },
  {
    id: 's3',
    title: 'Consistent section hierarchy',
    explanation: 'Standard logical ordering from experience to education.',
    icon: Layers,
    severity: 'Medium',
    impact: '+5',
  },
  {
    id: 's4',
    title: 'Good readability',
    explanation: 'Professional tone with excellent grammar and structure.',
    icon: Type,
    severity: 'Medium',
    impact: '+4',
  },
  {
    id: 's5',
    title: 'Strong action verbs',
    explanation: 'You start your bullet points with strong action verbs.',
    icon: Sparkles,
    severity: 'High',
    impact: '+6',
  },
]

const weaknessesMock = [
  {
    id: 'w1',
    title: 'Missing certifications',
    explanation: 'Adding relevant industry certifications would significantly boost your profile.',
    icon: Award,
    severity: 'Medium',
    impact: '+4',
  },
  {
    id: 'w2',
    title: 'Weak project descriptions',
    explanation: 'Project descriptions are too brief and lack GitHub/live links.',
    icon: Briefcase,
    severity: 'High',
    impact: '+8',
  },
  {
    id: 'w3',
    title: 'Few measurable achievements',
    explanation: 'Most bullet points describe responsibilities rather than quantified results.',
    icon: TrendingUp,
    severity: 'Critical',
    impact: '+15',
  },
  {
    id: 'w4',
    title: 'Missing cloud technologies',
    explanation: 'Target role highly values AWS or Azure experience which is missing.',
    icon: Cloud,
    severity: 'High',
    impact: '+10',
  },
  {
    id: 'w5',
    title: 'Low keyword coverage',
    explanation: 'Missing several key requirements from the job description.',
    icon: Target,
    severity: 'Critical',
    impact: '+20',
  },
]

const SeverityBadge = ({ severity, type }) => {
  const isStrength = type === 'strength'
  
  if (isStrength) {
    const styles = {
      High: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      Medium: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    }
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${styles[severity] || styles.Medium}`}>
        {severity} Value
      </span>
    )
  }

  const severityStyles = {
    Critical: 'bg-red-100 text-red-800 border-red-200',
    High: 'bg-orange-100 text-orange-800 border-orange-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${severityStyles[severity] || severityStyles.Medium}`}>
      {severity} Priority
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
      
      <p className="text-sm leading-relaxed text-slate-600 flex-1">
        {item.explanation}
      </p>

      <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between">
        <SeverityBadge severity={item.severity} type={type} />
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Est. Impact</span>
          <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold border ${
            isStrength ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'
          }`}>
            {item.impact} Score
          </span>
        </div>
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
