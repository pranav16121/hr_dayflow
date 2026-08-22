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

