import React, { useState } from 'react';
import { Settings, Users, Code2, BrainCircuit, Shuffle, LayoutTemplate, Target, Globe, Hash, Clock } from 'lucide-react';

const INTERVIEW_TYPES = [
  { id: 'hr', label: 'HR', icon: Users },
  { id: 'technical', label: 'Technical', icon: Code2 },
  { id: 'behavioral', label: 'Behavioral', icon: BrainCircuit },
  { id: 'mixed', label: 'Mixed', icon: Shuffle },
  { id: 'system_design', label: 'System Design', icon: LayoutTemplate },
];

const DIFFICULTIES = [
  { id: 'easy', label: 'Easy', color: 'text-emerald-600', bgHover: 'hover:bg-emerald-50', borderActive: 'border-emerald-500', bgActive: 'bg-emerald-50' },
  { id: 'medium', label: 'Medium', color: 'text-amber-600', bgHover: 'hover:bg-amber-50', borderActive: 'border-amber-500', bgActive: 'bg-amber-50' },
  { id: 'hard', label: 'Hard', color: 'text-red-600', bgHover: 'hover:bg-red-50', borderActive: 'border-red-500', bgActive: 'bg-red-50' },
];

const DURATIONS = [
  { id: '5', label: '5 Min' },
  { id: '10', label: '10 Min' },
  { id: '20', label: '20 Min' },
  { id: '30', label: '30 Min' },
];

export default function InterviewConfigCard({ config, onChange }) {
  // Local state for demonstration if parent doesn't provide
  const [localConfig, setLocalConfig] = useState({
    type: 'mixed',
    difficulty: 'medium',
    duration: '20',
    role: '',
    language: 'English',
    questionCount: 5
  });

  const activeConfig = config || localConfig;

  const handleChange = (key, value) => {
    const updated = { ...activeConfig, [key]: value };
    setLocalConfig(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Settings size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Interview Configuration</h2>
          <p className="text-sm font-medium text-slate-500">Tailor the AI interview environment to your exact needs.</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* Interview Type Selection */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-slate-900">Interview Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {INTERVIEW_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = activeConfig.type === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => handleChange('type', type.id)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    isActive 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm scale-[1.02]' 
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-indigo-200 hover:bg-white'
                  }`}
                >
                  <Icon size={24} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                  <span className="text-sm font-bold">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-slate-900">Difficulty Level</label>
          <div className="grid grid-cols-3 gap-3">
            {DIFFICULTIES.map((diff) => {
              const isActive = activeConfig.difficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => handleChange('difficulty', diff.id)}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all ${
                    isActive 
                      ? `${diff.borderActive} ${diff.bgActive} ${diff.color} shadow-sm scale-[1.02]` 
                      : `border-slate-100 bg-slate-50 text-slate-600 ${diff.bgHover} hover:border-slate-200 hover:bg-white`
                  }`}
                >
                  {diff.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-slate-900">Duration</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DURATIONS.map((dur) => {
              const isActive = activeConfig.duration === dur.id;
              return (
                <button
                  key={dur.id}
                  onClick={() => handleChange('duration', dur.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all ${
                    isActive 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm scale-[1.02]' 
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-indigo-200 hover:bg-white'
                  }`}
                >
                  <Clock size={16} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                  {dur.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Inputs Row */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Target size={14} /> Target Role
            </label>
            <input 
              type="text"
              placeholder="e.g. Software Engineer"
              value={activeConfig.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Globe size={14} /> Language
            </label>
            <select 
              value={activeConfig.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Hash size={14} /> Question Count
            </label>
            <input 
              type="number"
              min="1"
              max="20"
              value={activeConfig.questionCount}
              onChange={(e) => handleChange('questionCount', parseInt(e.target.value) || 5)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
