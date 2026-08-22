import type { AdminLeaveRequest, LeaveRequest, LeaveStatus, LeaveType } from "@/types";
import { mockLeaveRequests } from "@/lib/mockData";
import { mockDelay } from "./mockDelay";

export interface GetAllLeaveRequestsOptions {
  employeeId?: string;
  status?: LeaveStatus;
  leaveType?: LeaveType;
  startDate?: string;
  endDate?: string;
}

function matches(record: AdminLeaveRequest, opts: GetAllLeaveRequestsOptions): boolean {
  if (opts.employeeId && record.employee_id !== opts.employeeId) return false;
  if (opts.status && record.status !== opts.status) return false;
  if (opts.leaveType && record.leave_type !== opts.leaveType) return false;
  if (opts.startDate && record.end_date < opts.startDate) return false;
  if (opts.endDate && record.start_date > opts.endDate) return false;
  return true;
}

export async function getAllLeaveRequests(
  options?: GetAllLeaveRequestsOptions,
): Promise<AdminLeaveRequest[]> {
  const filtered = mockLeaveRequests.filter((r) => matches(r, options ?? {}));
  return mockDelay([...filtered]);
}

export async function getLeaveRequest(leaveRequestId: string): Promise<AdminLeaveRequest> {
  const record = mockLeaveRequests.find((r) => r.id === leaveRequestId);
  if (!record) {
    throw new Error(`Leave request ${leaveRequestId} not found`);
  }
  return mockDelay({ ...record });
}

function review(
  leaveRequestId: string,
  status: "approved" | "rejected",
  adminComment?: string,
): LeaveRequest {
  const index = mockLeaveRequests.findIndex((r) => r.id === leaveRequestId);
  if (index === -1) {
    throw new Error(`Leave request ${leaveRequestId} not found`);
  }
  const now = new Date().toISOString();
  const updated: AdminLeaveRequest = {
    ...mockLeaveRequests[index],
    status,
    admin_comment: adminComment ?? null,
    reviewed_at: now,
    updated_at: now,
  };
  mockLeaveRequests[index] = updated;
  return updated;
}

export async function approveLeave(
  leaveRequestId: string,
  adminComment?: string,
): Promise<LeaveRequest> {
  const updated = review(leaveRequestId, "approved", adminComment);
  return mockDelay({ ...updated });
}

export async function rejectLeave(
  leaveRequestId: string,
  adminComment?: string,
): Promise<LeaveRequest> {
  const updated = review(leaveRequestId, "rejected", adminComment);
  return mockDelay({ ...updated });
}
