import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAsync } from "@/hooks/useAsync";
import {
  getActiveEmployee,
  getPersonalAttendance,
  getPersonalLeaveRequests,
  getPersonalPayroll,
  clockInEmployee,
  clockOutEmployee,
} from "@/services/employeePortalService";
import { LoadingState, ErrorState } from "@/components/feedback";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import {
  Clock,
  CalendarDays,
  Banknote,
  UserCheck,
  LogIn,
  LogOut,
  CalendarPlus,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function Dashboard() {
  const { data: employee, loading: empLoading } = useAsync(getActiveEmployee, []);
  const {
    data: attendanceLogs,
    loading: attLoading,
    refetch: refetchAttendance,
  } = useAsync(
    () => (employee ? getPersonalAttendance(employee.id) : Promise.resolve([])),
    [employee?.id],
  );
  const { data: leaveRequests } = useAsync(
    () => (employee ? getPersonalLeaveRequests(employee.id) : Promise.resolve([])),
    [employee?.id],
  );
  const { data: payroll } = useAsync(
    () => (employee ? getPersonalPayroll(employee.id) : Promise.resolve(null)),
    [employee?.id],
  );

  const [isClocking, setIsClocking] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const todayRecord = useMemo(
    () => (attendanceLogs ?? []).find((log) => log.date === todayStr),
    [attendanceLogs, todayStr],
  );

  const stats = useMemo(() => {
    const logs = attendanceLogs ?? [];
    const presentCount = logs.filter((l) => l.status === "present").length;
    const pendingLeaves = (leaveRequests ?? []).filter((l) => l.status === "pending").length;
    return {
      presentDays: presentCount,
      pendingLeaves,
      netSalary: payroll?.net_salary ?? 0,
    };
  }, [attendanceLogs, leaveRequests, payroll]);

  const handleClockIn = async () => {
    if (!employee) return;
    setIsClocking(true);
    try {
      await clockInEmployee(employee.id);
      toast.success("Clocked in successfully! Have a great workday.");
      refetchAttendance();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to clock in");
    } finally {
      setIsClocking(false);
    }
  };

  const handleClockOut = async () => {
    if (!employee) return;
    setIsClocking(true);
    try {
      await clockOutEmployee(employee.id);
      toast.success("Clocked out successfully. Work hours recorded.");
      refetchAttendance();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to clock out");
    } finally {
      setIsClocking(false);
    }
  };

  if (empLoading || attLoading) return <LoadingState label="Loading employee dashboard…" />;
  if (!employee) return <ErrorState description="Employee account not found." />;

  return (
    <div className="space-y-6 animate-fade-in select-none">
      <PageHeader
        title="Employee Dashboard"
        description={`Good day, ${employee.full_name} 👋 • Here is your work summary and daily overview.`}
      />

      {/* Row 1: 4 Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Attendance */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase">Days Present</p>
              <p className="text-2xl font-bold text-text-primary mt-1">{stats.presentDays}</p>
              <p className="text-[11px] text-success-600 mt-0.5">Recorded shifts</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-success-50 text-success-600 flex items-center justify-center">
              <UserCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Today's Status */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase">Today's Check-in</p>
              <p className="text-xl font-bold text-text-primary mt-1">
                {todayRecord?.check_in ? formatTime(todayRecord.check_in) : "Not Clocked In"}
              </p>
              <p className="text-[11px] text-primary-600 mt-0.5">
                {todayRecord?.check_out ? `Out at ${formatTime(todayRecord.check_out)}` : "Current Shift"}
              </p>
            </div>
            <div className="h-11 w-11 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Pending Leaves */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase">Pending Requests</p>
              <p className="text-2xl font-bold text-text-primary mt-1">{stats.pendingLeaves}</p>
              <p className="text-[11px] text-warning-600 mt-0.5">Under HR review</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-warning-50 text-warning-600 flex items-center justify-center">
              <CalendarDays className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Net Salary */}
        <Card hoverable>
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase">Net Monthly Pay</p>
              <p className="text-xl font-bold text-text-primary mt-1">{formatCurrency(stats.netSalary)}</p>
              <p className="text-[11px] text-text-muted mt-0.5">Disbursed directly</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-info-50 text-info-600 flex items-center justify-center">
              <Banknote className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Today's Action Widget + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Clock In Card */}
        <Card className="lg:col-span-1 border-primary-100 bg-primary-50/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary-600" />
              Quick Check-in Widget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-text-secondary">
              Record your daily work attendance for {formatDate(todayStr)}.
            </p>

            <div className="flex gap-2">
              {!todayRecord?.check_in ? (
                <Button
                  fullWidth
                  variant="primary"
                  icon={<LogIn className="h-4 w-4" />}
                  loading={isClocking}
                  onClick={handleClockIn}
                >
                  Clock In Now
                </Button>
              ) : !todayRecord?.check_out ? (
                <Button
                  fullWidth
                  variant="outline"
                  icon={<LogOut className="h-4 w-4 text-danger-600" />}
                  loading={isClocking}
                  onClick={handleClockOut}
                >
                  Clock Out
                </Button>
              ) : (
                <div className="w-full flex items-center justify-center gap-1.5 p-2 bg-success-50 text-success-700 text-xs font-semibold rounded-button border border-success-100">
                  <CheckCircle2 className="h-4 w-4" /> Shift Completed Today
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link
                to="/employee/leave"
                className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-primary-700 hover:text-primary-800 p-2 rounded-lg border border-primary-200 bg-white"
              >
                <CalendarPlus className="h-3.5 w-3.5" /> Apply for Time Off
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance & Leave Applications */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Recent Activity & Logs</CardTitle>
              <Link
                to="/employee/attendance"
                className="text-xs text-primary-600 hover:underline flex items-center gap-1 font-semibold"
              >
                View Full Logs <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              {(!attendanceLogs || attendanceLogs.length === 0) ? (
                <p className="text-center py-8 text-sm text-text-secondary">No recent logs recorded.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceLogs.slice(0, 5).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium text-text-primary">{formatDate(log.date)}</TableCell>
                        <TableCell>{formatTime(log.check_in)}</TableCell>
                        <TableCell>{formatTime(log.check_out)}</TableCell>
                        <TableCell>
                          <StatusBadge status={log.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
