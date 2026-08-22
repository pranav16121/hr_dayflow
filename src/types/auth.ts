export type UserRole = "employee" | "admin";

export interface Profile {
  id: string;
  email: string;
  employee_id: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

