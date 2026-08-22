import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { AdminPayroll, UpdatePayrollInput } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";

const payrollFormSchema = z.object({
  basic_salary: z.coerce.number().min(0, "Must be 0 or greater"),
  allowances: z.coerce.number().min(0, "Must be 0 or greater"),
  deductions: z.coerce.number().min(0, "Must be 0 or greater"),
});

type PayrollFormValues = z.infer<typeof payrollFormSchema>;

interface PayrollEditModalProps {
  record: AdminPayroll | null;
  onClose: () => void;
  onSubmit: (employeeId: string, data: UpdatePayrollInput) => Promise<void>;
}

export function PayrollEditModal({ record, onClose, onSubmit }: PayrollEditModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PayrollFormValues>({
    resolver: zodResolver(payrollFormSchema),
    values: record
      ? {
          basic_salary: record.basic_salary,
          allowances: record.allowances,
          deductions: record.deductions,
        }
      : undefined,
  });

  const watched = watch();
  const previewNet =
    (Number(watched?.basic_salary) || 0) + (Number(watched?.allowances) || 0) - (Number(watched?.deductions) || 0);

  if (!record) return null;

  const submit = handleSubmit(async (values) => {
    await onSubmit(record.employee_id, values);
  });

  return (
    <Modal
      open={!!record}
      onClose={onClose}
      title="Edit Salary Structure"
      description={`${record.employee?.full_name ?? "Employee"} · ${record.employee?.employee_id ?? ""}`}
      size="sm"
    >
      <form onSubmit={submit} className="space-y-4">
        <Input
          label="Basic Salary"
          type="number"
          step="0.01"
          {...register("basic_salary")}
          error={errors.basic_salary?.message}
        />
        <Input
          label="Allowances"
          type="number"
          step="0.01"
          {...register("allowances")}
          error={errors.allowances?.message}
        />
        <Input
          label="Deductions"
          type="number"
          step="0.01"
          {...register("deductions")}
          error={errors.deductions?.message}
        />

        <div className="rounded-button bg-primary-50 p-4 border border-primary-100/50">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-700">
            Estimated Net Salary (preview)
          </p>
          <p className="mt-1 text-lg font-bold text-primary-700">{formatCurrency(previewNet)}</p>
          <p className="mt-1 text-xs text-primary-700/70">
            Final net salary is calculated and confirmed by the backend after saving.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
}

