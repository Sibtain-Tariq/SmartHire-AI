import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import JobMatchInputSection from '../components/JobMatchInputSection'
import JobMatchHero from '../components/JobMatchHero'

export default function JobMatchPage() {
  const [analysisState, setAnalysisState] = useState('input') // 'input' | 'results'
  const [matchData, setMatchData] = useState(null)

  const handleAnalyze = (resume, jobDescription) => {
    // In the future, this will be passed down to the results sections
    setMatchData({
      resume,
      jobDescription
    })
    setAnalysisState('results')
  }

  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Job Matching' }]}>
      <DashboardContainer className="gap-8 max-w-5xl mx-auto pb-12">
        {/* 1. Page Header */}
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Job Match Analysis</h1>
          <p className="text-slate-500">Compare your resume against a specific job description to reveal your match score, missing keywords, and tailored recommendations.</p>
        </section>

        <AnimatePresence mode="wait">
          {analysisState === 'input' && (
            <motion.section 
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full flex flex-col gap-4"
            >
              {/* 2 & 3. Resume Selection & JD Input */}
              <JobMatchInputSection onAnalyze={handleAnalyze} />
            </motion.section>
          )}

          {analysisState === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col gap-8"
            >
              {/* Header for Results */}
              <div className="flex items-center justify-between rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                    <span className="font-bold">JD</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-900">Analysis Complete</h3>
                    <p className="text-xs font-semibold text-indigo-700/70">Comparing: {matchData?.resume?.title}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setAnalysisState('input')}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm border border-indigo-200 transition hover:bg-indigo-50"
                >
                  New Match
                </button>
              </div>

              {/* 4. Match Overview / Hero */}
              <JobMatchHero 
                matchData={matchData} 
                onAnalyzeAgain={() => setAnalysisState('input')} 
              />

              {/* Placeholders for future sections */}
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-20 px-6 text-center mt-4">
                <h3 className="text-lg font-bold text-slate-700">Results Engine Pending</h3>
                <p className="text-sm font-medium text-slate-500 mt-2 max-w-md">
                  The match score breakdown and deeper analysis sections will be rendered here.
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </DashboardContainer>
    </DashboardLayout>
  )
}
