import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Pause, Play, Square, Settings, BrainCircuit, Activity } from 'lucide-react';

const STATUS_CONFIG = {
  Ready: { color: 'text-slate-500', bg: 'bg-slate-100', text: 'Ready to Start' },
  Listening: { color: 'text-indigo-500', bg: 'bg-indigo-100', text: 'Listening...' },
  Thinking: { color: 'text-amber-500', bg: 'bg-amber-100', text: 'Thinking...' },
  Speaking: { color: 'text-emerald-500', bg: 'bg-emerald-100', text: 'AI is Speaking' },
  Paused: { color: 'text-slate-400', bg: 'bg-slate-100', text: 'Paused' },
};

export default function AIVoiceInterviewCard({ onEndInterview, config }) {
  const [status, setStatus] = useState('Ready');
  const [isMuted, setIsMuted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = config?.questionCount || 10;

  // Timer logic
  useEffect(() => {
    let timer;
    if (status !== 'Ready' && status !== 'Paused') {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  // Format time (MM:SS)
  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `00:${m}:${s}`;
  };

  // Mock Voice Activity Simulation
  useEffect(() => {
    if (status === 'Listening' || status === 'Speaking') {
      const interval = setInterval(() => {
        // Random visual blip logic goes here if doing manual sound waves
      }, 200);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleTogglePlayPause = () => {
    if (status === 'Ready' || status === 'Paused') {
      setStatus('Speaking');
      // Mock progression
      setTimeout(() => setStatus('Listening'), 5000);
    } else {
      setStatus('Paused');
    }
  };

  const activeConfig = STATUS_CONFIG[status];

  // Animated sound waves
  const SoundWaves = () => {
    const isAnimating = status === 'Speaking' || status === 'Listening';
    const bars = 5;
    
    return (
      <div className="flex items-center justify-center gap-1.5 h-16 w-32">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: isAnimating ? ["20%", "80%", "40%", "100%", "20%"] : "20%"
            }}
            transition={{
              duration: status === 'Speaking' ? 1.2 : 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
            className={`w-1.5 rounded-full ${status === 'Speaking' ? 'bg-emerald-400' : 'bg-indigo-400'}`}
            style={{ height: '20%' }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden w-full max-w-2xl mx-auto transform transition-all">
      
      {/* Top Header: Progress & Timer */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-slate-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Question {currentQuestion} of {totalQuestions}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex h-2 w-2 rounded-full ${activeConfig.color.replace('text', 'bg')} ${status !== 'Paused' && status !== 'Ready' ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-mono font-bold text-slate-700">{formatTime(secondsElapsed)}</span>
        </div>
      </div>

      {/* Main Avatar & Visualizer Area */}
      <div className="flex flex-col items-center justify-center py-16 px-8 relative overflow-hidden">
        
        {/* Background ambient glow based on status */}
        <div className={`absolute inset-0 opacity-20 blur-3xl transition-colors duration-1000 ${activeConfig.bg}`} />

        {/* AI Avatar */}
        <motion.div 
          animate={{ scale: (status === 'Speaking' || status === 'Listening') ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full shadow-2xl transition-colors duration-500 ${activeConfig.bg} border-4 border-white`}
        >
          <BrainCircuit size={40} className={`transition-colors duration-500 ${activeConfig.color}`} />
        </motion.div>

        {/* Status Text */}
        <div className="mt-8 z-10 flex flex-col items-center gap-2">
          <span className={`text-sm font-bold uppercase tracking-wider ${activeConfig.color}`}>
            {activeConfig.text}
          </span>
          <div className="h-16 flex items-center justify-center mt-2">
            {status !== 'Ready' && status !== 'Paused' && status !== 'Thinking' ? (
              <SoundWaves />
            ) : status === 'Thinking' ? (
              <div className="flex gap-2 items-center h-16">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 rounded-full bg-amber-400" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-amber-400" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            ) : (
              <div className="text-slate-300 font-medium text-sm h-16 flex items-center">Awaiting interaction</div>
            )}
          </div>
        </div>

      </div>

      {/* Controls Footer */}
      <div className="flex flex-col items-center gap-4 border-t border-slate-100 bg-slate-50 p-6 z-10">
        
        <div className="flex items-center gap-4">
          
          {/* Mute Button */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all hover:scale-105 ${
              isMuted ? 'border-red-200 bg-red-50 text-red-500' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`}
            title="Mute Microphone"
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          {/* Main Play/Pause Button */}
          <button 
            onClick={handleTogglePlayPause}
            className={`flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
              (status === 'Ready' || status === 'Paused') 
                ? 'bg-slate-900 text-white hover:bg-slate-800' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
            title={status === 'Ready' || status === 'Paused' ? 'Resume Interview' : 'Pause Interview'}
          >
            {status === 'Ready' || status === 'Paused' ? <Play size={24} className="fill-white translate-x-0.5" /> : <Pause size={24} className="fill-white" />}
          </button>

          {/* End Interview Button */}
          <button 
            onClick={onEndInterview}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-100 bg-white text-red-500 transition-all hover:scale-105 hover:bg-red-50 hover:border-red-200"
            title="End Interview"
          >
            <Square size={18} className="fill-red-500" />
          </button>

        </div>

        {/* Settings button (UI only) */}
        <button className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200/50 hover:text-slate-600 transition-colors">
          <Settings size={18} />
        </button>

        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-2">
          Voice conversations will be powered by AI in a future update.
        </p>
      </div>

    </div>
  );
}
