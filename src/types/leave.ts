import type { Employee } from "./employee";

export type LeaveType =
  | "paid"
  | "sick"
  | "unpaid";

export type LeaveStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  remarks: string | null;
  status: LeaveStatus;
  admin_comment: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminLeaveRequest extends LeaveRequest {
  employee?: Pick<Employee, "id" | "employee_id" | "full_name" | "department">;
}
