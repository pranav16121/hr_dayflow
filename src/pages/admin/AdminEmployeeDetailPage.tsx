import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { toast } from "sonner";
import { getEmployee, updateEmployee } from "@/services/employeeService";
import { getEmployeeAttendance } from "@/services/attendanceService";
import { getAllLeaveRequests } from "@/services/leaveService";
import { getEmployeePayroll } from "@/services/payrollService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { EmployeeSummary } from "@/components/admin/EmployeeSummary";
import { EmployeeForm } from "@/components/admin/EmployeeForm";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";
import type { UpdateEmployeeInput } from "@/types";

const TABS = ["Overview", "Attendance", "Leave History", "Payroll"] as const;
type Tab = (typeof TABS)[number];

export function AdminEmployeeDetailPage() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [editOpen, setEditOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    data: employee,
    loading,
    error,
    refetch,
  } = useAsync(() => getEmployee(employeeId!), [employeeId]);

  const attendanceQuery = useAsync(
    () => (employeeId ? getEmployeeAttendance(employeeId) : Promise.resolve([])),
    [employeeId],
  );
  const leaveQuery = useAsync(
    () => (employeeId ? getAllLeaveRequests({ employeeId }) : Promise.resolve([])),
    [employeeId],
  );
  const payrollQuery = useAsync(
    () => (employeeId ? getEmployeePayroll(employeeId) : Promise.resolve(null)),
    [employeeId],
  );

  async function handleSave(data: UpdateEmployeeInput) {
    if (!employeeId) return;
    setSubmitting(true);
    try {
      await updateEmployee(employeeId, data);
      toast.success("Employee details updated");
      setEditOpen(false);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update employee");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <LoadingState label="Loading employee…" />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!employee) return <EmptyState title="Employee not found" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/admin/employees")}
          className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Employees
        </button>
        <Button size="sm" icon={<Pencil className="h-4 w-4" />} onClick={() => setEditOpen(true)}>
          Edit Employee
        </Button>
      </div>

      <Card>
        <CardContent>
          <EmployeeSummary employee={employee} />
        </CardContent>
      </Card>

      <div className="flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <Card>
          <CardContent>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Employee ID</dt>
                <dd className="mt-1 text-sm text-text-primary">{employee.employee_id}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Department</dt>
                <dd className="mt-1 text-sm text-text-primary">{employee.department ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Designation</dt>
                <dd className="mt-1 text-sm text-text-primary">{employee.designation ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Joining Date</dt>
                <dd className="mt-1 text-sm text-text-primary">{formatDate(employee.joining_date)}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Employment Status</dt>
                <dd className="mt-1"><StatusBadge status={employee.employment_status} /></dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}

      {activeTab === "Attendance" && (
        <Card>
          <CardContent>
            {attendanceQuery.loading ? (
              <LoadingState label="Loading attendance…" />
            ) : attendanceQuery.error ? (
              <ErrorState onRetry={attendanceQuery.refetch} />
            ) : !attendanceQuery.data || attendanceQuery.data.length === 0 ? (
              <EmptyState title="No attendance records" />
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
                  {attendanceQuery.data.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{formatDate(r.date)}</TableCell>
                      <TableCell>{formatTime(r.check_in)}</TableCell>
                      <TableCell>{formatTime(r.check_out)}</TableCell>
                      <TableCell>
                        <StatusBadge status={r.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "Leave History" && (
        <Card>
          <CardContent>
            {leaveQuery.loading ? (
              <LoadingState label="Loading leave history…" />
            ) : leaveQuery.error ? (
              <ErrorState onRetry={leaveQuery.refetch} />
            ) : !leaveQuery.data || leaveQuery.data.length === 0 ? (
              <EmptyState title="No leave requests" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Admin Comment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveQuery.data.map((lr) => (
                    <TableRow key={lr.id}>
                      <TableCell className="capitalize">{lr.leave_type}</TableCell>
                      <TableCell>
                        {formatDate(lr.start_date)} – {formatDate(lr.end_date)}
                      </TableCell>
                      <TableCell>{lr.remarks ?? "—"}</TableCell>
                      <TableCell>
                        <StatusBadge status={lr.status} />
                      </TableCell>
                      <TableCell>{lr.admin_comment ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "Payroll" && (
        <Card>
          <CardContent>
            {payrollQuery.loading ? (
              <LoadingState label="Loading payroll…" />
            ) : payrollQuery.error ? (
              <ErrorState onRetry={payrollQuery.refetch} />
            ) : !payrollQuery.data ? (
              <EmptyState title="No payroll record on file" />
            ) : (
              <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Basic Salary</dt>
                  <dd className="mt-1 text-sm text-text-primary">{formatCurrency(payrollQuery.data.basic_salary)}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Allowances</dt>
                  <dd className="mt-1 text-sm text-text-primary">{formatCurrency(payrollQuery.data.allowances)}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Deductions</dt>
                  <dd className="mt-1 text-sm text-text-primary">{formatCurrency(payrollQuery.data.deductions)}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Net Salary</dt>
                  <dd className="mt-1 text-base font-semibold text-primary">{formatCurrency(payrollQuery.data.net_salary)}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Effective Date</dt>
                  <dd className="mt-1 text-sm text-text-primary">{formatDate(payrollQuery.data.effective_date)}</dd>
                </div>
              </dl>
            )}
          </CardContent>
        </Card>
      )}

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Employee" size="lg">
        <EmployeeForm
          employee={employee}
          onSubmit={handleSave}
          onCancel={() => setEditOpen(false)}
          submitting={submitting}
        />
      </Modal>
    </div>
  );
}
