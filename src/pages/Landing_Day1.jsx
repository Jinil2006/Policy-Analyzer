// Day 3
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
// Day 3 - START: Import framer-motion
import { motion } from 'framer-motion';
// Day 3 - END
import Button from '../components/Button';

// Day 3 - START: Modify FeatureCard to accept Framer Motion view stagger
const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(37,99,235,0.12)" }}
    className="group relative bg-white/70 dark:bg-[#101928]/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-white/80 dark:border-white/10 hover:border-blue-200/50 dark:hover:border-blue-500/30 flex flex-col items-start transition-colors duration-500"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 dark:from-blue-900/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 w-full">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 dark:from-blue-900/40 to-blue-50 dark:to-[#101928] flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 shadow-inner border border-blue-100/50 dark:border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
        <Icon className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-50 tracking-tight group-hover:text-blue-900 dark:group-hover:text-blue-300 transition-colors">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{description}</p>
    </div>
  </motion.div>
);
// Day 3 - END

const Landing_Day1 = () => {
  const navigate = useNavigate();

  // Day 3 - START: Headline words for stagger animation
  const headingText = "Understand Your Insurance Policy Easily".split(" ");
  // Day 3 - END

  return (
    // Day 3 - START: Added dark mode background classes
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-[#070b14] flex flex-col selection:bg-blue-200 selection:text-blue-900 transition-colors duration-300">
      {/* Day 3 - END */}

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.08] pointer-events-none mix-blend-overlay"></div>

      {/* Day 3 - START: Dark mode blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 dark:opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-20 w-[30rem] h-[30rem] bg-indigo-300 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-1/2 w-[40rem] h-[40rem] bg-blue-100 dark:bg-sky-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] opacity-60 dark:opacity-20 animate-blob animation-delay-4000"></div>
      {/* Day 3 - END */}

      {/* Day 3 - START: Hero floating animation container */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="relative flex-1 flex flex-col mt-20 md:mt-32 px-6"
      >
        {/* Day 3 - END */}

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center z-10 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-[#101928]/50 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-sm mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            <span className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300 uppercase">AI-Powered Simplification</span>
          </motion.div>

          {/* Day 3 - START: Word-by-word reveal */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-50 mb-8 tracking-tighter leading-[1.1]">
            {headingText.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`inline-block mr-3 md:mr-4 pb-2 pr-2 ${word === "Insurance" || word === "Policy" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          {/* Day 3 - END */}

          {/* Day 3 - START: Subtext Fade-in Delay */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Upload dense insurance documents and let our AI translate them into simple, actionable insights. No more legal jargon. Just clarity.
          </motion.p>
          {/* Day 3 - END */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center items-center gap-4"
          >
            {/* Day 3 - START: Button Tap / Navigate to /upload */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Button onClick={() => navigate('/upload')} className="text-lg shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Start Decoding <ArrowRight className="w-5 h-5 ml-1 inline-block" />
              </Button>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log('Demo clicked')}
              className="px-8 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white/50 dark:bg-[#101928]/50 hover:bg-white dark:hover:bg-[#1a2536] backdrop-blur-md border border-slate-200/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm transition-colors duration-300"
            >
              Watch Demo
            </motion.button>
            {/* Day 3 - END */}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="w-full max-w-6xl mx-auto relative z-10 pb-20 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <FeatureCard
              icon={Sparkles}
              title="Instant Analysis"
              description="Our AI breaks down complex policy clauses in seconds, giving you crystal-clear insights immediately."
              index={1}
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Risk Detection"
              description="We automatically identify hidden loopholes, coverage gaps, and critical clauses you need to watch out for."
              index={2}
            />
            <FeatureCard
              icon={FileText}
              title="Simplified Language"
              description="We strip away the legalese to explain exactly what you are covered for in plain, everyday English."
              index={3}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing_Day1;
