import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../../hooks/useAuth'

const getStorageKey = (userId) => `smarthire_resumes_${userId}`

export function useResumes() {
  const { session } = useAuth()
  const userId = session?.user?.id

  // Synchronous initialization from localStorage prevents UI flashing
  const [resumes, setResumes] = useState(() => {
    if (!userId) return []
    try {
      const stored = localStorage.getItem(getStorageKey(userId))
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // React to User Login/Logout or Account Switching
  useEffect(() => {
    if (!userId) {
      // Clear sensitive memory when logged out
      setResumes([])
      return
    }
    
    // Load specific user's database from storage
    try {
      const stored = localStorage.getItem(getStorageKey(userId))
      setResumes(stored ? JSON.parse(stored) : [])
    } catch {
      setResumes([])
    }
  }, [userId])

  // Automatically sync to local storage DB whenever state changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem(getStorageKey(userId), JSON.stringify(resumes))
    }
  }, [resumes, userId])

  const addResume = useCallback((newResume) => {
    setResumes(prev => {
      const exists = prev.find(r => r.resumeId === newResume.resumeId)
      if (exists) return prev
      
      // Always guarantee the latest upload is at index 0
      const updated = [newResume, ...prev]
      return updated.sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime))
    })
  }, [])

  const removeResume = useCallback((resumeId) => {
    setResumes(prev => prev.filter(r => r.resumeId !== resumeId && r.id !== resumeId))
  }, [])

  const updateResumeStatus = useCallback((resumeId, newStatus) => {
    setResumes(prev => prev.map(r => 
      (r.resumeId === resumeId || r.id === resumeId) 
        ? { ...r, currentStatus: newStatus, lastModified: new Date().toISOString() } 
        : r
    ))
  }, [])

  return {
    resumes,
    isLoading,
    error,
    addResume,
    removeResume,
    updateResumeStatus
  }
}


