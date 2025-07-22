import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  showText?: boolean;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showText = true,
  className = '',
  color = 'primary',
}) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  const colorClasses = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    secondary: 'bg-gradient-to-r from-pink-500 to-rose-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-orange-500 to-amber-600',
    error: 'bg-gradient-to-r from-red-500 to-rose-600',
  };
  
  return (
    <div className={`text-center ${className}`}>
      {showText && (
        <div className="text-sm text-gray-500 mb-2">
          Step {current} of {total}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;