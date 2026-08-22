import type { DayflowStatus } from '../components/ui/StatusBadge';

export interface AdminStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingLeaves: number;
}

export interface AdminAttendanceChartItem {
  name: string;
  Present: number;
  Absent: number;
  OnLeave: number;
}

export interface AdminPendingRequest {
  id: string;
  name: string;
  role: string;
  type: string;
  dateRange: string;
  status: DayflowStatus;
}

export interface AdminRecentEmployee {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: DayflowStatus;
}

export interface AdminDashboardData {
  stats: AdminStats;
  attendanceOverview: AdminAttendanceChartItem[];
  pendingRequests: AdminPendingRequest[];
  recentEmployees: AdminRecentEmployee[];
}

export const adminDashboardData: AdminDashboardData = {
  stats: {
    totalEmployees: 124,
    presentToday: 109,
    onLeave: 8,
    pendingLeaves: 7,
  },
  attendanceOverview: [
    { name: 'Mon', Present: 105, Absent: 11, OnLeave: 8 },
    { name: 'Tue', Present: 108, Absent: 8, OnLeave: 8 },
    { name: 'Wed', Present: 109, Absent: 7, OnLeave: 8 },
    { name: 'Thu', Present: 107, Absent: 9, OnLeave: 8 },
    { name: 'Fri', Present: 109, Absent: 7, OnLeave: 8 },
  ],
  pendingRequests: [
    {
      id: 'lv-01',
      name: 'Amogh',
      role: 'Backend Architect',
      type: 'Sick Leave',
      dateRange: 'Aug 25 - Aug 26',
      status: 'pending',
    },
    {
      id: 'lv-02',
      name: 'Sriram',
      role: 'AI Engineer',
      type: 'Paid Leave',
      dateRange: 'Aug 28',
      status: 'pending',
    },
    {
      id: 'lv-03',
      name: 'PP',
      role: 'Supabase Expert',
      type: 'Sick Leave',
      dateRange: 'Sep 02',
      status: 'pending',
    },
  ],
  recentEmployees: [
    {
      id: 'DF-101',
      name: 'Amogh',
      role: 'Backend Architect',
      dept: 'Engineering',
      status: 'present',
    },
    {
      id: 'DF-102',
      name: 'Sriram',
      role: 'AI Engineer',
      dept: 'Engineering',
      status: 'present',
    },
    {
      id: 'DF-103',
      name: 'PP',
      role: 'Supabase Expert',
      dept: 'Engineering',
      status: 'present',
    },
    {
      id: 'DF-104',
      name: 'Abhiram',
      role: 'Frontend Architect',
      dept: 'Engineering',
      status: 'present',
    },
  ],
};

