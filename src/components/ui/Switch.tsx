import React from 'react';
import { cn } from '../../utils/cn';

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOn: boolean; // Switch'in açık mı kapalı mı olduğunu belirler
  onChange: (value: boolean) => void; // Switch durumunu değiştirmek için bir callback
  size?: 'sm' | 'md' | 'lg'; // Switch boyutları
  onColor?: string; // Açık durumdaki renk
  offColor?: string; // Kapalı durumdaki renk
}

export const Switch: React.FC<SwitchProps> = ({
  isOn,
  onChange,
  size = 'md',
  onColor = 'bg-green-500',
  offColor = 'bg-gray-300',
  className,
  ...props
}) => {
  const sizes = {
    sm: 'w-12 h-6',
    md: 'w-12 h-6',
    lg: 'w-16 h-8',
  };

  const circleSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  return (
    <button
      type="button"
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors focus:outline-none',
        sizes[size],
        isOn ? onColor : offColor,
        className
      )}
      onClick={() => onChange(!isOn)}
      {...props}
    >
      <span
        className={cn(
          'absolute rounded-full bg-white transition-transform',
          circleSizes[size],
          isOn ? 'translate-x-6' : 'translate-x-2',
          'transform'
        )}
      />
    </button>
  );
};