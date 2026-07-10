import React from 'react';
import { Layers, CheckCircle2, XCircle, PlusCircle, Percent } from 'lucide-react';

const jobRequirements = ['Python', 'React', 'AWS', 'Docker', 'CI/CD', 'System Design'];
const resumeSkills = ['Python', 'React', 'SQL', 'FastAPI', 'REST APIs', 'Git'];

const matchedSkills = jobRequirements.filter(skill => resumeSkills.includes(skill));
const missingSkills = jobRequirements.filter(skill => !resumeSkills.includes(skill));
const additionalSkills = resumeSkills.filter(skill => !jobRequirements.includes(skill));
const coveragePercentage = Math.round((matchedSkills.length / jobRequirements.length) * 100);

export default function SkillsComparisonSection() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-2 font-semibold text-slate-900 px-2">
        <Layers size={24} className="text-blue-500" />
        <h2 className="text-xl">Skills Comparison</h2>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col rounded-2xl bg-white border border-slate-200 p-5 shadow-sm items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-3">
            <Percent size={24} />
          </div>
          <span className="text-3xl font-black text-slate-900">{coveragePercentage}%</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Coverage</span>
        </div>
        
        <div className="flex flex-col rounded-2xl bg-white border border-slate-200 p-5 shadow-sm items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3">
            <CheckCircle2 size={24} />
          </div>
          <span className="text-3xl font-black text-slate-900">{matchedSkills.length}</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Matched</span>
        </div>

        <div className="flex flex-col rounded-2xl bg-white border border-slate-200 p-5 shadow-sm items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-3">
            <XCircle size={24} />
          </div>
          <span className="text-3xl font-black text-slate-900">{missingSkills.length}</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Missing</span>
        </div>

        <div className="flex flex-col rounded-2xl bg-white border border-slate-200 p-5 shadow-sm items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600 mb-3">
            <PlusCircle size={24} />
          </div>
          <span className="text-3xl font-black text-slate-900">{additionalSkills.length}</span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Additional</span>
        </div>
      </div>

      {/* Panels */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Job Requirements Panel */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex flex-col gap-1">
            <h3 className="font-bold text-slate-800 text-lg">Job Requirements</h3>
            <p className="text-xs font-medium text-slate-500">Skills explicitly asked for in the JD</p>
          </div>
          <div className="p-6 flex flex-col gap-3 bg-white">
            {jobRequirements.map(skill => {
              const isMatched = matchedSkills.includes(skill);
              return (
                <div 
                  key={skill}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                    isMatched 
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="font-semibold text-sm">{skill}</span>
                  {isMatched ? (
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">Matched</span>
                      <CheckCircle2 size={18} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-red-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">Missing</span>
                      <XCircle size={18} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Your Resume Panel */}
        <div className="flex flex-col rounded-3xl border border-indigo-100 bg-white overflow-hidden shadow-sm">
          <div className="bg-indigo-50/50 px-6 py-5 border-b border-indigo-100 flex flex-col gap-1">
            <h3 className="font-bold text-indigo-900 text-lg">Your Resume</h3>
            <p className="text-xs font-medium text-indigo-700/70">Skills found in your uploaded resume</p>
          </div>
          <div className="p-6 flex flex-col gap-3 bg-white">
            {resumeSkills.map(skill => {
              const isMatched = matchedSkills.includes(skill);
              return (
                <div 
                  key={skill}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                    isMatched 
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="font-semibold text-sm">{skill}</span>
                  {isMatched ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md shadow-sm border border-emerald-200/50">Matched</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 px-2.5 py-1 rounded-md shadow-sm border border-purple-200/50">Additional</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
