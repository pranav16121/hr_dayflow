import React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-4 mb-6 select-none">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-text-primary">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2.5 sm:mt-0 mt-1">
          {actions}
        </div>
      )}
    </div>
  );
};

