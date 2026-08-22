import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'secondary',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold select-none border transition-colors';
  
  const variants = {
    primary: 'bg-primary-50 text-primary-700 border-primary-100/80',
    secondary: 'bg-text-primary/5 text-text-secondary border-text-primary/10',
    success: 'bg-success-50 text-success-700 border-success-100/80',
    warning: 'bg-warning-50 text-warning-700 border-warning-100/80',
    danger: 'bg-danger-50 text-danger-700 border-danger-100/80',
    info: 'bg-info-50 text-info-700 border-info-100/80',
    outline: 'bg-transparent text-text-primary border-border',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
