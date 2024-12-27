import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'purple' | 'pink' | 'teal' | 'indigo' | 'orange' | 'lime' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'teal',
  size = 'sm',
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-blue-700 shadow-md',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-md',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
    success: 'bg-green-600 text-white hover:bg-green-700 shadow-md',
    warning: 'bg-yellow-500 text-gray-800 hover:bg-yellow-600 shadow-md',
    info: 'bg-blue-500 text-white hover:bg-blue-600 shadow-md',
    light: 'bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-md',
    dark: 'bg-gray-800 text-white hover:bg-gray-900 shadow-md',
    purple: 'bg-purple-600 text-white hover:bg-purple-700 shadow-md',
    pink: 'bg-pink-500 text-white hover:bg-pink-600 shadow-md',
    teal: 'bg-teal-500 text-white hover:bg-teal-600 shadow-md',
    indigo: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
    orange: 'bg-orange-500 text-white hover:bg-orange-600 shadow-md',
    lime: 'bg-lime-500 text-gray-800 hover:bg-lime-600 shadow-md',
    cyan: 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-md',
  };

  const sizes = {
    sm: 'px-2 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        'rounded-md transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};