import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { EmployeeLayout } from './layouts/EmployeeLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ShowcaseLayout } from './layouts/ShowcaseLayout';
import { Button } from './components/ui/Button';
import { Card, CardContent } from './components/ui/Card';
import { Toaster } from 'sonner';

// Employee Portal Page Imports
import { Dashboard as EmployeeDashboard } from './pages/employee/Dashboard';
import { Profile } from './pages/employee/Profile';
import { Attendance as EmployeeAttendance } from './pages/employee/Attendance';
import { Leave } from './pages/employee/Leave';
import { Payroll as EmployeePayroll } from './pages/employee/Payroll';

// Admin Portal Page Imports
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { Employees } from './pages/admin/Employees';
import { Attendance as AdminAttendance } from './pages/admin/Attendance';
import { LeaveRequests } from './pages/admin/LeaveRequests';
import { Payroll as AdminPayroll } from './pages/admin/Payroll';

// Component Showcase Page Imports
import {
  ShowcaseTypography,
  ShowcaseButtons,
  ShowcaseForms,
  ShowcaseBadges,
  ShowcaseTables,
  ShowcaseFeedback
} from './pages/Showcase';

// 404 Not Found Page Import
import { NotFound } from './pages/NotFound';

// Login portal selection screen template
const AuthPlaceholder: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 select-none animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-primary-600 tracking-tight">
          DAYFLOW
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Human Resource Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="py-8 px-6 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-base font-semibold text-text-primary">
                Portal Selection Mode
              </h3>
              <p className="text-xs text-text-muted">
                Authentication logic is out of scope. You can access either dashboard below.
              </p>
            </div>
            
            <div className="space-y-3">
              <Link to="/employee/dashboard" className="block">
                <Button fullWidth variant="primary">
                  Enter Employee Portal
                </Button>
              </Link>
              <Link to="/admin/dashboard" className="block">
                <Button fullWidth variant="secondary">
                  Enter Admin / HR Portal
                </Button>
              </Link>
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-[10px] text-text-muted font-medium uppercase">or review</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              <Link to="/dev/component-showcase/typography" className="block">
                <Button fullWidth variant="outline">
                  Open Component Showcase
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notification Container */}
      <Toaster position="top-right" richColors />

      <Routes>
        {/* Real authentication simulator route */}
        <Route path="/login" element={<AuthPlaceholder />} />

        {/* Development portal selection bypass */}
        <Route path="/dev/portal-selector" element={<AuthPlaceholder />} />

        {/* Component Showcase layout portal under /dev */}
        <Route path="/dev/component-showcase" element={<ShowcaseLayout />}>
          <Route index element={<Navigate to="/dev/component-showcase/typography" replace />} />
          <Route path="typography" element={<ShowcaseTypography />} />
          <Route path="buttons" element={<ShowcaseButtons />} />
          <Route path="forms" element={<ShowcaseForms />} />
          <Route path="badges" element={<ShowcaseBadges />} />
          <Route path="tables" element={<ShowcaseTables />} />
          <Route path="feedback" element={<ShowcaseFeedback />} />
        </Route>

        {/* Employee Portal routes */}
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Navigate to="/employee/dashboard" replace />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
          <Route path="leave" element={<Leave />} />
          <Route path="payroll" element={<EmployeePayroll />} />
        </Route>

        {/* Admin Portal routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="leaves" element={<LeaveRequests />} />
          <Route path="payroll" element={<AdminPayroll />} />
        </Route>

        {/* Fallbacks */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
