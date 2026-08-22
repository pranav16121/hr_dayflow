import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Employee application */}
        <Route path="/" element={<MainLayout />}>

          <Route
            index
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="attendance"
            element={<Attendance />}
          />

          <Route
            path="leave"
            element={<Leave />}
          />

          <Route
            path="payroll"
            element={<Payroll />}
          />

        </Route>

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;