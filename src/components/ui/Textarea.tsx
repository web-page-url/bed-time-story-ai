import React from 'react';

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  autoFocus = false,
  rows = 4,
  resize = 'none',
}) => {
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };
  
  const baseClasses = 'w-full px-6 py-4 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-500 dark:placeholder-gray-400 text-lg';
  
  const classes = `${baseClasses} ${resizeClasses[resize]} ${className}`;
  
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classes}
      disabled={disabled}
      autoFocus={autoFocus}
      rows={rows}
    />
  );
};

export default Textarea;