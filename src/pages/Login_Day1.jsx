// Day 2
// Day 4
import React, { useState, useContext } from 'react';
// Day 5 - START: Add useLocation for redirected state
import { Link, useNavigate, useLocation } from 'react-router-dom';
// Day 5 - END
import { Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
// Day 3 - START: Import Framer Motion
import { motion } from 'framer-motion';
// Day 3 - END
// Day 4 - START: Import AuthContext
import { AuthContext } from '../context/AuthContext';
// Day 4 - END
import Button from '../components/Button';

const Login_Day1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();
  // Day 5 - START: Hook to detect pageLimitExceeded state
  const location = useLocation();
  // Day 5 - END
  // Day 4 - START: Use AuthContext for mock login
  const { login } = useContext(AuthContext);
  // Day 4 - END

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email and password.');
      return;
    }
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login - store JWT token + user info
        login(data.user.name, data.user.email, data.token);
        navigate('/dashboard');
      } else {
        // Invalid password or email not found
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the server. Make sure it is running!');
    }
  };

  return (
    // Day 3 - START: Dark mode background and transition
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#070b14] flex flex-col justify-center items-center p-4 selection:bg-blue-200 selection:text-blue-900 overflow-hidden transition-colors duration-300">
    {/* Day 3 - END */}
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-300 dark:from-blue-900/20 via-indigo-100 dark:via-purple-900/20 to-transparent rounded-full blur-[120px] opacity-40 pointer-events-none transition-colors duration-300"></div>

      {/* Back button */}
      <button 
        onClick={() => navigate('/')} 
        // Day 3 - START: Dark mode button styles
        className="absolute top-8 left-8 p-3 rounded-full bg-white/50 dark:bg-[#101928]/50 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#1a2536] shadow-sm dark:shadow-none transition-all z-20"
        // Day 3 - END
        title="Back to home"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Login Card Container */}
      {/* Day 3 - START: Float up container with spring physics */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 w-full max-w-[420px] perspective-1000"
      >
      {/* Day 3 - END */}
        
        {/* Day 3 - START: Dark mode card styling */}
        <div className="bg-white/80 dark:bg-[#101928]/40 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-none border border-white/60 dark:border-white/10 transition-colors duration-300">
        {/* Day 3 - END */}
          
          {/* Header */}
          <div className="text-center mb-10">
            {/* Day 3 - START: Icon Subtle Bounce on Load */}
            <motion.div 
              initial={{ scale: 0.8, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 mb-6"
            >
              <Lock className="w-8 h-8" strokeWidth={1.5} />
            </motion.div>
            {/* Day 3 - END */}
            {/* Day 3 - START: Dark mode headings */}
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-50 tracking-tight mb-2 transition-colors">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Log in to manage your policies</p>
            {/* Day 5 - START: Show specific warning string when redirected due to exceeding valid pages */}
            {location.state?.pageLimitExceeded && (
              <p className="text-orange-500 dark:text-orange-400 font-semibold mt-2 transition-colors">Got more pages? Log in to keep going 🚀</p>
            )}
            {/* Day 5 - END */}
            {/* Day 3 - END */}
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50/80 border border-red-100 text-red-600 text-sm font-medium animate-fade-in-up">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <div className="space-y-5">
              {/* Email Input */}
              <div className="relative relative-group">
                {/* Day 3 - START: Dark mode labels and inputs with smooth focus ring */}
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 pl-1 transition-colors" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'email' ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all duration-300 shadow-sm dark:shadow-none"
                    placeholder="name@example.com"
                  />
                </div>
                {/* Day 3 - END */}
              </div>

              {/* Password Input */}
              <div className="relative relative-group">
                {/* Day 3 - START: Dark mode labels and inputs with smooth focus ring */}
                <div className="flex items-center justify-between mb-2 pl-1 pr-1">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedInput === 'password' ? 'text-blue-500 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-900 transition-all duration-300 shadow-sm dark:shadow-none"
                    placeholder="••••••••"
                  />
                </div>
                {/* Day 3 - END */}
              </div>
            </div>

            {/* Day 3 - START: Button Tap / Hover / Glow */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="mt-8">
              <Button type="submit" fullWidth className="py-3.5 text-[15px] dark:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Sign In
              </Button>
            </motion.div>
            {/* Day 3 - END */}
          </form>

          {/* Footer */}
          {/* Day 3 - START: Dark mode text */}
          <p className="mt-8 text-center text-slate-600 dark:text-slate-400 font-medium text-sm transition-colors">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-colors">
              Sign up today
            </Link>
          </p>
          {/* Day 3 - END */}
        </div>
      </motion.div>
    </div>
  );
};

export default Login_Day1;
