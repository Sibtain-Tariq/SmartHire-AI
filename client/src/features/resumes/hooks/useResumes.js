import { useState, useEffect } from 'react'
import { mockResumesList } from '../data/mockResumes'

export function useResumes() {
  const [resumes, setResumes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setResumes(mockResumesList)
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return {
    resumes,
    isLoading,
    error,
  }
}
