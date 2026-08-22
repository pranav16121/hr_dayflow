-- ============================================================================
-- Dayflow HRMS - Idempotent Demo Data Seed
-- Maps mock data from src/lib/mockData.ts to canonical Supabase database tables
-- Includes valid demo accounts (e.g. priya.sharma@dayflow.io / admin123)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. AUTH USERS & PROFILES
-- Password for all demo accounts: admin123
-- Standard bcrypt hash: $2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa
-- ----------------------------------------------------------------------------
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES
  ('00000000-0000-0000-0000-000000000000', 'a0000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'amogh@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Amogh"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'priya.sharma@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Priya Sharma"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'authenticated', 'authenticated', 'rahul.verma@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Rahul Verma"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'authenticated', 'authenticated', 'sneha.iyer@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Sneha Iyer"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', 'authenticated', 'authenticated', 'karthik.menon@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Karthik Menon"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000006', 'authenticated', 'authenticated', 'divya.nair@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Divya Nair"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000007', 'authenticated', 'authenticated', 'arjun.reddy@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Arjun Reddy"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000008', 'authenticated', 'authenticated', 'ananya.das@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Ananya Das"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000009', 'authenticated', 'authenticated', 'vikram.rao@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Vikram Rao"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000010', 'authenticated', 'authenticated', 'meera.pillai@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Meera Pillai"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000011', 'authenticated', 'authenticated', 'siddharth.joshi@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Siddharth Joshi"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000012', 'authenticated', 'authenticated', 'kavya.krishnan@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Kavya Krishnan"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000013', 'authenticated', 'authenticated', 'rohan.kapoor@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Rohan Kapoor"}', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000014', 'authenticated', 'authenticated', 'isha.bhatt@dayflow.io', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Isha Bhatt"}', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = NOW(),
  updated_at = NOW();

INSERT INTO public.profiles (id, email, employee_id, role, created_at, updated_at)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'amogh@dayflow.io', 'EMP001', 'employee', NOW() - INTERVAL '600 days', NOW() - INTERVAL '3 days'),
  ('a0000000-0000-0000-0000-000000000002', 'priya.sharma@dayflow.io', 'EMP002', 'admin', NOW() - INTERVAL '900 days', NOW() - INTERVAL '10 days'),
  ('a0000000-0000-0000-0000-000000000003', 'rahul.verma@dayflow.io', 'EMP003', 'employee', NOW() - INTERVAL '500 days', NOW() - INTERVAL '5 days'),
  ('a0000000-0000-0000-0000-000000000004', 'sneha.iyer@dayflow.io', 'EMP004', 'employee', NOW() - INTERVAL '370 days', NOW() - INTERVAL '20 days'),
  ('a0000000-0000-0000-0000-000000000005', 'karthik.menon@dayflow.io', 'EMP005', 'employee', NOW() - INTERVAL '1200 days', NOW() - INTERVAL '2 days'),
  ('a0000000-0000-0000-0000-000000000006', 'divya.nair@dayflow.io', 'EMP006', 'employee', NOW() - INTERVAL '620 days', NOW() - INTERVAL '15 days'),
  ('a0000000-0000-0000-0000-000000000007', 'arjun.reddy@dayflow.io', 'EMP007', 'employee', NOW() - INTERVAL '1500 days', NOW() - INTERVAL '8 days'),
  ('a0000000-0000-0000-0000-000000000008', 'ananya.das@dayflow.io', 'EMP008', 'employee', NOW() - INTERVAL '540 days', NOW() - INTERVAL '1 days'),
  ('a0000000-0000-0000-0000-000000000009', 'vikram.rao@dayflow.io', 'EMP009', 'employee', NOW() - INTERVAL '800 days', NOW() - INTERVAL '12 days'),
  ('a0000000-0000-0000-0000-000000000010', 'meera.pillai@dayflow.io', 'EMP010', 'employee', NOW() - INTERVAL '1300 days', NOW() - INTERVAL '60 days'),
  ('a0000000-0000-0000-0000-000000000011', 'siddharth.joshi@dayflow.io', 'EMP011', 'employee', NOW() - INTERVAL '480 days', NOW() - INTERVAL '4 days'),
  ('a0000000-0000-0000-0000-000000000012', 'kavya.krishnan@dayflow.io', 'EMP012', 'employee', NOW() - INTERVAL '420 days', NOW() - INTERVAL '6 days'),
  ('a0000000-0000-0000-0000-000000000013', 'rohan.kapoor@dayflow.io', 'EMP013', 'employee', NOW() - INTERVAL '950 days', NOW() - INTERVAL '9 days'),
  ('a0000000-0000-0000-0000-000000000014', 'isha.bhatt@dayflow.io', 'EMP014', 'employee', NOW() - INTERVAL '560 days', NOW() - INTERVAL '18 days')
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  employee_id = EXCLUDED.employee_id,
  role = EXCLUDED.role,
  updated_at = NOW();

