import BaseStorageService from './BaseStorageService'
import { STORAGE_BUCKETS, STORAGE_CATEGORIES } from '../constants/storage'
import { getReportPath } from '../utils/storageHelpers'

class ReportStorageService extends BaseStorageService {
  constructor() {
    super(STORAGE_BUCKETS.PRIVATE, STORAGE_CATEGORIES.REPORTS, 'REPORT', getReportPath)
  }
}

export default new ReportStorageService()
