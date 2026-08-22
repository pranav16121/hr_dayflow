import type {
  AdminAttendance,
  AdminLeaveRequest,
  AdminPayroll,
  AttendanceStatus,
  Employee,
} from "@/types";

const now = new Date();
const iso = (d: Date) => d.toISOString();
const daysAgo = (n: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d;
};
const dateOnly = (d: Date) => d.toISOString().slice(0, 10);

export const mockEmployees: Employee[] = [
  {
    id: "emp-001",
    user_id: "user-001",
    employee_id: "EMP001",
    full_name: "Amogh",
    email: "amogh@dayflow.io",
    phone: "+91 90000 10001",
    address: "12 MG Road, Bengaluru",
    department: "Engineering",
    designation: "Frontend Developer",
    joining_date: "2023-02-14",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(600)),
    updated_at: iso(daysAgo(3)),
  },
  {
    id: "emp-002",
    user_id: "user-002",
    employee_id: "EMP002",
    full_name: "Priya Sharma",
    email: "priya.sharma@dayflow.io",
    phone: "+91 90000 10002",
    address: "45 Residency Road, Bengaluru",
    department: "Human Resources",
    designation: "HR Manager",
    joining_date: "2021-06-01",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(900)),
    updated_at: iso(daysAgo(10)),
  },
  {
    id: "emp-003",
    user_id: "user-003",
    employee_id: "EMP003",
    full_name: "Rahul Verma",
    email: "rahul.verma@dayflow.io",
    phone: "+91 90000 10003",
    address: "8 Koramangala 5th Block, Bengaluru",
    department: "Engineering",
    designation: "Backend Developer",
    joining_date: "2022-11-20",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(500)),
    updated_at: iso(daysAgo(5)),
  },
  {
    id: "emp-004",
    user_id: "user-004",
    employee_id: "EMP004",
    full_name: "Sneha Iyer",
    email: "sneha.iyer@dayflow.io",
    phone: "+91 90000 10004",
    address: "22 Anna Salai, Chennai",
    department: "Sales",
    designation: "Sales Executive",
    joining_date: "2023-08-09",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(370)),
    updated_at: iso(daysAgo(20)),
  },
  {
    id: "emp-005",
    user_id: "user-005",
    employee_id: "EMP005",
    full_name: "Karthik Menon",
    email: "karthik.menon@dayflow.io",
    phone: "+91 90000 10005",
    address: "3 Marine Drive, Kochi",
    department: "Marketing",
    designation: "Marketing Lead",
    joining_date: "2020-01-15",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(1200)),
    updated_at: iso(daysAgo(2)),
  },
  {
    id: "emp-006",
    user_id: "user-006",
    employee_id: "EMP006",
    full_name: "Divya Nair",
    email: "divya.nair@dayflow.io",
    phone: "+91 90000 10006",
    address: "19 Jubilee Hills, Hyderabad",
    department: "Finance",
    designation: "Accountant",
    joining_date: "2022-04-03",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(620)),
    updated_at: iso(daysAgo(15)),
  },
  {
    id: "emp-007",
    user_id: "user-007",
    employee_id: "EMP007",
    full_name: "Arjun Reddy",
    email: "arjun.reddy@dayflow.io",
    phone: "+91 90000 10007",
    address: "7 Banjara Hills, Hyderabad",
    department: "Operations",
    designation: "Operations Manager",
    joining_date: "2019-09-23",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(1500)),
    updated_at: iso(daysAgo(8)),
  },
  {
    id: "emp-008",
    user_id: "user-008",
    employee_id: "EMP008",
    full_name: "Ananya Das",
    email: "ananya.das@dayflow.io",
    phone: "+91 90000 10008",
    address: "56 Salt Lake, Kolkata",
    department: "Engineering",
    designation: "QA Engineer",
    joining_date: "2023-03-27",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(540)),
    updated_at: iso(daysAgo(1)),
  },
  {
    id: "emp-009",
    user_id: "user-009",
    employee_id: "EMP009",
    full_name: "Vikram Rao",
    email: "vikram.rao@dayflow.io",
    phone: "+91 90000 10009",
    address: "14 Baner Road, Pune",
    department: "Design",
    designation: "UI/UX Designer",
    joining_date: "2021-12-06",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(800)),
    updated_at: iso(daysAgo(12)),
  },
  {
    id: "emp-010",
    user_id: "user-010",
    employee_id: "EMP010",
    full_name: "Meera Pillai",
    email: "meera.pillai@dayflow.io",
    phone: "+91 90000 10010",
    address: "31 MG Road, Thiruvananthapuram",
    department: "Sales",
    designation: "Sales Associate",
    joining_date: "2020-07-11",
    profile_picture: null,
    employment_status: "inactive",
    created_at: iso(daysAgo(1300)),
    updated_at: iso(daysAgo(60)),
  },
  {
    id: "emp-011",
    user_id: "user-011",
    employee_id: "EMP011",
    full_name: "Siddharth Joshi",
    email: "siddharth.joshi@dayflow.io",
    phone: "+91 90000 10011",
    address: "9 FC Road, Pune",
    department: "Engineering",
    designation: "DevOps Engineer",
    joining_date: "2022-10-17",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(480)),
    updated_at: iso(daysAgo(4)),
  },
  {
    id: "emp-012",
    user_id: "user-012",
    employee_id: "EMP012",
    full_name: "Kavya Krishnan",
    email: "kavya.krishnan@dayflow.io",
    phone: "+91 90000 10012",
    address: "27 Indiranagar, Bengaluru",
    department: "Human Resources",
    designation: "Recruiter",
    joining_date: "2023-05-29",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(420)),
    updated_at: iso(daysAgo(6)),
  },
  {
    id: "emp-013",
    user_id: "user-013",
    employee_id: "EMP013",
    full_name: "Rohan Kapoor",
    email: "rohan.kapoor@dayflow.io",
    phone: "+91 90000 10013",
    address: "63 Connaught Place, Delhi",
    department: "Finance",
    designation: "Financial Analyst",
    joining_date: "2021-02-22",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(950)),
    updated_at: iso(daysAgo(9)),
  },
  {
    id: "emp-014",
    user_id: "user-014",
    employee_id: "EMP014",
    full_name: "Isha Bhatt",
    email: "isha.bhatt@dayflow.io",
    phone: "+91 90000 10014",
    address: "5 SG Highway, Ahmedabad",
    department: "Marketing",
    designation: "Content Strategist",
    joining_date: "2023-01-09",
    profile_picture: null,
    employment_status: "active",
    created_at: iso(daysAgo(560)),
    updated_at: iso(daysAgo(18)),
  },
];

