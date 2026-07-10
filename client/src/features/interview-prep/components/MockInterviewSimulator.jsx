import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Pause, Play, Square, Settings, BrainCircuit, Activity, SkipForward, FileText, User } from 'lucide-react';

const STATUS_CONFIG = {
  Waiting: { color: 'text-slate-500', bg: 'bg-slate-100', text: 'Waiting to Start' },
  Listening: { color: 'text-indigo-500', bg: 'bg-indigo-100', text: 'Listening...' },
  Thinking: { color: 'text-amber-500', bg: 'bg-amber-100', text: 'Thinking...' },
  Speaking: { color: 'text-emerald-500', bg: 'bg-emerald-100', text: 'AI is Speaking' },
  Paused: { color: 'text-slate-400', bg: 'bg-slate-100', text: 'Paused' },
  Completed: { color: 'text-emerald-600', bg: 'bg-emerald-100', text: 'Interview Completed' },
};

export default function MockInterviewSimulator({ onEndInterview, config }) {
  const [status, setStatus] = useState('Waiting');
  const [isMuted, setIsMuted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(1);
  const totalQuestions = config?.questionCount || 10;

  const mockQuestions = [
    "Could you walk me through your experience building scalable web applications?",
    "Describe a challenging technical problem you solved recently.",
    "How do you handle state management in large React applications?",
    "Explain your approach to designing RESTful APIs.",
    "Tell me about a time you disagreed with a team member."
  ];

  // Timer logic
  useEffect(() => {
    let timer;
    if (status !== 'Waiting' && status !== 'Paused' && status !== 'Completed') {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `00:${m}:${s}`;
  };

  const handleTogglePlayPause = () => {
    if (status === 'Waiting' || status === 'Paused') {
      setStatus('Speaking');
      setTimeout(() => setStatus('Listening'), 4000);
    } else {
      setStatus('Paused');
    }
  };

  const handleSkip = () => {
    if (currentQuestionIdx < totalQuestions) {
      setCurrentQuestionIdx(prev => prev + 1);
      setStatus('Thinking');
      setTimeout(() => setStatus('Speaking'), 2000);
      setTimeout(() => setStatus('Listening'), 6000);
    } else {
      setStatus('Completed');
    }
  };

  const activeConfig = STATUS_CONFIG[status];
  const progressPercent = (currentQuestionIdx / totalQuestions) * 100;

  // Animated sound waves
  const SoundWaves = () => {
    const isAnimating = status === 'Speaking' || status === 'Listening';
    const bars = 7;
    return (
      <div className="flex items-center justify-center gap-1.5 h-16 w-32">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: isAnimating ? ["20%", "90%", "40%", "100%", "20%"] : "20%" }}
            transition={{ duration: status === 'Speaking' ? 1.0 : 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
            className={`w-1.5 rounded-full ${status === 'Speaking' ? 'bg-emerald-400' : 'bg-indigo-400'}`}
            style={{ height: '20%' }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      
      {/* Top Banner / Progress Indicator */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900">Mock Interview Simulator</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${activeConfig.color.replace('text', 'bg')} ${status !== 'Paused' && status !== 'Waiting' ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
              {formatTime(secondsElapsed)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold text-slate-500">Question {currentQuestionIdx} of {totalQuestions}</span>
          <span className="text-sm font-bold text-indigo-600">{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-indigo-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Left Column: AI Voice Visualizer */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden relative">
          
          <div className="flex flex-col items-center justify-center py-20 px-8 relative flex-1">
            <div className={`absolute inset-0 opacity-20 blur-3xl transition-colors duration-1000 ${activeConfig.bg}`} />

            <motion.div 
              animate={{ scale: (status === 'Speaking' || status === 'Listening') ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={`relative z-10 flex h-32 w-32 items-center justify-center rounded-full shadow-2xl transition-colors duration-500 ${activeConfig.bg} border-4 border-white`}
            >
              <Mic size={48} className={`transition-colors duration-500 ${activeConfig.color}`} />
            </motion.div>

            <div className="mt-8 z-10 flex flex-col items-center gap-2">
              <span className={`text-base font-bold uppercase tracking-wider ${activeConfig.color}`}>
                {activeConfig.text}
              </span>
              <div className="h-16 flex items-center justify-center mt-2">
                {status !== 'Waiting' && status !== 'Paused' && status !== 'Thinking' && status !== 'Completed' ? (
                  <SoundWaves />
                ) : status === 'Thinking' ? (
                  <div className="flex gap-2 items-center h-16">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  </div>
                ) : (
                  <div className="text-slate-300 font-medium text-sm h-16 flex items-center">
                    {status === 'Completed' ? 'Session Finished' : 'Awaiting interaction'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-slate-100 bg-slate-50 p-6 z-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all hover:scale-105 ${
                  isMuted ? 'border-red-200 bg-red-50 text-red-500' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
                title="Mute Microphone"
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              <button 
                onClick={handleTogglePlayPause}
                disabled={status === 'Completed'}
                className={`flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 disabled:opacity-50 ${
                  (status === 'Waiting' || status === 'Paused') ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
                title={status === 'Waiting' ? 'Start Interview' : status === 'Paused' ? 'Resume' : 'Pause'}
              >
                {status === 'Waiting' || status === 'Paused' ? <Play size={24} className="fill-white translate-x-0.5" /> : <Pause size={24} className="fill-white" />}
              </button>

              <button 
                onClick={handleSkip}
                disabled={status === 'Completed'}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-500 transition-all hover:scale-105 hover:bg-slate-50 disabled:opacity-50"
                title="Skip Question"
              >
                <SkipForward size={18} />
              </button>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-2 text-center px-4">
              AI voice conversations will be available in a future update.
            </p>
          </div>
        </div>

        {/* Right Column: Question Card & Candidate Response */}
        <div className="flex flex-col gap-6">
          
          <div className="flex flex-col rounded-2xl border border-indigo-200 bg-indigo-50 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit size={80} className="text-indigo-600" />
            </div>
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <BrainCircuit size={16} />
              </div>
              <span className="text-sm font-bold text-indigo-900 uppercase tracking-wider">Current AI Question</span>
            </div>
            <p className="text-lg font-semibold text-indigo-950 leading-relaxed relative z-10">
              {status === 'Waiting' ? "Click start to begin the interview." : mockQuestions[(currentQuestionIdx - 1) % mockQuestions.length]}
            </p>
          </div>

          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm p-6 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <User size={16} />
              </div>
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Candidate Response</span>
            </div>
            
            <div className="flex-1 rounded-xl bg-slate-50 border border-slate-100 p-4 min-h-[150px]">
              {status === 'Listening' ? (
                <div className="flex items-center gap-2 text-slate-400">
                  <Mic size={16} className="animate-pulse text-emerald-500" />
                  <span className="text-sm italic">Recording your response...</span>
                </div>
              ) : (
                <span className="text-sm text-slate-400 italic">
                  {status === 'Speaking' ? "Waiting for AI to finish speaking..." : "Your response will appear here."}
                </span>
              )}
            </div>
          </div>

          <button 
            onClick={onEndInterview}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 border border-red-200 px-6 py-4 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
          >
            <Square size={18} className="fill-red-600" />
            End Interview Early
          </button>

        </div>
      </div>
    </div>
  );
}
