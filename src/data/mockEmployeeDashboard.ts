import type { DayflowStatus } from '../components/ui/StatusBadge';

export interface EmployeeProfile {
  name: string;
  role: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  category: 'leave' | 'attendance' | 'profile';
}

export interface LeaveItem {
  id: string;
  type: string;
  dateRange: string;
  status: DayflowStatus;
}

export interface DashboardStats {
  attendanceRate: string;
  leaveBalance: number;
  netSalary: string;
  status: DayflowStatus;
}

export interface DashboardData {
  employee: EmployeeProfile;
  stats: DashboardStats;
  todayAttendance: {
    status: DayflowStatus;
    checkIn: string;
    checkOut: string | null;
    duration: string;
  };
  recentActivities: ActivityItem[];
  recentLeaves: LeaveItem[];
}

export const employeeDashboardData: DashboardData = {
  employee: {
    name: 'Sriram Prasad',
    role: 'AI Engineer',
  },
  stats: {
    attendanceRate: '94.5%',
    leaveBalance: 18,
    netSalary: '₹45,000',
    status: 'present',
  },
  todayAttendance: {
    status: 'present',
    checkIn: '09:12 AM',
    checkOut: null,
    duration: 'In progress',
  },
  recentActivities: [
    {
      id: 'act-1',
      text: 'Leave request submitted',
      time: '2 hours ago',
      category: 'leave',
    },
    {
      id: 'act-2',
      text: 'Attendance recorded',
      time: 'Today, 9:12 AM',
      category: 'attendance',
    },
    {
      id: 'act-3',
      text: 'Profile updated',
      time: 'Yesterday',
      category: 'profile',
    },
  ],
  recentLeaves: [
    {
      id: 'lv-01',
      type: 'Sick Leave',
      dateRange: 'Aug 25 - Aug 26',
      status: 'pending',
    },
    {
      id: 'lv-02',
      type: 'Paid Leave',
      dateRange: 'Aug 10',
      status: 'approved',
    },
  ],
};

