-- ============================================================================
-- Dayflow HRMS - Canonical PostgreSQL Database Architecture
-- Migration: 001_initial_dayflow_schema.sql
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. COMMON HELPER FUNCTIONS & TRIGGERS
-- ============================================================================

-- Common updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Admin role verification helper function (STABLE, SECURITY DEFINER to prevent RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public, pg_temp;

-- ============================================================================
-- 2. TABLE DEFINITIONS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TABLE 1: profiles
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  employee_id TEXT NULL,
  role TEXT NOT NULL DEFAULT 'employee' CHECK (role IN ('employee', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ----------------------------------------------------------------------------
-- TABLE 2: employees
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  employee_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NULL,
  address TEXT NULL,
  department TEXT NULL,
  designation TEXT NULL,
  joining_date DATE NULL,
  profile_picture TEXT NULL,
  employment_status TEXT NOT NULL DEFAULT 'active' CHECK (employment_status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_employees_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_employees_user_id ON public.employees(user_id);
CREATE INDEX IF NOT EXISTS idx_employees_employee_id ON public.employees(employee_id);

-- ----------------------------------------------------------------------------
-- TABLE 3: attendance
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in TIMESTAMPTZ NULL,
  check_out TIMESTAMPTZ NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'half_day', 'leave')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_attendance_employee_date UNIQUE (employee_id, date)
);

CREATE TRIGGER trg_attendance_updated_at
  BEFORE UPDATE ON public.attendance
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_attendance_employee_id ON public.attendance(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_employee_date ON public.attendance(employee_id, date);

-- ----------------------------------------------------------------------------
-- TABLE 4: leave_requests
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('paid', 'sick', 'unpaid')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  remarks TEXT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_comment TEXT NULL,
  reviewed_by UUID NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_leave_dates CHECK (end_date >= start_date)
);

CREATE TRIGGER trg_leave_requests_updated_at
  BEFORE UPDATE ON public.leave_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_leave_requests_employee_id ON public.leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON public.leave_requests(status);
CREATE INDEX IF NOT EXISTS idx_leave_requests_start_date ON public.leave_requests(start_date);
CREATE INDEX IF NOT EXISTS idx_leave_requests_employee_status ON public.leave_requests(employee_id, status);

-- ----------------------------------------------------------------------------
-- TABLE 5: payroll
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payroll (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL UNIQUE REFERENCES public.employees(id) ON DELETE CASCADE,
  basic_salary NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (basic_salary >= 0),
  allowances NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (allowances >= 0),
  deductions NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (deductions >= 0),
  net_salary NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (net_salary >= 0),
  effective_date DATE NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Backend-authoritative net salary calculation trigger
CREATE OR REPLACE FUNCTION public.calculate_payroll_net_salary()
RETURNS TRIGGER AS $$
BEGIN
  NEW.net_salary := NEW.basic_salary + NEW.allowances - NEW.deductions;
  IF NEW.net_salary < 0 THEN
    RAISE EXCEPTION 'Net salary cannot be negative: basic(%) + allowances(%) - deductions(%) = %',
      NEW.basic_salary, NEW.allowances, NEW.deductions, NEW.net_salary;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_payroll_calculate_net_salary
  BEFORE INSERT OR UPDATE ON public.payroll
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_payroll_net_salary();

CREATE TRIGGER trg_payroll_updated_at
  BEFORE UPDATE ON public.payroll
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_payroll_employee_id ON public.payroll(employee_id);

-- ----------------------------------------------------------------------------
-- TABLE 6: notifications
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_is_read ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);

-- ============================================================================
-- 3. AUTHENTICATION HOOK (AUTH.USERS -> PROFILES)
-- ============================================================================

-- Newly registered users ALWAYS receive 'employee' role. Admin roles must be assigned separately.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    'employee'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 4. SECURE RPC FUNCTIONS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- RPC: update_my_profile
-- Allows employee to update ONLY phone, address, and profile_picture
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_my_profile(
  p_phone TEXT,
  p_address TEXT,
  p_profile_picture TEXT
)
RETURNS public.employees AS $$
DECLARE
  v_employee public.employees;
BEGIN
  UPDATE public.employees
  SET
    phone = p_phone,
    address = p_address,
    profile_picture = p_profile_picture,
    updated_at = NOW()
  WHERE user_id = auth.uid()
  RETURNING * INTO v_employee;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Employee record not found for authenticated user';
  END IF;

  RETURN v_employee;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ----------------------------------------------------------------------------
-- RPC: check_in
-- Identifies employee from auth.uid(), creates/updates today's attendance record
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.check_in()
RETURNS public.attendance AS $$
DECLARE
  v_emp_id UUID;
  v_attendance public.attendance;
  v_today DATE := CURRENT_DATE;
  v_now TIMESTAMPTZ := NOW();
BEGIN
  -- Identify employee from authenticated user
  SELECT id INTO v_emp_id
  FROM public.employees
  WHERE user_id = auth.uid();

  IF v_emp_id IS NULL THEN
    RAISE EXCEPTION 'Authenticated user is not associated with an employee record';
  END IF;

  -- Check if attendance record already exists for today
  SELECT * INTO v_attendance
  FROM public.attendance
  WHERE employee_id = v_emp_id AND date = v_today;

  IF v_attendance.id IS NOT NULL THEN
    IF v_attendance.check_in IS NOT NULL THEN
      RAISE EXCEPTION 'Employee has already checked in today at %', v_attendance.check_in;
    END IF;

    UPDATE public.attendance
    SET
      check_in = v_now,
      status = 'present',
      updated_at = v_now
    WHERE id = v_attendance.id
    RETURNING * INTO v_attendance;
  ELSE
    INSERT INTO public.attendance (
      employee_id,
      date,
      check_in,
      check_out,
      status,
      created_at,
      updated_at
    )
    VALUES (
      v_emp_id,
      v_today,
      v_now,
      NULL,
      'present',
      v_now,
      v_now
    )
    RETURNING * INTO v_attendance;
  END IF;

  RETURN v_attendance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ----------------------------------------------------------------------------
-- RPC: check_out
-- Identifies employee from auth.uid(), sets check_out timestamp
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.check_out()
RETURNS public.attendance AS $$
DECLARE
  v_emp_id UUID;
  v_attendance public.attendance;
  v_today DATE := CURRENT_DATE;
  v_now TIMESTAMPTZ := NOW();
BEGIN
  -- Identify employee from authenticated user
  SELECT id INTO v_emp_id
  FROM public.employees
  WHERE user_id = auth.uid();

  IF v_emp_id IS NULL THEN
    RAISE EXCEPTION 'Authenticated user is not associated with an employee record';
  END IF;

  -- Find today's attendance record
  SELECT * INTO v_attendance
  FROM public.attendance
  WHERE employee_id = v_emp_id AND date = v_today;

  IF v_attendance.id IS NULL OR v_attendance.check_in IS NULL THEN
    RAISE EXCEPTION 'Cannot check out without checking in first for today';
  END IF;

  IF v_attendance.check_out IS NOT NULL THEN
    RAISE EXCEPTION 'Employee has already checked out today at %', v_attendance.check_out;
  END IF;

  UPDATE public.attendance
  SET
    check_out = v_now,
    updated_at = v_now
  WHERE id = v_attendance.id
  RETURNING * INTO v_attendance;

  RETURN v_attendance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ----------------------------------------------------------------------------
-- RPC: approve_leave_request
-- Admin operation to approve a leave request
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.approve_leave_request(
  p_leave_request_id UUID,
  p_admin_comment TEXT DEFAULT NULL
)
RETURNS public.leave_requests AS $$
DECLARE
  v_request public.leave_requests;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Only administrators can approve leave requests';
  END IF;

  UPDATE public.leave_requests
  SET
    status = 'approved',
    admin_comment = p_admin_comment,
    reviewed_by = auth.uid(),
    reviewed_at = NOW(),
    updated_at = NOW()
  WHERE id = p_leave_request_id
  RETURNING * INTO v_request;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Leave request not found with id %', p_leave_request_id;
  END IF;

  RETURN v_request;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ----------------------------------------------------------------------------
-- RPC: reject_leave_request
-- Admin operation to reject a leave request
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.reject_leave_request(
  p_leave_request_id UUID,
  p_admin_comment TEXT DEFAULT NULL
)
RETURNS public.leave_requests AS $$
DECLARE
  v_request public.leave_requests;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Only administrators can reject leave requests';
  END IF;

  UPDATE public.leave_requests
  SET
    status = 'rejected',
    admin_comment = p_admin_comment,
    reviewed_by = auth.uid(),
    reviewed_at = NOW(),
    updated_at = NOW()
  WHERE id = p_leave_request_id
  RETURNING * INTO v_request;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Leave request not found with id %', p_leave_request_id;
  END IF;

  RETURN v_request;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ----------------------------------------------------------------------------
-- RPC: mark_notification_read
-- Allows authenticated user to mark only their own notification as read
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.mark_notification_read(
  p_notification_id UUID
)
RETURNS public.notifications AS $$
DECLARE
  v_notification public.notifications;
BEGIN
  UPDATE public.notifications
  SET is_read = TRUE
  WHERE id = p_notification_id
    AND user_id = auth.uid()
  RETURNING * INTO v_notification;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Notification not found or unauthorized';
  END IF;

  RETURN v_notification;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all application tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Policies for: profiles
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
CREATE POLICY "profiles_select_policy"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
CREATE POLICY "profiles_insert_policy"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
CREATE POLICY "profiles_update_policy"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "profiles_delete_policy" ON public.profiles;
CREATE POLICY "profiles_delete_policy"
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- Policies for: employees
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "employees_select_policy" ON public.employees;
CREATE POLICY "employees_select_policy"
  ON public.employees
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "employees_insert_policy" ON public.employees;
CREATE POLICY "employees_insert_policy"
  ON public.employees
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "employees_update_policy" ON public.employees;
CREATE POLICY "employees_update_policy"
  ON public.employees
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "employees_delete_policy" ON public.employees;
CREATE POLICY "employees_delete_policy"
  ON public.employees
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- Policies for: attendance
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "attendance_select_policy" ON public.attendance;
CREATE POLICY "attendance_select_policy"
  ON public.attendance
  FOR SELECT
  TO authenticated
  USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "attendance_insert_policy" ON public.attendance;
CREATE POLICY "attendance_insert_policy"
  ON public.attendance
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "attendance_update_policy" ON public.attendance;
CREATE POLICY "attendance_update_policy"
  ON public.attendance
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "attendance_delete_policy" ON public.attendance;
CREATE POLICY "attendance_delete_policy"
  ON public.attendance
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- Policies for: leave_requests
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "leave_requests_select_policy" ON public.leave_requests;
CREATE POLICY "leave_requests_select_policy"
  ON public.leave_requests
  FOR SELECT
  TO authenticated
  USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "leave_requests_insert_policy" ON public.leave_requests;
CREATE POLICY "leave_requests_insert_policy"
  ON public.leave_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (
      employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
      AND status = 'pending'
      AND reviewed_by IS NULL
      AND reviewed_at IS NULL
      AND admin_comment IS NULL
    )
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "leave_requests_update_policy" ON public.leave_requests;
CREATE POLICY "leave_requests_update_policy"
  ON public.leave_requests
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "leave_requests_delete_policy" ON public.leave_requests;
CREATE POLICY "leave_requests_delete_policy"
  ON public.leave_requests
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- Policies for: payroll
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "payroll_select_policy" ON public.payroll;
CREATE POLICY "payroll_select_policy"
  ON public.payroll
  FOR SELECT
  TO authenticated
  USING (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "payroll_insert_policy" ON public.payroll;
CREATE POLICY "payroll_insert_policy"
  ON public.payroll
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "payroll_update_policy" ON public.payroll;
CREATE POLICY "payroll_update_policy"
  ON public.payroll
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "payroll_delete_policy" ON public.payroll;
CREATE POLICY "payroll_delete_policy"
  ON public.payroll
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- Policies for: notifications
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "notifications_select_policy" ON public.notifications;
CREATE POLICY "notifications_select_policy"
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "notifications_insert_policy" ON public.notifications;
CREATE POLICY "notifications_insert_policy"
  ON public.notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Update & Delete are restricted to admin; employees mark read via mark_notification_read RPC
DROP POLICY IF EXISTS "notifications_update_policy" ON public.notifications;
CREATE POLICY "notifications_update_policy"
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "notifications_delete_policy" ON public.notifications;
CREATE POLICY "notifications_delete_policy"
  ON public.notifications
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================================
-- 6. PERMISSIONS & GRANTS
-- ============================================================================

GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

-- Explicitly revoke execution from PUBLIC for all functions
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.calculate_payroll_net_salary() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.update_my_profile(TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_in() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_out() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.approve_leave_request(UUID, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reject_leave_request(UUID, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.mark_notification_read(UUID) FROM PUBLIC;

-- Grant EXECUTE only to authenticated role for intended callable RPCs / helpers
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_my_profile(TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_in() TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_out() TO authenticated;
GRANT EXECUTE ON FUNCTION public.approve_leave_request(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.reject_leave_request(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_notification_read(UUID) TO authenticated;
