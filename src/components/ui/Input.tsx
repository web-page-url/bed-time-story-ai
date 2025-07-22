import React from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  min?: string;
  max?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  autoFocus = false,
  min,
  max,
  size = 'lg',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
    xl: 'px-8 py-5 text-xl',
  };
  
  const baseClasses = 'w-full border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classes}
      disabled={disabled}
      autoFocus={autoFocus}
      min={min}
      max={max}
    />
  );
};

export default Input;