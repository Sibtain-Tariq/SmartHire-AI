import BaseStorageService from './BaseStorageService'
import { STORAGE_BUCKETS } from '../constants/storage'
import { getResumePath } from '../utils/storageHelpers'

class ResumeStorageService extends BaseStorageService {
  constructor() {
    super(STORAGE_BUCKETS.RESUMES, 'RESUME', getResumePath)
  }
}

export default new ResumeStorageService()
