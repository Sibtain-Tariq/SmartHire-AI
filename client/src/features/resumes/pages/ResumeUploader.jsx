import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Info, 
  ShieldCheck, 
  FileText, 
  ChevronRight
} from 'lucide-react'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import { mockResumesList } from '../data/mockResumes'
import ResumeDropzone from '../components/ResumeDropzone'

export default function ResumeUploader() {
  const navigate = useNavigate()

  const handleUploadComplete = (file, isSuccess) => {
    if (isSuccess) {
      console.log('Successfully uploaded:', file.name)
      // In a real implementation, we might navigate to the resume details view
      // navigate(`/resumes/new-id`)
    }
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
            <ResumeDropzone 
              onUploadComplete={handleUploadComplete}
              maxSizeMB={5}
              acceptedTypes={['.pdf', '.docx', '.doc']}
              mockMode={true}
            />
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
