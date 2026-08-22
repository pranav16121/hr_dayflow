import { supabase } from "@/lib/supabaseClient";
import type { Attendance, Employee, LeaveRequest, LeaveType, Payroll } from "@/types";

/**
 * Resolves the active employee record for the Employee Portal.
 * If authenticated user is linked to an employee record, returns that employee.
 * Otherwise, returns the first employee in the system (e.g. for Admin previewing the employee view).
 */
export async function getActiveEmployee(): Promise<Employee> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: emp } = await supabase
      .from("employees")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (emp) return emp as Employee;
  }

  // Fallback to first employee (e.g. Priya Sharma or Arjun)
  const { data: firstEmp, error } = await supabase
    .from("employees")
    .select("*")
    .limit(1)
    .single();

  if (error || !firstEmp) {
    throw new Error("No employee records found in the database.");
  }

  return firstEmp as Employee;
}

/**
 * Updates editable contact info for an employee (phone, address).
 */
export async function updateEmployeeContact(
  employeeId: string,
  data: { phone?: string | null; address?: string | null },
): Promise<Employee> {
  const { data: updated, error } = await supabase
    .from("employees")
    .update({
      phone: data.phone ?? null,
      address: data.address ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", employeeId)
    .select()
    .single();

  if (error) {
    console.error("Error updating employee contact:", error);
    throw new Error(error.message);
  }

  return updated as Employee;
}

/**
 * Fetches personal attendance logs for an employee.
 */
export async function getPersonalAttendance(employeeId: string): Promise<Attendance[]> {
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("employee_id", employeeId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching personal attendance:", error);
    throw new Error(error.message);
  }

  return (data ?? []) as Attendance[];
}

/**
 * Records or updates today's clock-in.
 */
export async function clockInEmployee(employeeId: string): Promise<Attendance> {
  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toISOString();

  // Check if attendance already exists for today
  const { data: existing } = await supabase
    .from("attendance")
    .select("*")
    .eq("employee_id", employeeId)
    .eq("date", today)
    .maybeSingle();

  if (existing) {
    const { data: updated, error } = await supabase
      .from("attendance")
      .update({
        check_in: existing.check_in || now,
        status: "present",
        updated_at: now,
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return updated as Attendance;
  }

  const { data: inserted, error } = await supabase
    .from("attendance")
    .insert({
      employee_id: employeeId,
      date: today,
      check_in: now,
      status: "present",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return inserted as Attendance;
}

/**
 * Records today's clock-out.
 */
export async function clockOutEmployee(employeeId: string): Promise<Attendance> {
  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toISOString();

  const { data: existing, error: findErr } = await supabase
    .from("attendance")
    .select("*")
    .eq("employee_id", employeeId)
    .eq("date", today)
    .maybeSingle();

  if (findErr || !existing) {
    // If not checked in yet, create present record with clock out
    const { data: inserted, error: insertErr } = await supabase
      .from("attendance")
      .insert({
        employee_id: employeeId,
        date: today,
        check_in: now,
        check_out: now,
        status: "present",
      })
      .select()
      .single();

    if (insertErr) throw new Error(insertErr.message);
    return inserted as Attendance;
  }

  const { data: updated, error } = await supabase
    .from("attendance")
    .update({
      check_out: now,
      updated_at: now,
    })
    .eq("id", existing.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return updated as Attendance;
}

/**
 * Fetches personal leave requests for an employee.
 */
export async function getPersonalLeaveRequests(employeeId: string): Promise<LeaveRequest[]> {
  const { data, error } = await supabase
    .from("leave_requests")
    .select("*")
    .eq("employee_id", employeeId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching personal leave requests:", error);
    throw new Error(error.message);
  }

  return (data ?? []) as LeaveRequest[];
}

/**
 * Submits a new leave request to Supabase.
 */
export async function submitPersonalLeaveRequest(
  employeeId: string,
  data: {
    leave_type: LeaveType;
    start_date: string;
    end_date: string;
    remarks?: string | null;
  },
): Promise<LeaveRequest> {
  const { data: inserted, error } = await supabase
    .from("leave_requests")
    .insert({
      employee_id: employeeId,
      leave_type: data.leave_type,
      start_date: data.start_date,
      end_date: data.end_date,
      remarks: data.remarks ?? null,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("Error submitting leave request:", error);
    throw new Error(error.message);
  }

  return inserted as LeaveRequest;
}

/**
 * Fetches personal payroll / salary details.
 */
export async function getPersonalPayroll(employeeId: string): Promise<Payroll | null> {
  const { data, error } = await supabase
    .from("payroll")
    .select("*")
    .eq("employee_id", employeeId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching personal payroll:", error);
    throw new Error(error.message);
  }

  return data as Payroll | null;
}
