import BaseStorageService from './BaseStorageService'
import { STORAGE_BUCKETS, STORAGE_CATEGORIES } from '../constants/storage'
import { getResumePath } from '../utils/storageHelpers'

class ResumeStorageService extends BaseStorageService {
  constructor() {
    super(STORAGE_BUCKETS.PRIVATE, STORAGE_CATEGORIES.RESUMES, 'RESUME', getResumePath)
  }
  async upload(file) {
    console.log('[DEBUG] 3. Inside ResumeStorageService.upload() at the very beginning.', file.name)
    console.log('[DEBUG] 4. Immediately before calling BaseStorageService.upload().')
    return super.upload(file)
  }
}

export default new ResumeStorageService()
