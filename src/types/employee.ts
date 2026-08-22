export type EmploymentStatus = "active" | "inactive";

export interface Employee {
  id: string;
  user_id: string;
  employee_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  department: string | null;
  designation: string | null;
  joining_date: string | null;
  profile_picture: string | null;
  employment_status: EmploymentStatus;
  created_at: string;
  updated_at: string;
}

export interface UpdateEmployeeInput {
  full_name?: string;
  email?: string;
  phone?: string | null;
  address?: string | null;
  department?: string | null;
  designation?: string | null;
  joining_date?: string | null;
  profile_picture?: string | null;
  employment_status?: EmploymentStatus;
}
