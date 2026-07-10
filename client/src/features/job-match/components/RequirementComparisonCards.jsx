import React from 'react';
import { Briefcase, GraduationCap, CheckCircle2, AlertTriangle, XCircle, Info, Lightbulb, ClipboardList } from 'lucide-react';

const ComparisonCard = ({ title, icon: Icon, required, resume, status, suggestions }) => {
  // Determine status styles
  let statusColor = "bg-slate-100 text-slate-700 border-slate-200";
  let StatusIcon = Info;
  
  if (status === 'Full Match') {
    statusColor = "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm";
    StatusIcon = CheckCircle2;
  } else if (status === 'Partial Match') {
    statusColor = "bg-amber-50 text-amber-700 border-amber-200 shadow-sm";
    StatusIcon = AlertTriangle;
  } else if (status === 'Missing') {
    statusColor = "bg-red-50 text-red-700 border-red-200 shadow-sm";
    StatusIcon = XCircle;
  }

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 border-b border-slate-100 px-6 py-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm border border-slate-200">
            <Icon size={24} />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
        </div>
        <div className={`inline-flex items-center self-start sm:self-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${statusColor}`}>
          <StatusIcon size={16} />
          {status}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col gap-6">
        
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
          {/* Requirement */}
          <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 border border-slate-100 p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
               <ClipboardList size={64} />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Job Requirement</span>
            <span className="font-semibold text-slate-800 text-base leading-relaxed">{required}</span>
          </div>

          {/* Resume */}
          <div className="flex flex-col gap-2 rounded-2xl bg-indigo-50/40 border border-indigo-100 p-5 relative overflow-hidden group">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Your Resume</span>
            <span className="font-semibold text-indigo-950 text-base leading-relaxed">{resume}</span>
          </div>
        </div>

        {/* Suggestions */}
        {suggestions && (
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50/60 border border-amber-200/60 p-5">
            <Lightbulb className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Suggestions</span>
              <p className="text-sm text-amber-900 font-medium leading-relaxed">{suggestions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mockData = [
  {
    title: 'Experience',
    icon: Briefcase,
    required: '3+ Years Backend Development',
    resume: '2 Years Backend Development',
    status: 'Partial Match',
    suggestions: 'Add more measurable backend achievements to compensate for the missing year of experience.'
  },
  {
    title: 'Education',
    icon: GraduationCap,
    required: 'BS in Computer Science or related field',
    resume: 'BS in Computer Science',
    status: 'Full Match',
    suggestions: 'Highlight key coursework or projects related to cloud computing to further align with the overall JD.'
  }
];

export default function RequirementComparisonCards() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-2 font-semibold text-slate-900 px-2">
        <ClipboardList size={24} className="text-indigo-500" />
        <h2 className="text-xl">Requirement Match</h2>
      </div>
      <div className="flex flex-col gap-6">
        {mockData.map((item, index) => (
          <ComparisonCard key={index} {...item} />
        ))}
      </div>
    </section>
  )
}
