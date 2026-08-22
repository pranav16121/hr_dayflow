export type AttendanceStatus =
  | "present"
  | "absent"
  | "half_day"
  | "leave";

export interface Attendance {
  id: string;
  employee_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: AttendanceStatus;
  created_at?: string;
  updated_at?: string;
}

