import type { AttendanceStatus, Employee } from "@/types";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface AttendanceFilterValues {
  employeeId: string;
  startDate: string;
  endDate: string;
  status: AttendanceStatus | "";
}

interface AttendanceFiltersProps {
  employees: Employee[];
  values: AttendanceFilterValues;
  onChange: (values: AttendanceFilterValues) => void;
}

const STATUS_OPTIONS: { label: string; value: AttendanceStatus }[] = [
  { label: "Present", value: "present" },
  { label: "Absent", value: "absent" },
  { label: "Half Day", value: "half_day" },
  { label: "Leave", value: "leave" },
];

export function AttendanceFilters({ employees, values, onChange }: AttendanceFiltersProps) {
  const update = (patch: Partial<AttendanceFilterValues>) => onChange({ ...values, ...patch });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Select
        placeholder="All employees"
        value={values.employeeId}
        onChange={(e) => update({ employeeId: e.target.value })}
        options={employees.map((e) => ({ label: `${e.full_name} (${e.employee_id})`, value: e.id }))}
        aria-label="Filter by employee"
      />
      <Input
        type="date"
        value={values.startDate}
        onChange={(e) => update({ startDate: e.target.value })}
        aria-label="Start date"
      />
      <Input
        type="date"
        value={values.endDate}
        onChange={(e) => update({ endDate: e.target.value })}
        aria-label="End date"
      />
      <Select
        placeholder="All statuses"
        value={values.status}
        onChange={(e) => update({ status: e.target.value as AttendanceStatus | "" })}
        options={STATUS_OPTIONS}
        aria-label="Filter by status"
      />
      <Button
        variant="outline"
        onClick={() => onChange({ employeeId: "", startDate: "", endDate: "", status: "" })}
      >
        Clear Filters
      </Button>
    </div>
  );
}

