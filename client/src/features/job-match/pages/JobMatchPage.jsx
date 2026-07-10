import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Sparkles, Building2, CheckCircle2, FileText, Globe } from 'lucide-react'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import JobMatchInputSection from '../components/JobMatchInputSection'
import JobMatchHero from '../components/JobMatchHero'
import ScoreBreakdownCard from '../../resumes/components/ScoreBreakdownCard'
import SkillsComparisonSection from '../components/SkillsComparisonSection'
import RequirementComparisonCards from '../components/RequirementComparisonCards'
import OptimizationSuggestionsSection from '../components/OptimizationSuggestionsSection'
import JobMatchActionCenter from '../components/JobMatchActionCenter'
import JobOverviewSection from '../components/JobOverviewSection'

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

              {/* Job Overview */}
              <div className="w-full">
                <JobOverviewSection />
              </div>

              {/* 4. Match Overview / Hero */}
              <JobMatchHero 
                matchData={matchData} 
                onAnalyzeAgain={() => setAnalysisState('input')} 
              />

              {/* 5. Match Score Breakdown */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 px-2">
                  <Target size={20} className="text-indigo-500" />
                  Score Breakdown
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <ScoreBreakdownCard 
                    title="Skills Match" 
                    score={82} 
                    explanation="You possess most of the required hard skills, but are missing a few nice-to-haves." 
                    icon={Sparkles} 
                  />
                  <ScoreBreakdownCard 
                    title="Experience Match" 
                    score={75} 
                    explanation="Your years of experience align, but measurable impact is slightly lacking." 
                    icon={Building2} 
                  />
                  <ScoreBreakdownCard 
                    title="Education Match" 
                    score={100} 
                    explanation="Your educational background perfectly matches the job requirements." 
                    icon={CheckCircle2} 
                  />
                  <ScoreBreakdownCard 
                    title="Keyword Match" 
                    score={68} 
                    explanation="Several important industry keywords were not found in your resume." 
                    icon={FileText} 
                  />
                  <ScoreBreakdownCard 
                    title="Industry Alignment" 
                    score={90} 
                    explanation="Strong evidence of relevant industry domain knowledge." 
                    icon={Globe} 
                  />
                  <ScoreBreakdownCard 
                    title="Overall ATS Compatibility" 
                    score={88} 
                    explanation="High readability and excellent scannability for automated systems." 
                    icon={Target} 
                  />
                </div>
              </section>

              {/* Skills Comparison */}
              <div className="mt-4">
                <SkillsComparisonSection />
              </div>

              {/* Requirement Comparison */}
              <div className="mt-4">
                <RequirementComparisonCards />
              </div>

              {/* Optimization Suggestions */}
              <div className="mt-4">
                <OptimizationSuggestionsSection />
              </div>

              {/* Action Center */}
              <div className="mt-4 mb-8">
                <JobMatchActionCenter onAnalyzeAgain={() => setAnalysisState('input')} />
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </DashboardContainer>
    </DashboardLayout>
  )
}
