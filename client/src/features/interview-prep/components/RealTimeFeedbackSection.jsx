import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, MessageSquare, ShieldCheck, Code2, LayoutTemplate, Briefcase, Clock, Target, CheckCircle2, AlertCircle } from 'lucide-react';

const INITIAL_METRICS = [
  { id: 'answer_quality', title: 'Answer Quality', icon: Target, score: 85, explanation: 'Clear and directly addresses the core problem.' },
  { id: 'communication', title: 'Communication', icon: MessageSquare, score: 88, explanation: '"Your communication is clear and concise."' },
  { id: 'technical', title: 'Technical Accuracy', icon: Code2, score: 92, explanation: 'Terminology usage is precise and accurate.' },
  { id: 'confidence', title: 'Confidence', icon: ShieldCheck, score: 72, explanation: '"Speak with more confidence."' },
  { id: 'structure', title: 'Structure', icon: LayoutTemplate, score: 80, explanation: '"Consider using the STAR method."' },
  { id: 'relevance', title: 'Relevance', icon: Activity, score: 85, explanation: 'Staying on topic well.' },
  { id: 'professionalism', title: 'Professionalism', icon: Briefcase, score: 95, explanation: 'Tone is highly professional.' },
  { id: 'time', title: 'Time Management', icon: Clock, score: 78, explanation: 'Slightly rushing answers.' }
];

const LiveFeedbackCard = ({ title, score, icon: Icon, explanation }) => {
  const getStatusText = (val) => {
    if (val >= 90) return 'Excellent';
    if (val >= 80) return 'Good';
    if (val >= 70) return 'Needs Improvement';
    return 'Critical';
  };

  const getColors = (val) => {
    if (val >= 90) return { bg: 'bg-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (val >= 80) return { bg: 'bg-indigo-500', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
    if (val >= 70) return { bg: 'bg-amber-500', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700 border-amber-200' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700 border-rose-200' };
  };

  const status = getStatusText(score);
  const colors = getColors(score);
  const isNeedsImprovement = score < 80;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 shrink-0">
            <Icon size={16} />
          </div>
          <h4 className="font-bold text-slate-900 text-sm truncate">{title}</h4>
        </div>
        <span className="text-xl font-black text-slate-800">{score}%</span>
      </div>

      {/* Progress & Badge */}
      <div className="flex items-center gap-3 mt-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 flex-1">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            className={`h-full rounded-full ${colors.bg}`}
          />
        </div>
        <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shrink-0 ${colors.badge} flex items-center gap-1`}>
          {isNeedsImprovement ? <AlertCircle size={10} /> : <CheckCircle2 size={10} />}
          {status}
        </div>
      </div>

      {/* Explanation Text */}
      <p className="text-xs font-semibold text-slate-500 mt-1 italic line-clamp-2">
        {explanation}
      </p>
    </div>
  );
};

export default function RealTimeFeedbackSection({ isListening }) {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);

  // Simulate real-time score fluctuation when the user is answering (Listening)
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setMetrics(prev => prev.map(m => {
          // Randomly adjust score by -2 to +2
          const adjustment = Math.floor(Math.random() * 5) - 2;
          let newScore = m.score + adjustment;
          if (newScore > 98) newScore = 98;
          if (newScore < 65) newScore = 65;
          return { ...m, score: newScore };
        }));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Activity size={18} className="text-indigo-600" />
          Live AI Feedback
        </h3>
        {isListening && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Analyzing
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(metric => (
          <LiveFeedbackCard 
            key={metric.id}
            title={metric.title}
            score={metric.score}
            icon={metric.icon}
            explanation={metric.explanation}
          />
        ))}
      </div>
    </div>
  );
}
