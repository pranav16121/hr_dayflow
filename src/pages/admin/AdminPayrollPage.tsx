import { useState } from "react";
import { toast } from "sonner";
import type { AdminPayroll, UpdatePayrollInput } from "@/types";
import { getAllPayroll, updatePayroll } from "@/services/payrollService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { PayrollTable } from "@/components/admin/PayrollTable";
import { PayrollEditModal } from "@/components/admin/PayrollEditModal";

export function AdminPayrollPage() {
  const { data: payroll, loading, error, refetch } = useAsync(getAllPayroll, []);
  const [editing, setEditing] = useState<AdminPayroll | null>(null);

  async function handleSave(employeeId: string, data: UpdatePayrollInput) {
    try {
      await updatePayroll(employeeId, data);
      toast.success("Payroll updated");
      setEditing(null);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update payroll");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Payroll</h1>
        <p className="mt-1 text-sm text-text-secondary">View and update salary structures for all employees.</p>
      </div>

      {loading ? (
        <LoadingState label="Loading payroll…" />
      ) : error ? (
        <ErrorState onRetry={refetch} />
      ) : !payroll || payroll.length === 0 ? (
        <EmptyState title="No payroll records found" />
      ) : (
        <PayrollTable records={payroll} onEdit={setEditing} />
      )}

      <PayrollEditModal record={editing} onClose={() => setEditing(null)} onSubmit={handleSave} />
    </div>
  );
}
