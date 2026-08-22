import { supabase } from "@/lib/supabaseClient";
import type { Employee, UpdateEmployeeInput } from "@/types";

export interface CreateEmployeeInput {
  user_id: string;
  employee_id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  department?: string | null;
  designation?: string | null;
  joining_date?: string | null;
  profile_picture?: string | null;
  employment_status?: "active" | "inactive";
}

/**
 * Fetch all employees from Supabase public.employees table.
 */
export async function getEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching employees from Supabase:", error);
    throw new Error(`Failed to fetch employees: ${error.message}`);
  }

  return (data as Employee[]) ?? [];
}

/**
 * Fetch a single employee by database UUID id (or fallback to employee_id).
 */
export async function getEmployee(employeeId: string): Promise<Employee> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(employeeId);
  
  let query = supabase.from("employees").select("*");
  if (isUuid) {
    query = query.eq("id", employeeId);
  } else {
    query = query.or(`id.eq.${employeeId},employee_id.eq.${employeeId}`);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error(`Error fetching employee ${employeeId} from Supabase:`, error);
    throw new Error(`Failed to fetch employee: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Employee with ID "${employeeId}" not found in database`);
  }

  return data as Employee;
}

/**
 * Update an employee record in Supabase public.employees table using database UUID id.
 */
export async function updateEmployee(
  employeeId: string,
  data: UpdateEmployeeInput,
): Promise<Employee> {
  const updatePayload: Partial<Employee> = {};

  if (data.full_name !== undefined) updatePayload.full_name = data.full_name;
  if (data.email !== undefined) updatePayload.email = data.email;
  if (data.phone !== undefined) updatePayload.phone = data.phone;
  if (data.address !== undefined) updatePayload.address = data.address;
  if (data.department !== undefined) updatePayload.department = data.department;
  if (data.designation !== undefined) updatePayload.designation = data.designation;
  if (data.joining_date !== undefined) updatePayload.joining_date = data.joining_date;
  if (data.profile_picture !== undefined) updatePayload.profile_picture = data.profile_picture;
  if (data.employment_status !== undefined) updatePayload.employment_status = data.employment_status;

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(employeeId);
  let query = supabase.from("employees").update(updatePayload);
  if (isUuid) {
    query = query.eq("id", employeeId);
  } else {
    query = query.or(`id.eq.${employeeId},employee_id.eq.${employeeId}`);
  }

  const { data: updated, error } = await query.select().maybeSingle();

  if (error) {
    console.error(`Error updating employee ${employeeId} in Supabase:`, error);
    throw new Error(`Failed to update employee: ${error.message}`);
  }

  if (!updated) {
    throw new Error(`Employee with ID "${employeeId}" not found in database`);
  }

  return updated as Employee;
}

/**
 * Create a new employee in Supabase public.employees table.
 */
export async function createEmployee(data: CreateEmployeeInput): Promise<Employee> {
  const { data: created, error } = await supabase
    .from("employees")
    .insert({
      user_id: data.user_id,
      employee_id: data.employee_id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone ?? null,
      address: data.address ?? null,
      department: data.department ?? null,
      designation: data.designation ?? null,
      joining_date: data.joining_date ?? null,
      profile_picture: data.profile_picture ?? null,
      employment_status: data.employment_status ?? "active",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating employee in Supabase:", error);
    throw new Error(`Failed to create employee: ${error.message}`);
  }

  return created as Employee;
}

/**
 * Delete an employee from Supabase public.employees table.
 */
export async function deleteEmployee(employeeId: string): Promise<void> {
  const { error } = await supabase
    .from("employees")
    .delete()
    .eq("id", employeeId);

  if (error) {
    console.error(`Error deleting employee ${employeeId} from Supabase:`, error);
    throw new Error(`Failed to delete employee: ${error.message}`);
  }
}
