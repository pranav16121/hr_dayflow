import { useAsync } from "@/hooks/useAsync";
import { getActiveEmployee, getPersonalPayroll } from "@/services/employeePortalService";
import { LoadingState, ErrorState } from "@/components/feedback";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency, formatDate } from "@/lib/format";
import { Banknote, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Payroll() {
  const { data: employee, loading: empLoading } = useAsync(getActiveEmployee, []);
  const {
    data: payroll,
    loading: payLoading,
    error,
    refetch,
  } = useAsync(
    () => (employee ? getPersonalPayroll(employee.id) : Promise.resolve(null)),
    [employee?.id],
  );

  if (empLoading || payLoading) return <LoadingState label="Loading your compensation structure…" />;
  if (error || !employee) return <ErrorState onRetry={refetch} description={error?.message || "Failed to load payroll"} />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="My Payroll & Salary"
          description="View your monthly compensation breakdown, payslip history, and benefits."
        />
        <Button
          variant="outline"
          icon={<Download className="h-4 w-4" />}
          onClick={() => window.print()}
        >
          Print / Export Payslip
        </Button>
      </div>

      {!payroll ? (
        <Card>
          <CardContent className="py-12 text-center text-text-secondary text-sm">
            No active payroll structure has been configured for your account yet. Contact HR.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Main Net Pay Banner Card */}
          <Card className="bg-gradient-to-r from-primary-900 to-slate-900 text-white border-0 shadow-lg">
            <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-primary-200 font-semibold">
                  Current Net Take-Home Salary
                </span>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">
                  {formatCurrency(payroll.net_salary)}
                </p>
                <p className="text-xs text-primary-300">
                  Effective from {formatDate(payroll.effective_date)} • Disbursed Monthly
                </p>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                <div className="h-10 w-10 rounded-full bg-success-500/20 text-success-300 flex items-center justify-center font-bold">
                  <Banknote className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase text-primary-200 font-semibold block">Salary Status</span>
                  <span className="text-sm font-semibold text-white">Direct Deposit Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-success-600" />
                    Gross Earnings
                  </span>
                  <span className="text-success-600 font-bold">
                    {formatCurrency(payroll.basic_salary + payroll.allowances)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-text-secondary">Base Salary</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(payroll.basic_salary)}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-text-secondary">Housing & Special Allowances</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(payroll.allowances)}</span>
                </div>
                <div className="flex justify-between items-center pt-1 text-sm font-bold text-text-primary">
                  <span>Total Earnings</span>
                  <span>{formatCurrency(payroll.basic_salary + payroll.allowances)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Deductions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4 text-danger-600" />
                    Statutory Deductions
                  </span>
                  <span className="text-danger-600 font-bold">
                    -{formatCurrency(payroll.deductions)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-text-secondary">Provident Fund (PF) & TDS</span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(payroll.deductions * 0.7)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-text-secondary">Health Insurance & Benefits</span>
                  <span className="font-semibold text-text-primary">
                    {formatCurrency(payroll.deductions * 0.3)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 text-sm font-bold text-text-primary">
                  <span>Total Deductions</span>
                  <span className="text-danger-600">-{formatCurrency(payroll.deductions)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payroll;
