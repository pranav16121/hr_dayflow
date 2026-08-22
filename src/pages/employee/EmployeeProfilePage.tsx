import { getEmployee } from "@/services/employeeService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState } from "@/components/feedback";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";
import { CURRENT_EMPLOYEE_ID } from "@/lib/session";

export function EmployeeProfilePage() {
  const { data: employee, loading, error, refetch } = useAsync(
    () => getEmployee(CURRENT_EMPLOYEE_ID),
    [],
  );

  if (loading) return <LoadingState label="Loading profile…" />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!employee) return null;

  const infoItems: Array<[string, string]> = [
    ["Full Name", employee.full_name],
    ["Employee ID", employee.employee_id],
    ["Email", employee.email],
    ["Phone", employee.phone ?? "—"],
    ["Department", employee.department ?? "—"],
    ["Designation", employee.designation ?? "—"],
    ["Joining Date", formatDate(employee.joining_date)],
    ["Address", employee.address ?? "—"],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">My Profile</h1>
        <p className="mt-1 text-sm text-text-secondary">View your employee information.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
            <Avatar name={employee.full_name} size="lg" />
            <h2 className="text-lg font-semibold text-text-primary">{employee.full_name}</h2>
            <p className="text-sm text-text-secondary">{employee.designation ?? "—"}</p>
            <StatusBadge status={employee.employment_status} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="mb-4 text-base font-semibold text-text-primary">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {infoItems.map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-text-muted">{label}</p>
                  <p className="mt-1 text-sm font-medium text-text-primary">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
