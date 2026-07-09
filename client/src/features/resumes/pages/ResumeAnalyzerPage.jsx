import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, CheckCircle2, AlertCircle, Clock, BarChart3, Target, Sparkles, Building2, Trash2, RefreshCw, Type, Layers } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import { useResumes } from '../hooks/useResumes'
import ResumeDropzone from '../components/ResumeDropzone'
import ResumeHealthScore from '../components/ResumeHealthScore'
import ScoreBreakdownCard from '../components/ScoreBreakdownCard'
import ATSReadinessChecklist from '../components/ATSReadinessChecklist'
import SectionAnalysis from '../components/SectionAnalysis'
import KeywordAnalysisSection from '../components/KeywordAnalysisSection'
import StrengthsWeaknessesSection from '../components/StrengthsWeaknessesSection'
import ImprovementRoadmap from '../components/ImprovementRoadmap'
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
                {/* Overall Health Score */}
                <ResumeHealthScore resume={activeResume} />

                {/* Score Breakdown Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ScoreBreakdownCard 
                    title="Keyword Match" 
                    score={85} 
                    explanation="Strong alignment with top industry skills and role requirements." 
                    impact="+8"
                    icon={Target} 
                  />
                  <ScoreBreakdownCard 
                    title="Formatting" 
                    score={92} 
                    explanation="Formatting is ATS friendly and highly scannable by robots." 
                    impact="+2"
                    icon={FileText} 
                  />
                  <ScoreBreakdownCard 
                    title="Skills" 
                    score={78} 
                    explanation="Missing a few highly requested technical skills like GraphQL." 
                    impact="+5"
                    icon={Sparkles} 
                  />
                  <ScoreBreakdownCard 
                    title="Experience" 
                    score={64} 
                    explanation="Experience section lacks measurable achievements and action verbs." 
                    impact="+12"
                    icon={Building2} 
                  />
                  <ScoreBreakdownCard 
                    title="Education" 
                    score={100} 
                    explanation="Education details are perfectly formatted and easily detected." 
                    impact="+0"
                    icon={CheckCircle2} 
                  />
                  <ScoreBreakdownCard 
                    title="Readability" 
                    score={95} 
                    explanation="Professional tone with excellent grammar and sentence structure." 
                    impact="+1"
                    icon={FileText} 
                  />
                  <ScoreBreakdownCard 
                    title="Grammar" 
                    score={88} 
                    explanation="A few minor typo warnings detected, but largely error-free." 
                    impact="+2"
                    icon={Type} 
                  />
                  <ScoreBreakdownCard 
                    title="Section Organization" 
                    score={70} 
                    explanation="Standard sections used, but they are ordered poorly for your experience level." 
                    impact="+4"
                    icon={Layers} 
                  />
                </div>
              </section>

              {/* ATS Readiness Checklist */}
              <ATSReadinessChecklist />

              {/* Section-by-Section Analysis */}
              <SectionAnalysis />

              {/* Keyword Analysis Section */}
              <KeywordAnalysisSection />

              {/* 5. Strengths & Weaknesses Section */}
              <StrengthsWeaknessesSection />

              {/* Improvement Roadmap */}
              <ImprovementRoadmap />

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
