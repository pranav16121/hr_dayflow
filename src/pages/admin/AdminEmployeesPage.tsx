import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getEmployees } from "@/services/employeeService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { EmployeeTable } from "@/components/admin/EmployeeTable";

export function AdminEmployeesPage() {
  const { data: employees, loading, error, refetch } = useAsync(getEmployees, []);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const departmentOptions = useMemo(() => {
    const set = new Set((employees ?? []).map((e) => e.department).filter(Boolean) as string[]);
    return Array.from(set).sort().map((d) => ({ label: d, value: d }));
  }, [employees]);

  const filtered = useMemo(() => {
    if (!employees) return [];
    const query = search.trim().toLowerCase();
    return employees.filter((emp) => {
      if (department && emp.department !== department) return false;
      if (status && emp.employment_status !== status) return false;
      if (
        query &&
        !emp.full_name.toLowerCase().includes(query) &&
        !emp.employee_id.toLowerCase().includes(query) &&
        !emp.email.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [employees, search, department, status]);

  if (loading) return <LoadingState label="Loading employees…" />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Employees</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {employees?.length ?? 0} employee{employees?.length === 1 ? "" : "s"} total.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Input
          placeholder="Search by name, ID, or email"
          icon={<Search className="h-4 w-4" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search employees"
        />
        <Select
          placeholder="All departments"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          options={departmentOptions}
          aria-label="Filter by department"
        />
        <Select
          placeholder="All statuses"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          aria-label="Filter by employment status"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No employees match your filters"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <EmployeeTable employees={filtered} />
      )}
    </div>
  );
}
