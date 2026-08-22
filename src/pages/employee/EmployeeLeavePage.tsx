import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { getAllLeaveRequests, createLeaveRequest } from "@/services/leaveService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/format";
import { CURRENT_EMPLOYEE_ID } from "@/lib/session";

const leaveFormSchema = z
  .object({
    leave_type: z.enum(["paid", "sick", "unpaid"]),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    remarks: z.string().optional(),
  })
  .refine((values) => values.end_date >= values.start_date, {
    message: "End date must be on or after the start date",
    path: ["end_date"],
  });

type LeaveFormValues = z.infer<typeof leaveFormSchema>;

export function EmployeeLeavePage() {
  const { data, loading, error, refetch } = useAsync(
    () => getAllLeaveRequests({ employeeId: CURRENT_EMPLOYEE_ID }),
    [],
  );
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: { leave_type: "paid", start_date: "", end_date: "", remarks: "" },
  });

  const records = useMemo(
    () => (data ? [...data].sort((a, b) => (a.created_at < b.created_at ? 1 : -1)) : []),
    [data],
  );

  const summary = useMemo(() => {
    const pending = records.filter((r) => r.status === "pending").length;
    const approved = records.filter((r) => r.status === "approved").length;
    const rejected = records.filter((r) => r.status === "rejected").length;
    return { pending, approved, rejected, total: records.length };
  }, [records]);

  const submit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await createLeaveRequest({
        employeeId: CURRENT_EMPLOYEE_ID,
        leaveType: values.leave_type,
        startDate: values.start_date,
        endDate: values.end_date,
        remarks: values.remarks || null,
      });
      toast.success("Leave request submitted");
      reset();
      refetch();
    } catch {
      toast.error("Could not submit leave request");
    } finally {
      setSubmitting(false);
    }
  });

  if (loading) return <LoadingState label="Loading leave requests…" />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Leave</h1>
        <p className="mt-1 text-sm text-text-secondary">Apply for leave and track your requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Total Requests</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{summary.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Pending</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{summary.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Approved</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{summary.approved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-text-secondary">Rejected</p>
            <p className="mt-2 text-2xl font-bold text-text-primary">{summary.rejected}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Apply for Leave</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                label="Leave Type"
                {...register("leave_type")}
                options={[
                  { label: "Paid Leave", value: "paid" },
                  { label: "Sick Leave", value: "sick" },
                  { label: "Unpaid Leave", value: "unpaid" },
                ]}
              />
              <div />
              <Input label="From" type="date" {...register("start_date")} error={errors.start_date?.message} />
              <Input label="To" type="date" {...register("end_date")} error={errors.end_date?.message} />
            </div>
            <Textarea
              label="Reason"
              placeholder="Enter the reason for your leave…"
              {...register("remarks")}
            />
            <div className="flex justify-end">
              <Button type="submit" loading={submitting}>
                Submit Leave Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {records.length === 0 ? (
            <EmptyState title="No leave requests" description="Requests you submit will show up here." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell className="font-medium capitalize text-text-primary">
                      {leave.leave_type} leave
                    </TableCell>
                    <TableCell>{formatDate(leave.start_date)}</TableCell>
                    <TableCell>{formatDate(leave.end_date)}</TableCell>
                    <TableCell>{leave.remarks ?? "—"}</TableCell>
                    <TableCell>
                      <StatusBadge status={leave.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
