import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Elegant, smooth transition classes and uniform padding variables
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-button transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer border border-transparent';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',
      secondary: 'bg-text-primary/5 text-text-primary hover:bg-text-primary/10 active:bg-text-primary/15 border-text-primary/5',
      success: 'bg-success-600 text-white hover:bg-success-700 active:bg-success-800 shadow-sm',
      danger: 'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 shadow-sm',
      outline: 'border-border bg-surface text-text-primary hover:bg-text-primary/5 active:bg-text-primary/10 shadow-subtle',
      ghost: 'bg-transparent text-text-primary hover:bg-text-primary/5 active:bg-text-primary/10',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-5 py-2.5 gap-2.5',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {loading && (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-current" aria-hidden="true" />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
        <span>{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
