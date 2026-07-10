import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trash2, Download, Zap, XCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

// --- Simple Tooltip Wrapper ---
const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-10 whitespace-nowrap bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg z-10"
          >
            {text}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Mock Action Center Component ---
export default function JobMatchActionCenter({ onAnalyzeAgain }) {
  const [loadingAction, setLoadingAction] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAction = (actionId, requiresConfirm = false, confirmData = null) => {
    if (requiresConfirm) {
      setConfirmModal({ actionId, ...confirmData });
      return;
    }

    executeAction(actionId);
  };

  const executeAction = (actionId) => {
    setConfirmModal(null);
    setLoadingAction(actionId);
    
    // Mock network request
    setTimeout(() => {
      setLoadingAction(null);
      
      switch (actionId) {
        case 'analyze':
          showToast('Analysis refreshed successfully!');
          if (onAnalyzeAgain) onAnalyzeAgain();
          break;
        case 'clear_jd':
          showToast('Job Description cleared!');
          break;
        case 'optimize':
          showToast('Resume optimization started. Check suggestions!');
          break;
        case 'delete':
          showToast('Analysis deleted permanently.');
          if (onAnalyzeAgain) onAnalyzeAgain(); // Redirect to input
          break;
        default:
          break;
      }
    }, 1500);
  };

  return (
    <section className="flex flex-col gap-4 mt-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex flex-col mb-2">
        <h3 className="font-bold text-slate-900 text-lg">Action Center</h3>
        <p className="text-sm text-slate-500">Manage this analysis report</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Analyze Again */}
        <Tooltip text="Re-run the analysis">
          <button 
            onClick={() => handleAction('analyze')}
            disabled={loadingAction !== null}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <RefreshCw size={18} className={loadingAction === 'analyze' ? 'animate-spin' : ''} />
            {loadingAction === 'analyze' ? 'Analyzing...' : 'Analyze Again'}
          </button>
        </Tooltip>

        {/* Optimize Resume */}
        <Tooltip text="Apply AI optimizations">
          <button 
            onClick={() => handleAction('optimize')}
            disabled={loadingAction !== null}
            className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-5 py-2.5 rounded-xl font-bold border border-emerald-200 hover:bg-emerald-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Zap size={18} className={loadingAction === 'optimize' ? 'animate-pulse' : ''} />
            {loadingAction === 'optimize' ? 'Optimizing...' : 'Optimize Resume'}
          </button>
        </Tooltip>

        {/* Clear JD */}
        <Tooltip text="Clear the current job description">
          <button 
            onClick={() => handleAction('clear_jd', true, {
              title: 'Clear Job Description?',
              message: 'This will reset the JD for this match. You will need to paste a new one to run another analysis.'
            })}
            disabled={loadingAction !== null}
            className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-bold border border-slate-200 hover:bg-slate-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <XCircle size={18} />
            Clear JD
          </button>
        </Tooltip>

        {/* Download Report */}
        <Tooltip text="Pro Feature: Download PDF">
          <button 
            disabled
            className="flex items-center gap-2 bg-slate-50 text-slate-400 px-5 py-2.5 rounded-xl font-bold border border-slate-200 cursor-not-allowed"
          >
            <Download size={18} />
            Download Report
          </button>
        </Tooltip>

        {/* Delete Analysis */}
        <Tooltip text="Permanently delete this report">
          <button 
            onClick={() => handleAction('delete', true, {
              title: 'Delete Analysis?',
              message: 'Are you sure you want to delete this analysis? This action cannot be undone and the report will be lost.'
            })}
            disabled={loadingAction !== null}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold border border-red-200 hover:bg-red-100 transition-colors ml-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Trash2 size={18} className={loadingAction === 'delete' ? 'animate-bounce' : ''} />
            Delete
          </button>
        </Tooltip>
      </div>

      {/* --- Confirmation Modal --- */}
      <AnimatePresence>
        {confirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200 w-full max-w-sm p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 text-amber-600">
                <AlertTriangle size={24} />
                <h3 className="font-bold text-lg text-slate-900">{confirmModal.title}</h3>
              </div>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {confirmModal.message}
              </p>
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => setConfirmModal(null)}
                  className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => executeAction(confirmModal.actionId)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Global Toast Mock --- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl z-50 font-semibold text-sm border border-slate-700"
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
