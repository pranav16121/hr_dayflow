import type { Employee } from "./employee";

export type AttendanceStatus = "present" | "absent" | "half_day" | "leave";

export interface Attendance {
  id: string;
  employee_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: AttendanceStatus;
}

export interface AdminAttendance extends Attendance {
  employee?: Pick<Employee, "id" | "employee_id" | "full_name" | "department">;
}
