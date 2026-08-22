import { useMemo } from "react";
import { getEmployeeAttendance } from "@/services/attendanceService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { formatDate, formatTime } from "@/lib/format";
import { CURRENT_EMPLOYEE_ID } from "@/lib/session";

export function EmployeeAttendancePage() {
  const { data, loading, error, refetch } = useAsync(
    () => getEmployeeAttendance(CURRENT_EMPLOYEE_ID),
    [],
  );

  const records = useMemo(
    () => (data ? [...data].sort((a, b) => (a.date < b.date ? 1 : -1)) : []),
    [data],
  );

  const summary = useMemo(() => {
    const present = records.filter((r) => r.status === "present").length;
    const absent = records.filter((r) => r.status === "absent").length;
    const halfDay = records.filter((r) => r.status === "half_day").length;
    const rate = records.length ? Math.round(((present + halfDay) / records.length) * 100) : 0;
    return { present, absent, halfDay, rate };
  }, [records]);

  if (loading) return <LoadingState label="Loading attendance…" />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Attendance</h1>
        <p className="mt-1 text-sm text-text-secondary">Track your daily attendance and working hours.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Present Days</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{summary.present}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Half Days</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{summary.halfDay}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Absent Days</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{summary.absent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Attendance Rate</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{summary.rate}%</p>
          </CardContent>
        </Card>
      </div>

      {records.length === 0 ? (
        <EmptyState title="No attendance records" description="Your attendance history will appear here." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium text-text-primary">{formatDate(record.date)}</TableCell>
                <TableCell>{formatTime(record.check_in)}</TableCell>
                <TableCell>{formatTime(record.check_out)}</TableCell>
                <TableCell>
                  <StatusBadge status={record.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
