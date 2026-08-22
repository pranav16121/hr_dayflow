import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  label?: string;
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label,
  message,
  className = '',
}) => {
  const text = label || message || 'Loading data...';

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[200px] gap-3 ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-primary-500" aria-hidden="true" />
      <span className="text-sm font-medium text-text-secondary">{text}</span>
    </div>
  );
};
