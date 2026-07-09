import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UploadCloud, 
  File, 
  CheckCircle2, 
  XCircle, 
  Info, 
  ShieldCheck, 
  FileText, 
  ChevronRight,
  Loader2
} from 'lucide-react'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import { mockResumesList } from '../data/mockResumes'

export default function ResumeUploader() {
  const [uploadState, setUploadState] = useState('idle') // idle, uploading, success, error
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  // Mock upload simulation
  const simulateUpload = (file) => {
    setSelectedFile(file)
    setUploadState('uploading')
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // Randomly succeed or fail for demonstration
          const isSuccess = Math.random() > 0.15
          setUploadState(isSuccess ? 'success' : 'error')
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      simulateUpload(files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      simulateUpload(e.target.files[0])
    }
  }

  const resetUpload = () => {
    setUploadState('idle')
    setProgress(0)
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Resumes', path: '/resumes' }, { label: 'Upload' }]}>
      <DashboardContainer className="gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Upload Resume</h1>
          <p className="mt-1 text-slate-500">Securely parse and add candidate resumes to your library.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Upload Area */}
          <section className="flex flex-col gap-6">
            <div 
              className={`relative flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-white p-12 text-center transition-colors ${
                uploadState === 'idle' ? 'border-slate-300 hover:border-sky-400 hover:bg-sky-50/50' : 'border-transparent shadow-sm'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <AnimatePresence mode="wait">
                {uploadState === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center"
                  >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 text-sky-500 shadow-sm ring-8 ring-sky-50/50">
                      <UploadCloud size={36} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Click or drag file to this area</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files.
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-xl bg-sky-500 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-sky-400 hover:shadow-md hover:shadow-sky-500/20"
                      >
                        Browse Files
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept=".pdf,.doc,.docx"
                      />
                      <div className="flex gap-4 text-xs font-medium text-slate-400">
                        <span>Accepted: PDF, DOCX</span>
                        <span>•</span>
                        <span>Max size: 5MB</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {uploadState === 'uploading' && (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex w-full max-w-md flex-col items-center"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
                      <File size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 truncate w-full">{selectedFile?.name || 'resume.pdf'}</h3>
                    <p className="mt-1 text-sm text-slate-500">Parsing and analyzing document...</p>
                    
                    <div className="mt-8 w-full">
                      <div className="mb-2 flex justify-between text-sm font-semibold text-sky-600">
                        <span>Uploading...</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <motion.div 
                          className="h-full bg-sky-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: "linear" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {uploadState === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-sm ring-8 ring-emerald-50/50">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Upload Complete!</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      "{selectedFile?.name || 'resume.pdf'}" has been successfully parsed and added to your library.
                    </p>
                    <div className="mt-8 flex gap-4">
                      <button 
                        onClick={resetUpload}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        Upload Another
                      </button>
                      <Link 
                        to="/resumes"
                        className="rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-slate-800"
                      >
                        View Library
                      </Link>
                    </div>
                  </motion.div>
                )}

                {uploadState === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm ring-8 ring-red-50/50">
                      <XCircle size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Upload Failed</h3>
                    <p className="mt-2 text-sm max-w-sm text-slate-500">
                      We couldn't process "{selectedFile?.name || 'resume.pdf'}". Please ensure it is a valid PDF under 5MB.
                    </p>
                    <button 
                      onClick={resetUpload}
                      className="mt-8 rounded-xl bg-red-500 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-red-400"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Sidebar Area */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <ShieldCheck size={18} className="text-emerald-500" />
                Privacy & Security
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                All uploaded resumes are immediately encrypted. Personally Identifiable Information (PII) is automatically anonymized during AI parsing to ensure strict bias-free hiring compliance.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <Info size={18} className="text-sky-500" />
                Upload Tips
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  Ensure text is selectable (not image-based PDFs) for the most accurate ATS scoring.
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  Complex multi-column layouts may occasionally reduce parsing accuracy.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Recent Uploads</h3>
              <div className="flex flex-col gap-3">
                {mockResumesList.slice(0, 3).map((resume) => (
                  <Link 
                    key={resume.id} 
                    to={`/resumes/${resume.id}`}
                    className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-slate-200 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <FileText size={16} />
                      </div>
                      <div className="truncate text-left">
                        <p className="truncate text-sm font-medium text-slate-900 group-hover:text-sky-600 transition-colors">{resume.original_filename}</p>
                        <p className="text-xs text-slate-400">Parsed • {resume.ats_score}% Match</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </DashboardContainer>
    </DashboardLayout>
  )
}
