import { useState } from "react";
import { toast } from "sonner";
import type { AdminPayroll, UpdatePayrollInput } from "@/types";
import { getAllPayroll, updatePayroll } from "@/services/payrollService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { PayrollTable } from "@/components/admin/PayrollTable";
import { PayrollEditModal } from "@/components/admin/PayrollEditModal";
import { PageHeader } from "@/components/ui/PageHeader";

export function Payroll() {
  const { data: payroll, loading, error, refetch } = useAsync(getAllPayroll, []);
  const [editing, setEditing] = useState<AdminPayroll | null>(null);

  async function handleSave(employeeId: string, data: UpdatePayrollInput) {
    try {
      await updatePayroll(employeeId, data);
      toast.success("Payroll structure updated in Supabase");
      setEditing(null);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update payroll");
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Payroll"
        description="View and manage live salary structures and compensation breakdown for all employees."
      />

      {loading ? (
        <LoadingState label="Loading payroll data from Supabase…" />
      ) : error ? (
        <ErrorState onRetry={refetch} description={error.message} />
      ) : !payroll || payroll.length === 0 ? (
        <EmptyState title="No payroll records found in database." />
      ) : (
        <PayrollTable records={payroll} onEdit={setEditing} />
      )}

      <PayrollEditModal record={editing} onClose={() => setEditing(null)} onSubmit={handleSave} />
    </div>
  );
}

export default Payroll;
