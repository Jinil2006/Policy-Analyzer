// Day 3
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertTriangle, FilePieChart, Plus, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

// Helper: format relative time
const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (mins > 0) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  return 'Just now';
};

// Animated Counter
const AnimatedCounter = ({ endValue, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime, animationFrame;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * endValue));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);
  return <span>{count}</span>;
};

// Stat Card
const StatCard = ({ title, value, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
    className="bg-white dark:bg-[#101928]/40 backdrop-blur-xl p-6 rounded-2xl shadow-md dark:shadow-none border border-gray-100 dark:border-white/10 transition-colors duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </div>
    </div>
    <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-50 mb-1">
      <AnimatedCounter endValue={value} />
    </h3>
    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{title}</p>
  </motion.div>
);

const Dashboard_Day3 = () => {
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch 3 most recent policies via JWT
  useEffect(() => {
    if (!authToken) { setLoading(false); return; }
    fetch('http://localhost:5000/api/policies/recent', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setActivities(data); })
      .catch(err => console.error('Failed to load recent policies:', err))
      .finally(() => setLoading(false));
  }, [authToken]);

  // Click → navigate to Results with full policy data + id
  const handleActivityClick = (policy) => {
    navigate('/results', {
      state: {
        policyId: policy._id,
        resultData: {
          summary: policy.summary,
          covered: policy.covered,
          notCovered: policy.notCovered,
          conditions: policy.conditions,
          risks: policy.risks
        }
      }
    });
  };

  const totalRisks = activities.reduce((acc, p) => acc + (p.risks?.length || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 dark:bg-[#070b14] transition-colors duration-300 pt-10 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
              Your Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Overview of your analyzed policies
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
            <Button onClick={() => navigate('/upload')} className="flex items-center gap-2 dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Plus className="w-5 h-5" />
              Upload New Policy
            </Button>
          </motion.div>
        </div>

        {/* Stats — live from DB */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Policies Analyzed" value={activities.length} icon={FileText} delay={0.15} />
          <StatCard title="Risks Detected" value={totalRisks} icon={AlertTriangle} delay={0.3} />
          <StatCard title="Reports Generated" value={activities.length} icon={FilePieChart} delay={0.45} />
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-[#101928]/40 backdrop-blur-xl rounded-2xl shadow-md dark:shadow-none border border-gray-100 dark:border-white/10 p-8 transition-colors duration-300"
        >
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Recent Activity
          </h2>

          <div className="space-y-4">
            {loading && (
              <div className="flex items-center justify-center py-8 gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full"
                />
                <p className="text-slate-400 text-sm font-medium">Loading your policies...</p>
              </div>
            )}

            {!loading && activities.length === 0 && (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-2">No policies analyzed yet.</p>
                <button
                  onClick={() => navigate('/upload')}
                  className="text-blue-600 dark:text-blue-400 text-sm font-semibold underline hover:text-blue-700"
                >
                  Upload your first policy →
                </button>
              </div>
            )}

            {activities.map((policy, idx) => (
              <motion.div
                key={policy._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + idx * 0.12 }}
                onClick={() => handleActivityClick(policy)}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-slate-700 dark:text-slate-200 font-semibold truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {policy.policyName}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
                      Analyzed {timeAgo(policy.createdAt)}
                    </p>
                    {policy.summary && (
                      <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 italic truncate max-w-md">
                        {policy.summary}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3" />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Dashboard_Day3;
