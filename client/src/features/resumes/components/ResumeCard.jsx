import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, MoreVertical, CheckCircle2, Clock, AlertCircle, Download, Trash2, ExternalLink } from 'lucide-react'

const statusConfig = {
  parsed: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2, label: 'Parsed' },
  processing: { color: 'text-sky-600', bg: 'bg-sky-50', icon: Clock, label: 'Processing' },
  needs_review: { color: 'text-amber-600', bg: 'bg-amber-50', icon: AlertCircle, label: 'Needs Review' },
}

export default function ResumeCard({ resume, index }) {
  const status = statusConfig[resume.status] || statusConfig.needs_review
  const StatusIcon = status.icon

  const formattedDate = new Date(resume.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/60"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FileText size={22} />
          </div>
          <div className="flex gap-2">
            <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.bg} ${status.color}`}>
              <StatusIcon size={14} />
              {status.label}
            </div>
            <button className="text-slate-400 hover:text-slate-900 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <Link to={`/resumes/${resume.id}`} className="block">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
              {resume.title}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-slate-500 truncate">{resume.original_filename}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {resume.tags.slice(0, 3).map(tag => (
            <span key={tag} className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
          {resume.tags.length > 3 && (
            <span className="inline-flex rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-400">
              +{resume.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">ATS Match</span>
          <span className="text-lg font-bold text-slate-900">
            {resume.status === 'processing' ? '--' : `${resume.ats_score}%`}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Updated</p>
          <p className="text-sm font-medium text-slate-700">{formattedDate}</p>
        </div>
      </div>
      
      {/* Quick Actions overlay on hover */}
      <div className="absolute bottom-5 left-5 right-5 flex justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 bg-white/90 backdrop-blur-sm pt-2 rounded-b-xl border-t border-transparent">
        <Link to={`/resumes/${resume.id}`} className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-600 hover:bg-sky-100">
          <ExternalLink size={16} /> Open
        </Link>
        <button className="inline-flex justify-center items-center rounded-xl bg-slate-50 px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          <Download size={16} />
        </button>
        <button className="inline-flex justify-center items-center rounded-xl bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100">
          <Trash2 size={16} />
        </button>
      </div>
    </motion.article>
  )
}
