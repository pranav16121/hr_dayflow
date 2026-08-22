import { supabase } from "@/lib/supabaseClient";
import type { AdminAttendance, AttendanceStatus } from "@/types";

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

/**
 * Fetch all attendance records from Supabase public.attendance table joined with employee details.
 */
export async function getAllAttendance(
  options?: GetAllAttendanceOptions,
): Promise<AdminAttendance[]> {
  let query = supabase
    .from("attendance")
    .select(`
      id,
      employee_id,
      date,
      check_in,
      check_out,
      status,
      created_at,
      updated_at,
      employee:employees (
        id,
        employee_id,
        full_name,
        department
      )
    `)
    .order("date", { ascending: false });

  if (options?.employeeId) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(options.employeeId);
    let resolvedId = options.employeeId;
    if (!isUuid) {
      const { data: emp } = await supabase
        .from("employees")
        .select("id")
        .eq("employee_id", options.employeeId)
        .maybeSingle();
      if (emp) resolvedId = emp.id;
    }
    query = query.eq("employee_id", resolvedId);
  }
  if (options?.startDate) {
    query = query.gte("date", options.startDate);
  }
  if (options?.endDate) {
    query = query.lte("date", options.endDate);
  }
  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching attendance from Supabase:", error);
    throw new Error(`Failed to fetch attendance: ${error.message}`);
  }

  return (data as unknown as AdminAttendance[]) ?? [];
}

/**
 * Fetch attendance records for a specific employee from Supabase.
 */
export async function getEmployeeAttendance(
  employeeId: string,
  options?: GetEmployeeAttendanceOptions,
): Promise<AdminAttendance[]> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(employeeId);
  let resolvedId = employeeId;
  if (!isUuid) {
    const { data: emp } = await supabase
      .from("employees")
      .select("id")
      .eq("employee_id", employeeId)
      .maybeSingle();
    if (emp) resolvedId = emp.id;
  }

  let query = supabase
    .from("attendance")
    .select(`
      id,
      employee_id,
      date,
      check_in,
      check_out,
      status,
      created_at,
      updated_at,
      employee:employees (
        id,
        employee_id,
        full_name,
        department
      )
    `)
    .eq("employee_id", resolvedId)
    .order("date", { ascending: false });

  if (options?.startDate) {
    query = query.gte("date", options.startDate);
  }
  if (options?.endDate) {
    query = query.lte("date", options.endDate);
  }
  if (options?.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching attendance for employee ${employeeId}:`, error);
    throw new Error(`Failed to fetch employee attendance: ${error.message}`);
  }

  return (data as unknown as AdminAttendance[]) ?? [];
}
