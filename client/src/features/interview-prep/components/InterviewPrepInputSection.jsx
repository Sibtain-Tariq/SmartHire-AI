import React, { useState, useRef } from 'react';
import { FileText, Briefcase, Play, Loader2, CheckCircle2, X, ClipboardPaste, Clock, UploadCloud, File, Calendar, RefreshCw, Activity } from 'lucide-react';

export default function InterviewPrepInputSection({ onStart, isStarting }) {
  const [uploadedResume, setUploadedResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    const type = file.name.split('.').pop().toUpperCase();

    setIsUploading(true);
    setTimeout(() => {
      setUploadedResume({
        name: file.name,
        type: type,
        size: sizeInMB,
        date: new Date().toLocaleDateString(),
        atsScore: Math.floor(Math.random() * (95 - 70) + 70),
      });
      setIsUploading(false);
    }, 1500);
  };

  const handleStart = () => {
    if (!uploadedResume) return;
    if (onStart) onStart({ resume: uploadedResume, jobDescription });
  };

  const getReadingTime = (text) => {
    const words = text.trim().split(/\s+/).length;
    if (words === 0 || text.trim() === '') return '< 1 min';
    const mins = Math.ceil(words / 200);
    return `${mins} min read`;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: Resume Upload */}
        <div className="flex flex-col gap-2">
          <div className="mb-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText size={24} className="text-indigo-600" />
              Upload Resume
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Upload the resume you want the AI interviewer to review.
            </p>
          </div>

          {!uploadedResume ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition-colors hover:border-indigo-400 hover:bg-indigo-50/50 min-h-[400px]">
              {isUploading ? (
                <div className="flex flex-col items-center gap-4 text-indigo-600">
                  <Loader2 size={48} className="animate-spin" />
                  <p className="font-bold text-lg">Uploading and Parsing...</p>
                </div>
              ) : (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 mb-6 shadow-sm">
                    <UploadCloud size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 mb-2">Drag & Drop your resume here</h3>
                  <p className="text-sm font-medium text-slate-500 mb-6">or</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl bg-white border border-slate-200 px-6 py-2.5 text-sm font-bold text-indigo-700 shadow-sm hover:bg-indigo-50 hover:border-indigo-200 transition-colors mb-6"
                  >
                    Browse Files
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.doc" 
                    className="hidden" 
                  />
                  <div className="flex flex-col gap-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span>Supported formats: PDF, DOCX</span>
                    <span>Maximum Size: 5 MB</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col rounded-3xl border border-emerald-200 bg-emerald-50/30 p-8 shadow-sm min-h-[400px]">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 text-lg">Resume Ready</h3>
                  <p className="text-sm font-medium text-emerald-700/70">Successfully parsed and prepared for interview.</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><File size={14} /> Resume Name</span>
                    <span className="text-sm font-bold text-slate-900 truncate" title={uploadedResume.name}>{uploadedResume.name}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Activity size={14} /> Mock Score</span>
                    <span className="inline-flex items-center w-fit rounded px-2.5 py-0.5 text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200">
                      {uploadedResume.atsScore} / 100
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><FileText size={14} /> File Type</span>
                    <span className="text-sm font-bold text-slate-700">{uploadedResume.type}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Calendar size={14} /> Upload Date</span>
                    <span className="text-sm font-semibold text-slate-700">{uploadedResume.date}</span>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><UploadCloud size={14} /> File Size</span>
                    <span className="text-sm font-semibold text-slate-700">{uploadedResume.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-emerald-200/50">
                <button 
                  onClick={() => setUploadedResume(null)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <RefreshCw size={16} /> Replace Resume
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Job Description */}
        <div className="flex flex-col gap-2">
          <div className="mb-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Briefcase size={24} className="text-emerald-600" />
              Job Description <span className="text-xs text-slate-400 font-medium">(Optional)</span>
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Paste a JD to tailor the interview questions to a specific role.
            </p>
          </div>

          <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-[400px]">
            <textarea
              id="jobDescription"
              placeholder="We are looking for a Software Engineer with experience in React, Python, FastAPI..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full flex-1 resize-none bg-slate-50 p-6 text-sm leading-relaxed text-slate-900 transition-colors focus:bg-white focus:outline-none focus:ring-0 min-h-[300px]"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-100 p-4 border-t border-slate-200 mt-auto">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <FileText size={14} className="text-slate-400" />
                  {jobDescription.length} characters
                </div>
                <div className="h-3 w-px bg-slate-300 hidden sm:block"></div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  Est: {getReadingTime(jobDescription)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setJobDescription('')}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                >
                  <X size={14} /> Clear
                </button>
                <button 
                  onClick={() => {}} // Mock only
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  <ClipboardPaste size={14} /> Paste
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Start Interview Action */}
      <div className="flex items-center justify-end mt-4">
        <button
          onClick={handleStart}
          disabled={!uploadedResume || isStarting}
          className="inline-flex min-w-[250px] items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {isStarting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Preparing Session...
            </>
          ) : (
            <>
              <Play size={20} className="fill-white" />
              Start Interview
            </>
          )}
        </button>
      </div>
    </div>
  );
}
