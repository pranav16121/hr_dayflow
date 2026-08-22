import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useAsync } from "@/hooks/useAsync";
import {
  getActiveEmployee,
  getPersonalAttendance,
  clockInEmployee,
  clockOutEmployee,
} from "@/services/employeePortalService";
import { LoadingState, ErrorState } from "@/components/feedback";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatTime } from "@/lib/format";
import { Clock, LogIn, LogOut, CalendarCheck, CheckCircle2 } from "lucide-react";

export function Attendance() {
  const { data: employee, loading: empLoading } = useAsync(getActiveEmployee, []);
  const {
    data: attendanceLogs,
    loading: logsLoading,
    error,
    refetch,
  } = useAsync(
    () => (employee ? getPersonalAttendance(employee.id) : Promise.resolve([])),
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
    const present = logs.filter((l) => l.status === "present").length;
    const halfDay = logs.filter((l) => l.status === "half_day").length;
    const leave = logs.filter((l) => l.status === "leave").length;
    const absent = logs.filter((l) => l.status === "absent").length;
    return { present, halfDay, leave, absent, total: logs.length };
  }, [attendanceLogs]);

  const handleClockIn = async () => {
    if (!employee) return;
    setIsClocking(true);
    try {
      await clockInEmployee(employee.id);
      toast.success("Clocked in successfully! Have a great workday.");
      refetch();
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
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to clock out");
    } finally {
      setIsClocking(false);
    }
  };

  if (empLoading || logsLoading) return <LoadingState label="Loading your attendance records…" />;
  if (error || !employee) return <ErrorState onRetry={refetch} description={error?.message || "Failed to load attendance"} />;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="My Attendance"
        description="Clock in/out daily, track your work hours, and monitor your monthly attendance logs."
      />

      {/* Row 1: Today's Action & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Clock In/Out Action Card */}
        <Card className="lg:col-span-1 border-primary-100 bg-gradient-to-br from-surface to-primary-50/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-primary-600" />
              Today's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-xs text-text-muted">Today's Date:</span>
              <span className="text-sm font-semibold text-text-primary">{formatDate(todayStr)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-3 bg-white rounded-lg border border-border/60">
                <span className="text-[11px] text-text-muted uppercase font-semibold">Check In</span>
                <p className="text-sm font-bold text-text-primary mt-0.5">
                  {todayRecord?.check_in ? formatTime(todayRecord.check_in) : "—"}
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-border/60">
                <span className="text-[11px] text-text-muted uppercase font-semibold">Check Out</span>
                <p className="text-sm font-bold text-text-primary mt-0.5">
                  {todayRecord?.check_out ? formatTime(todayRecord.check_out) : "—"}
                </p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
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
                  <CheckCircle2 className="h-4 w-4" /> Completed for Today
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Metrics Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card hoverable>
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-xs font-semibold text-text-muted uppercase">Present Days</span>
              <p className="text-2xl font-bold text-success-600 mt-2">{stats.present}</p>
              <span className="text-[11px] text-text-muted mt-1">Full attendance</span>
            </CardContent>
          </Card>
          <Card hoverable>
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-xs font-semibold text-text-muted uppercase">Half Days</span>
              <p className="text-2xl font-bold text-warning-600 mt-2">{stats.halfDay}</p>
              <span className="text-[11px] text-text-muted mt-1">Partial shifts</span>
            </CardContent>
          </Card>
          <Card hoverable>
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-xs font-semibold text-text-muted uppercase">Leaves</span>
              <p className="text-2xl font-bold text-info-600 mt-2">{stats.leave}</p>
              <span className="text-[11px] text-text-muted mt-1">Approved time-off</span>
            </CardContent>
          </Card>
          <Card hoverable>
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <span className="text-xs font-semibold text-text-muted uppercase">Absences</span>
              <p className="text-2xl font-bold text-danger-600 mt-2">{stats.absent}</p>
              <span className="text-[11px] text-text-muted mt-1">Unrecorded days</span>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 2: Attendance History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-primary-600" />
            Attendance History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!attendanceLogs || attendanceLogs.length === 0 ? (
            <p className="text-center py-8 text-sm text-text-secondary">No attendance logs found in database.</p>
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
                {attendanceLogs.map((log) => (
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
  );
}

export default Attendance;
