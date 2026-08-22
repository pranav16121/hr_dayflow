import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      required,
      id,
      disabled,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    const borderClass = error
      ? 'border-danger-500 focus:ring-danger-500/15 focus:border-danger-500'
      : 'border-border hover:border-zinc-300 focus:ring-primary-500/15 focus:border-primary-600';

    return (
      <div className={`w-full flex flex-col gap-1.5 ${disabled ? 'opacity-50' : ''} ${className}`}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary select-none"
          >
            {label}
            {required && <span className="text-danger-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          rows={rows}
          className={`w-full bg-surface border rounded-input shadow-subtle text-sm py-2.5 px-3.5 text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-0 disabled:cursor-not-allowed resize-y min-h-[70px] ${borderClass}`}
          {...props}
        />

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

Textarea.displayName = 'Textarea';
