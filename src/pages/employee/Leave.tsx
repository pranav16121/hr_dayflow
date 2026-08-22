import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useAsync } from "@/hooks/useAsync";
import {
  getActiveEmployee,
  getPersonalLeaveRequests,
  submitPersonalLeaveRequest,
} from "@/services/employeePortalService";
import type { LeaveType } from "@/types";
import { LoadingState, ErrorState } from "@/components/feedback";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { formatDate } from "@/lib/format";
import { CalendarDays, Send, Clock } from "lucide-react";

export function Leave() {
  const { data: employee, loading: empLoading } = useAsync(getActiveEmployee, []);
  const {
    data: leaveRequests,
    loading: leavesLoading,
    error,
    refetch,
  } = useAsync(
    () => (employee ? getPersonalLeaveRequests(employee.id) : Promise.resolve([])),
    [employee?.id],
  );

  // Form State
  const [leaveType, setLeaveType] = useState<LeaveType>("paid");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate balances (Assuming standard policy: 12 Paid, 6 Sick)
  const balances = useMemo(() => {
    const requests = leaveRequests ?? [];
    const approved = requests.filter((r) => r.status === "approved");
    const paidUsed = approved.filter((r) => r.leave_type === "paid").length * 2; // rough estimation
    const sickUsed = approved.filter((r) => r.leave_type === "sick").length;
    const unpaidUsed = approved.filter((r) => r.leave_type === "unpaid").length;

    return {
      paidRemaining: Math.max(0, 12 - paidUsed),
      sickRemaining: Math.max(0, 6 - sickUsed),
      unpaidTaken: unpaidUsed,
    };
  }, [leaveRequests]);

  const handleApplyLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitPersonalLeaveRequest(employee.id, {
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        remarks: remarks.trim() || null,
      });
      toast.success("Leave application submitted! It is now pending HR admin approval.");
      setStartDate("");
      setEndDate("");
      setRemarks("");
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit leave request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (empLoading || leavesLoading) return <LoadingState label="Loading leave balances and applications…" />;
  if (error || !employee) return <ErrorState onRetry={refetch} description={error?.message || "Failed to load leave data"} />;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Leave Management"
        description="Apply for time off, check your remaining balances, and review application statuses."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Balances & Leave Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* Balances Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary-600" />
                Available Leave Balances
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary-50 border border-primary-100">
                <div>
                  <span className="text-xs font-semibold text-primary-700 uppercase">Paid Leave</span>
                  <p className="text-lg font-bold text-primary-700">{balances.paidRemaining} Days</p>
                </div>
                <span className="text-[11px] text-primary-600 bg-white/70 px-2 py-0.5 rounded-full font-medium">Annual</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-success-50 border border-success-100">
                <div>
                  <span className="text-xs font-semibold text-success-700 uppercase">Sick Leave</span>
                  <p className="text-lg font-bold text-success-700">{balances.sickRemaining} Days</p>
                </div>
                <span className="text-[11px] text-success-600 bg-white/70 px-2 py-0.5 rounded-full font-medium">Medical</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                <div>
                  <span className="text-xs font-semibold text-text-muted uppercase">Unpaid Taken</span>
                  <p className="text-lg font-bold text-text-primary">{balances.unpaidTaken} Days</p>
                </div>
                <span className="text-[11px] text-text-muted bg-white px-2 py-0.5 rounded-full font-medium">Loss of Pay</span>
              </div>
            </CardContent>
          </Card>

          {/* Apply for Leave Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Send className="h-4 w-4 text-primary-600" />
                Apply for Time Off
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApplyLeave} className="space-y-3.5">
                <Select
                  label="Leave Type"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                  options={[
                    { label: "Paid Leave", value: "paid" },
                    { label: "Sick Leave", value: "sick" },
                    { label: "Unpaid Leave", value: "unpaid" },
                  ]}
                  required
                />
                <Input
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
                <Input
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
                <Textarea
                  label="Reason / Remarks"
                  placeholder="Reason for requesting leave…"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={2}
                />
                <Button type="submit" fullWidth loading={isSubmitting} icon={<Send className="h-4 w-4" />}>
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Leave Applications Table */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary-600" />
                My Leave Application History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!leaveRequests || leaveRequests.length === 0 ? (
                <div className="text-center py-12 text-sm text-text-secondary">
                  No leave requests submitted yet. Use the form on the left to apply!
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>HR Comment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium text-text-primary capitalize">{req.leave_type}</TableCell>
                        <TableCell className="text-xs">
                          {formatDate(req.start_date)} – {formatDate(req.end_date)}
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate text-xs">{req.remarks || "—"}</TableCell>
                        <TableCell>
                          <StatusBadge status={req.status} />
                        </TableCell>
                        <TableCell className="text-xs text-text-muted italic">
                          {req.admin_comment ? `“${req.admin_comment}”` : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Leave;
