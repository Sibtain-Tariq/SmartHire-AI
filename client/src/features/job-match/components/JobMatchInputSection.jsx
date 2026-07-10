import React, { useState } from 'react'
import { FileText, Briefcase, Sparkles, Loader2, CheckCircle2, X, ClipboardPaste, Clock, Activity, File, Calendar } from 'lucide-react'
import { useResumes } from '../../resumes/hooks/useResumes'

export default function JobMatchInputSection({ onAnalyze }) {
  const { resumes } = useResumes()
  
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id || '')
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const selectedResume = resumes.find(r => r.id === selectedResumeId)

  const handleAnalyze = () => {
    if (!selectedResumeId || !jobDescription.trim()) return

    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      if (onAnalyze) onAnalyze(selectedResume, jobDescription)
    }, 2000)
  }

  const getReadingTime = (text) => {
    const words = text.trim().split(/\s+/).length
    if (words === 0 || text.trim() === '') return '< 1 min'
    const mins = Math.ceil(words / 200)
    return `${mins} min read`
  }

  const getScoreStatus = (score) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200'
    if (score >= 75) return 'text-sky-700 bg-sky-50 border-sky-200'
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200'
    return 'text-red-700 bg-red-50 border-red-200'
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Resume Selection Card */}
      <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Selected Resume</h2>
              <p className="text-sm font-medium text-slate-500">Choose the resume to compare against the job description.</p>
            </div>
          </div>
          
          <div className="sm:w-64">
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {resumes.map(r => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedResume && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex flex-col gap-1 border-b sm:border-b-0 sm:border-r border-slate-200/60 pb-3 sm:pb-0 pr-0 sm:pr-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><File size={12} /> Resume Name</span>
              <span className="text-sm font-bold text-slate-900 truncate">{selectedResume.title}</span>
            </div>
            <div className="flex flex-col gap-1 border-b sm:border-b-0 lg:border-r border-slate-200/60 pb-3 sm:pb-0 pr-0 sm:pr-4 pl-0 sm:pl-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Activity size={12} /> Current ATS Score</span>
              <span className={`inline-flex items-center w-fit rounded px-2 py-0.5 text-xs font-bold border ${getScoreStatus(selectedResume.ats_score || 0)}`}>
                {selectedResume.ats_score || 0} / 100
              </span>
            </div>
            <div className="flex flex-col gap-1 border-b sm:border-b-0 sm:border-r border-slate-200/60 pb-3 sm:pb-0 pr-0 sm:pr-4 pl-0 lg:pl-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><FileText size={12} /> File Type</span>
              <span className="text-sm font-bold text-slate-700 uppercase">
                {selectedResume.original_filename?.split('.').pop() || 'PDF'}
              </span>
            </div>
            <div className="flex flex-col gap-1 border-b sm:border-b-0 lg:border-r border-slate-200/60 pb-3 sm:pb-0 pr-0 sm:pr-4 pl-0 sm:pl-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><CheckCircle2 size={12} /> Resume Status</span>
              <span className="text-sm font-bold text-emerald-600 capitalize">{selectedResume.status.replace('_', ' ')}</span>
            </div>
            <div className="flex flex-col gap-1 pl-0 lg:pl-4 pt-3 sm:pt-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Calendar size={12} /> Last Updated</span>
              <span className="text-sm font-semibold text-slate-700">
                {new Date(selectedResume.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Job Description Card */}
      <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Job Description</h2>
              <p className="text-sm font-medium text-slate-500">Paste the complete job description below to compare it with your selected resume.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <textarea
            id="jobDescription"
            placeholder="We are looking for a Software Engineer with experience in React, Python, FastAPI, PostgreSQL, Docker, REST APIs and AWS..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full min-h-[350px] resize-y rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-900 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 rounded-xl p-3 px-4 border border-slate-100">
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <FileText size={14} className="text-slate-400" />
                {jobDescription.length} characters
              </div>
              <div className="h-3 w-px bg-slate-300 hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-400" />
                Est: {getReadingTime(jobDescription)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setJobDescription('')}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200/50 hover:text-slate-700 transition-colors"
              >
                <X size={14} /> Clear
              </button>
              <button 
                onClick={() => {}} // Mock only
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <ClipboardPaste size={14} /> Paste
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Analyze Action */}
      <div className="flex items-center justify-end">
        <button
          onClick={handleAnalyze}
          disabled={!selectedResumeId || !jobDescription.trim() || isAnalyzing}
          className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing Match...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Analyze Match
            </>
          )}
        </button>
      </div>

    </div>
  )
}