-- ----------------------------------------------------------------------------
-- 2. EMPLOYEES
-- ----------------------------------------------------------------------------
INSERT INTO public.employees (
  id,
  user_id,
  employee_id,
  full_name,
  email,
  phone,
  address,
  department,
  designation,
  joining_date,
  profile_picture,
  employment_status,
  created_at,
  updated_at
)
VALUES
  ('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'EMP001', 'Amogh', 'amogh@dayflow.io', '+91 90000 10001', '12 MG Road, Bengaluru', 'Engineering', 'Frontend Developer', '2023-02-14', NULL, 'active', NOW() - INTERVAL '600 days', NOW() - INTERVAL '3 days'),
  ('e0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'EMP002', 'Priya Sharma', 'priya.sharma@dayflow.io', '+91 90000 10002', '45 Residency Road, Bengaluru', 'Human Resources', 'HR Manager', '2021-06-01', NULL, 'active', NOW() - INTERVAL '900 days', NOW() - INTERVAL '10 days'),
  ('e0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'EMP003', 'Rahul Verma', 'rahul.verma@dayflow.io', '+91 90000 10003', '8 Koramangala 5th Block, Bengaluru', 'Engineering', 'Backend Developer', '2022-11-20', NULL, 'active', NOW() - INTERVAL '500 days', NOW() - INTERVAL '5 days'),
  ('e0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'EMP004', 'Sneha Iyer', 'sneha.iyer@dayflow.io', '+91 90000 10004', '22 Anna Salai, Chennai', 'Sales', 'Sales Executive', '2023-08-09', NULL, 'active', NOW() - INTERVAL '370 days', NOW() - INTERVAL '20 days'),
  ('e0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', 'EMP005', 'Karthik Menon', 'karthik.menon@dayflow.io', '+91 90000 10005', '3 Marine Drive, Kochi', 'Marketing', 'Marketing Lead', '2020-01-15', NULL, 'active', NOW() - INTERVAL '1200 days', NOW() - INTERVAL '2 days'),
  ('e0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000006', 'EMP006', 'Divya Nair', 'divya.nair@dayflow.io', '+91 90000 10006', '19 Jubilee Hills, Hyderabad', 'Finance', 'Accountant', '2022-04-03', NULL, 'active', NOW() - INTERVAL '620 days', NOW() - INTERVAL '15 days'),
  ('e0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000007', 'EMP007', 'Arjun Reddy', 'arjun.reddy@dayflow.io', '+91 90000 10007', '7 Banjara Hills, Hyderabad', 'Operations', 'Operations Manager', '2019-09-23', NULL, 'active', NOW() - INTERVAL '1500 days', NOW() - INTERVAL '8 days'),
  ('e0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000008', 'EMP008', 'Ananya Das', 'ananya.das@dayflow.io', '+91 90000 10008', '56 Salt Lake, Kolkata', 'Engineering', 'QA Engineer', '2023-03-27', NULL, 'active', NOW() - INTERVAL '540 days', NOW() - INTERVAL '1 days'),
  ('e0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000009', 'EMP009', 'Vikram Rao', 'vikram.rao@dayflow.io', '+91 90000 10009', '14 Baner Road, Pune', 'Design', 'UI/UX Designer', '2021-12-06', NULL, 'active', NOW() - INTERVAL '800 days', NOW() - INTERVAL '12 days'),
  ('e0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000010', 'EMP010', 'Meera Pillai', 'meera.pillai@dayflow.io', '+91 90000 10010', '31 MG Road, Thiruvananthapuram', 'Sales', 'Sales Associate', '2020-07-11', NULL, 'inactive', NOW() - INTERVAL '1300 days', NOW() - INTERVAL '60 days'),
  ('e0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000011', 'EMP011', 'Siddharth Joshi', 'siddharth.joshi@dayflow.io', '+91 90000 10011', '9 FC Road, Pune', 'Engineering', 'DevOps Engineer', '2022-10-17', NULL, 'active', NOW() - INTERVAL '480 days', NOW() - INTERVAL '4 days'),
  ('e0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000012', 'EMP012', 'Kavya Krishnan', 'kavya.krishnan@dayflow.io', '+91 90000 10012', '27 Indiranagar, Bengaluru', 'Human Resources', 'Recruiter', '2023-05-29', NULL, 'active', NOW() - INTERVAL '420 days', NOW() - INTERVAL '6 days'),
  ('e0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000013', 'EMP013', 'Rohan Kapoor', 'rohan.kapoor@dayflow.io', '+91 90000 10013', '63 Connaught Place, Delhi', 'Finance', 'Financial Analyst', '2021-02-22', NULL, 'active', NOW() - INTERVAL '950 days', NOW() - INTERVAL '9 days'),
  ('e0000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000014', 'EMP014', 'Isha Bhatt', 'isha.bhatt@dayflow.io', '+91 90000 10014', '5 SG Highway, Ahmedabad', 'Marketing', 'Content Strategist', '2023-01-09', NULL, 'active', NOW() - INTERVAL '560 days', NOW() - INTERVAL '18 days')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  address = EXCLUDED.address,
  department = EXCLUDED.department,
  designation = EXCLUDED.designation,
  joining_date = EXCLUDED.joining_date,
  employment_status = EXCLUDED.employment_status,
  updated_at = NOW();

-- ----------------------------------------------------------------------------
-- 3. ATTENDANCE (14 Weekdays for all active employees)
-- ----------------------------------------------------------------------------
INSERT INTO public.attendance (employee_id, date, check_in, check_out, status)
SELECT
  e.id AS employee_id,
  d.att_date AS date,
  CASE
    WHEN p.status = 'present' THEN (d.att_date + TIME '09:00:00' + ((e.idx % 5) * INTERVAL '1 minute')) AT TIME ZONE 'UTC'
    WHEN p.status = 'half_day' THEN (d.att_date + TIME '09:15:00') AT TIME ZONE 'UTC'
    ELSE NULL
  END AS check_in,
  CASE
    WHEN p.status = 'present' THEN (d.att_date + TIME '18:10:00' + ((e.idx % 5) * INTERVAL '1 minute')) AT TIME ZONE 'UTC'
    WHEN p.status = 'half_day' THEN (d.att_date + TIME '13:30:00') AT TIME ZONE 'UTC'
    ELSE NULL
  END AS check_out,
  p.status
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY employee_id) - 1 AS idx
  FROM public.employees
  WHERE employment_status = 'active'
) e
CROSS JOIN LATERAL (
  SELECT (CURRENT_DATE - i)::DATE AS att_date, i AS day_offset
  FROM generate_series(0, 13) AS i
  WHERE EXTRACT(DOW FROM CURRENT_DATE - i) NOT IN (0, 6)
) d
CROSS JOIN LATERAL (
  SELECT (ARRAY['present','present','present','present','half_day','present','absent','present','present','leave','present','present'])[((e.idx + d.day_offset) % 12) + 1] AS status
) p
ON CONFLICT (employee_id, date) DO UPDATE SET
  check_in = EXCLUDED.check_in,
  check_out = EXCLUDED.check_out,
  status = EXCLUDED.status,
  updated_at = NOW();

-- ----------------------------------------------------------------------------
-- 4. LEAVE REQUESTS
-- ----------------------------------------------------------------------------
INSERT INTO public.leave_requests (
  id,
  employee_id,
  leave_type,
  start_date,
  end_date,
  remarks,
  status,
  admin_comment,
  reviewed_by,
  reviewed_at,
  created_at,
  updated_at
)
VALUES
  ('b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'sick', CURRENT_DATE + 1, CURRENT_DATE + 2, 'Fever and cold, doctor advised rest.', 'pending', NULL, NULL, NULL, NOW() - INTERVAL '1 days', NOW() - INTERVAL '1 days'),
  ('b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000003', 'paid', CURRENT_DATE + 3, CURRENT_DATE + 5, 'Family function out of town.', 'pending', NULL, NULL, NULL, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
  ('b0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000004', 'unpaid', CURRENT_DATE - 20, CURRENT_DATE - 18, 'Personal reasons.', 'approved', 'Approved, please coordinate handover with team lead.', 'a0000000-0000-0000-0000-000000000002', NOW() - INTERVAL '19 days', NOW() - INTERVAL '21 days', NOW() - INTERVAL '19 days'),
  ('b0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000008', 'sick', CURRENT_DATE - 10, CURRENT_DATE - 10, 'Migraine, unable to work.', 'approved', NULL, 'a0000000-0000-0000-0000-000000000002', NOW() - INTERVAL '9 days', NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days'),
  ('b0000000-0000-0000-0000-000000000005', 'e0000000-0000-0000-0000-000000000005', 'paid', CURRENT_DATE - 35, CURRENT_DATE - 30, 'Annual vacation.', 'rejected', 'Overlaps with quarterly campaign launch — please reschedule.', 'a0000000-0000-0000-0000-000000000002', NOW() - INTERVAL '33 days', NOW() - INTERVAL '36 days', NOW() - INTERVAL '33 days'),
  ('b0000000-0000-0000-0000-000000000006', 'e0000000-0000-0000-0000-000000000011', 'paid', CURRENT_DATE + 8, CURRENT_DATE + 8, 'Sibling''s wedding.', 'pending', NULL, NULL, NULL, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  ('b0000000-0000-0000-0000-000000000007', 'e0000000-0000-0000-0000-000000000013', 'sick', CURRENT_DATE - 45, CURRENT_DATE - 43, 'Recovering from minor surgery.', 'approved', 'Get well soon.', 'a0000000-0000-0000-0000-000000000002', NOW() - INTERVAL '44 days', NOW() - INTERVAL '46 days', NOW() - INTERVAL '44 days'),
  ('b0000000-0000-0000-0000-000000000008', 'e0000000-0000-0000-0000-000000000009', 'unpaid', CURRENT_DATE + 1, CURRENT_DATE + 3, 'Personal reasons.', 'pending', NULL, NULL, NULL, NOW() - INTERVAL '1 days', NOW() - INTERVAL '1 days')
ON CONFLICT (id) DO UPDATE SET
  employee_id = EXCLUDED.employee_id,
  leave_type = EXCLUDED.leave_type,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  remarks = EXCLUDED.remarks,
  status = EXCLUDED.status,
  admin_comment = EXCLUDED.admin_comment,
  reviewed_by = EXCLUDED.reviewed_by,
  reviewed_at = EXCLUDED.reviewed_at,
  updated_at = NOW();

-- ----------------------------------------------------------------------------
-- 5. PAYROLL
-- ----------------------------------------------------------------------------
INSERT INTO public.payroll (
  id,
  employee_id,
  basic_salary,
  allowances,
  deductions,
  effective_date,
  updated_at
)
SELECT
  ('c0000000-0000-0000-0000-' || LPAD(e.idx::TEXT, 12, '0'))::UUID AS id,
  e.id AS employee_id,
  45000 + (e.idx - 1) * 3500 AS basic_salary,
  8000 + ((e.idx - 1) % 4) * 1500 AS allowances,
  3500 + ((e.idx - 1) % 3) * 500 AS deductions,
  '2026-04-01'::DATE AS effective_date,
  NOW() - ((30 + e.idx) * INTERVAL '1 day') AS updated_at
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY employee_id) AS idx
  FROM public.employees
) e
ON CONFLICT (employee_id) DO UPDATE SET
  basic_salary = EXCLUDED.basic_salary,
  allowances = EXCLUDED.allowances,
  deductions = EXCLUDED.deductions,
  effective_date = EXCLUDED.effective_date,
  updated_at = NOW();

-- ----------------------------------------------------------------------------
-- 6. NOTIFICATIONS
-- ----------------------------------------------------------------------------
INSERT INTO public.notifications (
  id,
  user_id,
  title,
  message,
  type,
  is_read,
  created_at
)
VALUES
  ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Welcome to Dayflow', 'Welcome to Dayflow HRMS. Please verify your profile details.', 'info', FALSE, NOW() - INTERVAL '5 days'),
  ('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Attendance Reminder', 'Remember to check in before 09:30 AM.', 'attendance', FALSE, NOW() - INTERVAL '1 days'),
  ('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'Leave Request Submitted', 'Amogh has submitted a new sick leave request for review.', 'leave', FALSE, NOW() - INTERVAL '1 days')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  message = EXCLUDED.message,
  type = EXCLUDED.type,
  is_read = EXCLUDED.is_read;
