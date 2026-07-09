import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, FileText, Download, CheckCircle2, AlertCircle, Clock, BarChart3, Target, Sparkles, Building2, Trash2, RefreshCw } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import { useResumes } from '../hooks/useResumes'
import ResumeDropzone from '../components/ResumeDropzone'
import ScoreBreakdownCard from '../components/ScoreBreakdownCard'
import KeywordAnalysisSection from '../components/KeywordAnalysisSection'
import StrengthsWeaknessesSection from '../components/StrengthsWeaknessesSection'
import AISuggestionsSection from '../components/AISuggestionsSection'
import ResumeActionCenter from '../components/ResumeActionCenter'

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
              <section className="flex flex-col gap-6">
                {/* Overall Score */}
                <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm w-full">
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
                    <p className="mt-6 text-center text-sm font-medium text-slate-500 max-w-sm">
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

                {/* Score Breakdown Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <ScoreBreakdownCard 
                    title="Keyword Match" 
                    score={85} 
                    explanation="Strong alignment with top industry skills and role requirements." 
                    icon={Target} 
                  />
                  <ScoreBreakdownCard 
                    title="Formatting" 
                    score={92} 
                    explanation="Formatting is ATS friendly and highly scannable by robots." 
                    icon={FileText} 
                  />
                  <ScoreBreakdownCard 
                    title="Skills" 
                    score={78} 
                    explanation="Missing a few highly requested technical skills like GraphQL." 
                    icon={Sparkles} 
                  />
                  <ScoreBreakdownCard 
                    title="Experience" 
                    score={64} 
                    explanation="Experience section lacks measurable achievements and action verbs." 
                    icon={Building2} 
                  />
                  <ScoreBreakdownCard 
                    title="Education" 
                    score={100} 
                    explanation="Education details are perfectly formatted and easily detected." 
                    icon={CheckCircle2} 
                  />
                  <ScoreBreakdownCard 
                    title="Readability" 
                    score={95} 
                    explanation="Professional tone with excellent grammar and sentence structure." 
                    icon={FileText} 
                  />
                </div>
              </section>

              {/* Keyword Analysis Section */}
              <KeywordAnalysisSection />

              {/* 5. Strengths & Weaknesses Section */}
              <StrengthsWeaknessesSection />

              {/* 6. AI Suggestions Section */}
              <AISuggestionsSection />

              {/* 7. Resume Actions */}
              <ResumeActionCenter onReplace={handleReplace} onRemove={handleRemove} />

            </motion.div>
          )}
        </AnimatePresence>
      </DashboardContainer>
    </DashboardLayout>
  )
}
