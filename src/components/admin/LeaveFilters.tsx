import type { Employee, LeaveStatus, LeaveType } from "@/types";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface LeaveFilterValues {
  employeeId: string;
  status: LeaveStatus | "";
  leaveType: LeaveType | "";
  startDate: string;
  endDate: string;
}

interface LeaveFiltersProps {
  employees: Employee[];
  values: LeaveFilterValues;
  onChange: (values: LeaveFilterValues) => void;
}

export function LeaveFilters({ employees, values, onChange }: LeaveFiltersProps) {
  const update = (patch: Partial<LeaveFilterValues>) => onChange({ ...values, ...patch });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
      <Select
        placeholder="All employees"
        value={values.employeeId}
        onChange={(e) => update({ employeeId: e.target.value })}
        options={employees.map((e) => ({ label: `${e.full_name} (${e.employee_id})`, value: e.id }))}
        aria-label="Filter by employee"
      />
      <Select
        placeholder="All statuses"
        value={values.status}
        onChange={(e) => update({ status: e.target.value as LeaveStatus | "" })}
        options={[
          { label: "Pending", value: "pending" },
          { label: "Approved", value: "approved" },
          { label: "Rejected", value: "rejected" },
        ]}
        aria-label="Filter by status"
      />
      <Select
        placeholder="All leave types"
        value={values.leaveType}
        onChange={(e) => update({ leaveType: e.target.value as LeaveType | "" })}
        options={[
          { label: "Paid", value: "paid" },
          { label: "Sick", value: "sick" },
          { label: "Unpaid", value: "unpaid" },
        ]}
        aria-label="Filter by leave type"
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
      <Button
        variant="outline"
        onClick={() => onChange({ employeeId: "", status: "", leaveType: "", startDate: "", endDate: "" })}
      >
        Clear Filters
      </Button>
    </div>
  );
}

