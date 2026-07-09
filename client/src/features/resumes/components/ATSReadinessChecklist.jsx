import React from 'react'
import { CheckCircle2, AlertTriangle, XCircle, ListChecks } from 'lucide-react'

const checklistMock = [
  { id: '1', title: 'Contact Information', description: 'Name, email, and phone number detected.', status: 'passed' },
  { id: '2', title: 'Professional Summary', description: 'Standard overview found at the top.', status: 'passed' },
  { id: '3', title: 'Skills Section', description: 'Dedicated section for skills identified.', status: 'passed' },
  { id: '4', title: 'Work Experience', description: 'Standard chronological format detected.', status: 'passed' },
  { id: '5', title: 'Education', description: 'Missing graduation dates or degree details.', status: 'warning' },
  { id: '6', title: 'Certifications', description: 'No relevant certifications found.', status: 'failed' },
  { id: '7', title: 'ATS Formatting', description: 'No tables, columns, or complex graphics.', status: 'passed' },
  { id: '8', title: 'Proper Headings', description: 'Standard headings like "Experience" used.', status: 'passed' },
  { id: '9', title: 'Consistent Dates', description: 'Date formats are consistent throughout.', status: 'passed' },
  { id: '10', title: 'Action Verbs', description: 'Several bullet points start with passive verbs.', status: 'warning' },
  { id: '11', title: 'Projects', description: 'No standalone projects section detected.', status: 'failed' },
  { id: '12', title: 'LinkedIn URL', description: 'Valid LinkedIn profile URL detected.', status: 'passed' },
  { id: '13', title: 'Portfolio Link', description: 'Missing link to GitHub or portfolio.', status: 'warning' }
]

const statusConfig = {
  passed: {
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hover: 'hover:border-emerald-300',
    label: 'Passed'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    hover: 'hover:border-amber-300',
    label: 'Warning'
  },
  failed: {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    hover: 'hover:border-red-300',
    label: 'Failed'
  }
}

const ChecklistItem = ({ item }) => {
  const config = statusConfig[item.status]
  const Icon = config.icon

  return (
    <div className={`group flex items-start gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${config.border} ${config.hover}`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.color}`}>
        <Icon size={20} />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-slate-900 truncate">
            {item.title}
          </h4>
          <span className={`shrink-0 inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.color}`}>
            {config.label}
          </span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  )
}

export default function ATSReadinessChecklist() {
  const passedCount = checklistMock.filter(i => i.status === 'passed').length

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <ListChecks size={20} className="text-indigo-500" />
          ATS Readiness Checklist
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          {passedCount} / {checklistMock.length} Passed
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {checklistMock.map(item => (
          <ChecklistItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
