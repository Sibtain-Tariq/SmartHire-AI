import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle2, SkipForward, Target, TrendingUp, TrendingDown, MessageSquare, Award, AlertCircle } from 'lucide-react';

const MOCK_REPORT_DATA = {
  scores: {
    overall: 84,
    confidence: 72,
    technical: 92,
    communication: 88,
    behavioral: 80,
    professionalism: 95
  },
  stats: {
    duration: '22m 15s',
    answered: 9,
    skipped: 1,
    completionRate: '90%'
  },
  bestAnswer: {
    question: "Explain your approach to designing RESTful APIs.",
    reason: "You provided a highly structured answer touching on versioning, pagination, and status codes. Your explanation of idempotent methods was text-book perfect.",
    score: 98
  },
  weakestAnswer: {
    question: "Tell me about a time you disagreed with a team member.",
    reason: "Your response lacked a clear resolution. You focused too much on the conflict itself and didn't clearly explain the positive outcome or what you learned.",
    score: 65
  },
  strengths: [
    "Deep technical knowledge of frontend architecture.",
    "Clear, concise, and highly professional tone.",
    "Excellent pacing—you did not rush your technical explanations."
  ],
  improvements: [
    "Structure behavioral questions using the STAR method.",
    "Avoid using filler words ('um', 'like') when thinking.",
    "Quantify your past achievements with hard metrics."
  ],
  summary: "This was a very strong mock session. You possess the technical depth required for a senior role. To cross the finish line, focus on tightening your behavioral narratives to prove your leadership impact."
};

const ScoreCircle = ({ score, label, colorCls }) => {
  const circumference = 2 * Math.PI * 36; // r=36
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="none" className="text-slate-100" />
          <motion.circle 
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="40" cy="40" r="36" 
            stroke="currentColor" 
            strokeWidth="6" 
            fill="none" 
            strokeDasharray={circumference}
            strokeLinecap="round"
            className={colorCls} 
          />
        </svg>
        <span className="absolute text-xl font-black text-slate-800">{score}</span>
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">{label}</span>
    </div>
  );
};

export default function InterviewPerformanceReport() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto mb-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
          <FileText size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Performance Report</h2>
          <p className="text-sm font-medium text-slate-500">Comprehensive breakdown of your mock interview session.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Col: Scores & Stats */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center justify-center py-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Overall Score</h3>
            <div className="relative flex h-40 w-40 items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform drop-shadow-sm" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-100" />
                <motion.circle 
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ strokeDashoffset: (2 * Math.PI * 45) - (MOCK_REPORT_DATA.scores.overall / 100) * (2 * Math.PI * 45) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" 
                  strokeDasharray={2 * Math.PI * 45} strokeLinecap="round"
                  className="text-indigo-600" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-slate-900">{MOCK_REPORT_DATA.scores.overall}</span>
                <span className="text-xs font-bold text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="mt-6 w-full flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-500">Confidence</span>
                <span className="font-bold text-slate-900">{MOCK_REPORT_DATA.scores.confidence}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-500">Technical</span>
                <span className="font-bold text-emerald-600">{MOCK_REPORT_DATA.scores.technical}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-500">Behavioral</span>
                <span className="font-bold text-slate-900">{MOCK_REPORT_DATA.scores.behavioral}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-500">Communication</span>
                <span className="font-bold text-indigo-600">{MOCK_REPORT_DATA.scores.communication}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-500">Professionalism</span>
                <span className="font-bold text-slate-900">{MOCK_REPORT_DATA.scores.professionalism}%</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><Clock size={12}/> Duration</span>
              <span className="text-lg font-black text-slate-800">{MOCK_REPORT_DATA.stats.duration}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><Target size={12}/> Completion</span>
              <span className="text-lg font-black text-slate-800">{MOCK_REPORT_DATA.stats.completionRate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><CheckCircle2 size={12}/> Answered</span>
              <span className="text-lg font-black text-slate-800">{MOCK_REPORT_DATA.stats.answered}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"><SkipForward size={12}/> Skipped</span>
              <span className="text-lg font-black text-rose-600">{MOCK_REPORT_DATA.stats.skipped}</span>
            </div>
          </div>

        </div>

        {/* Right Col: Deep Dive Analysis */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* AI Summary */}
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-800 mb-3">
              <MessageSquare size={16} /> AI Summary
            </h3>
            <p className="text-sm font-medium leading-relaxed text-indigo-900/80">
              {MOCK_REPORT_DATA.summary}
            </p>
          </div>

          {/* Best & Weakest Answers */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Award size={80} className="text-emerald-500"/></div>
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  <TrendingUp size={14} /> Best Answer
                </span>
                <span className="text-lg font-black text-emerald-600">{MOCK_REPORT_DATA.bestAnswer.score}%</span>
              </div>
              <p className="text-sm font-bold text-slate-900 mb-2 relative z-10">"{MOCK_REPORT_DATA.bestAnswer.question}"</p>
              <p className="text-xs font-medium text-slate-600 relative z-10">{MOCK_REPORT_DATA.bestAnswer.reason}</p>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><AlertCircle size={80} className="text-rose-500"/></div>
              <div className="flex items-center justify-between mb-3 relative z-10">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-1 rounded">
                  <TrendingDown size={14} /> Weakest Answer
                </span>
                <span className="text-lg font-black text-rose-600">{MOCK_REPORT_DATA.weakestAnswer.score}%</span>
              </div>
              <p className="text-sm font-bold text-slate-900 mb-2 relative z-10">"{MOCK_REPORT_DATA.weakestAnswer.question}"</p>
              <p className="text-xs font-medium text-slate-600 relative z-10">{MOCK_REPORT_DATA.weakestAnswer.reason}</p>
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" /> Top Strengths
              </h3>
              <ul className="flex flex-col gap-3">
                {MOCK_REPORT_DATA.strengths.map((s, i) => (
                  <li key={i} className="text-sm font-medium text-slate-600 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-rose-500" /> Improvement Areas
              </h3>
              <ul className="flex flex-col gap-3">
                {MOCK_REPORT_DATA.improvements.map((s, i) => (
                  <li key={i} className="text-sm font-medium text-slate-600 flex items-start gap-2">
                    <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
