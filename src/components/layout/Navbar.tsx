import { Menu, LogOut, ArrowRightLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export interface NavbarProps {
  onOpenMobile?: () => void;
  onMenuToggle?: () => void;
  portalName?: string;
}

export function Navbar({ onOpenMobile, onMenuToggle, portalName = "HR / Admin Portal" }: NavbarProps) {
  const { user, profile, employee, signOut } = useAuth();
  const location = useLocation();
  const toggleHandler = onMenuToggle || onOpenMobile;

  const isAdminView = location.pathname.startsWith("/admin");
  const displayName = employee?.full_name || profile?.email || user?.email || (isAdminView ? "Priya Sharma" : "Arjun Sheddi");
  const displayRole = isAdminView ? "Administrator" : "Staff Employee";
  const displayEmail = user?.email || profile?.email || (isAdminView ? "priya.sharma@dayflow.io" : "arjun.reddy@dayflow.io");

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur md:px-6 select-none">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleHandler}
          aria-label="Open navigation"
          className="rounded-button p-2 text-text-secondary hover:bg-zinc-100 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="hidden text-lg font-semibold text-text-primary md:block">{portalName}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Portal Switcher */}
        {isAdminView ? (
          <Link
            to="/employee/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100/80 rounded-lg border border-primary-200 transition-colors"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Switch to</span> Employee Portal
          </Link>
        ) : (
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100/80 rounded-lg border border-primary-200 transition-colors"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Switch to</span> Admin Portal
          </Link>
        )}

        <div className="flex items-center gap-2.5">
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium text-text-primary">{displayName}</p>
            <p className="text-xs text-text-muted">{displayRole} {displayEmail ? `· ${displayEmail}` : ""}</p>
          </div>
          <Avatar name={displayName} src={employee?.profile_picture ?? undefined} size="sm" />
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={<LogOut className="h-4 w-4" />}
          onClick={() => signOut()}
          aria-label="Sign out"
          className="text-xs"
        >
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
