import React from 'react';
import { LayoutDashboard, User, Clock, CalendarDays, Banknote } from 'lucide-react';
import { AuthenticatedLayout } from './AuthenticatedLayout';
import type { SidebarLink } from '../components/layout/Sidebar';

export const EmployeeLayout: React.FC = () => {
  const employeeLinks: SidebarLink[] = [
    {
      to: '/employee/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/employee/profile',
      label: 'Profile',
      icon: User,
    },
    {
      to: '/employee/attendance',
      label: 'Attendance',
      icon: Clock,
    },
    {
      to: '/employee/leave',
      label: 'Leave',
      icon: CalendarDays,
    },
    {
      to: '/employee/payroll',
      label: 'Payroll',
      icon: Banknote,
    },
  ];

  return (
    <AuthenticatedLayout
      links={employeeLinks}
      portalName="Employee Portal"
    />
  );
};
