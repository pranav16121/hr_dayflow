import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  CalendarDays, 
  Clock, 
  History, 
  DollarSign 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Avatar } from '../../components/ui/Avatar';
import { adminDashboardData } from '../../data/mockAdminDashboard';

export const Dashboard: React.FC = () => {
  const data = adminDashboardData;

  // Simple percentages calculations
  const presentPct = ((data.stats.presentToday / data.stats.totalEmployees) * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in select-none">
      {/* Page Header greeting */}
      <PageHeader 
        title="Dashboard" 
        description="Good morning, HR Admin 👋 • Here's what's happening across the organization."
      />

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Employees */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                Total Employees
              </span>
              <span className="text-xl font-bold text-text-primary block mt-1 tracking-tight">
                {data.stats.totalEmployees}
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                Active employees
              </span>
            </div>
            <div className="h-9 w-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100/50">
              <Users className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Present Today */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                Present Today
              </span>
              <span className="text-xl font-bold text-success-600 block mt-1 tracking-tight">
                {data.stats.presentToday}
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                {presentPct}% of employees
              </span>
            </div>
            <div className="h-9 w-9 rounded-lg bg-success-50 text-success-600 flex items-center justify-center border border-success-100/50">
              <UserCheck className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: On Leave */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                On Leave
              </span>
              <span className="text-xl font-bold text-text-primary block mt-1 tracking-tight">
                {data.stats.onLeave}
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                Today
              </span>
            </div>
            <div className="h-9 w-9 rounded-lg bg-zinc-100 text-text-secondary flex items-center justify-center border border-zinc-200/50">
              <CalendarDays className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Pending Leave Requests */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
                Pending Requests
              </span>
              <span className="text-xl font-bold text-warning-600 block mt-1 tracking-tight">
                {data.stats.pendingLeaves}
              </span>
              <span className="text-[10px] text-text-secondary block mt-0.5">
                Require review
              </span>
            </div>
            <div className="h-9 w-9 rounded-lg bg-warning-50 text-warning-600 flex items-center justify-center border border-warning-100/50">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: Attendance Chart & Pending Leave Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Recharts Attendance Overview */}
        <Card>
          <CardHeader className="border-b border-zinc-100 pb-3">
            <CardTitle className="text-sm font-bold text-text-primary">
              Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.attendanceOverview}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} 
                  />
                  <Legend verticalAlign="top" height={36} iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="Present" fill="#16A34A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="OnLeave" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Right Card: Pending Requests */}
        <Card>
          <CardHeader className="border-b border-zinc-100 pb-3">
            <CardTitle className="text-sm font-bold text-text-primary">
              Pending Leave Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.pendingRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2">
                        <Avatar name={req.name} size="sm" />
                        <div>
                          <span className="font-semibold text-xs text-text-primary block">{req.name}</span>
                          <span className="text-[9px] text-text-secondary block mt-0.5">{req.role}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-text-primary font-medium">{req.type}</TableCell>
                    <TableCell className="text-xs text-text-secondary">{req.dateRange}</TableCell>
                    <TableCell>
                      <StatusBadge status={req.status} />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Link to="/admin/leaves">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Recent Employees */}
      <Card>
        <CardHeader className="border-b border-zinc-100 pb-3">
          <CardTitle className="text-sm font-bold text-text-primary">
            Recent Employees
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Employee</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2">
                      <Avatar name={emp.name} size="sm" />
                      <span className="font-semibold text-xs text-text-primary">{emp.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-xs text-text-secondary">{emp.id}</TableCell>
                  <TableCell className="text-xs text-text-secondary">{emp.dept}</TableCell>
                  <TableCell className="text-xs text-text-secondary">{emp.role}</TableCell>
                  <TableCell>
                    <StatusBadge status={emp.status} />
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Link to="/admin/employees">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions Action Row */}
      <div className="bg-surface border border-border p-4 rounded-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-text-primary">Quick Navigation</h4>
          <p className="text-[10px] text-text-secondary mt-0.5">Manage workforce directories and salary cycles.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link to="/admin/employees">
            <Button size="sm" variant="outline" icon={<Users className="h-3.5 w-3.5" />}>
              View Employees
            </Button>
          </Link>
          <Link to="/admin/leaves">
            <Button size="sm" variant="outline" icon={<CalendarDays className="h-3.5 w-3.5" />}>
              Review Leave Requests
            </Button>
          </Link>
          <Link to="/admin/attendance">
            <Button size="sm" variant="outline" icon={<History className="h-3.5 w-3.5" />}>
              View Attendance
            </Button>
          </Link>
          <Link to="/admin/payroll">
            <Button size="sm" variant="outline" icon={<DollarSign className="h-3.5 w-3.5" />}>
              View Payroll
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
