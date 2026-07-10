import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ShieldCheck, Code2, Puzzle, Crown, Briefcase, RefreshCw } from 'lucide-react';
import AIFeedbackCard from './AIFeedbackCard';

const MOCK_FEEDBACK = [
  {
    title: 'Communication',
    score: 85,
    icon: MessageSquare,
    explanation: 'You articulated your ideas clearly and maintained good pacing. Your tone was professional yet conversational, which makes for a great interview presence.',
    suggestions: [
      'Try to reduce the use of filler words like "um" and "you know".',
      'Use the STAR method more explicitly when answering behavioral questions.'
    ]
  },
  {
    title: 'Confidence',
    score: 72,
    icon: ShieldCheck,
    explanation: 'You demonstrated solid knowledge, but there were moments of hesitation when discussing cloud architecture, which may project a lack of confidence.',
    suggestions: [
      'Take a brief pause to structure your thoughts before answering complex questions.',
      'Maintain strong eye contact (with the camera) during your delivery.'
    ]
  },
  {
    title: 'Technical Accuracy',
    score: 92,
    icon: Code2,
    explanation: 'Excellent technical depth. Your explanation of React hooks and the virtual DOM was highly accurate and demonstrated senior-level understanding.',
    suggestions: [
      'When discussing AWS, try to specify which specific services (e.g., EC2, Lambda) you used rather than generalizing.'
    ]
  },
  {
    title: 'Problem Solving',
    score: 88,
    icon: Puzzle,
    explanation: 'You logically broke down the system design scenario and considered edge cases effectively before proposing a solution.',
    suggestions: [
      'Verbalize your assumptions out loud before diving into the solution.',
      'Discuss potential trade-offs of your proposed architecture.'
    ]
  },
  {
    title: 'Leadership',
    score: 65,
    icon: Crown,
    explanation: 'You mentioned working on a team, but you primarily focused on your individual contributions rather than how you guided or mentored others.',
    suggestions: [
      'Highlight specific instances where you took initiative or led a project.',
      'Use "we" when discussing team success, but clearly define your specific leadership role.'
    ]
  },
  {
    title: 'Professionalism',
    score: 95,
    icon: Briefcase,
    explanation: 'Your demeanor was extremely professional, respectful, and perfectly aligned with corporate standards.',
    suggestions: []
  }
];

export default function InterviewFeedbackSection({ onRestart }) {
  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-indigo-900">AI Interview Feedback</h2>
          <p className="text-sm font-medium text-indigo-700/70 mt-1">
            A detailed breakdown of your performance across key evaluation metrics.
          </p>
        </div>
        <button 
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-indigo-200 px-6 py-3 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-100"
        >
          <RefreshCw size={16} />
          New Interview
        </button>
      </div>

      {/* Grid of Feedback Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_FEEDBACK.map((feedback, index) => (
          <motion.div
            key={feedback.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <AIFeedbackCard 
              title={feedback.title}
              score={feedback.score}
              icon={feedback.icon}
              explanation={feedback.explanation}
              suggestions={feedback.suggestions}
            />
          </motion.div>
        ))}
      </div>

    </div>
  );
}
