import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingState } from "@/components/feedback/LoadingState";
import { ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

export function ProtectedRoute({ requireAdmin = true }: ProtectedRouteProps) {
  const { user, profile, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingState label="Authenticating session…" />
      </div>
    );
  }

  // Not logged in -> redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but not admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md rounded-card border border-warning-700/20 bg-surface p-6 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warning-50 text-warning-700">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">Admin Access Required</h2>
          <p className="mt-2 text-sm text-text-secondary">
            You are signed in as <span className="font-semibold text-text-primary">{user.email}</span> with role{" "}
            <span className="font-semibold text-text-primary">{profile?.role ?? "employee"}</span>.
          </p>
          <p className="mt-1 text-xs text-text-muted">
            The HR / Admin portal requires an account with the <code className="bg-zinc-100 px-1 py-0.5 rounded text-primary">admin</code> role in Supabase.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={<LogOut className="h-4 w-4" />}
              onClick={() => signOut()}
            >
              Sign Out / Switch Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

