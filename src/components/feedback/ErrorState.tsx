import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading the data. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center border border-danger-100 rounded-card bg-danger-50/30 max-w-md mx-auto ${className}`}>
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-danger-50 text-danger-600 mb-4 border border-danger-100">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-semibold text-danger-700 mb-1">{title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-6">{message}</p>
      
      {onRetry && (
        <Button 
          variant="danger" 
          size="sm" 
          icon={<RotateCcw className="h-3.5 w-3.5" />} 
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

