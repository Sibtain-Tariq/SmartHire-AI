import BaseStorageService from './BaseStorageService'
import { STORAGE_BUCKETS } from '../constants/storage'
import { getInterviewRecordingPath } from '../utils/storageHelpers'

class InterviewRecordingStorageService extends BaseStorageService {
  constructor() {
    super(STORAGE_BUCKETS.INTERVIEW_RECORDINGS, 'INTERVIEW', getInterviewRecordingPath)
  }
}

export default new InterviewRecordingStorageService()
