import { supabase } from "@/lib/supabaseClient";
import type { AdminLeaveRequest, LeaveRequest, LeaveStatus, LeaveType } from "@/types";

export interface GetAllLeaveRequestsOptions {
  employeeId?: string;
  status?: LeaveStatus;
  leaveType?: LeaveType;
  startDate?: string;
  endDate?: string;
}

/**
 * Fetch all leave requests from Supabase public.leave_requests joined with employee details.
 */
export async function getAllLeaveRequests(
  options?: GetAllLeaveRequestsOptions,
): Promise<AdminLeaveRequest[]> {
  let query = supabase
    .from("leave_requests")
    .select(`
      id,
      employee_id,
      leave_type,
      start_date,
      end_date,
      remarks,
      status,
      admin_comment,
      reviewed_by,
      reviewed_at,
      created_at,
      updated_at,
      employee:employees (
        id,
        employee_id,
        full_name,
        department
      )
    `)
    .order("created_at", { ascending: false });

  if (options?.employeeId) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(options.employeeId);
    let resolvedId = options.employeeId;
    if (!isUuid) {
      const { data: emp } = await supabase
        .from("employees")
        .select("id")
        .eq("employee_id", options.employeeId)
        .maybeSingle();
      if (emp) resolvedId = emp.id;
    }
    query = query.eq("employee_id", resolvedId);
  }
  if (options?.status) {
    query = query.eq("status", options.status);
  }
  if (options?.leaveType) {
    query = query.eq("leave_type", options.leaveType);
  }
  if (options?.startDate) {
    query = query.gte("start_date", options.startDate);
  }
  if (options?.endDate) {
    query = query.lte("end_date", options.endDate);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching leave requests from Supabase:", error);
    throw new Error(`Failed to fetch leave requests: ${error.message}`);
  }

  return (data as unknown as AdminLeaveRequest[]) ?? [];
}

/**
 * Fetch a single leave request by ID.
 */
export async function getLeaveRequest(leaveRequestId: string): Promise<AdminLeaveRequest> {
  const { data, error } = await supabase
    .from("leave_requests")
    .select(`
      id,
      employee_id,
      leave_type,
      start_date,
      end_date,
      remarks,
      status,
      admin_comment,
      reviewed_by,
      reviewed_at,
      created_at,
      updated_at,
      employee:employees (
        id,
        employee_id,
        full_name,
        department
      )
    `)
    .eq("id", leaveRequestId)
    .single();

  if (error) {
    console.error(`Error fetching leave request ${leaveRequestId}:`, error);
    throw new Error(`Failed to fetch leave request: ${error.message}`);
  }

  return data as unknown as AdminLeaveRequest;
}

/**
 * Approve a leave request via Supabase RPC or direct table update.
 */
export async function approveLeave(
  leaveRequestId: string,
  adminComment?: string,
): Promise<LeaveRequest> {
  const { data, error } = await supabase.rpc("approve_leave_request", {
    p_leave_request_id: leaveRequestId,
    p_admin_comment: adminComment ?? null,
  });

  if (error) {
    // Fallback to direct update if RPC is not deployed yet or called with direct admin privileges
    const { data: updated, error: updateError } = await supabase
      .from("leave_requests")
      .update({
        status: "approved",
        admin_comment: adminComment ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", leaveRequestId)
      .select()
      .single();

    if (updateError) {
      console.error(`Error approving leave request ${leaveRequestId}:`, updateError);
      throw new Error(`Failed to approve leave request: ${updateError.message}`);
    }
    return updated as LeaveRequest;
  }

  return data as LeaveRequest;
}

/**
 * Reject a leave request via Supabase RPC or direct table update.
 */
export async function rejectLeave(
  leaveRequestId: string,
  adminComment?: string,
): Promise<LeaveRequest> {
  const { data, error } = await supabase.rpc("reject_leave_request", {
    p_leave_request_id: leaveRequestId,
    p_admin_comment: adminComment ?? null,
  });

  if (error) {
    // Fallback to direct update if RPC is not deployed yet or called with direct admin privileges
    const { data: updated, error: updateError } = await supabase
      .from("leave_requests")
      .update({
        status: "rejected",
        admin_comment: adminComment ?? null,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", leaveRequestId)
      .select()
      .single();

    if (updateError) {
      console.error(`Error rejecting leave request ${leaveRequestId}:`, updateError);
      throw new Error(`Failed to reject leave request: ${updateError.message}`);
    }
    return updated as LeaveRequest;
  }

  return data as LeaveRequest;
}
