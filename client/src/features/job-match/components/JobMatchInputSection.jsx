import React, { useState } from 'react'
import { FileText, Briefcase, Sparkles, Loader2, CheckCircle2 } from 'lucide-react'
import { useResumes } from '../../resumes/hooks/useResumes'

export default function JobMatchInputSection({ onAnalyze }) {
  const { resumes } = useResumes()
  
  const [selectedResumeId, setSelectedResumeId] = useState(resumes[0]?.id || '')
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    if (!selectedResumeId || !jobDescription.trim()) return

    setIsAnalyzing(true)
    // Mocking an API call
    setTimeout(() => {
      setIsAnalyzing(false)
      const selectedResume = resumes.find(r => r.id === selectedResumeId)
      if (onAnalyze) onAnalyze(selectedResume, jobDescription)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Configure Your Match</h2>
          <p className="text-sm font-medium text-slate-500">Select a resume and paste the target job description.</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Resume Selection */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <FileText size={16} className="text-slate-400" />
            1. Select Your Resume
          </label>
          <div className="flex flex-col gap-3">
            {resumes.map(resume => (
              <label 
                key={resume.id}
                className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all hover:border-indigo-300 ${
                  selectedResumeId === resume.id 
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' 
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-50/80'
                }`}
              >
                <input
                  type="radio"
                  name="resumeSelection"
                  value={resume.id}
                  checked={selectedResumeId === resume.id}
                  onChange={() => setSelectedResumeId(resume.id)}
                  className="mt-1 h-4 w-4 shrink-0 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className={`font-bold truncate ${selectedResumeId === resume.id ? 'text-indigo-900' : 'text-slate-900'}`}>
                    {resume.title}
                  </span>
                  <span className="text-xs font-medium text-slate-500 truncate">
                    {resume.original_filename} • {(resume.file_size_kb / 1024).toFixed(2)} MB
                  </span>
                </div>
                {selectedResumeId === resume.id && (
                  <CheckCircle2 size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Right Column: Job Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label htmlFor="jobDescription" className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Briefcase size={16} className="text-slate-400" />
              2. Paste Job Description
            </label>
            <span className="text-xs font-semibold text-slate-400">
              {jobDescription.length} chars
            </span>
          </div>
          <div className="relative flex-1">
            <textarea
              id="jobDescription"
              placeholder="Paste the full job description here (e.g., requirements, responsibilities, qualifications)..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="h-full min-h-[200px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-6">
        <button
          onClick={handleAnalyze}
          disabled={!selectedResumeId || !jobDescription.trim() || isAnalyzing}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing Match...
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
