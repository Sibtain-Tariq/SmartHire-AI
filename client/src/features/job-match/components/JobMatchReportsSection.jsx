import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, FileText, Download, Eye, Trash2, Building2, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockReports = [
  { id: 1, title: 'Senior Backend Engineer', company: 'TechCorp', score: 85, date: '2026-07-09', resume: 'Backend_Resume_v2.pdf' },
  { id: 2, title: 'Full Stack Developer', company: 'StartupInc', score: 92, date: '2026-07-08', resume: 'FullStack_Resume_Final.pdf' },
  { id: 3, title: 'Cloud Architect', company: 'CloudSys', score: 65, date: '2026-07-05', resume: 'Backend_Resume_v2.pdf' },
  { id: 4, title: 'DevOps Engineer', company: 'AutomateAll', score: 78, date: '2026-07-01', resume: 'DevOps_Resume.pdf' },
  { id: 5, title: 'Frontend Developer', company: 'DesignWeb', score: 45, date: '2026-06-25', resume: 'Frontend_React_Resume.pdf' },
];

export default function JobMatchReportsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'highest', 'lowest'
  const [reports, setReports] = useState(mockReports);

  const handleDelete = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...reports];

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => r.title.toLowerCase().includes(q) || r.company.toLowerCase().includes(q));
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'highest') {
        return b.score - a.score;
      } else if (sortBy === 'lowest') {
        return a.score - b.score;
      }
      return 0;
    });

    return result;
  }, [reports, searchQuery, sortBy]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <section className="flex flex-col gap-6 w-full mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-900">Previous Matches</h2>
          <p className="text-sm text-slate-500">Review your past job match reports</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search job title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-shadow shadow-sm"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-shadow shadow-sm appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Match</option>
              <option value="lowest">Lowest Match</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {filteredAndSorted.length > 0 ? (
            filteredAndSorted.map((report) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={report.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Info Section */}
                <div className="flex items-start gap-4 flex-1">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${getScoreColor(report.score)}`}>
                    <span className="text-lg font-black">{report.score}</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-slate-900 text-lg">{report.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm font-medium text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={16} className="text-slate-400" />
                        {report.company}
                      </div>
                      <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} className="text-slate-400" />
                        {report.date}
                      </div>
                      <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
                      <div className="flex items-center gap-1.5">
                        <FileText size={16} className="text-slate-400" />
                        <span className="truncate max-w-[150px]" title={report.resume}>{report.resume}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:border-l lg:border-slate-100 lg:pl-6 pt-4 lg:pt-0 border-t border-slate-100 lg:border-t-0 w-full lg:w-auto justify-end">
                  <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors">
                    <Eye size={16} />
                    View
                  </button>
                  <button 
                    disabled
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-400 cursor-not-allowed"
                    title="Pro Feature"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button 
                    onClick={() => handleDelete(report.id)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-12 px-4 text-center"
            >
              <Briefcase size={32} className="text-slate-400 mb-3" />
              <h3 className="font-bold text-slate-700">No reports found</h3>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search query.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
