import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardContainer from '../../../components/dashboard/DashboardContainer';
import InterviewPrepInputSection from '../components/InterviewPrepInputSection';
import InterviewModeSelection from '../components/InterviewModeSelection';
import InterviewConfigCard from '../components/InterviewConfigCard';
import InterviewQuestionBank from '../components/InterviewQuestionBank';
import MockInterviewSimulator from '../components/MockInterviewSimulator';
import InterviewFeedbackSection from '../components/InterviewFeedbackSection';
import InterviewPerformanceDashboard from '../components/InterviewPerformanceDashboard';
import AIInterviewCoach from '../components/AIInterviewCoach';
import InterviewSummaryCard from '../components/InterviewSummaryCard';
import InterviewPerformanceReport from '../components/InterviewPerformanceReport';

export default function InterviewPrepPage() {
  const [sessionState, setSessionState] = useState('setup'); // 'setup' | 'active' | 'results'
  const [isStarting, setIsStarting] = useState(false);
  const [interviewConfig, setInterviewConfig] = useState({
    mode: 'practice',
    type: 'mixed',
    difficulty: 'medium',
    duration: '20',
    role: '',
    language: 'English',
    questionCount: 5
  });
  
  const handleStart = (inputData) => {
    setIsStarting(true);
    // Simulate API call to initialize session
    setTimeout(() => {
      setIsStarting(false);
      setSessionState('active');
    }, 2000);
  };

  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Interview Preparation' }]}>
      <DashboardContainer className="gap-8 max-w-5xl mx-auto pb-12">
        {/* Page Header */}
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Interview Workspace</h1>
          <p className="text-slate-500">Configure and launch your AI-powered voice interview. Upload your resume and optionally paste a job description to tailor the questions to your exact needs.</p>
        </section>

        <AnimatePresence mode="wait">
          {sessionState === 'setup' && (
            <motion.section 
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full flex flex-col gap-8"
            >
              <InterviewModeSelection 
                selectedMode={interviewConfig.mode} 
                onChange={(mode) => setInterviewConfig({ ...interviewConfig, mode })} 
              />
              <InterviewConfigCard config={interviewConfig} onChange={setInterviewConfig} />
              
              <InterviewPrepInputSection onStart={handleStart} isStarting={isStarting} />
              
              <div className="pt-8 mt-4 border-t border-slate-200">
                <InterviewQuestionBank />
              </div>
            </motion.section>
          )}

          {sessionState === 'active' && (
            <motion.section 
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <MockInterviewSimulator 
                config={interviewConfig} 
                onEndInterview={() => setSessionState('results')} 
              />
            </motion.section>
          )}

          {sessionState === 'results' && (
            <motion.section 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full flex flex-col gap-8"
            >
              <InterviewSummaryCard onRetake={() => setSessionState('setup')} />
              <InterviewPerformanceReport />
              <InterviewPerformanceDashboard />
              <InterviewFeedbackSection onRestart={() => setSessionState('setup')} />
              <AIInterviewCoach />
            </motion.section>
          )}
        </AnimatePresence>
      </DashboardContainer>
    </DashboardLayout>
  );
}
