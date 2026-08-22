import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, Clock, ClipboardList, Wallet } from "lucide-react";
import { getEmployee } from "@/services/employeeService";
import { getEmployeeAttendance } from "@/services/attendanceService";
import { getAllLeaveRequests } from "@/services/leaveService";
import { getEmployeePayroll } from "@/services/payrollService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState } from "@/components/feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DashboardStatCard } from "@/components/admin/DashboardStatCard";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import { CURRENT_EMPLOYEE_ID } from "@/lib/session";

async function loadDashboard() {
  const [employee, attendance, leaveRequests, payroll] = await Promise.all([
    getEmployee(CURRENT_EMPLOYEE_ID),
    getEmployeeAttendance(CURRENT_EMPLOYEE_ID),
    getAllLeaveRequests({ employeeId: CURRENT_EMPLOYEE_ID }),
    getEmployeePayroll(CURRENT_EMPLOYEE_ID),
  ]);
  return { employee, attendance, leaveRequests, payroll };
}

export function EmployeeDashboardPage() {
  const { data, loading, error, refetch } = useAsync(loadDashboard, []);
  const navigate = useNavigate();

  const today = useMemo(() => {
    if (!data?.attendance.length) return null;
    return [...data.attendance].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  }, [data]);

  const pendingLeaves = useMemo(
    () => data?.leaveRequests.filter((r) => r.status === "pending").length ?? 0,
    [data],
  );
  const approvedLeaves = useMemo(
    () => data?.leaveRequests.filter((r) => r.status === "approved").length ?? 0,
    [data],
  );

  if (loading) return <LoadingState label="Loading dashboard…" />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!data) return null;

  const { employee, payroll } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Good day, {employee.full_name}</h1>
          <p className="mt-1 text-sm text-text-secondary">Here's what's happening with your work today.</p>
        </div>
        <div className="rounded-card border border-border bg-surface px-4 py-2 text-sm text-text-secondary">
          {today ? formatDate(today.date) : "No attendance recorded"}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          label="Today's Attendance"
          value={today ? today.status.replace("_", " ") : "—"}
          icon={<CalendarCheck className="h-5 w-5" />}
          tone="success"
        />
        <DashboardStatCard
          label="Working Hours"
          value={today?.check_in && today.check_out ? formatTime(today.check_out) : "In progress"}
          icon={<Clock className="h-5 w-5" />}
          tone="info"
        />
        <DashboardStatCard
          label="Pending Leave Requests"
          value={pendingLeaves}
          icon={<ClipboardList className="h-5 w-5" />}
          tone="warning"
        />
        <DashboardStatCard
          label="Net Salary"
          value={payroll ? formatCurrency(payroll.net_salary) : "—"}
          icon={<Wallet className="h-5 w-5" />}
          tone="primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {today ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-text-muted">Check-in</p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">{formatTime(today.check_in)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Check-out</p>
                  <p className="mt-1 text-sm font-semibold text-text-primary">{formatTime(today.check_out)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Status</p>
                  <StatusBadge status={today.status} className="mt-1" />
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-secondary">No attendance recorded yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 pt-4">
            <Button variant="outline" onClick={() => navigate("/employee/leave")}>
              Apply Leave
            </Button>
            <Button variant="outline" onClick={() => navigate("/employee/attendance")}>
              View Attendance
            </Button>
            <Button variant="outline" onClick={() => navigate("/employee/payroll")}>
              View Payroll
            </Button>
          </CardContent>
        </Card>
      </div>

      {approvedLeaves > 0 && (
        <p className="text-sm text-text-muted">
          You have {approvedLeaves} approved leave{approvedLeaves === 1 ? "" : "s"} on record this year.
        </p>
      )}
    </div>
  );
}
