// Day 4
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileSearch, MessageSquare, PanelRightClose, PanelRightOpen } from 'lucide-react';
import Card_Day4 from '../components/Card_Day4';
import AIChatSidebar from '../components/AIChatSidebar_Day4';
import insuranceData from '../data/data_Day4';

const Results_Day4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const aiData = location.state?.resultData;
  // Fallback to placeholder if no AI data or if the summary is missing (indicates failed/empty analysis)
  const displayData = (aiData && (aiData.summary || (aiData.covered && aiData.covered.length > 0))) 
    ? aiData 
    : insuranceData;
  // Day 7 - END

  // Day 4 - START: Chat panel toggle state
  const [isChatOpen, setIsChatOpen] = useState(true);
  // Day 4 - END

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] transition-colors duration-300">
      <div className="flex h-[calc(100vh-64px)]">

        {/* LEFT PANEL — Policy Analysis (scrollable) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`flex-1 overflow-y-auto transition-all duration-300 ${isChatOpen ? '' : 'max-w-full'}`}
        >
          <div className="max-w-4xl mx-auto pt-10 pb-20 px-4 sm:px-6 lg:px-8">

            {/* Header Section */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-[#101928]/50 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-sm mb-6"
              >
                <FileSearch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300 uppercase">Analysis Complete</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-3">
                Policy Analysis Results
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto">
                Here's a simplified breakdown of your insurance policy
              </p>
            </div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ boxShadow: '0 20px 40px rgba(37,99,235,0.08)' }}
              className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#101928]/60 dark:to-[#101928]/40 backdrop-blur-xl rounded-2xl shadow-md dark:shadow-none border border-blue-100 dark:border-white/10 p-8 mb-10 transition-colors duration-300 dark:hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                  <FileSearch className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50 mb-2">Summary</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {displayData.summary}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Main Grid — 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              <Card_Day4 title="What's Covered" items={displayData.covered || []} variant="green" delay={0.15} />
              <Card_Day4 title="Not Covered" items={displayData.notCovered || []} variant="red" delay={0.3} />
              <Card_Day4 title="Conditions" items={displayData.conditions || []} variant="yellow" delay={0.45} />
              <Card_Day4 title="Risks & Limits" items={displayData.risks || []} variant="blue" delay={0.6} />
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                onClick={() => navigate('/upload')}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 bg-white dark:bg-[#101928] hover:bg-slate-50 dark:hover:bg-[#1a2536] border-2 border-slate-200 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 shadow-sm transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Analyze Another Policy
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Day 4 - START: Chat Toggle Button (floating) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center transition-colors lg:hidden"
        >
          {isChatOpen ? <PanelRightClose className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
        {/* Day 4 - END */}

        {/* RIGHT PANEL — AI Chat Sidebar */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="hidden lg:flex flex-col w-[400px] flex-shrink-0 border-l border-slate-100 dark:border-white/5 bg-white dark:bg-[#0d1526] overflow-hidden"
            >
              {/* Desktop close button */}
              <div className="flex items-center justify-between px-5 pt-3">
                <span></span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Close chat"
                >
                  <PanelRightClose className="w-5 h-5" />
                </motion.button>
              </div>
              {/* Chatbot context injection logic modified by rakshit */}
              <AIChatSidebar policyData={displayData} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reopen button when chat is closed on desktop */}
        {!isChatOpen && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="hidden lg:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xl shadow-blue-500/30 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Ask AI
          </motion.button>
        )}

      </div>
    </div>
  );
};

export default Results_Day4;
