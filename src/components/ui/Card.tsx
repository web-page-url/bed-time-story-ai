import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  background?: 'white' | 'gray' | 'gradient' | 'glass';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'lg',
  shadow = 'xl',
  rounded = '3xl',
  background = 'white',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-2xl',
  };
  
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };
  
  const backgroundClasses = {
    white: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    gray: 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700',
    glass: 'glass backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/20',
  };
  
  const classes = `${backgroundClasses[background]} ${roundedClasses[rounded]} ${shadowClasses[shadow]} ${paddingClasses[padding]} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;