function employeeSummary(emp: Employee) {
  return {
    id: emp.id,
    employee_id: emp.employee_id,
    full_name: emp.full_name,
    department: emp.department,
  };
}

const ATTENDANCE_PATTERN: AttendanceStatus[] = [
  "present",
  "present",
  "present",
  "present",
  "half_day",
  "present",
  "absent",
  "present",
  "present",
  "leave",
  "present",
  "present",
];

function generateAttendance(): AdminAttendance[] {
  const records: AdminAttendance[] = [];
  const activeEmployees = mockEmployees.filter((e) => e.employment_status === "active");

  activeEmployees.forEach((emp, empIndex) => {
    for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
      const date = daysAgo(dayOffset);
      const dow = date.getDay();
      if (dow === 0 || dow === 6) continue; // skip weekends

      const status = ATTENDANCE_PATTERN[(empIndex + dayOffset) % ATTENDANCE_PATTERN.length];
      const dateStr = dateOnly(date);

      let check_in: string | null = null;
      let check_out: string | null = null;
      if (status === "present") {
        check_in = `${dateStr}T09:0${empIndex % 5}:00`;
        check_out = `${dateStr}T18:1${empIndex % 5}:00`;
      } else if (status === "half_day") {
        check_in = `${dateStr}T09:15:00`;
        check_out = `${dateStr}T13:30:00`;
      }

      records.push({
        id: `att-${emp.employee_id}-${dateStr}`,
        employee_id: emp.id,
        date: dateStr,
        check_in,
        check_out,
        status,
        employee: employeeSummary(emp),
      });
    }
  });

  return records.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const mockAttendance: AdminAttendance[] = generateAttendance();

function findEmp(employeeId: string): Employee {
  const emp = mockEmployees.find((e) => e.employee_id === employeeId);
  if (!emp) throw new Error(`mock employee ${employeeId} not found`);
  return emp;
}

