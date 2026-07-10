import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardContainer from '../../../components/dashboard/DashboardContainer';
import InterviewPrepInputSection from '../components/InterviewPrepInputSection';
import InterviewConfigCard from '../components/InterviewConfigCard';

export default function InterviewPrepPage() {
  const [sessionState, setSessionState] = useState('setup'); // 'setup' | 'active'
  const [isStarting, setIsStarting] = useState(false);
  const [interviewConfig, setInterviewConfig] = useState({
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
              <InterviewConfigCard config={interviewConfig} onChange={setInterviewConfig} />
              
              <InterviewPrepInputSection onStart={handleStart} isStarting={isStarting} />
            </motion.section>
          )}

          {sessionState === 'active' && (
            <motion.div 
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center justify-center min-h-[500px] rounded-3xl border border-slate-200 bg-white shadow-sm gap-4"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 animate-pulse">
                <Play size={40} className="fill-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">AI Interview Session Active</h2>
              <p className="text-slate-500 max-w-md text-center">The AI voice processing features have not been integrated yet. This workspace is ready for future development.</p>
              
              <button 
                onClick={() => setSessionState('setup')}
                className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                End Session
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardContainer>
    </DashboardLayout>
  );
}
