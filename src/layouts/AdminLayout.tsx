import React from 'react';
import { LayoutDashboard, Users, Clock, CalendarDays, Banknote } from 'lucide-react';
import { AuthenticatedLayout } from './AuthenticatedLayout';
import type { SidebarLink } from '../components/layout/Sidebar';

export const AdminLayout: React.FC = () => {
  const adminLinks: SidebarLink[] = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/admin/employees',
      label: 'Employees',
      icon: Users,
    },
    {
      to: '/admin/attendance',
      label: 'Attendance',
      icon: Clock,
    },
    {
      to: '/admin/leaves',
      label: 'Leave Requests',
      icon: CalendarDays,
    },
    {
      to: '/admin/payroll',
      label: 'Payroll',
      icon: Banknote,
    },
  ];

  return (
    <AuthenticatedLayout
      links={adminLinks}
      portalName="Admin / HR Portal"
    />
  );
};
