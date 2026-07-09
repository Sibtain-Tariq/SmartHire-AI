import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, FileText, Download, CheckCircle2, AlertCircle, Clock, BarChart3, Target, Sparkles, Building2, Trash2, RefreshCw } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import { useResumes } from '../hooks/useResumes'
import ResumeDropzone from '../components/ResumeDropzone'

const statusConfig = {
  parsed: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2, label: 'Successfully Parsed' },
  processing: { color: 'text-sky-600', bg: 'bg-sky-50', icon: Clock, label: 'Currently Processing' },
  needs_review: { color: 'text-amber-600', bg: 'bg-amber-50', icon: AlertCircle, label: 'Requires Manual Review' },
}

const getScoreStatus = (score) => {
  if (score >= 90) return { label: 'Excellent', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' }
  if (score >= 75) return { label: 'Good', color: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-200' }
  if (score >= 60) return { label: 'Needs Improvement', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' }
  return { label: 'Poor', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' }
}

export default function ResumeAnalyzerPage() {
  const { resumes } = useResumes()
  
  const [activeResume, setActiveResume] = useState(resumes[0] || null)
  const [isUploading, setIsUploading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('action') === 'upload') {
      setIsUploading(true)
      setActiveResume(null)
      searchParams.delete('action')
      setSearchParams(searchParams, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const handleUploadComplete = (file, isSuccess) => {
    if (isSuccess) {
      setIsUploading(false)
      setActiveResume(resumes[0]) // mock picking the new resume
    }
  }

  const handleReplace = () => {
    setIsUploading(true)
    setActiveResume(null)
  }

  const handleRemove = () => {
    setActiveResume(null)
    setIsUploading(true)
  }

  const status = activeResume ? (statusConfig[activeResume.status] || statusConfig.needs_review) : null
  const StatusIcon = status?.icon

  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Resume Analyzer' }]}>
      <DashboardContainer className="gap-8 max-w-4xl mx-auto pb-12">
        {/* 1. Page Header */}
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Resume Analyzer</h1>
          <p className="text-slate-500">Upload your resume to instantly receive ATS feedback, keyword matching, and AI-driven formatting suggestions.</p>
        </section>

        <AnimatePresence mode="wait">
          {(!activeResume || isUploading) ? (
            /* 2. Primary Upload Section */
            <motion.section 
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full flex flex-col gap-4"
            >
              <ResumeDropzone 
                onUploadComplete={handleUploadComplete}
                maxSizeMB={5}
                acceptedTypes={['.pdf', '.docx', '.doc']}
                mockMode={true}
              />
            </motion.section>
          ) : (
            <motion.div 
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col gap-8"
            >
              {/* 3. Uploaded Resume Section */}
              <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{activeResume.title}</h3>
                      <p className="text-sm font-medium text-slate-500">{activeResume.original_filename}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={handleReplace} className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                      <RefreshCw size={16} />
                      Replace
                    </button>
                    <button onClick={handleRemove} className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t border-slate-100 pt-5 mt-2">
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${status.bg} ${status.color}`}>
                    <StatusIcon size={16} />
                    {status.label}
                  </div>
                  <span className="text-sm font-medium text-slate-400">
                    Uploaded: {new Date(activeResume.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-sm font-medium text-slate-400">
                    Size: {(activeResume.file_size_kb / 1024).toFixed(2)} MB
                  </span>
                </div>
              </section>

              {/* 4. ATS Analysis Section */}
              <section className="grid gap-6 md:grid-cols-2">
                {/* Overall Score */}
                <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                      <BarChart3 size={20} className="text-sky-500" />
                      Overall ATS Score
                    </div>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getScoreStatus(activeResume.ats_score).bg} ${getScoreStatus(activeResume.ats_score).color} ${getScoreStatus(activeResume.ats_score).border}`}>
                      {getScoreStatus(activeResume.ats_score).label}
                    </span>
                  </div>

                  <div className="mt-8 flex flex-col items-center justify-center">
                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-8 border-slate-50 shadow-inner">
                      <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-100" />
                        <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="8" className={getScoreStatus(activeResume.ats_score).color.replace('text-', 'text-').replace('-700', '-500')} strokeDasharray={`${activeResume.ats_score * 2.89} 289`} />
                      </svg>
                      <div className="flex flex-col items-center">
                        <span className="text-4xl font-black tracking-tight text-slate-900">{activeResume.ats_score}</span>
                        <span className="text-xs font-medium text-slate-400">/ 100</span>
                      </div>
                    </div>
                    <p className="mt-6 text-center text-sm font-medium text-slate-500 max-w-xs">
                      Your resume is well optimized for Applicant Tracking Systems, but there are several improvements that could increase your interview chances.
                    </p>
                  </div>

                  {/* Mock Metrics */}
                  <div className="mt-8 grid grid-cols-3 gap-2 border-t border-slate-100 pt-6">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-lg font-bold text-slate-900">89%</span>
                      <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Compatibility</span>
                    </div>
                    <div className="flex flex-col items-center text-center border-x border-slate-100">
                      <span className="text-lg font-bold text-slate-900">82%</span>
                      <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Optimization</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-lg font-bold text-slate-900">95%</span>
                      <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Readability</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-medium text-slate-400">
                      Last Analyzed: {new Date(activeResume.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    <button disabled className="text-xs font-semibold text-slate-400 cursor-not-allowed">
                      Analyze Again
                    </button>
                  </div>
                </div>

                {/* Section Scores & Keywords */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex-1">
                    <div className="flex items-center gap-2 font-semibold text-slate-900 mb-4">
                      <Target size={20} className="text-indigo-500" />
                      Formatting & Sections
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm font-medium mb-1"><span className="text-slate-700">Contact Info</span><span className="text-emerald-600">100%</span></div>
                        <div className="h-2 w-full rounded-full bg-slate-100"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-medium mb-1"><span className="text-slate-700">Experience</span><span className="text-emerald-600">90%</span></div>
                        <div className="h-2 w-full rounded-full bg-slate-100"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }} /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-medium mb-1"><span className="text-slate-700">Education</span><span className="text-amber-500">60%</span></div>
                        <div className="h-2 w-full rounded-full bg-slate-100"><div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }} /></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <CheckCircle2 size={20} className="text-teal-500" />
                        Keyword Match
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeResume.tags.map(tag => (
                        <span key={tag} className="inline-flex rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                          {tag}
                        </span>
                      ))}
                      <span className="inline-flex rounded-xl bg-red-50 border border-red-100 px-3 py-1.5 text-sm font-medium text-red-700">
                        Missing: GraphQL
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. AI Suggestions Section */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 px-2">
                  <Sparkles size={20} className="text-sky-500" />
                  AI Recommendations
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-sky-100 bg-sky-50/50 p-6 shadow-sm">
                    <h4 className="font-bold text-sky-900">Quantify Impacts</h4>
                    <p className="mt-2 text-sm leading-relaxed text-sky-800/80">You mentioned "improved performance", but ATS systems score higher when you use numbers. E.g., "Improved performance by 25%".</p>
                  </div>
                  <div className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm">
                    <h4 className="font-bold text-indigo-900">Add Summary Section</h4>
                    <p className="mt-2 text-sm leading-relaxed text-indigo-800/80">Your resume is missing a professional summary at the top. A 2-3 sentence overview dramatically increases recruiter engagement.</p>
                  </div>
                </div>
              </section>

              {/* 6. Resume Actions */}
              <section className="flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-slate-200 pt-8 pb-4">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900">
                  <Trash2 size={18} />
                  Delete Resume
                </button>
                <button disabled className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-400 cursor-not-allowed">
                  <Download size={18} />
                  Download Report
                </button>
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                  <BarChart3 size={18} />
                  Analyze Again
                </button>
              </section>

            </motion.div>
          )}
        </AnimatePresence>
      </DashboardContainer>
    </DashboardLayout>
  )
}
