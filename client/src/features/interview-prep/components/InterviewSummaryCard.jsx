import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, CheckCircle2, XCircle, FileText, Download, RotateCcw, LayoutDashboard, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InterviewSummaryCard({ onRetake }) {
  const navigate = useNavigate();
  
  const OVERALL_SCORE = 84;
  
  const STRENGTHS = [
    'Excellent technical knowledge of modern React.',
    'Clear and articulate communication style.',
    'Strong cultural alignment with team values.'
  ];

  const WEAKNESSES = [
    'Relied on filler words during technical deep dives.',
    'Missed opportunities to quantify leadership impact.',
    'Slight hesitation when discussing system design.'
  ];

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden w-full max-w-5xl mx-auto">
      
      {/* Top Banner Area */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-indigo-700 px-8 py-10 sm:px-12">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit size={160} className="text-white" />
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Interview Completed</h1>
              <p className="text-indigo-200 mt-1 text-lg">Senior Software Engineer • Mock Session</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-indigo-100 font-medium text-sm">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <Clock size={16} className="text-indigo-300" />
                Duration: 22m 15s
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <CheckCircle2 size={16} className="text-indigo-300" />
                10 / 10 Questions
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-2xl shrink-0 min-w-[160px]">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Overall Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-indigo-600">{OVERALL_SCORE}</span>
              <span className="text-lg font-bold text-slate-400">/100</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              <Trophy size={12} />
              Top 20%
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col p-8 sm:p-12 gap-10">
        
        {/* AI Summary */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText size={20} className="text-indigo-500" />
            AI Executive Summary
          </h3>
          <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
            <p className="text-slate-700 leading-relaxed font-medium">
              You performed extremely well throughout this session. Your technical explanations regarding frontend architecture were concise and accurate. You possess a very clear, calm communication style which translates well to senior roles. However, to push your score into the elite tier, you should focus on actively quantifying your past achievements and structuring your behavioral responses using the STAR method to prevent rambling on complex questions.
            </p>
          </div>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          
          {/* Strengths */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-emerald-900 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={14} />
              </div>
              Key Strengths
            </h4>
            <ul className="flex flex-col gap-3">
              {STRENGTHS.map((str, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {str}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-rose-900 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <XCircle size={14} />
              </div>
              Areas to Improve
            </h4>
            <ul className="flex flex-col gap-3">
              {WEAKNESSES.map((wk, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {wk}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 p-6 sm:px-12">
        <button 
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <LayoutDashboard size={18} />
          Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button 
            disabled
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3 text-sm font-bold text-slate-400 shadow-sm cursor-not-allowed opacity-70"
            title="PDF reports will be available in a future update."
          >
            <Download size={18} />
            Download Report
          </button>
          
          <button 
            onClick={onRetake}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
          >
            <RotateCcw size={18} />
            Retake Interview
          </button>
        </div>
      </div>

    </div>
  );
}
