import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      required,
      id,
      disabled,
      icon,
      iconPosition = 'left',
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Crisp high-contrast border states with soft transparent glows
    const borderClass = error
      ? 'border-danger-500 focus-within:ring-danger-500/15 focus-within:border-danger-500'
      : 'border-border hover:border-zinc-300 focus-within:ring-primary-500/15 focus-within:border-primary-600';

    return (
      <div className={`w-full flex flex-col gap-1.5 ${disabled ? 'opacity-50' : ''} ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary select-none"
          >
            {label}
            {required && <span className="text-danger-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        
        <div
          className={`flex items-center w-full bg-surface border rounded-input shadow-subtle overflow-hidden transition-all duration-200 focus-within:ring-4 focus-within:ring-offset-0 ${borderClass}`}
        >
          {icon && iconPosition === 'left' && (
            <div className="flex items-center justify-center pl-3 text-text-muted select-none">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            className={`w-full bg-transparent text-sm py-2.5 px-3.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed ${
              icon && iconPosition === 'left' ? 'pl-2' : ''
            } ${icon && iconPosition === 'right' ? 'pr-2' : ''}`}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <div className="flex items-center justify-center pr-3 text-text-muted select-none">
              {icon}
            </div>
          )}
        </div>

        {error && (
          <span className="text-xs text-danger-600 font-medium" role="alert">
            {error}
          </span>
        )}

        {!error && helperText && (
          <span className="text-xs text-text-muted select-none">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
