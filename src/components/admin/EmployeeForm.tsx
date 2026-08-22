import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Employee, UpdateEmployeeInput } from "@/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const employeeFormSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
  designation: z.string().nullable().optional(),
  joining_date: z.string().nullable().optional(),
  employment_status: z.enum(["active", "inactive"]),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

interface EmployeeFormProps {
  employee: Employee;
  onSubmit: (data: UpdateEmployeeInput) => Promise<void> | void;
  onCancel: () => void;
  submitting?: boolean;
}

export function EmployeeForm({ employee, onSubmit, onCancel, submitting }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      full_name: employee.full_name,
      email: employee.email,
      phone: employee.phone ?? "",
      address: employee.address ?? "",
      department: employee.department ?? "",
      designation: employee.designation ?? "",
      joining_date: employee.joining_date ?? "",
      employment_status: employee.employment_status,
    },
  });

  const submit = handleSubmit(async (values) => {
    await onSubmit({
      ...values,
      phone: values.phone || null,
      address: values.address || null,
      department: values.department || null,
      designation: values.designation || null,
      joining_date: values.joining_date || null,
    });
  });

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Full Name" {...register("full_name")} error={errors.full_name?.message} />
        <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
        <Input label="Phone" {...register("phone")} error={errors.phone?.message} />
        <Input label="Joining Date" type="date" {...register("joining_date")} error={errors.joining_date?.message} />
        <Input label="Department" {...register("department")} error={errors.department?.message} />
        <Input label="Designation" {...register("designation")} error={errors.designation?.message} />
        <Select
          label="Employment Status"
          {...register("employment_status")}
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
      </div>
      <Input label="Address" {...register("address")} error={errors.address?.message} />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}

