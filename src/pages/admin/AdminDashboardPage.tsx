import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, UserX, CalendarClock, ClipboardList } from "lucide-react";
import { getEmployees } from "@/services/employeeService";
import { getAllAttendance } from "@/services/attendanceService";
import { getAllLeaveRequests } from "@/services/leaveService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { DashboardStatCard } from "@/components/admin/DashboardStatCard";
import { formatDate } from "@/lib/format";

async function loadDashboard() {
  const [employees, attendance, leaveRequests] = await Promise.all([
    getEmployees(),
    getAllAttendance(),
    getAllLeaveRequests(),
  ]);
  return { employees, attendance, leaveRequests };
}

export function AdminDashboardPage() {
  const { data, loading, error, refetch } = useAsync(loadDashboard, []);
  const navigate = useNavigate();

  const stats = useMemo(() => {
    if (!data) return null;

    const latestDate = data.attendance.reduce<string | null>(
      (max, record) => (!max || record.date > max ? record.date : max),
      null,
    );
    const todaysRecords = latestDate ? data.attendance.filter((r) => r.date === latestDate) : [];

    return {
      totalEmployees: data.employees.filter((e) => e.employment_status === "active").length,
      present: todaysRecords.filter((r) => r.status === "present" || r.status === "half_day").length,
      absent: todaysRecords.filter((r) => r.status === "absent").length,
      onLeave: todaysRecords.filter((r) => r.status === "leave").length,
      pendingLeaves: data.leaveRequests.filter((r) => r.status === "pending").length,
      latestDate,
    };
  }, [data]);

  const pendingLeaveRequests = useMemo(
    () => data?.leaveRequests.filter((r) => r.status === "pending").slice(0, 5) ?? [],
    [data],
  );

  if (loading) return <LoadingState label="Loading dashboard…" />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!data || !stats) return <EmptyState title="No dashboard data available" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">HR Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Snapshot as of {stats.latestDate ? formatDate(stats.latestDate) : "the latest attendance entry"}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <DashboardStatCard label="Total Employees" value={stats.totalEmployees} icon={<Users className="h-5 w-5" />} tone="primary" />
        <DashboardStatCard label="Present" value={stats.present} icon={<UserCheck className="h-5 w-5" />} tone="success" />
        <DashboardStatCard label="Absent" value={stats.absent} icon={<UserX className="h-5 w-5" />} tone="danger" />
        <DashboardStatCard label="On Leave" value={stats.onLeave} icon={<CalendarClock className="h-5 w-5" />} tone="info" />
        <DashboardStatCard label="Pending Leave Requests" value={stats.pendingLeaves} icon={<ClipboardList className="h-5 w-5" />} tone="warning" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Requests</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {pendingLeaveRequests.length === 0 ? (
            <EmptyState title="No pending leave requests" description="All caught up — nothing waiting for review." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingLeaveRequests.map((lr) => (
                  <TableRow
                    key={lr.id}
                    className="cursor-pointer"
                    onClick={() => navigate("/admin/leaves")}
                  >
                    <TableCell className="font-medium text-text-primary">
                      {lr.employee?.full_name ?? lr.employee_id}
                      <span className="ml-2 text-xs text-text-muted">{lr.employee?.employee_id}</span>
                    </TableCell>
                    <TableCell className="capitalize">{lr.leave_type}</TableCell>
                    <TableCell>
                      {formatDate(lr.start_date)} – {formatDate(lr.end_date)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={lr.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
