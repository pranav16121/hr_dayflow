import type { Employee, UpdateEmployeeInput } from "@/types";
import { mockEmployees } from "@/lib/mockData";
import { mockDelay } from "./mockDelay";

/**
 * Mock implementation. Swap the bodies below for Supabase calls
 * (via src/lib/supabaseClient.ts) once PP's backend is ready —
 * function signatures and return types must not change.
 */

export async function getEmployees(): Promise<Employee[]> {
  return mockDelay([...mockEmployees]);
}

export async function getEmployee(employeeId: string): Promise<Employee> {
  const employee = mockEmployees.find((e) => e.id === employeeId);
  if (!employee) {
    throw new Error(`Employee ${employeeId} not found`);
  }
  return mockDelay({ ...employee });
}

export async function updateEmployee(
  employeeId: string,
  data: UpdateEmployeeInput,
): Promise<Employee> {
  const index = mockEmployees.findIndex((e) => e.id === employeeId);
  if (index === -1) {
    throw new Error(`Employee ${employeeId} not found`);
  }
  const updated: Employee = {
    ...mockEmployees[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  mockEmployees[index] = updated;
  return mockDelay({ ...updated });
}
