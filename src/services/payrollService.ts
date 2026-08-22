import { supabase } from "@/lib/supabaseClient";
import type { AdminPayroll, Payroll, UpdatePayrollInput } from "@/types";

/**
 * Fetch all payroll structures from Supabase public.payroll table joined with employee details.
 */
export async function getAllPayroll(): Promise<AdminPayroll[]> {
  const { data, error } = await supabase
    .from("payroll")
    .select(`
      id,
      employee_id,
      basic_salary,
      allowances,
      deductions,
      net_salary,
      effective_date,
      updated_at,
      employee:employees (
        id,
        employee_id,
        full_name,
        department
      )
    `)
    .order("effective_date", { ascending: false });

  if (error) {
    console.error("Error fetching payroll from Supabase:", error);
    throw new Error(`Failed to fetch payroll: ${error.message}`);
  }

  return (data as unknown as AdminPayroll[]) ?? [];
}

/**
 * Fetch payroll structure for a single employee from Supabase.
 */
export async function getEmployeePayroll(employeeId: string): Promise<AdminPayroll | null> {
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

  const { data, error } = await supabase
    .from("payroll")
    .select(`
      id,
      employee_id,
      basic_salary,
      allowances,
      deductions,
      net_salary,
      effective_date,
      updated_at,
      employee:employees (
        id,
        employee_id,
        full_name,
        department
      )
    `)
    .eq("employee_id", resolvedId)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching payroll for employee ${employeeId}:`, error);
    throw new Error(`Failed to fetch payroll: ${error.message}`);
  }

  return (data as unknown as AdminPayroll) ?? null;
}

/**
 * Update payroll structure for an employee in Supabase.
 */
export async function updatePayroll(
  employeeId: string,
  data: UpdatePayrollInput,
): Promise<Payroll> {
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

  const { data: updated, error } = await supabase
    .from("payroll")
    .update({
      basic_salary: data.basic_salary,
      allowances: data.allowances,
      deductions: data.deductions,
    })
    .eq("employee_id", resolvedId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating payroll for employee ${employeeId}:`, error);
    throw new Error(`Failed to update payroll: ${error.message}`);
  }

  if (!updated) {
    throw new Error(`Payroll record for employee ${employeeId} not found`);
  }

  return updated as Payroll;
}
