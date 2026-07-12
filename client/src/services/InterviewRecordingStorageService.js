import BaseStorageService from './BaseStorageService'
import { STORAGE_BUCKETS, STORAGE_CATEGORIES } from '../constants/storage'
import { getInterviewRecordingPath } from '../utils/storageHelpers'

class InterviewRecordingStorageService extends BaseStorageService {
  constructor() {
    super(STORAGE_BUCKETS.PRIVATE, STORAGE_CATEGORIES.INTERVIEW_RECORDINGS, 'INTERVIEW', getInterviewRecordingPath)
  }
}

export default new InterviewRecordingStorageService()
