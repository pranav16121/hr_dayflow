import { getEmployeePayroll } from "@/services/payrollService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency, formatDate } from "@/lib/format";
import { CURRENT_EMPLOYEE_ID } from "@/lib/session";

export function EmployeePayrollPage() {
  const { data: payroll, loading, error, refetch } = useAsync(
    () => getEmployeePayroll(CURRENT_EMPLOYEE_ID),
    [],
  );

  if (loading) return <LoadingState label="Loading payroll…" />;
  if (error) return <ErrorState onRetry={refetch} />;
  if (!payroll) return <EmptyState title="No payroll record found" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Payroll</h1>
          <p className="mt-1 text-sm text-text-secondary">View your salary and payroll information.</p>
        </div>
        <div className="rounded-card border border-border bg-surface px-4 py-2 text-sm text-text-secondary">
          Effective {formatDate(payroll.effective_date)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Basic Salary</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{formatCurrency(payroll.basic_salary)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Allowances</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{formatCurrency(payroll.allowances)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Deductions</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{formatCurrency(payroll.deductions)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Salary Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Earnings</p>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Basic Salary</span>
                <span className="font-medium text-text-primary">{formatCurrency(payroll.basic_salary)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Allowances</span>
                <span className="font-medium text-text-primary">{formatCurrency(payroll.allowances)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-sm font-semibold">
                <span className="text-text-primary">Gross Salary</span>
                <span className="text-text-primary">
                  {formatCurrency(payroll.basic_salary + payroll.allowances)}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Deductions</p>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total Deductions</span>
                <span className="font-medium text-text-primary">{formatCurrency(payroll.deductions)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-sm font-semibold">
                <span className="text-text-primary">Net Salary</span>
                <span className="text-primary">{formatCurrency(payroll.net_salary)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
