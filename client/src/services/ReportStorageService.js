import BaseStorageService from './BaseStorageService'
import { STORAGE_BUCKETS } from '../constants/storage'
import { getReportPath } from '../utils/storageHelpers'

class ReportStorageService extends BaseStorageService {
  constructor() {
    super(STORAGE_BUCKETS.REPORTS, 'REPORT', getReportPath)
  }
}

export default new ReportStorageService()
