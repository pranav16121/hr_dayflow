import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LoginPage } from "@/pages/auth/LoginPage";
import { EmployeeLoginPage } from "@/pages/auth/EmployeeLoginPage";

// Layouts
import { AdminLayout } from "@/layouts/AdminLayout";
import { EmployeeLayout } from "@/layouts/EmployeeLayout";
import { ShowcaseLayout } from "@/layouts/ShowcaseLayout";

// Admin Portal Pages
import { Dashboard as AdminDashboard } from "@/pages/admin/Dashboard";
import { AdminEmployeesPage } from "@/pages/admin/AdminEmployeesPage";
import { AdminEmployeeDetailPage } from "@/pages/admin/AdminEmployeeDetailPage";
import { Attendance as AdminAttendance } from "@/pages/admin/Attendance";
import { LeaveRequests as AdminLeaveRequests } from "@/pages/admin/LeaveRequests";
import { Payroll as AdminPayroll } from "@/pages/admin/Payroll";

// Employee Portal Pages
import { Dashboard as EmployeeDashboard } from "@/pages/employee/Dashboard";
import { Profile as EmployeeProfile } from "@/pages/employee/Profile";
import { Attendance as EmployeeAttendance } from "@/pages/employee/Attendance";
import { Leave as EmployeeLeave } from "@/pages/employee/Leave";
import { Payroll as EmployeePayroll } from "@/pages/employee/Payroll";

// Component Showcase Pages
import {
  ShowcaseTypography,
  ShowcaseButtons,
  ShowcaseForms,
  ShowcaseBadges,
  ShowcaseTables,
  ShowcaseFeedback,
} from "@/pages/Showcase";

// 404 Page
import { NotFound } from "@/pages/NotFound";

export function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Supabase Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employee/login" element={<EmployeeLoginPage />} />

        {/* Development Component Showcase */}
        <Route path="/dev/component-showcase" element={<ShowcaseLayout />}>
          <Route index element={<Navigate to="/dev/component-showcase/typography" replace />} />
          <Route path="typography" element={<ShowcaseTypography />} />
          <Route path="buttons" element={<ShowcaseButtons />} />
          <Route path="forms" element={<ShowcaseForms />} />
          <Route path="badges" element={<ShowcaseBadges />} />
          <Route path="tables" element={<ShowcaseTables />} />
          <Route path="feedback" element={<ShowcaseFeedback />} />
        </Route>

        {/* Protected Employee Portal Routes */}
        <Route element={<ProtectedRoute role="employee" />}>
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<Navigate to="/employee/dashboard" replace />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="attendance" element={<EmployeeAttendance />} />
            <Route path="leave" element={<EmployeeLeave />} />
            <Route path="payroll" element={<EmployeePayroll />} />
          </Route>
        </Route>

        {/* Protected Admin / HR Portal Routes */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<AdminEmployeesPage />} />
            <Route path="employees/:employeeId" element={<AdminEmployeeDetailPage />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="leaves" element={<AdminLeaveRequests />} />
            <Route path="payroll" element={<AdminPayroll />} />
          </Route>
        </Route>

        {/* Root and Fallback Routes */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