export const mockLeaveRequests: AdminLeaveRequest[] = [
  {
    id: "lv-001",
    employee_id: findEmp("EMP001").id,
    leave_type: "sick",
    start_date: dateOnly(daysAgo(-1)),
    end_date: dateOnly(daysAgo(-2)),
    remarks: "Fever and cold, doctor advised rest.",
    status: "pending",
    admin_comment: null,
    reviewed_by: null,
    reviewed_at: null,
    created_at: iso(daysAgo(1)),
    updated_at: iso(daysAgo(1)),
    employee: employeeSummary(findEmp("EMP001")),
  },
  {
    id: "lv-002",
    employee_id: findEmp("EMP003").id,
    leave_type: "paid",
    start_date: dateOnly(daysAgo(-3)),
    end_date: dateOnly(daysAgo(-5)),
    remarks: "Family function out of town.",
    status: "pending",
    admin_comment: null,
    reviewed_by: null,
    reviewed_at: null,
    created_at: iso(daysAgo(2)),
    updated_at: iso(daysAgo(2)),
    employee: employeeSummary(findEmp("EMP003")),
  },
  {
    id: "lv-003",
    employee_id: findEmp("EMP004").id,
    leave_type: "unpaid",
    start_date: dateOnly(daysAgo(20)),
    end_date: dateOnly(daysAgo(18)),
    remarks: "Personal reasons.",
    status: "approved",
    admin_comment: "Approved, please coordinate handover with team lead.",
    reviewed_by: findEmp("EMP002").id,
    reviewed_at: iso(daysAgo(19)),
    created_at: iso(daysAgo(21)),
    updated_at: iso(daysAgo(19)),
    employee: employeeSummary(findEmp("EMP004")),
  },
  {
    id: "lv-004",
    employee_id: findEmp("EMP008").id,
    leave_type: "sick",
    start_date: dateOnly(daysAgo(10)),
    end_date: dateOnly(daysAgo(10)),
    remarks: "Migraine, unable to work.",
    status: "approved",
    admin_comment: null,
    reviewed_by: findEmp("EMP002").id,
    reviewed_at: iso(daysAgo(9)),
    created_at: iso(daysAgo(10)),
    updated_at: iso(daysAgo(9)),
    employee: employeeSummary(findEmp("EMP008")),
  },
  {
    id: "lv-005",
    employee_id: findEmp("EMP005").id,
    leave_type: "paid",
    start_date: dateOnly(daysAgo(35)),
    end_date: dateOnly(daysAgo(30)),
    remarks: "Annual vacation.",
    status: "rejected",
    admin_comment: "Overlaps with quarterly campaign launch — please reschedule.",
    reviewed_by: findEmp("EMP002").id,
    reviewed_at: iso(daysAgo(33)),
    created_at: iso(daysAgo(36)),
    updated_at: iso(daysAgo(33)),
    employee: employeeSummary(findEmp("EMP005")),
  },
  {
    id: "lv-006",
    employee_id: findEmp("EMP011").id,
    leave_type: "paid",
    start_date: dateOnly(daysAgo(-8)),
    end_date: dateOnly(daysAgo(-8)),
    remarks: "Sibling's wedding.",
    status: "pending",
    admin_comment: null,
    reviewed_by: null,
    reviewed_at: null,
    created_at: iso(daysAgo(3)),
    updated_at: iso(daysAgo(3)),
    employee: employeeSummary(findEmp("EMP011")),
  },
  {
    id: "lv-007",
    employee_id: findEmp("EMP013").id,
    leave_type: "sick",
    start_date: dateOnly(daysAgo(45)),
    end_date: dateOnly(daysAgo(43)),
    remarks: "Recovering from minor surgery.",
    status: "approved",
    admin_comment: "Get well soon.",
    reviewed_by: findEmp("EMP002").id,
    reviewed_at: iso(daysAgo(44)),
    created_at: iso(daysAgo(46)),
    updated_at: iso(daysAgo(44)),
    employee: employeeSummary(findEmp("EMP013")),
  },
  {
    id: "lv-008",
    employee_id: findEmp("EMP009").id,
    leave_type: "unpaid",
    start_date: dateOnly(daysAgo(-1)),
    end_date: dateOnly(daysAgo(-3)),
    remarks: null,
    status: "pending",
    admin_comment: null,
    reviewed_by: null,
    reviewed_at: null,
    created_at: iso(daysAgo(1)),
    updated_at: iso(daysAgo(1)),
    employee: employeeSummary(findEmp("EMP009")),
  },
];

function computeNet(basic: number, allowances: number, deductions: number) {
  return basic + allowances - deductions;
}

export const mockPayroll: AdminPayroll[] = mockEmployees.map((emp, index) => {
  const basic_salary = 45000 + index * 3500;
  const allowances = 8000 + (index % 4) * 1500;
  const deductions = 3500 + (index % 3) * 500;
  return {
    id: `pay-${emp.employee_id}`,
    employee_id: emp.id,
    basic_salary,
    allowances,
    deductions,
    net_salary: computeNet(basic_salary, allowances, deductions),
    effective_date: "2026-04-01",
    updated_at: iso(daysAgo(30 + index)),
    employee: employeeSummary(emp),
  };
});
