import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarCheck, ClipboardList, Wallet, UserCircle, X } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { to: "/employee/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/employee/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/employee/leave", label: "Leave", icon: ClipboardList },
  { to: "/employee/payroll", label: "Payroll", icon: Wallet },
  { to: "/employee/profile", label: "Profile", icon: UserCircle },
];

interface EmployeeSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function EmployeeSidebar({ mobileOpen, onCloseMobile }: EmployeeSidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-900/40 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface transition-transform duration-200 ease-in-out",
          "md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Employee navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <span className="text-lg font-bold tracking-tight text-text-primary">
            Dayflow <span className="text-primary">Employee</span>
          </span>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation"
            className="rounded-button p-1.5 text-text-muted hover:bg-zinc-100 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-button px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-light text-primary-active"
                    : "text-text-secondary hover:bg-zinc-100 hover:text-text-primary",
                )
              }
            >
              <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
