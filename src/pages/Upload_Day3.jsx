// Day 3
// Day 4
import React, { useState, useRef } from 'react';
// Day 4 - START: Import useNavigate for results navigation
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Day 7 - START: import gemini service
import { analyzePolicyWithGemini } from '../services/geminiService_Day7';
// Day 7 - END
// Day 4 - END
import { UploadCloud } from 'lucide-react';
// Day 3 - START: Import Framer Motion
import { motion } from 'framer-motion';
// Day 3 - END
import Button from '../components/Button';
// Day 5 - START: Import pdf-lib
import { PDFDocument } from 'pdf-lib';
// Day 5 - END

const Upload_Day3 = () => {
  // Day 4 - START: Simplified state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  // Day 5 - START: Drag state and refactored drag-drop + page count logic
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, userEmail, authToken } = useAuth();

  const processFile = async (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.pdf') && !selectedFile.name.endsWith('.docx')) {
      setErrorMsg('error in uploading');
      setFile(null);
      return;
    }

    try {
      let numPages = 0;
      if (selectedFile.name.endsWith('.pdf')) {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        numPages = pdf.getPageCount();
      } else if (selectedFile.name.endsWith('.docx')) {
        // Simulating DOCX page count as it cannot be reliably read without rendering it
        numPages = Math.max(1, Math.ceil(selectedFile.size / 20000));
      }

      if (numPages > 2 && !isLoggedIn) {
        navigate('/login', { state: { pageLimitExceeded: true } });
      } else {
        setFile(selectedFile);
        setErrorMsg('');
      }
    } catch (err) {
      setErrorMsg('error in uploading');
      setFile(null);
    }
  };

  const handleFileSelect = async (e) => {
    await processFile(e.target.files[0]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!isAnalyzing && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAnalyzing) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  // Day 5 - END

  const handleBoxClick = () => {
    if (!isAnalyzing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Day 6 & 7 - START: Extracted text and Gemini summary
  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    let analysisData = null;

    if (file.name.endsWith('.pdf')) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5001/analyze', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.text || data.text.trim().length === 0) {
            console.error("PDF extraction returned no text. Cannot analyze empty file.");
            setIsAnalyzing(false);
            return;
          }
          console.log("--- Extracted Text from PDF (Day 6) ---");
          console.log(data.text.substring(0, 500) + "..."); 
          console.log("---------------------------------------");

          try {
            console.log("--- Calling Gemini API for Analysis (Day 7) ---");
            analysisData = await analyzePolicyWithGemini(data.text);
            console.log("--- Gemini Analysis Output (Day 7) ---", analysisData);
          } catch (geminiError) {
            console.error("Failed Gemini Analysis (Day 7):", geminiError);
          }
        } else {
          console.error("Failed to extract text from PDF (Day 6)");
        }
      } catch (error) {
        console.error("Error connecting to the backend (Day 6):", error);
      }
    }

    // Save to MongoDB — only save if analysis was successful
    if (authToken && analysisData && analysisData.summary) {
      try {
        await fetch('http://localhost:5000/api/policies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            policyName: file.name.replace(/\.[^/.]+$/, ''),
            summary: analysisData.summary,
            covered: analysisData.covered || [],
            notCovered: analysisData.notCovered || [],
            conditions: analysisData.conditions || [],
            risks: analysisData.risks || []
          })
        });
      } catch (saveError) {
        console.error('Failed to save policy to DB:', saveError);
      }
    } else {
        console.warn("Analysis data was empty or invalid. Skipping DB save.");
    }

    // Navigate to results page passing the AI result, fallback to placeholder logic if it failed
    navigate('/results', { state: { resultData: analysisData } });
  };
  // Day 7 - END
  // Day 4 - END

  return (
    // Day 3 - START: Upload Page Layout + Theme
    // Day 5 - START: 50/50 Layout with Drag and Drop UI
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#070b14] transition-colors duration-300 flex flex-col pt-16 lg:pt-20 px-6 lg:px-12 selection:bg-blue-200 selection:text-blue-900 overflow-hidden">

      {/* Background Blobs for modern look */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-blue-400/20 dark:bg-blue-900/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-400/20 dark:bg-indigo-900/20 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start justify-start gap-12 lg:gap-24 relative z-10">
        {/* Left Side: Tagline Text */}
        <div className="w-full lg:w-[50%] flex flex-col text-center lg:text-left mt-0 lg:mt-0">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300"
          >
            Drop your policy—<br className="hidden lg:block" />discover what really matters
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-400 dark:text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            We break down dense policy language into clear, actionable insights—so you can focus on what truly matters.
          </motion.p>
        </div>

        {/* Right Side: Upload Box */}
        <div className="w-full lg:w-[35%] lg:max-w-md bg-white/70 dark:bg-[#101928]/60 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_-15px_rgba(37,99,235,0.15)] border border-white/80 dark:border-white/10 transition-colors duration-300">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
              Upload Your Policy
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Upload a PDF or DOCX format file
            </p>
          </div>

          <motion.div
            whileHover={!isAnalyzing ? { scale: 1.02 } : {}}
            transition={{ duration: 0.2 }}
            className={`relative group mb-6 ${isAnalyzing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
            onClick={handleBoxClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".pdf,.docx" style={{ display: 'none' }} />
            <div className={`flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-[1.02]'
              : 'border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-400 dark:group-hover:border-blue-400'
              }`}>
              <UploadCloud className={`w-10 h-10 mb-3 transition-colors ${isDragging ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400'
                }`} strokeWidth={1.5} />
              <p className="text-slate-600 dark:text-slate-300 font-semibold text-base text-center">
                {isDragging ? 'Drop your file now...' : 'Drag & drop your file or click'}
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-2 font-medium bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                Formats: PDF, DOCX
              </p>
            </div>
          </motion.div>

          {file && !errorMsg && (
            <p className="text-green-600 dark:text-green-400 text-center mb-6 font-semibold text-sm">{file.name}</p>
          )}
          {errorMsg && (
            <p className="text-red-500 dark:text-red-400 text-center mb-6 font-semibold text-sm">{errorMsg}</p>
          )}

          {/* Day 4 - START: Analyze button with loading state */}
          <motion.div
            whileHover={!isAnalyzing && file ? { scale: 1.02 } : {}}
            whileTap={!isAnalyzing && file ? { scale: 0.98 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              onClick={handleAnalyze}
              fullWidth
              className={`py-3.5 text-base transition-all duration-300 ${isAnalyzing || !file ? 'opacity-70 grayscale-[50%]' : 'shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]'}`}
              disabled={isAnalyzing || !file}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Analyzing...
                </span>
              ) : (
                'Analyze Policy'
              )}
            </Button>
          </motion.div>
          {/* Day 4 - END */}

        </div>
      </div>
    </div>
    // Day 3 - END
  );
};

export default Upload_Day3;

