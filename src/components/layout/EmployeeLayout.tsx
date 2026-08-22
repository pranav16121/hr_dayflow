import { Outlet } from "react-router-dom";

export function EmployeeLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}