import type { Employee } from "./employee";

export interface Payroll {
  id: string;
  employee_id: string;
  basic_salary: number;
  allowances: number;
  deductions: number;
  net_salary: number;
  effective_date: string;
  updated_at: string;
}

export interface AdminPayroll extends Payroll {
  employee?: Pick<Employee, "id" | "employee_id" | "full_name" | "department">;
}

export interface UpdatePayrollInput {
  basic_salary: number;
  allowances: number;
  deductions: number;
}
