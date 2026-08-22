import React from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className = '',
      label,
      options = [],
      error,
      helperText,
      placeholder,
      required,
      id,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    const borderClass = error
      ? 'border-danger-500 focus:ring-danger-500/15 focus:border-danger-500'
      : 'border-border hover:border-zinc-300 focus:ring-primary-500/15 focus:border-primary-600';

    return (
      <div className={`w-full flex flex-col gap-1.5 ${disabled ? 'opacity-50' : ''} ${className}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary select-none"
          >
            {label}
            {required && <span className="text-danger-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            className={`w-full bg-surface border rounded-input shadow-subtle text-sm py-2.5 px-3.5 pr-10 text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-0 disabled:cursor-not-allowed appearance-none cursor-pointer ${borderClass}`}
            {...props}
          >
            {placeholder && (
              <option value="">{placeholder}</option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-text-secondary select-none">
            <svg
              className="h-4 w-4 fill-current text-text-muted"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
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

Select.displayName = 'Select';
