import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Percent, 
  CalendarDays, 
  Wallet, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  CalendarPlus, 
  History, 
  DollarSign, 
  User,
  FileText,
  Fingerprint
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { employeeDashboardData } from '../../data/mockEmployeeDashboard';
import { toast } from 'sonner';

export const Dashboard: React.FC = () => {
  const data = employeeDashboardData;
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckOut = () => {
    setIsCheckedOut(true);
    toast.success('Successfully checked out today. Work duration saved.');
  };

  // Helper to resolve activity category icons
  const getActivityIcon = (category: string) => {
    switch (category) {
      case 'leave':
        return <FileText className="h-4 w-4 text-warning-600" />;
      case 'attendance':
        return <Fingerprint className="h-4 w-4 text-success-600" />;
      case 'profile':
        return <User className="h-4 w-4 text-info-600" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-text-secondary" />;
    }
  };

  // Helper to resolve activity category backgrounds
  const getActivityBg = (category: string) => {
    switch (category) {
      case 'leave':
        return 'bg-warning-50 border border-warning-100/50';
      case 'attendance':
        return 'bg-success-50 border border-success-100/50';
      case 'profile':
        return 'bg-info-50 border border-info-100/50';
      default:
        return 'bg-zinc-50 border border-zinc-100';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* Dynamic Header */}
      <PageHeader 
        title="Dashboard" 
        description={`Good morning, ${data.employee.name} 👋 • Here's your work overview for today.`}
      />

      {/* Row 1: 4 Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Attendance */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                Attendance
              </span>
              <span className="text-xl font-bold text-text-primary block mt-1 tracking-tight">
                {data.stats.attendanceRate}
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                This month
              </span>
            </div>
            <div className="h-9 w-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100/50">
              <Percent className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Leave Balance */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                Leave Balance
              </span>
              <span className="text-xl font-bold text-text-primary block mt-1 tracking-tight">
                {data.stats.leaveBalance} days
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                Remaining
              </span>
            </div>
            <div className="h-9 w-9 rounded-lg bg-warning-50 text-warning-600 flex items-center justify-center border border-warning-100/50">
              <CalendarDays className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Net Salary */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                Net Salary
              </span>
              <span className="text-xl font-bold text-text-primary block mt-1 tracking-tight">
                {data.stats.netSalary}
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                Monthly
              </span>
            </div>
            <div className="h-9 w-9 rounded-lg bg-success-50 text-success-600 flex items-center justify-center border border-success-100/50">
              <Wallet className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Today's Status */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                Today's Status
              </span>
              <span className="text-xl font-bold text-success-600 block mt-1 tracking-tight">
                {data.stats.status === 'present' ? 'Present' : 'Absent'}
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                On time
              </span>
            </div>
            <div className="h-9 w-9 rounded-lg bg-info-50 text-info-600 flex items-center justify-center border border-info-100/50">
              <UserCheck className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Today's Attendance & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Today's Attendance check-in / check-out */}
        <Card>
          <CardHeader className="border-b border-zinc-100 pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-text-primary flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-primary-600" />
              Today's Attendance
            </CardTitle>
            <StatusBadge status={isCheckedOut ? 'absent' : data.todayAttendance.status} />
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded bg-zinc-50 border border-zinc-100">
                <span className="text-[9px] font-semibold text-text-secondary uppercase block">Check-In</span>
                <strong className="text-xs text-text-primary block mt-1">
                  {data.todayAttendance.checkIn}
                </strong>
              </div>
              <div className="p-2.5 rounded bg-zinc-50 border border-zinc-100">
                <span className="text-[9px] font-semibold text-text-secondary uppercase block">Check-Out</span>
                <strong className="text-xs text-text-primary block mt-1">
                  {isCheckedOut ? '11:59 AM' : '—'}
                </strong>
              </div>
              <div className="p-2.5 rounded bg-zinc-50 border border-zinc-100">
                <span className="text-[9px] font-semibold text-text-secondary uppercase block">Duration</span>
                <strong className="text-xs text-text-primary block mt-1">
                  {isCheckedOut ? '2h 47m' : data.todayAttendance.duration}
                </strong>
              </div>
            </div>

            <div className="pt-2">
              <Button 
                fullWidth 
                variant="outline" 
                disabled={isCheckedOut}
                onClick={handleCheckOut}
                className="text-xs cursor-pointer disabled:opacity-50"
              >
                {isCheckedOut ? 'Checked Out' : 'Check Out'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Card: Recent Activity */}
        <Card>
          <CardHeader className="border-b border-zinc-100 pb-3">
            <CardTitle className="text-sm font-bold text-text-primary">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3.5">
              {data.recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className={`p-1.5 rounded ${getActivityBg(act.category)}`}>
                    {getActivityIcon(act.category)}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-text-primary block">
                      {act.text}
                    </span>
                    <span className="text-[10px] text-text-secondary block mt-0.5">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Recent Leave Requests Table */}
      <Card>
        <CardHeader className="border-b border-zinc-100 pb-3">
          <CardTitle className="text-sm font-bold text-text-primary">
            Recent Leave Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Leave Type</TableHead>
                <TableHead>Requested Dates</TableHead>
                <TableHead className="pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentLeaves.map((lv) => (
                <TableRow key={lv.id}>
                  <TableCell className="pl-6 font-semibold text-xs text-text-primary">
                    {lv.type}
                  </TableCell>
                  <TableCell className="text-xs text-text-secondary">
                    {lv.dateRange}
                  </TableCell>
                  <TableCell className="pr-6">
                    <StatusBadge status={lv.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Row 4: Quick Actions Button Row */}
      <div className="bg-surface border border-border p-4 rounded-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-text-primary">Quick Navigation</h4>
          <p className="text-[10px] text-text-secondary mt-0.5">Access frequent employee portal pages instantly.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link to="/employee/leave">
            <Button size="sm" variant="outline" icon={<CalendarPlus className="h-3.5 w-3.5" />}>
              Apply for Leave
            </Button>
          </Link>
          <Link to="/employee/attendance">
            <Button size="sm" variant="outline" icon={<History className="h-3.5 w-3.5" />}>
              View Attendance
            </Button>
          </Link>
          <Link to="/employee/payroll">
            <Button size="sm" variant="outline" icon={<DollarSign className="h-3.5 w-3.5" />}>
              View Payroll
            </Button>
          </Link>
          <Link to="/employee/profile">
            <Button size="sm" variant="outline" icon={<User className="h-3.5 w-3.5" />}>
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
