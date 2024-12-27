import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={cn('rounded-lg bg-white p-6 shadow-md', className)}>
      {children}
    </div>
  );
};