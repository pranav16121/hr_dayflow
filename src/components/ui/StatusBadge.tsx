import React from 'react';
import { Badge } from './Badge';

export type DayflowStatus = 
  | 'present'
  | 'absent'
  | 'half_day'
  | 'leave'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'active'
  | 'inactive'
  | 'paid'
  | 'unpaid'
  | 'sick'
  | string;

export interface StatusBadgeProps {
  status: DayflowStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  // Mapping statuses to Badge variants
  const variantMap: Record<string, 'success' | 'danger' | 'warning' | 'info' | 'secondary'> = {
    present: 'success',
    active: 'success',
    approved: 'success',
    paid: 'success',
    absent: 'danger',
    rejected: 'danger',
    inactive: 'secondary',
    half_day: 'warning',
    pending: 'warning',
    leave: 'info',
    unpaid: 'warning',
    sick: 'danger',
  };

  // Human-readable labels mapping
  const labelMap: Record<string, string> = {
    present: 'Present',
    active: 'Active',
    inactive: 'Inactive',
    absent: 'Absent',
    half_day: 'Half Day',
    leave: 'On Leave',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    paid: 'Paid Leave',
    unpaid: 'Unpaid Leave',
    sick: 'Sick Leave',
  };

  const normalizedStatus = typeof status === 'string' ? status.toLowerCase() : '';
  const variant = variantMap[normalizedStatus] || 'secondary';
  const label = labelMap[normalizedStatus] || status;

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
};
