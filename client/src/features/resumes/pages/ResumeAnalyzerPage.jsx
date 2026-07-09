import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import { useResumes } from '../hooks/useResumes'
import ResumeDropzone from '../components/ResumeDropzone'
import ResumeDetails from '../components/ResumeDetails'

export default function ResumeAnalyzerPage() {
  const { resumes } = useResumes()
  
  // By default, let's load the first mock resume for demonstration, 
  // or null if we want to show the empty upload state first.
  const [activeResume, setActiveResume] = useState(resumes[0] || null)
  const [isUploading, setIsUploading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    // If user clicked an upload link, force the upload area to show
    if (searchParams.get('action') === 'upload') {
      setIsUploading(true)
      setActiveResume(null)
      searchParams.delete('action')
      setSearchParams(searchParams, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const handleUploadComplete = (file, isSuccess) => {
    if (isSuccess) {
      console.log('Successfully uploaded:', file.name)
      setIsUploading(false)
      // In a real app, the API would return the new resume object.
      // Here we just mock it by setting the first one as active to show the analysis.
      setActiveResume(resumes[0])
    }
  }

  const handleUploadClick = () => {
    setIsUploading(true)
    setActiveResume(null)
  }

  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Resume Analyzer' }]}>
      <DashboardContainer className="gap-8 max-w-5xl mx-auto">
        {/* Header Section */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Resume Analyzer</h1>
            <p className="mt-1 text-slate-500">Upload a resume to instantly generate ATS scores and AI suggestions.</p>
          </div>
          {activeResume && !isUploading && (
            <button
              onClick={handleUploadClick}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-400 hover:shadow-sky-500/20 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              <Plus size={18} />
              Upload New Resume
            </button>
          )}
        </section>

        {/* Upload Area or Active Resume */}
        <AnimatePresence mode="wait">
          {(!activeResume || isUploading) ? (
            <motion.section 
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full"
            >
              <ResumeDropzone 
                onUploadComplete={handleUploadComplete}
                maxSizeMB={5}
                acceptedTypes={['.pdf', '.docx', '.doc']}
                mockMode={true}
              />
            </motion.section>
          ) : (
            <motion.section 
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <ResumeDetails resume={activeResume} />
            </motion.section>
          )}
        </AnimatePresence>
      </DashboardContainer>
    </DashboardLayout>
  )
}
