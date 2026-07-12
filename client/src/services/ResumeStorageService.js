import BaseStorageService from './BaseStorageService'
import { STORAGE_BUCKETS, STORAGE_CATEGORIES } from '../constants/storage'
import { getResumePath } from '../utils/storageHelpers'

class ResumeStorageService extends BaseStorageService {
  constructor() {
    super(STORAGE_BUCKETS.PRIVATE, STORAGE_CATEGORIES.RESUMES, 'RESUME', getResumePath)
  }
}

export default new ResumeStorageService()
