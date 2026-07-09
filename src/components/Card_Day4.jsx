// Day 4
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

// Day 4 - START: Variant configuration map
const variantConfig = {
  green: {
    border: 'border-l-emerald-500',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    titleColor: 'text-emerald-800 dark:text-emerald-300',
    bulletColor: 'text-emerald-500 dark:text-emerald-400',
    Icon: CheckCircle2,
  },
  red: {
    border: 'border-l-red-500',
    iconBg: 'bg-red-50 dark:bg-red-900/20',
    iconColor: 'text-red-600 dark:text-red-400',
    titleColor: 'text-red-800 dark:text-red-300',
    bulletColor: 'text-red-500 dark:text-red-400',
    Icon: XCircle,
  },
  yellow: {
    border: 'border-l-amber-500',
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    titleColor: 'text-amber-800 dark:text-amber-300',
    bulletColor: 'text-amber-500 dark:text-amber-400',
    Icon: AlertTriangle,
  },
  blue: {
    border: 'border-l-blue-500',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-800 dark:text-blue-300',
    bulletColor: 'text-blue-500 dark:text-blue-400',
    Icon: Info,
  },
};
// Day 4 - END

const Card_Day4 = ({ title, items, variant = 'blue', delay = 0 }) => {
  const config = variantConfig[variant] || variantConfig.blue;
  const { Icon } = config;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
      className={`bg-white dark:bg-[#101928]/40 backdrop-blur-xl rounded-xl shadow-md dark:shadow-none border border-slate-100 dark:border-white/10 border-l-4 ${config.border} p-6 transition-colors duration-300 h-full`}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-lg ${config.iconBg} flex items-center justify-center ${config.iconColor} flex-shrink-0`}>
          <Icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <h3 className={`text-lg font-bold ${config.titleColor}`}>{title}</h3>
      </div>

      {/* Bullet List */}
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${config.bulletColor} bg-current flex-shrink-0`} />
            <span className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Card_Day4;
