import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EmployeeSidebar } from "./EmployeeSidebar";
import { EmployeeNavbar } from "./EmployeeNavbar";
import { useAsync } from "@/hooks/useAsync";
import { getEmployee } from "@/services/employeeService";
import { CURRENT_EMPLOYEE_ID } from "@/lib/session";

export function EmployeeLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: employee } = useAsync(() => getEmployee(CURRENT_EMPLOYEE_ID), []);

  return (
    <div className="min-h-screen bg-background">
      <EmployeeSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="md:pl-64">
        <EmployeeNavbar
          onOpenMobile={() => setMobileOpen(true)}
          name={employee?.full_name ?? "Employee"}
          designation={employee?.designation ?? null}
        />
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
