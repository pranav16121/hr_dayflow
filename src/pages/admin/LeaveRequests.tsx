import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminLeaveRequest } from "@/types";
import { getEmployees } from "@/services/employeeService";
import { approveLeave, getAllLeaveRequests, rejectLeave } from "@/services/leaveService";
import { useAsync } from "@/hooks/useAsync";
import { LoadingState, ErrorState, EmptyState } from "@/components/feedback";
import { LeaveFilters, type LeaveFilterValues } from "@/components/admin/LeaveFilters";
import { LeaveTable } from "@/components/admin/LeaveTable";
import { LeaveReviewModal } from "@/components/admin/LeaveReviewModal";
import { PageHeader } from "@/components/ui/PageHeader";

const EMPTY_FILTERS: LeaveFilterValues = {
  employeeId: "",
  status: "",
  leaveType: "",
  startDate: "",
  endDate: "",
};

export function LeaveRequests() {
  const [filters, setFilters] = useState<LeaveFilterValues>(EMPTY_FILTERS);
  const [reviewing, setReviewing] = useState<AdminLeaveRequest | null>(null);

  const { data: employees } = useAsync(getEmployees, []);
  const {
    data: leaveRequests,
    loading,
    error,
    refetch,
  } = useAsync(
    () =>
      getAllLeaveRequests({
        employeeId: filters.employeeId || undefined,
        status: filters.status || undefined,
        leaveType: filters.leaveType || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      }),
    [filters.employeeId, filters.status, filters.leaveType, filters.startDate, filters.endDate],
  );

  const activeEmployees = useMemo(
    () => (employees ?? []).filter((e) => e.employment_status === "active"),
    [employees],
  );

  async function handleApprove(leaveRequestId: string, adminComment?: string) {
    try {
      await approveLeave(leaveRequestId, adminComment);
      toast.success("Leave request approved in Supabase");
      setReviewing(null);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to approve leave request");
    }
  }

  async function handleReject(leaveRequestId: string, adminComment?: string) {
    try {
      await rejectLeave(leaveRequestId, adminComment);
      toast.success("Leave request rejected in Supabase");
      setReviewing(null);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to reject leave request");
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Leave Requests"
        description="Review, approve, or reject employee time-off applications with live database updates."
      />

      <LeaveFilters employees={activeEmployees} values={filters} onChange={setFilters} />

      {loading ? (
        <LoadingState label="Loading leave requests from Supabase…" />
      ) : error ? (
        <ErrorState onRetry={refetch} description={error.message} />
      ) : !leaveRequests || leaveRequests.length === 0 ? (
        <EmptyState title="No leave requests found" description="Try adjusting your filters." />
      ) : (
        <LeaveTable requests={leaveRequests} onReview={setReviewing} />
      )}

      <LeaveReviewModal
        request={reviewing}
        onClose={() => setReviewing(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}

export default LeaveRequests;
