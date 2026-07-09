import { useState, useEffect, useMemo } from 'react'
import { mockResumesList, resumeStats } from '../data/mockResumes'

export function useResumes() {
  const [resumes, setResumes] = useState([])
  const [stats, setStats] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // all, parsed, processing, needs_review
  const [sortBy, setSortBy] = useState('newest') // newest, oldest, score_high, score_low

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setResumes(mockResumesList)
      setStats(resumeStats)
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const filteredAndSortedResumes = useMemo(() => {
    let result = [...resumes]

    // 1. Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(lowerQuery) ||
          r.original_filename.toLowerCase().includes(lowerQuery) ||
          r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    }

    // 2. Filter
    if (statusFilter !== 'all') {
      result = result.filter((r) => r.status === statusFilter)
    }

    // 3. Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at)
        case 'score_high':
          return b.ats_score - a.ats_score
        case 'score_low':
          return a.ats_score - b.ats_score
        case 'newest':
        default:
          return new Date(b.created_at) - new Date(a.created_at)
      }
    })

    return result
  }, [resumes, searchQuery, statusFilter, sortBy])

  return {
    resumes: filteredAndSortedResumes,
    stats,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    totalCount: filteredAndSortedResumes.length
  }
}
