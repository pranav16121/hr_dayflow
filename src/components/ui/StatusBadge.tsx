import React from 'react';
import { Badge } from './Badge';

// Explicit type for allowed Dayflow statuses
export type DayflowStatus = 
  | 'present'
  | 'absent'
  | 'half_day'
  | 'leave'
  | 'pending'
  | 'approved'
  | 'rejected';

export interface StatusBadgeProps {
  status: DayflowStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  // Mapping statuses to Badge variants
  const variantMap: Record<DayflowStatus, 'success' | 'danger' | 'warning' | 'info'> = {
    present: 'success',
    absent: 'danger',
    half_day: 'warning',
    leave: 'info',
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
  };

  // Human-readable labels mapping
  const labelMap: Record<DayflowStatus, string> = {
    present: 'Present',
    absent: 'Absent',
    half_day: 'Half Day',
    leave: 'On Leave',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  };

  const variant = variantMap[status] || 'secondary';
  const label = labelMap[status] || status;

  return (
    <Badge variant={variant} className={`${className}`}>
      {label}
    </Badge>
  );
};

