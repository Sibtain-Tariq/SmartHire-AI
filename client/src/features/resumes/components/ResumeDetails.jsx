import React from 'react'
import { FileText, Download, CheckCircle2, AlertCircle, Clock, BarChart3, Target, Sparkles, Building2 } from 'lucide-react'

const statusConfig = {
  parsed: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2, label: 'Successfully Parsed' },
  processing: { color: 'text-sky-600', bg: 'bg-sky-50', icon: Clock, label: 'Currently Processing' },
  needs_review: { color: 'text-amber-600', bg: 'bg-amber-50', icon: AlertCircle, label: 'Requires Manual Review' },
}

export default function ResumeDetails({ resume }) {
  if (!resume) return null

  const status = statusConfig[resume.status] || statusConfig.needs_review
  const StatusIcon = status.icon

  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{resume.title}</h3>
              <p className="text-sm text-slate-500">{resume.original_filename}</p>
            </div>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition">
            <Download size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
          <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.bg} ${status.color}`}>
            <StatusIcon size={14} />
            {status.label}
          </div>
          <span className="text-xs font-medium text-slate-400">
            Uploaded {new Date(resume.created_at).toLocaleDateString()}
          </span>
          <span className="text-xs font-medium text-slate-400">
            {(resume.file_size_kb / 1024).toFixed(2)} MB
          </span>
        </div>
      </div>

      {/* ATS Score Card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <BarChart3 size={18} className="text-sky-500" />
          ATS Parse Results
        </div>
        
        {resume.status === 'processing' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-12 w-12 animate-pulse rounded-full bg-slate-100 mb-3"></div>
            <p className="text-sm font-medium text-slate-500">AI is analyzing document structure...</p>
          </div>
        ) : (
          <>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black tracking-tight text-slate-900">
                {resume.ats_score}%
              </span>
              <span className="mb-1 text-sm font-medium text-slate-500 uppercase tracking-widest">
                Match Score
              </span>
            </div>
            
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div 
                className={`h-full ${resume.ats_score > 80 ? 'bg-emerald-500' : resume.ats_score > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${resume.ats_score}%` }}
              />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Missing Keywords</p>
                <p className="mt-1 text-sm font-medium text-slate-900">React Query, GraphQL</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">Formatting Issues</p>
                <p className="mt-1 text-sm font-medium text-emerald-600">None detected</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Extracted Skills */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 font-semibold text-slate-900">
          <Target size={18} className="text-indigo-500" />
          Extracted Tags
        </div>
        <div className="flex flex-wrap gap-2">
          {resume.tags.length > 0 ? (
            resume.tags.map(tag => (
              <span key={tag} className="inline-flex rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 border border-indigo-100">
                {tag}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500 italic">No tags extracted yet.</p>
          )}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="flex flex-col gap-4 rounded-2xl border border-sky-100 bg-sky-50/50 p-5 shadow-sm">
        <div className="flex items-center gap-2 font-semibold text-sky-900">
          <Sparkles size={18} className="text-sky-500" />
          AI Recommendations
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm border border-slate-100">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-600">1</span>
            Quantify your achievements in the TechCorp role (e.g., "Increased performance by X%").
          </li>
          <li className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm border border-slate-100">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-600">2</span>
            Add a brief summary section targeting the specific job requirements.
          </li>
        </ul>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
          Delete Resume
        </button>
        <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
          Find Matching Jobs
        </button>
      </div>
    </div>
  )
}
