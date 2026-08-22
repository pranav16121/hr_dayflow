import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProtectedRouteProps {
  /** Portal this route group belongs to. Determines the login redirect and the role check. */
  role: "admin" | "employee";
}

function AccessDeniedCard({
  role,
  currentRole,
  currentEmail,
  onSignOut,
}: {
  role: "admin" | "employee";
  currentRole: string;
  currentEmail: string;
  onSignOut: () => void;
}) {
  const portalName = role === "admin" ? "HR / Admin" : "Employee";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-card border border-warning-700/20 bg-surface p-6 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warning-50 text-warning-700">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold text-text-primary">
          {role === "admin" ? "Admin Access Required" : "Employee Access Required"}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          You are signed in as <span className="font-semibold text-text-primary">{currentEmail}</span> with role{" "}
          <span className="font-semibold text-text-primary">{currentRole}</span>.
        </p>
        <p className="mt-1 text-xs text-text-muted">
          The {portalName} portal requires an account with the{" "}
          <code className="bg-zinc-100 px-1 py-0.5 rounded text-primary">{role}</code> role in Supabase.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" size="sm" icon={<LogOut className="h-4 w-4" />} onClick={onSignOut}>
            Sign Out / Switch Account
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProtectedRoute({ role }: ProtectedRouteProps) {
  const { user, profile, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingState label="Authenticating session…" />
      </div>
    );
  }

  const loginPath = role === "admin" ? "/login" : "/employee/login";

  // Not logged in -> redirect to the login page for this portal
  if (!user) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  const isEmployeeRole = profile?.role === "employee";

  if (role === "admin" && !isAdmin) {
    return (
      <AccessDeniedCard
        role="admin"
        currentEmail={user.email ?? "unknown"}
        currentRole={profile?.role ?? "employee"}
        onSignOut={signOut}
      />
    );
  }

  if (role === "employee") {
    // Admins signing into the Employee portal belong in their own portal.
    if (isAdmin) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (!isEmployeeRole) {
      return (
        <AccessDeniedCard
          role="employee"
          currentEmail={user.email ?? "unknown"}
          currentRole={profile?.role ?? "unknown"}
          onSignOut={signOut}
        />
      );
    }
  }

  return <Outlet />;
}
