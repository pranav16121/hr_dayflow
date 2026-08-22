import type { AdminPayroll, Payroll, UpdatePayrollInput } from "@/types";
import { mockPayroll } from "@/lib/mockData";
import { mockDelay } from "./mockDelay";

export async function getAllPayroll(): Promise<AdminPayroll[]> {
  return mockDelay([...mockPayroll]);
}

export async function getEmployeePayroll(employeeId: string): Promise<AdminPayroll | null> {
  const record = mockPayroll.find((p) => p.employee_id === employeeId);
  return mockDelay(record ? { ...record } : null);
}

export async function updatePayroll(
  employeeId: string,
  data: UpdatePayrollInput,
): Promise<Payroll> {
  const index = mockPayroll.findIndex((p) => p.employee_id === employeeId);
  if (index === -1) {
    throw new Error(`Payroll for employee ${employeeId} not found`);
  }
  const net_salary = data.basic_salary + data.allowances - data.deductions;
  const updated: AdminPayroll = {
    ...mockPayroll[index],
    ...data,
    net_salary,
    updated_at: new Date().toISOString(),
  };
  mockPayroll[index] = updated;
  return mockDelay({ ...updated });
}
