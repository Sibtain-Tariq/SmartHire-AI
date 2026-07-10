import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, User } from 'lucide-react';

const INITIAL_MOCK_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Hello! I'm your AI Interviewer. I've reviewed your resume. Are you ready to begin our session today?",
    timestamp: '10:00 AM'
  },
  {
    id: 'msg-2',
    sender: 'candidate',
    text: "Hi, yes I'm ready. Let's get started.",
    timestamp: '10:00 AM'
  },
  {
    id: 'msg-3',
    sender: 'ai',
    text: "Great! Let's start with your background. Can you walk me through your experience with React and modern frontend development?",
    timestamp: '10:01 AM'
  }
];

export default function LiveConversationTranscript() {
  const [messages, setMessages] = useState(INITIAL_MOCK_MESSAGES);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Mock incoming transcription (for demonstration purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${prev.length + 1}`,
          sender: 'candidate',
          text: "Sure. I have been using React for the past 4 years. I focus heavily on component reusability, hooks, and state management using tools like Redux and Context API...",
          timestamp: '10:02 AM'
        }
      ]);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[400px] max-h-[600px]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4 shrink-0">
        <h3 className="font-bold text-slate-900">Live Transcript</h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Transcribing</span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-slate-50/50 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
                  
                  {/* Avatar */}
                  <div className={`flex shrink-0 h-8 w-8 items-center justify-center rounded-full shadow-sm mt-1 ${isAI ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'}`}>
                    {isAI ? <BrainCircuit size={16} /> : <User size={16} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex flex-col gap-1 ${isAI ? 'items-start' : 'items-end'}`}>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-bold text-slate-500">
                        {isAI ? 'AI Interviewer' : 'You'}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {msg.timestamp}
                      </span>
                    </div>
                    
                    <div className={`px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isAI 
                        ? 'rounded-2xl rounded-tl-sm bg-white border border-slate-200 text-slate-800' 
                        : 'rounded-2xl rounded-tr-sm bg-indigo-600 text-white'
                    }`}>
                      {msg.text}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Future typing/listening indicator area */}
        <div className="h-4 shrink-0" />
      </div>
      
    </div>
  );
}
