import type { AdminAttendance, AttendanceStatus } from "@/types";
import { mockAttendance, mockEmployees } from "@/lib/mockData";
import { mockDelay } from "./mockDelay";

export interface GetAllAttendanceOptions {
  employeeId?: string;
  startDate?: string;
  endDate?: string;
  status?: AttendanceStatus;
}

export interface GetEmployeeAttendanceOptions {
  startDate?: string;
  endDate?: string;
  status?: AttendanceStatus;
}

function matches(
  record: AdminAttendance,
  opts: { employeeId?: string; startDate?: string; endDate?: string; status?: AttendanceStatus },
): boolean {
  if (opts.employeeId && record.employee_id !== opts.employeeId) return false;
  if (opts.startDate && record.date < opts.startDate) return false;
  if (opts.endDate && record.date > opts.endDate) return false;
  if (opts.status && record.status !== opts.status) return false;
  return true;
}

export async function getAllAttendance(
  options?: GetAllAttendanceOptions,
): Promise<AdminAttendance[]> {
  const filtered = mockAttendance.filter((r) => matches(r, options ?? {}));
  return mockDelay(filtered);
}

export async function getEmployeeAttendance(
  employeeId: string,
  options?: GetEmployeeAttendanceOptions,
): Promise<AdminAttendance[]> {
  const employee = mockEmployees.find((e) => e.id === employeeId);
  const internalId = employee?.id ?? employeeId;
  const filtered = mockAttendance.filter((r) =>
    matches(r, { ...options, employeeId: internalId }),
  );
  return mockDelay(filtered);
}
