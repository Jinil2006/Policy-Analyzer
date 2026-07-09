import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', fullWidth = false }) => {
  const baseClasses = 'relative overflow-hidden group bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-95';
  const widthClass = fullWidth ? 'w-full block' : 'inline-block';
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${widthClass} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
    </button>
  );
};

export default Button;
