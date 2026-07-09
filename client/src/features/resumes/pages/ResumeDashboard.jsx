import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, SlidersHorizontal, ArrowDownAZ, Loader2, FileX } from 'lucide-react'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import DashboardContainer from '../../../components/dashboard/DashboardContainer'
import SectionHeader from '../../../components/dashboard/home/SectionHeader'
import StatCard from '../../../components/dashboard/home/StatCard'
import ResumeCard from '../components/ResumeCard'
import { useResumes } from '../hooks/useResumes'
import Modal from '../../../components/ui/Modal'
import SlidePanel from '../../../components/ui/SlidePanel'
import ResumeDropzone from '../components/ResumeDropzone'
import ResumeDetails from '../components/ResumeDetails'

export default function ResumeDashboard() {
  const { 
    resumes, 
    stats, 
    isLoading, 
    searchQuery, 
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    totalCount
  } = useResumes()

  // State for overlays
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedResume, setSelectedResume] = useState(null)

  const handleUploadComplete = (file, isSuccess) => {
    if (isSuccess) {
      console.log('Successfully uploaded:', file.name)
      // Wait a moment then close modal automatically
      setTimeout(() => setIsUploadModalOpen(false), 2000)
    }
  }

  const handleOpenDetails = (resume) => {
    setSelectedResume(resume)
  }

  const handleCloseDetails = () => {
    setSelectedResume(null)
  }

  return (
    <DashboardLayout breadcrumbItems={[{ label: 'Resumes' }]}>
      <DashboardContainer className="gap-8">
        {/* Header Section */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Resume Library</h1>
            <p className="mt-1 text-slate-500">Manage, parse, and analyze your candidate resumes.</p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-400 hover:shadow-sky-500/20 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <Plus size={18} />
            Upload Resume
          </button>
        </section>

        {/* Statistics Cards */}
        <section aria-labelledby="resume-statistics">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </section>

        {/* Action Bar (Search & Filters) */}
        <section className="flex flex-col sm:flex-row gap-4 items-center justify-between rounded-2xl bg-white p-3 border border-slate-200 shadow-sm">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, role, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border-none bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:ring-2 focus:ring-sky-500/50 outline-none transition-shadow"
            />
          </div>
          
          <div className="flex w-full sm:w-auto items-center gap-2 overflow-x-auto">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-1">
              <SlidersHorizontal size={16} className="ml-2 text-slate-400" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 cursor-pointer outline-none py-1.5 pr-8"
              >
                <option value="all">All Status</option>
                <option value="parsed">Parsed</option>
                <option value="processing">Processing</option>
                <option value="needs_review">Needs Review</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-1">
              <ArrowDownAZ size={16} className="ml-2 text-slate-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-sm font-medium text-slate-700 focus:ring-0 cursor-pointer outline-none py-1.5 pr-8"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="score_high">Highest Score</option>
                <option value="score_low">Lowest Score</option>
              </select>
            </div>
          </div>
        </section>

        {/* Resumes Grid */}
        <section aria-labelledby="recent-resumes" className="min-h-[400px]">
          <SectionHeader
            id="recent-resumes"
            eyebrow="Library"
            title={`Recent Resumes (${totalCount})`}
          />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
                <p className="mt-4 text-sm font-medium text-slate-500">Loading your resumes...</p>
              </motion.div>
            ) : totalCount > 0 ? (
              <motion.div
                key="grid"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {resumes.map((resume, index) => (
                  <ResumeCard 
                    key={resume.id} 
                    resume={resume} 
                    index={index} 
                    onOpen={handleOpenDetails}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <FileX size={32} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">No resumes found</h3>
                <p className="mt-2 text-center text-sm max-w-sm text-slate-500">
                  {searchQuery || statusFilter !== 'all' 
                    ? "We couldn't find any resumes matching your current filters."
                    : "Your resume library is empty. Upload a candidate resume to get started with ATS parsing."}
                </p>
                {searchQuery || statusFilter !== 'all' ? (
                  <button 
                    onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                    className="mt-6 font-semibold text-sky-600 hover:text-sky-500"
                  >
                    Clear all filters
                  </button>
                ) : (
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="mt-6 rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                  >
                    Upload Resume
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* OVERLAYS */}
        
        {/* Upload Modal */}
        <Modal 
          isOpen={isUploadModalOpen} 
          onClose={() => setIsUploadModalOpen(false)}
          title="Upload New Resume"
        >
          <ResumeDropzone 
            onUploadComplete={handleUploadComplete}
            maxSizeMB={5}
            acceptedTypes={['.pdf', '.docx', '.doc']}
            mockMode={true}
          />
        </Modal>

        {/* Details Slide Panel */}
        <SlidePanel
          isOpen={!!selectedResume}
          onClose={handleCloseDetails}
          title="Resume Details"
        >
          <ResumeDetails resume={selectedResume} />
        </SlidePanel>

      </DashboardContainer>
    </DashboardLayout>
  )
}
