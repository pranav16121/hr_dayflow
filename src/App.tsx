import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { AdminEmployeesPage } from "@/pages/admin/AdminEmployeesPage";
import { AdminEmployeeDetailPage } from "@/pages/admin/AdminEmployeeDetailPage";
import { AdminAttendancePage } from "@/pages/admin/AdminAttendancePage";
import { AdminLeavesPage } from "@/pages/admin/AdminLeavesPage";
import { AdminPayrollPage } from "@/pages/admin/AdminPayrollPage";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="employees" element={<AdminEmployeesPage />} />
          <Route path="employees/:employeeId" element={<AdminEmployeeDetailPage />} />
          <Route path="attendance" element={<AdminAttendancePage />} />
          <Route path="leaves" element={<AdminLeavesPage />} />
          <Route path="payroll" element={<AdminPayrollPage />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
