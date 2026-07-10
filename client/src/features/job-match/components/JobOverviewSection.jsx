import React from 'react';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Clock, 
  Globe, 
  BookOpen, 
  CheckCircle2, 
  ListChecks, 
  Star,
  Target,
  Award
} from 'lucide-react';

const mockJobOverview = {
  title: "Senior Software Engineer",
  company: "TechCorp",
  employmentType: "Full Time",
  experienceRequired: "5+ Years",
  workMode: "Hybrid",
  location: "San Francisco, CA",
  industry: "Information Technology",
  primarySkills: ["Python", "React", "FastAPI", "PostgreSQL", "Docker", "AWS", "REST APIs", "Git"],
  preferredSkills: ["Kubernetes", "CI/CD", "Redis", "GraphQL", "Leadership", "Communication"],
  responsibilities: [
    "Develop scalable backend APIs.",
    "Collaborate with frontend developers.",
    "Optimize database performance.",
    "Participate in code reviews.",
    "Maintain application security."
  ],
  qualifications: [
    "Bachelor's Degree in CS or related field.",
    "5+ Years Experience in backend development.",
    "Strong Python and React knowledge.",
    "REST API experience.",
    "Cloud experience preferred."
  ]
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      <Icon size={18} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      <span className="text-sm font-semibold text-slate-800">{value}</span>
    </div>
  </div>
);

export default function JobOverviewSection({ jobData = mockJobOverview }) {
  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-2">
        <Target size={24} className="text-indigo-500" />
        <h2 className="text-xl font-bold text-slate-900">Job Overview</h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDE: General Job Info */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col rounded-2xl bg-slate-50 border border-slate-100 p-6 h-full shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
              <Building2 size={20} className="text-slate-500" />
              General Information
            </h3>
            
            <div className="flex flex-col gap-2">
              <InfoItem icon={Briefcase} label="Job Title" value={jobData.title} />
              <InfoItem icon={Building2} label="Company" value={jobData.company} />
              <InfoItem icon={Clock} label="Employment Type" value={jobData.employmentType} />
              <InfoItem icon={Star} label="Experience Required" value={jobData.experienceRequired} />
              <InfoItem icon={Globe} label="Work Mode" value={jobData.workMode} />
              <InfoItem icon={MapPin} label="Location" value={jobData.location} />
              <InfoItem icon={BookOpen} label="Industry" value={jobData.industry} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Important Job Info */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
            
            <div className="grid sm:grid-cols-2 gap-8">
              
              {/* Skills Area */}
              <div className="flex flex-col gap-6">
                
                {/* Primary Skills */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Primary Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {jobData.primarySkills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 shadow-sm transition-transform hover:-translate-y-0.5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferred Skills */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Star size={16} className="text-indigo-500" />
                    Preferred Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {jobData.preferredSkills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 shadow-sm transition-transform hover:-translate-y-0.5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Responsibilities & Qualifications Area */}
              <div className="flex flex-col gap-6">
                
                {/* Responsibilities */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <ListChecks size={16} className="text-amber-500" />
                    Responsibilities
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {jobData.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                        <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Qualifications */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Award size={16} className="text-sky-500" />
                    Qualifications
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {jobData.qualifications.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                        <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
              
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
