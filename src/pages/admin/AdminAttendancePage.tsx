import { useMemo, useState } from "react";
import { getEmployees } from "@/services/employeeService";
import { getAllAttendance } from "@/services/attendanceService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { AttendanceFilters, type AttendanceFilterValues } from "@/components/admin/AttendanceFilters";
import { AttendanceTable } from "@/components/admin/AttendanceTable";

const EMPTY_FILTERS: AttendanceFilterValues = {
  employeeId: "",
  startDate: "",
  endDate: "",
  status: "",
};

export function AdminAttendancePage() {
  const [filters, setFilters] = useState<AttendanceFilterValues>(EMPTY_FILTERS);

  const { data: employees } = useAsync(getEmployees, []);
  const {
    data: attendance,
    loading,
    error,
    refetch,
  } = useAsync(
    () =>
      getAllAttendance({
        employeeId: filters.employeeId || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        status: filters.status || undefined,
      }),
    [filters.employeeId, filters.startDate, filters.endDate, filters.status],
  );

  const activeEmployees = useMemo(
    () => (employees ?? []).filter((e) => e.employment_status === "active"),
    [employees],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Attendance</h1>
        <p className="mt-1 text-sm text-text-secondary">Review attendance records across all employees.</p>
      </div>

      <AttendanceFilters employees={activeEmployees} values={filters} onChange={setFilters} />

      {loading ? (
        <LoadingState label="Loading attendance…" />
      ) : error ? (
        <ErrorState onRetry={refetch} />
      ) : !attendance || attendance.length === 0 ? (
        <EmptyState title="No attendance records found" description="Try adjusting your filters." />
      ) : (
        <AttendanceTable records={attendance} />
      )}
    </div>
  );
}
