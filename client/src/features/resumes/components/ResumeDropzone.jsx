import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UploadCloud, 
  File, 
  CheckCircle2, 
  XCircle, 
  Trash2,
  AlertCircle
} from 'lucide-react'

export default function ResumeDropzone({
  onUploadComplete,
  maxSizeMB = 5,
  acceptedTypes = ['.pdf', '.doc', '.docx'],
  mockMode = true
}) {
  const [uploadState, setUploadState] = useState('idle') // idle, uploading, success, error, validation_error
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    // Check file size
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > maxSizeMB) {
      setErrorMessage(`File size (${sizeMB.toFixed(1)}MB) exceeds the maximum limit of ${maxSizeMB}MB.`)
      setUploadState('validation_error')
      return false
    }

    // Check file type
    const extension = '.' + file.name.split('.').pop().toLowerCase()
    if (!acceptedTypes.includes(extension) && file.type !== 'application/pdf') {
      setErrorMessage(`Invalid file format. Please upload ${acceptedTypes.join(', ')}.`)
      setUploadState('validation_error')
      return false
    }

    return true
  }

  const simulateUpload = (file) => {
    setSelectedFile(file)
    setUploadState('uploading')
    setProgress(0)
    setErrorMessage('')

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          const isSuccess = Math.random() > 0.15
          
          if (isSuccess) {
            setUploadState('success')
            if (onUploadComplete) onUploadComplete(file, true)
          } else {
            setErrorMessage('Network error or server timeout. Please try again.')
            setUploadState('error')
            if (onUploadComplete) onUploadComplete(file, false)
          }
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const handleProcessFile = (file) => {
    if (validateFile(file)) {
      if (mockMode) {
        simulateUpload(file)
      } else {
        // Future API hook entry point
        setSelectedFile(file)
        setUploadState('uploading')
        // Parent component would handle actual API call using onUploadComplete
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (uploadState === 'uploading') return
    const files = e.dataTransfer.files
    if (files.length > 0) handleProcessFile(files[0])
  }

  const handleFileChange = (e) => {
    if (uploadState === 'uploading') return
    if (e.target.files.length > 0) handleProcessFile(e.target.files[0])
  }

  const resetUpload = () => {
    setUploadState('idle')
    setProgress(0)
    setSelectedFile(null)
    setErrorMessage('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div 
      className={`relative flex min-h-[400px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-white p-8 text-center transition-colors sm:p-12 ${
        uploadState === 'idle' || uploadState === 'validation_error' 
          ? 'border-slate-300 hover:border-sky-400 hover:bg-sky-50/50 cursor-pointer' 
          : 'border-transparent shadow-sm'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => {
        if (uploadState === 'idle' || uploadState === 'validation_error') {
          fileInputRef.current?.click()
        }
      }}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept={acceptedTypes.join(',')}
      />

      <AnimatePresence mode="wait">
        {/* IDLE / VALIDATION ERROR STATE */}
        {(uploadState === 'idle' || uploadState === 'validation_error') && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center w-full"
          >
            <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-sm ring-8 ${uploadState === 'validation_error' ? 'bg-red-50 text-red-500 ring-red-50/50' : 'bg-sky-50 text-sky-500 ring-sky-50/50'}`}>
              <UploadCloud size={36} />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900">Click or drag file to this area</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">
              Upload candidate resumes for instant parsing. We automatically encrypt and anonymize sensitive information.
            </p>

            {uploadState === 'validation_error' && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 border border-red-100">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}

            <div className="mt-8 flex flex-col items-center gap-4">
              <button 
                type="button"
                className="rounded-xl bg-sky-500 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-sky-400 hover:shadow-md hover:shadow-sky-500/20"
              >
                Browse Files
              </button>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
                <span>Accepted: {acceptedTypes.join(', ').toUpperCase()}</span>
                <span className="hidden sm:inline">•</span>
                <span>Max size: {maxSizeMB}MB</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* UPLOADING STATE */}
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
            
            <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <File size={20} className="text-slate-400 shrink-0" />
                <div className="text-left overflow-hidden">
                  <p className="truncate text-sm font-semibold text-slate-900">{selectedFile?.name}</p>
                  <p className="text-xs text-slate-500">{(selectedFile?.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 w-full">
              <div className="mb-2 flex justify-between text-sm font-semibold text-sky-600">
                <span>Uploading & Parsing...</span>
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

        {/* SUCCESS STATE */}
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
            <p className="mt-2 text-sm max-w-sm text-slate-500">
              "{selectedFile?.name}" has been successfully parsed and added to your library.
            </p>
            <div className="mt-8">
              <button 
                onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
              >
                Upload Another Resume
              </button>
            </div>
          </motion.div>
        )}

        {/* ERROR STATE */}
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
            <h3 className="text-xl font-bold text-slate-900">Processing Failed</h3>
            <p className="mt-2 text-sm max-w-sm text-slate-500">
              {errorMessage}
            </p>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Trash2 size={16} /> Remove File
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); simulateUpload(selectedFile); }}
                className="rounded-xl bg-red-500 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-red-400"
              >
                Retry Upload
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
