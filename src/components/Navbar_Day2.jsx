// Day 2
// Day 4
import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
// Day 3 - START: Import Framer Motion and Theme Context
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
// Day 3 - END
// Day 4 - START: Import Auth Context and icons
import { AuthContext } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
// Day 4 - END

const Navbar_Day2 = () => {
  // Day 3 - START: Use ThemeContext
  const { isDark, toggleTheme } = useContext(ThemeContext);
  // Day 3 - END

  // Day 4 - START: Use AuthContext and dropdown state
  const { isLoggedIn, userName, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };
  // Day 4 - END

  // Day 4 - START: Separate nav links based on auth state
  const mainNavLinks = [
    { path: '/', label: 'Home' },
    ...(isLoggedIn ? [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/upload', label: 'Upload' },
    ] : []),
  ];
  // Day 4 - END

  return (
    // Day 3 - START: Navbar slides down on load, added dark mode classes
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 dark:bg-[#070b14] backdrop-blur-lg shadow-sm dark:shadow-none border-b border-gray-100 dark:border-white/5 sticky top-0 z-50 transition-colors duration-300"
    >
      {/* Day 3 - END */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            {/* Day 3 - START: Update to dark mode class */}
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-500 tracking-tight">
              PolicyInsight
            </Link>
            {/* Day 3 - END */}
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Navigation links */}
            {mainNavLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400 pb-1 block"
                    : "text-gray-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors duration-200 border-b-2 border-transparent pb-1 block"
                }
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="block"
                >
                  {label}
                </motion.span>
              </NavLink>
            ))}

            {/* Day 4 - START: Auth buttons or User avatar based on login state */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-3 ml-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/30 bg-transparent transition-all duration-200 text-sm"
                  >
                    Log In
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/signup"
                    className="px-5 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 text-sm"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            ) : (
              <div className="relative ml-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {userName.charAt(0)}
                  </div>
                  <span className="font-semibold text-sm hidden sm:block">{userName}</span>
                </motion.button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#101928] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl dark:shadow-none overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{userName}</p>
                        <p className="text-xs text-slate-400">Logged in</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            {/* Day 4 - END */}

            {/* Day 3 - START: Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#101928] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-white/10 transition-colors duration-300 flex items-center justify-center focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              <motion.span
                key={isDark ? "dark" : "light"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg"
              >
                {isDark ? '☀️' : '🌙'}
              </motion.span>
            </motion.button>
            {/* Day 3 - END */}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar_Day2;
